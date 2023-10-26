import { IconFont } from '@nutui/icons-react-taro'
import { Grid } from '@nutui/nutui-react-taro'
import classes from '@renzp/classes'
import { Button } from '@tarojs/components'
import './index.less'

export interface NumberKeyboardPanelProps {
  onClick?: (v: string) => void
}

const numbers = Array.from({ length: 9 })
  .map((_, i) => `${i + 1}`)
  .concat(['.', '0', 'backspace'])

const NumberKeyboardPanel = (props: NumberKeyboardPanelProps) => {
  return (
    <Grid className="number-keyboard-panel" columns={3}>
      {numbers.map((v) => {
        const isDel = v === 'backspace'
        return (
          <Grid.Item
            className={classes([
              'number-keyboard-panel-item',
              {
                'number-keyboard-panel-tools-item': ['.', 'backspace'].includes(
                  v,
                ),
              },
            ])}
          >
            <Button
              className="number-keyboard-panel-item-btn"
              onClick={() => props?.onClick?.(v)}
            >
              {isDel ? (
                <IconFont
                  className="number-keyboard-panel-del-icon"
                  fontClassName="iconfont"
                  classPrefix="icon"
                  name="delete"
                  color="var(--nutui-grid-item-text-color, var(--nutui-gray-1, #1a1a1a))"
                  size={24}
                />
              ) : (
                v
              )}
            </Button>
          </Grid.Item>
        )
      })}
    </Grid>
  )
}

export default NumberKeyboardPanel
