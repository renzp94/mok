import { HistoryModel } from '@/models/db'
import storage, { HISTORY } from '@/utils/storage'
import Taro from '@tarojs/taro'

const key = HISTORY

const get = () => {
  let history: HistoryModel[] = []
  try {
    history = storage.get(key) ? storage.get(key) : []
  } catch (error) {
    Taro.showToast({
      title: error.message,
      icon: 'none',
    })
  }

  return history
}

const set = (payload) => {
  try {
    storage.set(key, payload)
  } catch (error) {
    Taro.showToast({
      title: error.message,
      icon: 'none',
    })
  }
}

// 查询
export const select = (where = {}) => {
  const history = get()

  return history.filter((item) =>
    Object.keys(where).every((key) => item[key] === where[key]),
  )
}

// 添加
export const add = (payload) => {
  const history = get()
  history.unshift(payload)
  set(history)
}

// 更新
export const update = (payload) => {
  let history = get()
  history = history.map((item) => (item.id === payload.id ? payload : item))
  set(history)
}

// 删除
export const remove = (id) => {
  let history = get()
  history = history.filter((item) => item.id !== id)
  set(history)
}
