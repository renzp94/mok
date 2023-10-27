import storage, { TOKEN } from '@/utils/storage'
import { asyncFunc } from '@/utils/tools'
import Taro from '@tarojs/taro'

const DOMAIN =
  process.env.NODE_ENV === 'development' ? 'http://localhost:4000' : ''

const BASE_URL = '/api/app'

const _request = <T = any>(options: any): Promise<ResponseBody<T>> => {
  return asyncFunc(({ success, fail }) => {
    const token = storage.get(TOKEN)

    Taro.request({
      ...options,
      header: {
        Authorization: `Bearer ${token}`,
        ...options.header,
      },
      url: `${DOMAIN}${BASE_URL}${options.url}`,
      success(result) {
        if (result.statusCode !== 200) {
          if (result.statusCode === 401) {
            Taro.reLaunch({
              url: '/pages/welcome/index',
            })
            return
          }

          Taro.showToast({
            title: result.data.msg,
            icon: 'none',
          })
          fail(result.data)
        } else if (result.data.code === 1) {
          Taro.showToast({
            title: result.data.msg,
            icon: 'none',
          })
          fail(result.data)
        } else {
          success(result.data)
        }
      },
      fail,
    })
  })
}

const request = {
  get: <T>(url: string, data?: any) =>
    _request<T>({ method: 'GET', url, data }),
  post: <T>(url: string, data?: any) =>
    _request<T>({ method: 'POST', url, data }),
  delete: <T>(url: string, data?: any) =>
    _request<T>({ method: 'DELETE', url, data }),
  put: <T>(url: string, data?: any) =>
    _request<T>({ method: 'PUT', url, data }),
}

export default request

export interface ResponseBody<T> {
  code: number
  data: T
  msg: string
}
