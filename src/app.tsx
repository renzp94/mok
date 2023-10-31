import { getUserInfo } from '@/api/user'
import Taro, { useLaunch } from '@tarojs/taro'
// 全局样式
import './app.less'

function App(props) {
  useLaunch(async () => {
    const updateManager = Taro.getUpdateManager()
    const { hasUpdate } = await new Promise<{
      hasUpdate: boolean
    }>((resolve) => updateManager.onCheckForUpdate(resolve))

    if (hasUpdate) {
      Taro.showModal({
        title: '更新提示',
        content: '检测到新版本，是否更新?',
        success: async ({ confirm }) => {
          if (confirm) {
            try {
              Taro.showLoading({ title: '下载中...' })
              await new Promise((resolve, reject) => {
                updateManager.onUpdateReady(resolve)
                updateManager.onUpdateFailed(reject)
              })

              Taro.showModal({
                title: '更新提示',
                content: '新版本已经准备好，是否重启应用？',
                success: function (res) {
                  if (res.confirm) {
                    updateManager.applyUpdate()
                  }
                },
              })
            } catch {
              Taro.showToast({ title: '下载失败，请稍后重试', icon: 'none' })
            } finally {
              Taro.hideLoading()
            }
          }
        },
      })
    } else {
      const userInfo = getUserInfo()

      if (userInfo) {
        Taro.reLaunch({
          url: '/pages/home/index',
        })
      }
    }
  })

  return props.children
}

export default App
