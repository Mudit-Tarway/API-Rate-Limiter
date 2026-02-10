const buckets = new Map();

const MAX_TOKENS = 5;        // Maximum tokens per bucket (burst size)
const REFILL_RATE = 1;       // Tokens added per second
const BUCKET_TIMEOUT = 15 * 60 * 1000; // 15 minutes inactivity cleanup

// Periodic cleanup of inactive buckets to free memory
setInterval(() => {
  const now = Date.now();
  for (const [userId, bucket] of buckets.entries()) {
    if (now - bucket.lastRefill > BUCKET_TIMEOUT) {
      buckets.delete(userId);
    }
  }
}, BUCKET_TIMEOUT);

const rateLimiter = (req, res, next) => {
  const userId = req.ip; // You can switch to API key if needed

  // Initialize bucket if user is new
  if (!buckets.has(userId)) {
    buckets.set(userId, { tokens: MAX_TOKENS, lastRefill: Date.now() });
  }

  const bucket = buckets.get(userId);
  const now = Date.now();
  const elapsed = (now - bucket.lastRefill) / 1000; // seconds elapsed

  // Refill tokens (float for precision)
  bucket.tokens = Math.min(MAX_TOKENS, bucket.tokens + elapsed * REFILL_RATE);
  bucket.lastRefill = now;

  if (bucket.tokens >= 1) {
    bucket.tokens -= 1;
    req.tokensLeft = Math.floor(bucket.tokens); // only floor for display

    // Optional headers for client awareness
    res.setHeader("X-RateLimit-Limit", MAX_TOKENS);
    res.setHeader("X-RateLimit-Remaining", req.tokensLeft);
    res.setHeader("X-RateLimit-Reset", Math.ceil(1 / REFILL_RATE));

    next();
  } else {
    res.status(429).json({ message: "Rate limit exceeded !!" });
  }
};

module.exports = { rateLimiter, buckets };
