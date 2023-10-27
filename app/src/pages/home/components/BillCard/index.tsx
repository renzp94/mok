import { removeBill, updateBill } from '@/api/bill'
import type { BillModel } from '@/models/bill'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useState } from 'react'
import BillItem, { type BillItemProps } from '../BillItem'
import EditPopup from '../EditPopup'
import './index.less'

export interface BillItemModel extends BillItemProps {
  id: string
}

export type HistoryCardProps = {
  time: string
  data: BillModel[]
  onChange?: () => void
}

const HistoryCard = (props: HistoryCardProps) => {
  let income = 0
  let spending = 0
  const [editPopupVisible, setEditPopupVisible] = useState(false)
  const [id, setId] = useState<string>()

  for (const item of props.data) {
    if (item.type === 'INCOME') {
      income += Number(item.money)
    }

    if (item.type === 'SPENDING') {
      spending += Number(item.money)
    }
  }

  const onEdit = (id: string) => {
    setId(id)
    setEditPopupVisible(true)
  }

  const onConfirm = async (values) => {
    setEditPopupVisible(false)
    try {
      Taro.showLoading()
      await updateBill(values)
      props?.onChange?.()
    } finally {
      Taro.hideLoading()
    }
  }

  // 删除
  const onRemove = async (id) => {
    Taro.showModal({
      content: '此操作将删除该数据，是否继续?',
      success: async () => {
        Taro.showLoading()
        try {
          await removeBill(id)
          props?.onChange?.()
        } finally {
          Taro.hideLoading()
        }
      },
    })
  }

  return (
    <View className="bill-card">
      <View className="bill-card-header">
        <View className="bill-card-time">{props?.time}</View>
        <View className="bill-card-money">
          <View className="header-item header-item-income">
            <text className="header-item-tag">收</text>
            <text className="header-item-income">{income}</text>
          </View>
          <View className="header-item">
            <text className="header-item-tag">支</text>
            <text className="header-item-spending">{spending}</text>
          </View>
        </View>
      </View>
      <View className="bill-card-body">
        {props?.data?.map((item) => {
          return (
            <BillItem
              {...item}
              onRemove={() => onRemove(item.id as string)}
              onEdit={() => onEdit(item.id as string)}
            />
          )
        })}
      </View>
      <EditPopup
        id={id}
        visible={editPopupVisible}
        position="bottom"
        onClose={() => setEditPopupVisible(false)}
        onConfirm={onConfirm}
      />
    </View>
  )
}

export default HistoryCard
