import { BILL_TYPE, type BillModel } from '@/models/bill'
import { IconFont } from '@nutui/icons-react-taro'
import { Button, Swipe } from '@nutui/nutui-react-taro'
import type { SwipeInstance } from '@nutui/nutui-react-taro/dist/types/packages/swipe/swipe.taro'
import { View } from '@tarojs/components'
import { useRef } from 'react'
import './index.less'

export interface BillItemProps extends BillModel {
  onEdit?: () => void
  onRemove?: () => void
}

const BillItem = (props: BillItemProps) => {
  const swipeRef = useRef<SwipeInstance>(null)
  const isIncome = props?.type === BILL_TYPE.INCOME
  const color = isIncome ? '#00c48c' : '#ffc245'
  const symbol = isIncome ? '+' : '-'

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
      className="bill-item-swipe"
      rightAction={rightAction}
      onActionClick={() => swipeRef.current?.close?.()}
    >
      <View className="bill-item">
        <IconFont
          className="bill-item-icon"
          fontClassName="iconfont"
          classPrefix="icon"
          name="money"
          color={color}
          size={16}
        />
        <View className="bill-item-title">{props?.note}</View>
        <View className="bill-item-money" style={{ color }}>
          <text className="bill-item-symbol">{symbol}</text>
          <text>{props.money}</text>
        </View>
      </View>
    </Swipe>
  )
}

export default BillItem
