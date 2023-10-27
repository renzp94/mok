import { fetchBillDetails } from '@/api/bill'
import { BILL_TYPE, type BillModel } from '@/models/bill'
import {
  Button,
  Calendar,
  Input,
  Popup,
  PopupProps,
  Radio,
} from '@nutui/nutui-react-taro'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useEffect, useState } from 'react'
import NumberKeyboardPanel from '../NumberKeyboardPanel'
import styles from './index.module.less'

export interface EditPopupProps extends Partial<PopupProps> {
  id?: string
  onConfirm?: (v: BillModel) => void
}

const getNow = () => {
  const nowDate = new Date()
  return [nowDate.getFullYear(), nowDate.getMonth() + 1, nowDate.getDate()]
}

const EditPopup = ({ id, onConfirm, ...popupProps }: EditPopupProps) => {
  const [year, month, day] = getNow()
  const defaultValues: BillModel = {
    type: BILL_TYPE.INCOME,
    year,
    month,
    day,
    money: '',
  }

  const [dateVisible, setDateVisible] = useState(false)
  const [values, setValues] = useState(defaultValues)

  useEffect(() => {
    if (popupProps.visible && id) {
      const getDetails = async () => {
        try {
          Taro.showLoading()
          const { data } = await fetchBillDetails(id)
          setValues({ ...data, money: data.money.toString() })
        } finally {
          Taro.hideLoading()
        }
      }
      getDetails()
    }
  }, [popupProps.visible, id])

  const nowDate = `${values.year}/${values.month}/${values.day}`

  const onKeyboardClick = (v: string) => {
    const money = values.money.toString()

    switch (v) {
      case '.':
        if (money.length < 20 && !money.includes('.') && money.length > 0) {
          values.money += v
        }
        break
      case 'backspace':
        if (money.length) {
          values.money = money.substring(0, money.length - 1)
        }
        break
      default:
        if (money.length < 20) {
          values.money += v
        }
    }

    setValues({ ...values })
  }

  const onNoteChange = (note: string) => {
    setValues((v) => ({ ...v, note }))
  }

  const onTypeChange = (type: BILL_TYPE) => {
    setValues((v) => ({ ...v, type }))
  }
  const onTimeChange = ([year, month, day]: any) => {
    setValues((v) => ({ ...v, year, month, day }))
  }

  const onAfterClose = () => {
    setValues(defaultValues)
    popupProps?.afterClose?.()
  }

  const onSubmit = () => {
    if (!values.money) {
      Taro.showToast({
        title: '请输入金额',
        icon: 'none',
      })

      return
    }

    values.year = Number(values.year)
    values.month = Number(values.month)
    values.day = Number(values.day)
    values.money = Number(values.money)

    onConfirm?.(values)
  }

  return (
    <Popup
      className={styles['edit-popup']}
      round
      destroyOnClose
      afterClose={onAfterClose}
      {...popupProps}
    >
      <View className={styles['edit-popup-header']}>
        <View onClick={popupProps?.onClose}>取消</View>
        <View className={styles['edit-popup-confirm']} onClick={onSubmit}>
          确定
        </View>
      </View>
      <View className={styles['edit-popup-body']}>
        <View className={styles.header}>
          <View className={styles['header-row']}>
            <Radio.Group
              value={values.type}
              className={styles['radio-group']}
              onChange={onTypeChange}
            >
              <Radio className={styles.radio} shape="button" value="INCOME">
                收入
              </Radio>
              <Radio className={styles.radio} shape="button" value="SPENDING">
                支出
              </Radio>
            </Radio.Group>
            <Button size="small" onClick={() => setDateVisible(true)}>
              {nowDate}
            </Button>
          </View>
          <View className={styles.money}>
            ¥ <text className={styles['money-text']}>{values.money}</text>
          </View>
          <View className={styles['header-row']}>
            <View>备注：</View>
            <Input
              placeholder="请输入备注(最多输入20字)"
              maxLength={20}
              value={values?.note}
              onChange={onNoteChange}
            />
          </View>
        </View>
        <NumberKeyboardPanel onClick={onKeyboardClick} />
      </View>
      <Calendar
        startDate={`${year}-01-01`}
        showTitle={false}
        visible={dateVisible}
        defaultValue={nowDate}
        onClose={() => setDateVisible(false)}
        onConfirm={onTimeChange}
      />
    </Popup>
  )
}

export default EditPopup
