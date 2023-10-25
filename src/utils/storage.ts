import Taro from '@tarojs/taro'

const isUndef = (v: unknown) => v === undefined || v === null

export const USER_INFO = 'MOK_USER_INFO'
export default {
  get: <T = unknown>(key: string): T => {
    const data: string | null = Taro.getStorageSync(key)
    try {
      return data === null ? data : JSON.parse(data)
    } catch {
      return data as T
    }
  },
  set: (key: string, data: unknown): void => {
    if (!isUndef(key) && !isUndef(data)) {
      let payload = data as string

      if (typeof data !== 'string') {
        payload = JSON.stringify(data)
      }

      Taro.setStorageSync(key, payload)
    }
  },
  remove: (key: string): void => Taro.removeStorageSync(key),
}
