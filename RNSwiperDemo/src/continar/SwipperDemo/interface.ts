export interface Data {
  text?: string
  Img?: File
}

export interface SwiperProps {
  sourceData: Data[], // 展示内容数组
  defaultIndex?: number, // 默认选中的原始数据项
  showItemNumber?: number, // 可见项数量
  widthScale?: number[], // 可见项之间缩放比, [中间, 相邻, 间隔], 需要确保加起来为1
}

export interface StartAnimatedOptions {
  toValue: number,
  duration?: number
}

export interface ItemViewProps {
  centerIndex: number,
  index: number,
  data: Data,
  scalingArr: number[],
  clickItem?: Function
}