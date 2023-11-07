import { remove, update } from '@/api/db'
import { HistoryModel } from '@/models/db'
import { plus } from '@renzp/number-correct'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useState } from 'react'
import EditPopup from '../EditPopup'
import HistoryItem, { HistoryItemProps } from '../HistoryItem'
import './index.less'

export interface HistoryItemModel extends HistoryItemProps {
  id: string
}

export type HistoryCardProps = {
  time: string
  data: HistoryModel[]
  onChange?: () => void
}

const HistoryCard = (props: HistoryCardProps) => {
  let income = '0'
  let spending = '0'
  const [editPopupVisible, setEditPopupVisible] = useState(false)
  const [id, setId] = useState<string>()

  for (const item of props.data) {
    if (item.type === 'INCOME') {
      income = plus(income, item.money)
    }

    if (item.type === 'SPENDING') {
      spending = plus(spending, item.money)
    }
  }

  const onEdit = (id: string) => {
    setId(id)
    setEditPopupVisible(true)
  }

  const onConfirm = (values) => {
    update(values)
    setEditPopupVisible(false)
    props?.onChange?.()
  }

  // 删除
  const onRemove = (id) => {
    Taro.showModal({
      content: '此操作将删除该数据，是否继续?',
      success: () => {
        Taro.showLoading()
        try {
          remove(id)
          props?.onChange?.()
        } finally {
          Taro.hideLoading()
        }
      },
    })
  }

  return (
    <View className="history-card">
      <View className="history-card-header">
        <View className="history-card-time">{props?.time}</View>
        <View className="history-card-money">
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
      <View className="history-card-body">
        {props?.data?.map((item) => {
          return (
            <HistoryItem
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
