interface StockData {
    date: string;
    price: number;
  }
  const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://react-admin-dashboard-pied.vercel.app';

  export const stocksApi = {
    getStockData: async (): Promise<StockData[]> => {
      try {
        const response = await fetch(`${BASE_URL}/api/stocks`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error fetching stock data:', error);
        throw error;
      }
    }
  };