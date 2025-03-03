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
      console.log(`Using cached data. Next refresh available in ${Math.ceil((COOLDOWN_MS - timeSinceLastFetch) / 1000)}s`);
      return cachedData;
    }
    
    // Only throw if we don't have cached data
    const remainingTime = Math.ceil((COOLDOWN_MS - timeSinceLastFetch) / 1000);
    throw new Error(`Please wait ${remainingTime}s before refreshing again`);
  }
  
  // Update the timestamp before the fetch
  lastFetch = now;
  
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5&page=1');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    const data = await response.json();
    cachedData = data; // Cache the fresh data
    return data;
  } catch (error) {
    // If there's an error and we have cached data, return it
    if (cachedData) {
      console.log('Fetch failed, using cached data');
      return cachedData;
    }
    
    lastFetch = 0; // Reset the timer on error
    throw error;
  }
}