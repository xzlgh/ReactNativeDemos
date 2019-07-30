export interface Data {
  text?: string
  Img?: File,
}

export interface Props {
  sourceData: Data[], // 展示内容数组
  showItemNumber?: number // 可见项数量
}

export interface StartAnimatedOptions {
  toValue: number,
  duration?: number
}