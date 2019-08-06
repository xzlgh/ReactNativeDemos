/**
 * @author xiongzilian(xiongzilian@mintechai.com)
 * @file 实现轮播中每一项内容的渲染
 */

import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
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

  render() {
    const { data, clickItem = () => {}, index, centerIndex } = this.props
    const centerDistance = Math.abs(index - centerIndex)
    const _boxWidth = this.getItemWidth(centerDistance)
    const _contentColor = this.getContentColor(centerDistance)
    const _contentFontSize = this.getContentFontSize(centerDistance)
    return (
      <View style={[styles.item, {width: _boxWidth}]}>
        <Text style={[styles.itemContent, {color: _contentColor, fontSize: _contentFontSize}]} onPress={() => { clickItem(index) }}>
          {data.text}
        </Text>
      </View>
    )
  }

  // TODO 文字字体大小动画

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




