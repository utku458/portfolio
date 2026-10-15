import { buildLlmsFullTxt } from "@/lib/llms-txt";
import { getLlmsSource, textResponse } from "@/lib/llms-source";

// Route handlers are dynamic by default; this one only reads authored data.
export const dynamic = "force-static";

export function GET(): Response {
  return textResponse(buildLlmsFullTxt(getLlmsSource()));
}
