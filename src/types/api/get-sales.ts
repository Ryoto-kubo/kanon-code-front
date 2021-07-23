import { SaleTypes } from '@/types/global'

export type SalesTypes = {
  sales: SaleTypes[]
  totalSales: number
  currentTotalSales: number
  status: boolean
  status_code: number
  status_message: string
}
