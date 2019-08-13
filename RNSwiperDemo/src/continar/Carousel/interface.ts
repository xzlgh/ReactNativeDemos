// 文字轮播组件接受参数
export interface CarouselProps {
  sourceData: string[], // 数据源
  currentPage?: number, // 当前选中页
  containerAccount?: number, // 可视item数量
  isLoop?: boolean, // 是否循环 
  boxStyles?: any, // box盒子样式
  fontSizeArr?: number[], // 配置的字体大小数组：[中间值，相邻值，相隔值] 
  pageWidthScaleArr?: number[], // 每一页宽度缩放比[中间值，相邻值，间隔值] 
}

// 文字Item组件props
export interface ItemTextProps {
  mapIndex: number, // 当前的item索引号
  dataText: string, // 展示文字
  centerIndex: number, // 选中的下标索引
  fontSizeArr: number[], // 字体大小数组：[中间值，相邻值，相隔值]
  pageWidth: number, // item宽度
  pageWidthScaleArr?: number[], // 每一页宽度缩放比[中间值，相邻值，间隔值]
}







