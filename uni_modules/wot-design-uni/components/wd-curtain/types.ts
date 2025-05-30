import type { ExtractPropTypes } from 'vue'
import { baseProps, makeBooleanProp, makeNumberProp, makeStringProp } from '../common/props'

export type ClosePosition = 'inset' | 'top' | 'bottom' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'

export const curtainProps = {
  ...baseProps,
  /**
   * 绑定值，展示/关闭幕帘
   */
  value: makeBooleanProp(false),
  /**
   * 关闭按钮位置，可选值：inset / top / bottom / top-left / top-right / bottom-left / bottom-right
   */
  closePosition: makeStringProp<ClosePosition>('inset'),
  /**
   * 幕帘图片地址，必须使用网络地址
   */
  src: String,
  /**
   * 幕帘图片点击链接
   */
  to: String,
  /**
   * 幕帘图片宽度
   */
  width: Number,
  /**
   * 点击遮罩是否关闭
   */
  closeOnClickModal: makeBooleanProp(false),
  /**
   * 是否当关闭时将弹出层隐藏（display: none)
   */
  hideWhenClose: makeBooleanProp(true),
  /**
   * 设置层级
   * 类型：number
   * 默认值：10
   */
  zIndex: makeNumberProp(10),
  /**
   * 自定义关闭按钮的类名
   * 类型：string
   * 默认值：''
   */
  customCloseClass: makeStringProp(''),
  /**
   * 自定义关闭按钮的样式
   * 类型：string
   * 默认值：''
   */
  customCloseStyle: makeStringProp('')
}

export type CurtainProps = ExtractPropTypes<typeof curtainProps>
