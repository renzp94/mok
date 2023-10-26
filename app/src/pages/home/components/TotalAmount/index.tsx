import { AnimatingNumbers } from '@nutui/nutui-react-taro'
import classes from '@renzp/classes'
import { View } from '@tarojs/components'
import './index.less'

export interface TotalAmountProps {
  className?: string
  label?: string
  money: number
}

const TotalAmount = (props: TotalAmountProps) => {
  return (
    <View className={classes(['total-amount', props?.className])}>
      <View className="total-amount-title">{props.label}</View>
      <View className="total-amount-info">
        <AnimatingNumbers.CountUp
          className="total-amount-count-up"
          thousands
          value={props.money.toString()}
        />
      </View>
    </View>
  )
}

export default TotalAmount
