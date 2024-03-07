export enum BILL_TYPE {
  // 收入
  INCOME = 'INCOME',
  // 支出
  SPENDING = 'SPENDING',
}

// 账单
export interface BillModel {
  id?: string
  type: BILL_TYPE
  year: number
  month: number
  day: number
  money: number | string
  // 备注
  note?: string
}
