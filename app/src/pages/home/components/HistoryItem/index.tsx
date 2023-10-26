import { HistoryModel } from '@/models/db'
import { IconFont } from '@nutui/icons-react-taro'
import { Button, Swipe } from '@nutui/nutui-react-taro'
import type { SwipeInstance } from '@nutui/nutui-react-taro/dist/types/packages/swipe/swipe.taro'
import { View } from '@tarojs/components'
import { useRef } from 'react'
import './index.less'

export interface HistoryItemProps extends HistoryModel {
  onEdit?: () => void
  onRemove?: () => void
}

const HistoryItem = (props: HistoryItemProps) => {
  const swipeRef = useRef<SwipeInstance>(null)
  const color = props?.type === 'INCOME' ? '#00c48c' : '#ffc245'
  const symbol = props?.type === 'INCOME' ? '+' : '-'

  const rightAction = (
    <>
      <Button shape="square" type="info" onClick={props?.onEdit}>
        编辑
      </Button>
      <Button shape="square" type="danger" onClick={props?.onRemove}>
        删除
      </Button>
    </>
  )

  return (
    <Swipe
      ref={swipeRef}
      className="history-item-swipe"
      rightAction={rightAction}
      onActionClick={() => swipeRef.current?.close?.()}
    >
      <View className="history-item">
        <IconFont
          className="history-item-icon"
          fontClassName="iconfont"
          classPrefix="icon"
          name="money"
          color={color}
          size={16}
        />
        <View className="history-item-title">{props?.note}</View>
        <View className="history-item-money" style={{ color }}>
          <text className="history-item-symbol">{symbol}</text>
          <text>{props.money}</text>
        </View>
      </View>
    </Swipe>
  )
}

export default HistoryItem
