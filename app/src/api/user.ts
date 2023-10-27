import storage, { USER_INFO } from '@/utils/storage'

// 存储用户信息
export const setUserInfo = (data) => {
  if (data) {
    storage.set(USER_INFO, data)
  }
}

// 获取用户信息
export const getUserInfo = () => storage.get(USER_INFO)

// 删除用户信息
export const removeUserInfo = () => storage.remove(USER_INFO)


export const login = () => {}