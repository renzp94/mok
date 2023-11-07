import { select } from '@/api/db'
import { HistoryModel } from '@/models/db'
import { getNow } from '@/utils/tools'
import {
  Button,
  Calendar,
  Form,
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
  onConfirm?: (v: HistoryModel) => void
}

const EditPopup = ({ id, onConfirm, ...popupProps }: EditPopupProps) => {
  const [form] = Form.useForm()
  const [year, month, day] = getNow()
  const defaultValues: HistoryModel = {
    type: 'SPENDING',
    year,
    month,
    day,
    money: '',
  }

  const [dateVisible, setDateVisible] = useState(false)
  const [values, setValues] = useState(defaultValues)

  useEffect(() => {
    if (popupProps.visible && id) {
      const [data] = select({ id })
      setValues(data)
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

  const onTimeChange = ([year, month, day]: any) => {
    setValues((v) => ({ ...v, year, month, day }))
  }

  const onAfterClose = () => {
    setValues(defaultValues)
    popupProps?.afterClose?.()
  }

  const onFinish = (formData: HistoryModel) => {
    const payload = {
      ...formData,
      year: Number(values.year),
      month: Number(values.month),
      day: Number(values.day),
      money: values.money,
    }
    if (!payload.money) {
      Taro.showToast({
        title: '请输入金额',
        icon: 'none',
      })

      return
    }

    onConfirm?.(payload)
  }

  return (
    <Popup
      className={styles['edit-popup']}
      round
      destroyOnClose
      afterClose={onAfterClose}
      {...popupProps}
    >
      <Form form={form} onFinish={onFinish} initialValues={values}>
        <View className={styles['edit-popup-header']}>
          <View onClick={popupProps?.onClose}>取消</View>
          <Button
            className={styles['edit-popup-confirm']}
            fill="none"
            formType="submit"
          >
            确定
          </Button>
        </View>
        <View className={styles['edit-popup-body']}>
          <View className={styles.header}>
            <View className={styles['header-row']}>
              <Form.Item name="type">
                <Radio.Group className={styles['radio-group']}>
                  <Radio
                    className={styles.radio}
                    shape="button"
                    value="SPENDING"
                  >
                    支出
                  </Radio>
                  <Radio className={styles.radio} shape="button" value="INCOME">
                    收入
                  </Radio>
                </Radio.Group>
              </Form.Item>
              <Button size="small" onClick={() => setDateVisible(true)}>
                {nowDate}
              </Button>
            </View>
            <View className={styles.money}>
              ¥ <text className={styles['money-text']}>{values.money}</text>
            </View>
            <View className={styles['header-row']}>
              <View style={{ width: 50 }}>备注：</View>
              <Form.Item name="note">
                <Input placeholder="请输入备注(最多输入20字)" maxLength={20} />
              </Form.Item>
            </View>
          </View>
          <NumberKeyboardPanel onClick={onKeyboardClick} />
        </View>
      </Form>
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
