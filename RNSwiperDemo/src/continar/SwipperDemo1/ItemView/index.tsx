import React from 'react'
import { View, Text, StyleSheet, Animated } from 'react-native'
import { ItemViewProps } from '../interface'  
import { 
  DEFAULT_ITEM_FIVE_WITH_SCALE,
  DEFAULT_CONTENT_FONT_SIZE,
  DEFAULT_ITEM_CONTENT_COLOR_ARRAY,
  viewClient
} from '../config'

class ItemView extends React.Component<ItemViewProps> {

  static defaultProps = {
    data: {},
    scalingArr: DEFAULT_ITEM_FIVE_WITH_SCALE,
    clickItem: () => {}
  }

  constructor(props: ItemViewProps) {
    super(props)
    this.state = {
      mapIndex: props.index,
      centerIndex: props.centerIndex,
      fontSize: 0
    }
  }

  shouldComponentUpdate(nextProps: any) {
    return this.props.centerIndex !== nextProps.centerIndex
  }

  render() {
    const { data, index, centerIndex } = this.props    
    const centerDistance = Math.abs(index - centerIndex)
    const boxWidth = this.getItemWidth(centerDistance)

    const fontSize = this.geCurFontSize(centerDistance)
    const color = this.getContentColor(centerDistance)

    return (
      <View style={[styles.item, {width: boxWidth}]}>
        <Animated.Text style={[styles.itemContent, {fontSize, color}]}>
          {data.text}
        </Animated.Text>
      </View>
    )
  }

  // TODO 文字字体大小动画
  geCurFontSize = (centerDistance: number=-1) => {
    let _curFontSize = this.getContentFontSize(centerDistance)
    // this.setState({fontSize: _curFontSize})
    return new Animated.Value(_curFontSize)
  }

  // TODO 文字颜色动画

  // 获取组件盒子的字体大小
  getContentFontSize = (centerDistance: number): number => {
    // const scales = this.props.scalingArr
    // TODO 后期修改,作为传递进来的值
    const scales = [0.64, 0.36]
    return (scales[centerDistance] || scales[scales.length - 1]) * DEFAULT_CONTENT_FONT_SIZE
  }

  // 获取组件盒子的文字颜色
  getContentColor = (centerDistance: number): string => {
    let _arr = DEFAULT_ITEM_CONTENT_COLOR_ARRAY
    return _arr[centerDistance] || _arr[_arr.length - 1]
  }

  // 获取组件盒子宽度
  getItemWidth = (centerDistance: number): number => {
    const scales = this.props.scalingArr
    return (scales[centerDistance] || scales[scales.length - 1]) * viewClient.width
  }
}


export default ItemView

export const styles = StyleSheet.create({
  item: {
    justifyContent: 'center'
  },

  itemContent: {
    flexWrap: 'wrap',
    textAlign: 'center',
    color: '#DBDBDB',
    fontSize: 10,
    fontWeight: '500',
    fontFamily: 'SourceHanSansCN-Medium'
  }
})




