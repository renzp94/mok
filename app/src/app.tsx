import storage, { TOKEN } from '@/utils/storage'
import Taro, { useLaunch } from '@tarojs/taro'
// 全局样式
import './app.less'

function App(props) {
  useLaunch(() => {
    const token = storage.get(TOKEN)

    if (token) {
      Taro.reLaunch({
        url: '/pages/home/index',
      })
    }
  })

  return props.children
}

export default App
