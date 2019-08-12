import React from 'react'
/**
 * @author xiongzilian
 * @file 文字横向轮播
 */

import { View } from 'react-native'
import ItemText from './ItemText'

import {
  getRenderData
} from './utils'
import {
  CarouselProps
} from './interface'
import { styles } from './config'


export default class Carousel extends React.Component<CarouselProps> {

  data: string[]

  static defaultProps = {
    currentPage: 1,
    containerAccount: 3,
    isLoop: true
  }

  constructor(props: any) {
    super(props)

    let font = !props.isLoop ? props.containerAccount : props.containerAccount + Math.floor(props.containerAccount / 2)
    this.data = getRenderData(props.sourceData, props.containerAccount, props.isLoop)

    this.state = {
      currentPage: font + props.currentPage - Math.floor(props.containerAccount / 2)
    }
  }

  render() {
    return (
      <View style={styles.carouselBox}>
        <View style={styles.wrapper}>{ this.renderItem() }</View>
      </View>
    )
  }

  renderItem = () => {
    return this.data.map((item: string, index: number) => {
      return (
        <ItemText 
          dataText={item}
        />
      )
    })
  }
}







