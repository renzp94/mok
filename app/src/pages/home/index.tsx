import { addBill, fetchBillList } from '@/api/bill'
import { useShare } from '@/hooks/share'
import { BILL_TYPE, type BillModel } from '@/models/bill'
import { IconFont } from '@nutui/icons-react-taro'
import { DatePicker, Empty, Sticky } from '@nutui/nutui-react-taro'
import classes from '@renzp/classes'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useCallback, useEffect, useMemo, useState } from 'react'
import BillCard from './components/BillCard'
import EditPopup from './components/EditPopup'
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

  const [bills, setBills] = useState<BillModel[]>([])
  const getBills = useCallback(async (year: number, month: number) => {
    const { data } = await fetchBillList({ year, month })
    setBills(data)
  }, [])

  useEffect(() => {
    const getData = async () => {
      try {
        Taro.showLoading()
        await getBills(year, month)
      } finally {
        Taro.hideLoading()
      }
    }

    getData()
  }, [year, month, getBills])

  const incomeMoney = bills
    .filter((item) => item.type === BILL_TYPE.INCOME)
    .reduce((prev, curr) => prev + (curr.money as number), 0)

  const spendingMoney = bills
    .filter((item) => item.type === BILL_TYPE.SPENDING)
    .reduce((prev, curr) => prev + (curr.money as number), 0)

  const money = incomeMoney - spendingMoney

  const billList = useMemo(() => {
    // 获取时间列表
    const timeList = new Set()
    for (const item of bills) {
      const { year, month, day } = item
      const time = `${year}${month}${day}`
      timeList.add(time)
    }

    const timeArray = Array.from(timeList).sort(
      (a: string, b: string) => Number(b) - Number(a),
    )

    const dataSource: any = []
    for (const item of bills) {
      const { year, month, day } = item
      const time = `${year}${month}${day}`

      // 查找当前日期所在位置
      const index = timeArray.findIndex((item) => item === time)

      const isIncome = item.type === BILL_TYPE.INCOME

      if (dataSource[index]) {
        dataSource[index].children.push(item)
        dataSource[index][isIncome ? 'incomeMoney' : 'spendingMoney'] +=
          item.money
      } else {
        // 若不存在则新建
        dataSource[index] = {
          time: `${month.toString().padStart(2, '0')}月${day
            .toString()
            .padStart(2, '0')}日`,
          incomeMoney: isIncome ? item.money : 0,
          spendingMoney: !isIncome ? item.money : 0,
          children: [item],
        }
      }
    }

    return dataSource
  }, [bills])

  const validator = (values: BillModel) => {
    if (Number(values.money) === 0) {
      Taro.showToast({
        title: '请输入正确的金额',
        icon: 'none',
      })

      return false
    }

    return true
  }

  const onAdd = async (values: BillModel) => {
    if (validator(values)) {
      Taro.showLoading()
      try {
        await addBill(values)
        getBills(year, month)
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
      <View className={styles.bill}>
        {billList.length > 0 ? (
          billList.map((item) => (
            <BillCard
              time={item.time}
              data={item.children}
              onChange={() => getBills(year, month)}
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
