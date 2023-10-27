import Taro from "@tarojs/taro"

const request = (options: any) => {
  Taro.request({...options,success(result) {
      console.log(result)
  },})
}

export const get = () => request({method: "GET"})