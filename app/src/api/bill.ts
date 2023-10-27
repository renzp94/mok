import type { BillModel } from '@/models/bill'
import request from './request'

/**
 * 添加账单
 * @param data 账单数据
 */
export const addBill = async (data: BillModel) => request.post('/bill', data)

/**
 * 删除账单
 * @param id 账单id
 */
export const removeBill = async (id: string) => request.delete(`/bill/${id}`)

/**
 * 更新账单
 * @param data 账单数据
 */
export const updateBill = async (data: BillModel) => request.put('/bill', data)

export interface GetBillListParams {
  year?: number
  month?: number
}
/**
 * 查询所有账单
 */
export const fetchBillList = async (data: GetBillListParams) =>
  request.get<BillModel[]>('/bills', data)

/**
 * 查询账单详情
 */
export const fetchBillDetails = async (id: string) =>
  request.get<BillModel>(`/bill/${id}`)
