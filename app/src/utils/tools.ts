export const asyncFunc = (func: (options?: any) => void) =>
  new Promise<any>((resolve, reject) =>
    func({ success: resolve, fail: reject }),
  )
