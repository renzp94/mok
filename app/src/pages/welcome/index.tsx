import { weappLogin } from '@/api/user'
import { useShare } from '@/hooks/share'
import storage, { TOKEN, USER_INFO } from '@/utils/storage'
import { asyncFunc } from '@/utils/tools'
import { IconFont } from '@nutui/icons-react-taro'
import { Animate } from '@nutui/nutui-react-taro'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import styles from './index.module.less'

const Page = () => {
  const onLogin = async () => {
    try {
      Taro.showLoading({ title: '登录中..' })
      const { code } = await asyncFunc(Taro.login)
      if (code) {
        const {
          data: { token, userInfo },
        } = await weappLogin(code)

        storage.set(TOKEN, token)
        storage.set(USER_INFO, userInfo)
        Taro.reLaunch({
          url: '/pages/home/index',
        })
      }
    } finally {
      Taro.hideLoading()
    }
  }

  useShare('/pages/welcome/index')

  return (
    <View className={styles.page}>
      <View className={styles.header}>
        <View className={styles.title}>Mok手记</View>
        <View className={styles.description}>记录，让生活更美好</View>
      </View>
      <Animate type="float" loop>
        <View onClick={onLogin}>
          <IconFont
            fontClassName="iconfont"
            classPrefix="icon"
            name="zhiwen"
            color="#fff"
            size={64}
          />
          <View className={styles['start-btn-text']}>开启记账</View>
        </View>
      </Animate>
    </View>
  )
}

export default Page
