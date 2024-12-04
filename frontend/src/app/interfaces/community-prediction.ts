export interface CommunityPrediction {
  username: string;
  stock: string;
  ticker: string;
  startPrice: number;
  currentPrice: number;
  lastUpdate: Date;
  performance: number;
}