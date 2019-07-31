export interface Data {
  text?: string
  Img?: File
}

export interface Props {
  sourceData: Data[], // 展示内容数组
  showItemNumber?: number, // 可见项数量
  widthScale?: number[], // 可见项之间缩放比, [中间, 相邻, 间隔], 需要确保加起来为1
}

export interface StartAnimatedOptions {
  toValue: number,
  duration?: number
}