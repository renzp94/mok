import { setUserInfo } from '@/api/user'
import { IconFont } from '@nutui/icons-react-taro'
import { Animate, NoticeBar } from '@nutui/nutui-react-taro'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import styles from './index.module.less'

const Page = () => {
  const onGetUserInfo = async () => {
    try {
      Taro.showLoading()
      const data: any = await new Promise((resolve, reject) => {
        Taro.getUserProfile({
          desc: '用于展示用户信息',
          success: resolve,
          fail: reject,
        })
      })

      if (data?.userInfo) {
        setUserInfo(data?.userInfo)
        Taro.reLaunch({
          url: '/pages/home/index',
        })
      }
    } finally {
      Taro.hideLoading()
    }
  }
  return (
    <View className={styles.page}>
      <NoticeBar
        content="Mok手记不收集任何数据，请勿随意删除以免造成数据丢失。"
        closeable
      />
      <View className={styles.header}>
        <View className={styles.title}>Mok手记</View>
        <View className={styles.description}>记录，让生活更美好</View>
      </View>
      <Animate type="float" loop>
        <View onClick={onGetUserInfo}>
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
