import Logo from '@/assets/images/logo.png'
import { useShareAppMessage, useShareTimeline } from '@tarojs/taro'

export const useShare = (path: string, imageUrl?: string) => {
  const shareData = {
    title: '记录，让生活更美好',
    path,
    imageUrl: imageUrl ?? Logo,
  }
  useShareAppMessage(() => shareData)
  useShareTimeline(() => shareData)
}
