export interface StockData {
  id: string;
  name: string;
  ticker: string;
  url: string;
  revenue?: number[];
  quarter?: string[]; 
}
