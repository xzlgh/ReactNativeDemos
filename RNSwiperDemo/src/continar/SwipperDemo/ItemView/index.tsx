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
    return this.props.centerIndex !== nextProps.centerIndex || this.props.offset !== nextProps.offset
  }

  render() {
    const { data, index, centerIndex } = this.props    
    const centerDistance = index - centerIndex
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
    let _distance = Math.abs(centerDistance)
    let _boxWidth = this.getItemWidth(centerDistance)
    const { offset } = this.props    
    const scales = [0.64, 0.36]
    let scale = (scales[_distance] || scales[scales.length - 1])

    // let size = 0

    // if (offset === 0) {
    //   size = scale * DEFAULT_CONTENT_FONT_SIZE
    // } else {
    //   size = _distance === 0 
    //       ? Math.max(0.36 * DEFAULT_CONTENT_FONT_SIZE, Math.abs(scale * offset * DEFAULT_CONTENT_FONT_SIZE / _boxWidth) )
    //       : Math.min(0.64 * DEFAULT_CONTENT_FONT_SIZE, Math.abs(scale * offset * DEFAULT_CONTENT_FONT_SIZE / _boxWidth))
    // }

    if(_distance === 0) {
      scale -= Math.abs(0.24 * offset / DEFAULT_CONTENT_FONT_SIZE)
      scale = Math.max(0.36, scale)
    } else if ((centerDistance === 1 && offset < 0) || (centerDistance === -1 && offset > 0)) {
      scale += Math.abs(0.24 * offset / DEFAULT_CONTENT_FONT_SIZE)
      scale = Math.min(0.64, scale)
    }

    const size = scale * DEFAULT_CONTENT_FONT_SIZE

    return size
  }

  // 获取组件盒子的文字颜色
  getContentColor = (centerDistance: number): string => {
    let _distance = Math.abs(centerDistance)
    let _arr = DEFAULT_ITEM_CONTENT_COLOR_ARRAY
    return _arr[_distance] || _arr[_arr.length - 1]
  }

  // 获取组件盒子宽度
  getItemWidth = (centerDistance: number): number => {
    let _distance = Math.abs(centerDistance)
    const scales = this.props.scalingArr
    return (scales[_distance] || scales[scales.length - 1]) * viewClient.width
  }
}


export default ItemView

export const styles = StyleSheet.create({
  item: {
    justifyContent: 'center',
    height: 50
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




