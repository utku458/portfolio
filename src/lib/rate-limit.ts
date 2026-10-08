import "server-only";

export interface RateLimitDecision {
  readonly allowed: boolean;
  /** Seconds until the caller may try again. `0` when allowed. */
  readonly retryAfterSeconds: number;
}

interface RateLimiterOptions {
  /** Requests permitted per window. */
  readonly limit: number;
  readonly windowMs: number;
  /** Injected so the behaviour is testable without waiting in real time. */
  readonly now?: () => number;
}

interface Window {
  count: number;
  resetAt: number;
}

/**
 * A fixed-window counter, kept in the memory of one server instance.
 *
 * What this defends against: a script POSTing the contact form in a loop. Every
 * submission that passes validation costs an outbound email, so the honeypot —
 * which only catches indiscriminate form-fillers — is not enough on its own.
 *
 * What it does not do: hold across instances. On a platform that runs several
 * of them, the effective ceiling is `limit × instances`, and a cold start
 * forgets everything. That is an acceptable trade for a personal site: the
 * alternative is a network round trip to a shared store on every submission,
 * for a form that legitimately sees a handful of uses a week. Swap in a shared
 * store (Redis, Upstash) the day the budget stops being "my own inbox".
 */
export function createRateLimiter({ limit, windowMs, now = Date.now }: RateLimiterOptions) {
  const windows = new Map<string, Window>();

  /**
   * Bounds memory. Without it the map grows once per distinct IP, forever —
   * which is itself a way to take the process down.
   */
  function prune(currentTime: number): void {
    for (const [key, window] of windows) {
      if (window.resetAt <= currentTime) windows.delete(key);
    }
  }

  return function check(key: string): RateLimitDecision {
    const currentTime = now();

    // Amortized cleanup: cheap in the common case, and the threshold is far
    // above anything a real visitor pattern reaches.
    if (windows.size > 10_000) prune(currentTime);

    const window = windows.get(key);

    if (!window || window.resetAt <= currentTime) {
      windows.set(key, { count: 1, resetAt: currentTime + windowMs });
      return { allowed: true, retryAfterSeconds: 0 };
    }

    if (window.count >= limit) {
      return {
        allowed: false,
        retryAfterSeconds: Math.max(1, Math.ceil((window.resetAt - currentTime) / 1000)),
      };
    }

    window.count += 1;
    return { allowed: true, retryAfterSeconds: 0 };
  };
}

/**
 * Derives a rate-limit key from proxy headers.
 *
 * `x-forwarded-for` is a client-controlled header everywhere except behind a
 * proxy that overwrites it — which is exactly what Vercel and every other
 * managed platform does. The leftmost entry is the original client. Falling
 * back to a single shared bucket when no header is present is deliberate: an
 * unknown origin should still be counted, not waved through.
 */
export function clientKeyFrom(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  const first = forwarded?.split(",")[0]?.trim();
  return first || headers.get("x-real-ip") || "unknown";
}
