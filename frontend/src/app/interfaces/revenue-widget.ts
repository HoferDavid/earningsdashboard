import { BasicWidget } from './basic-widget';

export interface RevenueWidget extends BasicWidget {
  revenueData: { date: string; value: number }[];
}
