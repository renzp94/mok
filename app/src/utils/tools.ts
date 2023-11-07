export const asyncFunc = (func: (options?: any) => void) =>
  new Promise<any>((resolve, reject) =>
    func({ success: resolve, fail: reject }),
  )
export const getNow = () => {
  const nowDate = new Date()
  return [nowDate.getFullYear(), nowDate.getMonth() + 1, nowDate.getDate()]
}
