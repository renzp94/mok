export type HistoryType = 'INCOME' | 'SPENDING'
export interface HistoryModel {
  id?: string
  type: HistoryType
  year: number
  month: number
  day: number
  money: string
  note?: string
}
