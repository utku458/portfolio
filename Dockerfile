# syntax=docker/dockerfile:1

# Debian slim rather than Alpine: sharp links against libvips, and the glibc
# prebuilds are the ones its maintainers test first. The image is bigger by
# about 40 MB, which is a fair price for not debugging musl binaries at 2am.
FROM node:22-bookworm-slim AS base
ENV PNPM_HOME=/pnpm PATH=$PNPM_HOME:$PATH
RUN corepack enable

# ── Dependencies ────────────────────────────────────────────────────────────
# Its own stage so a change to the source does not re-resolve the lockfile.
FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm install --frozen-lockfile

# ── Build ───────────────────────────────────────────────────────────────────
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# NEXT_PUBLIC_* is inlined into the bundle at build time, not read at runtime.
# If this is missing here, every canonical URL, sitemap entry and OG image URL
# is baked as http://localhost:3000 — the site works and the metadata lies.
ARG NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
ENV NEXT_TELEMETRY_DISABLED=1

RUN pnpm build

# ── Runtime ─────────────────────────────────────────────────────────────────
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
# Bind to every interface: the default localhost would be unreachable from
# outside the container, which looks exactly like a broken deploy.
ENV HOSTNAME=0.0.0.0
# sharp spawns a thread pool and glibc gives each arena its own heap; without
# this a handful of concurrent image requests can hold hundreds of megabytes.
ENV MALLOC_ARENA_MAX=2

RUN groupadd --system --gid 1001 nodejs \
 && useradd --system --uid 1001 --gid nodejs nextjs

# Three copies, all required. `standalone` has the server and its dependencies
# but deliberately omits the other two.
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

USER nextjs
EXPOSE 3000

# Coolify reads this to decide whether a deploy succeeded, so it checks a route
# the app actually renders rather than just whether the process is alive.
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:3000/en').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["node", "server.js"]
