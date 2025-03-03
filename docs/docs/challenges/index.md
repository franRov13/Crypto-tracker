---
sidebar_position: 4
---

# Challenges & Solutions

During the development of the Crypto Tracker application, we encountered several challenges. This document outlines those challenges and the solutions implemented.

## 1. API Rate Limiting

### Challenge

The CoinGecko API has strict rate limits for free accounts. When users rapidly refreshed data, we hit these limits and received error responses.

### Solution

Implemented a client-side rate limiting system:

```typescript
let lastFetch = 0;
const COOLDOWN_MS = 10000; // 10 seconds
let cachedData: CryptoAsset[] | null = null;

export async function fetchCryptoData(): Promise<CryptoAsset[]> {
  const now = Date.now();
  const timeSinceLastFetch = now - lastFetch;

  // For auto-refreshes, return cached data if within cooldown
  if (timeSinceLastFetch < COOLDOWN_MS) {
    // If we have cached data, return it instead of throwing an error
    if (cachedData) {
      return cachedData;
    }

    // Only throw if we don't have cached data
    throw new Error(`Please wait before refreshing again`);
  }

  // Rest of the function...
}