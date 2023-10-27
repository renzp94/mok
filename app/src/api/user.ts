import type { UserModel } from '@/models/user'
import request from './request'

/**
 * 微信登录
 * @param code wx.login返回的code
 * @returns 用户信息和token
 */
export const weappLogin = async (code: string) =>
  request.post<{ userInfo: UserModel; token: string }>('/user/weappLogin', {
    code,
  })
