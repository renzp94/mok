import { add, select } from '@/api/db'
import { useShare } from '@/hooks/share'
import { HistoryModel } from '@/models/db'
import { IconFont } from '@nutui/icons-react-taro'
import { DatePicker, Empty, Sticky } from '@nutui/nutui-react-taro'
import classes from '@renzp/classes'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useEffect, useMemo, useState } from 'react'
import EditPopup from './components/EditPopup'
import HistoryCard from './components/HistoryCard'
import TotalAmount from './components/TotalAmount'
import styles from './index.module.less'

const getNow = (nowDate) => {
  return [nowDate.getFullYear(), nowDate.getMonth() + 1, nowDate.getDate()]
}

const Page = () => {
  const [timeVisible, setTimeVisible] = useState(false)
  const [date, setDate] = useState(new Date())
  const [year, month] = getNow(date)
  const [editPopupVisible, setEditPopupVisible] = useState(false)

  const onConfirm = (_: unknown, value: string[]) => {
    if (value.length) {
      setDate(new Date(value.join('-')))
    }
  }

  const [history, setHistory] = useState<HistoryModel[]>([])
  useEffect(() => getHistory({ year, month }), [year, month])
  const getHistory = (payload?: Partial<HistoryModel>) => {
    setHistory(select(payload))
  }
  const incomeMoney = history
    .filter((item) => item.type === 'INCOME')
    .reduce((prev, curr) => prev + (curr.money as number), 0)

  const spendingMoney = history
    .filter((item) => item.type === 'SPENDING')
    .reduce((prev, curr) => prev + (curr.money as number), 0)

  const money = incomeMoney - spendingMoney

  const historyList = useMemo(() => {
    // 获取时间列表
    const timeList = new Set()
    for (const item of history) {
      const { year, month, day } = item
      const time = `${year}${month}${day}`
      timeList.add(time)
    }

    const timeArray = Array.from(timeList).sort(
      (a: string, b: string) => Number(b) - Number(a),
    )

    const dataSource: any = []
    for (const item of history) {
      const { year, month, day } = item
      const time = `${year}${month}${day}`

      // 查找当前日期所在位置
      const index = timeArray.findIndex((item) => item === time)

      if (dataSource[index]) {
        dataSource[index].history.push(item)
        dataSource[index][
          item.type === 'INCOME' ? 'incomeMoney' : 'spendingMoney'
        ] += item.money
      } else {
        // 若不存在则新建
        dataSource[index] = {
          time: `${month.toString().padStart(2, '0')}月${day
            .toString()
            .padStart(2, '0')}日`,
          incomeMoney: item.type === 'INCOME' ? item.money : 0,
          spendingMoney: item.type === 'SPENDING' ? item.money : 0,
          history: [item],
        }
      }
    }

    return dataSource
  }, [history])

  const validator = (values: HistoryModel) => {
    if (Number(values.money) === 0) {
      Taro.showToast({
        title: '请输入正确的金额',
        icon: 'none',
      })

      return false
    }

    return true
  }

  const onAdd = (values: HistoryModel) => {
    if (validator(values)) {
      const payload = { id: `${Date.now()}`, ...values }
      Taro.showLoading()
      try {
        add(payload)
        getHistory({ year, month })
        setEditPopupVisible(false)
      } finally {
        Taro.hideLoading()
      }
    }
  }

  useShare('/pages/home/index')

  return (
    <>
      <Sticky>
        <View className={styles.header}>
          <View
            className={classes([
              styles['header-time'],
              { [styles['header-time--open']]: timeVisible },
            ])}
            onClick={() => setTimeVisible(true)}
          >
            <View className={styles['header-time-title']}>{year}年</View>
            <View className={styles['header-time-info']}>
              <View className={styles['header-time-month']}>{month}</View>月
            </View>
          </View>
          <View className={styles['header-money']}>
            <TotalAmount
              className={styles['header-money-result']}
              label="结算: "
              money={money}
            />
            <TotalAmount label="收入: " money={incomeMoney} />
            <TotalAmount label="支出: " money={spendingMoney} />
          </View>
        </View>
      </Sticky>
      <View className={styles.history}>
        {history.length > 0 ? (
          historyList.map((item) => (
            <HistoryCard
              time={item.time}
              data={item.history}
              onChange={getHistory}
            />
          ))
        ) : (
          <Empty description="无消费/收入记录" />
        )}
      </View>
      <View
        className={styles['add-btn']}
        onClick={() => setEditPopupVisible(true)}
      >
        <IconFont
          fontClassName="iconfont"
          classPrefix="icon"
          name="plus"
          color="#fff"
          size={32}
        />
      </View>
      <EditPopup
        visible={editPopupVisible}
        position="bottom"
        onClose={() => setEditPopupVisible(false)}
        onConfirm={onAdd}
      />
      <DatePicker
        type="year-month"
        value={date}
        visible={timeVisible}
        onClose={() => setTimeVisible(false)}
        onConfirm={onConfirm}
      />
    </>
  )
}

export default Page
