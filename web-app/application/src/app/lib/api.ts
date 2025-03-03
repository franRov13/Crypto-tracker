
export type CryptoAsset = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
}

// Track last successful fetch time
let lastFetchTime = 0;
const MIN_FETCH_INTERVAL = 10000; // 10 seconds between refreshes

export async function fetchCryptoData() {
try {
  // Check if we're refreshing too quickly
  const current_time = Date.now();
  if (current_time - lastFetchTime < MIN_FETCH_INTERVAL) {
    throw new Error("Please wait before refreshing again");
  }
  
  // Add cache-busting timestamp parameter
  const response = await fetch(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&_=${current_time}`,
    { 
      cache: 'no-store',
      next: { revalidate: 0 }
    }
  );
  
  if (!response.ok) {
    if (response.status === 429) {
      throw new Error("Rate limit exceeded. Please try again later.");
    }
    throw new Error(`API error: ${response.status}`);
  }
  
  // Update last successful fetch time
  lastFetchTime = current_time;
  return response.json();
} catch (error) {
  console.error("Fetch error:", error);
  throw error;
}
}