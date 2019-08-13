import React from 'react'
/**
 * @author xiongzilian
 * @file 文字横向轮播
 */

import { View, Text, TouchableOpacity, Animated, Dimensions } from 'react-native'
import ItemText from './ItemText'

import {
  getRenderData
} from './utils'
import {
  CarouselProps
} from './interface'
import { styles, defaultFontSizeArr, DEFAULT_CONTENT_NUMBER } from './config'

const viewClien = Dimensions.get('window')

export default class Carousel extends React.Component<CarouselProps> {

  _boxWidth: number=0 // 包裹的盒子宽度
  data: string[] // 源数据转换后的数据

  static defaultProps = {
    currentPage: 1,
    containerAccount: DEFAULT_CONTENT_NUMBER,
    isLoop: true,
    fontSizeArr: defaultFontSizeArr
  }

  constructor(props: any) {
    super(props)
    let font = !props.isLoop ? props.containerAccount : props.containerAccount + Math.floor(props.containerAccount / 2)
    this.data = getRenderData(props.sourceData, props.containerAccount, props.isLoop)
    this.state = {
      currentPage: font + props.currentPage - Math.floor(props.containerAccount / 2), // 当前page索引，最左侧的索引
      leftSports: new Animated.Value(0)
    }
  }

  // 获取中间索引
  get centerIndex() {
    const { currentPage }: any = this.state
    const { containerAccount = DEFAULT_CONTENT_NUMBER } = this.props
    return currentPage + Math.floor(containerAccount / 2)
  }

  // 获取滑动一个item的宽度
  get itemMinWidth() {
    const { pageWidthScaleArr, containerAccount = DEFAULT_CONTENT_NUMBER } = this.props
    let _width = !pageWidthScaleArr ? (viewClien.width / containerAccount) : (viewClien.width * pageWidthScaleArr[pageWidthScaleArr.length - 1])
    return _width || 0
  }

  componentDidMount() {
    const { currentPage, leftSports }: any = this.state
    let _value = -currentPage * this.itemMinWidth
    this.setState({leftSports: new Animated.Value(_value)})
  }

  render() {
    const { boxStyles } = this.props
    const { leftSports }: any = this.state
    return (
      <View style={[styles.carouselBox]} onLayout={({nativeEvent: e}) => {this.getCarouselBox(e)}}>
        <View style={[styles.wrapper, boxStyles, {left: leftSports}]}>{ this.renderItem() }</View>
        <TouchableOpacity style={[styles.controlWrapper, styles.preBtn]}><Text style={styles.btnText}>&lt;</Text></TouchableOpacity>
        <TouchableOpacity style={[styles.controlWrapper, styles.nextBtn]}><Text style={styles.btnText}>&gt;</Text></TouchableOpacity>
      </View>
    )
  }

  renderItem = () => {
    const { fontSizeArr = defaultFontSizeArr, pageWidthScaleArr } = this.props
    return this.data.map((item: string, index: number) => {
      return (
        <ItemText
          key={index}
          mapIndex={index}
          dataText={item}
          centerIndex={this.centerIndex}
          fontSizeArr={fontSizeArr}
          pageWidth={this.itemMinWidth}
          pageWidthScaleArr={pageWidthScaleArr}
        />
      )
    })
  }

  getCarouselBox = (e: any) => {
    this._boxWidth = e.layout.width
  }
}







