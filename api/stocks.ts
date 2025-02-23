// api/stocks.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';

const generateStockData = () => {
  const data = [];
  const startDate = new Date();
  startDate.setFullYear(startDate.getFullYear() - 1);

  // Precio base inicial
  let basePrice = 155;
  
  for (let i = 0; i < 12; i++) {
    const date = new Date(startDate);
    date.setMonth(date.getMonth() + i);
    
    // Generar variación más controlada
    const variation = Math.sin(i / 2) * 5 + (Math.random() - 0.5) * 3;
    const price = basePrice + variation;
    basePrice += (Math.random() - 0.5) * 2; // Tendencia suave
    
    data.push({
      date: date.toISOString().split('T')[0],
      price: parseFloat(price.toFixed(2))
    });
  }

  return data;
};

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') {
    const stockData = generateStockData();
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(stockData);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}