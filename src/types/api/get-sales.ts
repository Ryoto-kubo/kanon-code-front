import { SaleTypes } from '@/types/global';

export type SalesTypes = {
  sales: SaleTypes[];
  totalSales: number;
  currentTotalSales: number;
  confirmedSales: number;
  labels: string[];
  salesList: number[];
  backGrounds: string[];
  status: boolean;
  status_code: number;
  status_message: string;
};
