import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { ItemTextProps } from '../interface'

export default class ItemText extends React.Component<ItemTextProps> {
  render() {
    const { dataText, centerIndex, mapIndex } = this.props
    let centerDistance = mapIndex - centerIndex
    let boxWidth = this.getWidth(centerDistance)
    let fontSize = this.getFontSize(centerDistance)
    return (
      <View style={[styles.itemBox, {width: boxWidth}]}>
        <Text style={[styles.itemText, {fontSize: fontSize}]}>{dataText}</Text>
      </View>
    )
  }

  // 获取当前item宽度
  getWidth = (centerDistance: number) => {
    const { pageWidth, pageWidthScaleArr } = this.props
    if (!pageWidthScaleArr) return pageWidth
    let _distance = Math.abs(centerDistance)
    return pageWidthScaleArr[_distance] || pageWidthScaleArr[pageWidthScaleArr.length - 1]
  }

  // 获取字体大小
  getFontSize = (centerDistance: number) => {
    const { fontSizeArr } = this.props
    let _distance = Math.abs(centerDistance)
    return fontSizeArr[_distance] || fontSizeArr[fontSizeArr.length - 1]
  }
}

export const styles = StyleSheet.create({
  itemBox: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  itemText: {
    textAlign: 'center',
  }
})

