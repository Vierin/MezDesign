const WINDOW_MS = 60 * 60 * 1000;
const MAX_REQUESTS = 3;

type Bucket = number[];

const buckets = new Map<string, Bucket>();

function prune(timestamps: Bucket, now: number) {
  return timestamps.filter((ts) => now - ts < WINDOW_MS);
}

function getRecent(key: string, now = Date.now()) {
  return prune(buckets.get(key) ?? [], now);
}

export function peekRateLimit(key: string): {
  ok: boolean;
  remaining: number;
  retryAfterSec?: number;
} {
  const now = Date.now();
  const recent = getRecent(key, now);

  if (recent.length >= MAX_REQUESTS) {
    const oldest = recent[0] ?? now;
    return {
      ok: false,
      remaining: 0,
      retryAfterSec: Math.max(1, Math.ceil((oldest + WINDOW_MS - now) / 1000)),
    };
  }

  return {
    ok: true,
    remaining: MAX_REQUESTS - recent.length,
  };
}

export function hitRateLimit(key: string) {
  const now = Date.now();
  const recent = getRecent(key, now);
  recent.push(now);
  buckets.set(key, recent);
}

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }

  return (
    request.headers.get("x-real-ip")?.trim() ||
    request.headers.get("cf-connecting-ip")?.trim() ||
    "unknown"
  );
}
