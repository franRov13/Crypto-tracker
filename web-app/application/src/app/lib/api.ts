export type Crypto = {
    id: string;
    symbol: string;
    name: string;
    image: string;
    current_price: number;
    price_change_percentage_24h: number;
    market_cap: number;
  }
  
export async function fetchCryptoData(): Promise<Crypto[]> {
  try {
    const response = await fetch(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1'
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch crypto data');
    }
    
    return response.json();
  } catch (error) {
    console.error('Error fetching crypto data:', error);
    throw error;
  }
}