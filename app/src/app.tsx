import { getUserInfo } from '@/api/user'
import Taro, { useLaunch } from '@tarojs/taro'
// 全局样式
import './app.less'

function App(props) {
  useLaunch(() => {
    const userInfo = getUserInfo()

    if (userInfo) {
      Taro.reLaunch({
        url: '/pages/home/index',
      })
    }
  })

  return props.children
}

export default App
