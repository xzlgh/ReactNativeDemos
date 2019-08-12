// 文字轮播组件接受参数
export interface CarouselProps {
  sourceData: string[], // 数据源
  currentPage?: number, // 当前选中页
  containerAccount?: number, // 可视item数量
  isLoop?: boolean, // 是否循环 
}

// 文字Item组件props
export interface ItemTextProps {
  dataText: string, // 展示文字
}
