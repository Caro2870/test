// src/types/stock.ts
export interface StockData {
    date: string;
    price: number;
  }
  
  export interface ChartData {
    categories: string[];
    series: {
      name: string;
      data: number[];
    }[];
  }