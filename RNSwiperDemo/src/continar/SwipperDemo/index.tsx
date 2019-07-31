import React from 'react'
import {
  View,
  Text,
  Button,
  Image,
  TouchableOpacity,
  Easing,
  Animated,
  StyleSheet,
  Dimensions,
  PanResponder
} from 'react-native'

import {
  SwiperProps,
  Data,
  StartAnimatedOptions
} from './interface'

import * as config from './config'
import * as utils from './utils'

import ItemView from './Components/ItemView'

const styles = config.styles

class SwiperView extends React.Component<SwiperProps> {

  static defaultProps = {
    defaultIndex: 0,
    sourceData: [],
    showItemNumber: config.DEFAULT_ITEM_NUMBER
  }

  constructor(props: any) {
    super(props)

    this.state = {
      curIndex: props.showItemNumber + props.defaultIndex,
      data: utils.turnOfData(props.sourceData, props.showItemNumber),
      sports: new Animated.Value(-(this.minItemWidth * props.showItemNumber))
    }
  }

  // 获取指定索引的文字字体大小
  getItemContentFontSize = (index: number): number => {
    const scales = this.getItemScaleArr
    return (scales[index] || scales[scales.length - 1]) * config.DEFAULT_CONTENT_FONT_SIZE
  }

  // 获取可视的多个轮播宽度缩放比
  get getItemScaleArr(): number[] {
    const { widthScale } = this.props
    return widthScale || config.DEFAULT_ITEM_FIVE_WITH_SCALE
  }

  // get 最小的item宽度
  get minItemWidth() {
    return this.getItemScaleArr[this.getItemScaleArr.length - 1] * config.viewClient.width
    // return this.getItemWidth(-1)
  }

  // get 可视轮播中间内容的索引
  get centerIndex() {
    let { curIndex }: any = this.state
    let { showItemNumber }: any = this.props
    return curIndex + Math.floor(showItemNumber / 2)
  }

  render() {
    const { sports }: any = this.state
    return (
      <View style={styles.app}>
        <View style={styles.box}>
          <Animated.View style={[styles.swiperContain, { left: sports }]}>
            {this.renderItem()}
          </Animated.View>
        </View>
        <View style={styles.btnWrapper}>
          <Button title="上一页" onPress={() => { this.handlePressPre() }} />
          <Button title="下一页" onPress={() => { this.handlePressNext() }} />
        </View>
      </View>
    )
  }

  renderItem = (): JSX.Element[] => {
    let { data }: any = this.state
    return data.map((item: Data, ind: number): JSX.Element => {
      return (
        <ItemView 
          key={ind}
          centerIndex={this.centerIndex}
          index={ind}
          data={item} 
          scalingArr={this.getItemScaleArr} 
          clickItem={this.handleChooseItem}
        />
      )
    })
  }

  // 点击具体值
  handleChooseItem = (clickIndex: number) => {
    // 跳转个数
    const skipTimes = Math.abs(clickIndex - this.centerIndex)
    if (skipTimes === 0) return
    // 是否点右边的
    const isForwer = this.centerIndex < clickIndex
    // 如果是往前翻
    isForwer ? this.handlePressNext(skipTimes) : this.handlePressPre(skipTimes)
  }

  // 下一个
  handlePressNext = (skipTimes: number = 1) => {
    const { curIndex }: any = this.state
    const value = -curIndex * this.minItemWidth - skipTimes * this.minItemWidth

    this.starAnimated({ toValue: value }, () => {
      this.handleLoop(curIndex + skipTimes)
    })
  }

  // 上一个
  handlePressPre = (skipTimes: number = 1) => {
    const { curIndex }: any = this.state
    const value = -curIndex * this.minItemWidth + skipTimes * this.minItemWidth

    this.starAnimated({ toValue: value }, () => {
      this.handleLoop(curIndex - skipTimes)
    })
  }

  // 移动动效
  starAnimated = (options: StartAnimatedOptions, callback: Function) => {
    const { sports }: any = this.state
    Animated.timing(sports, {
      toValue: options.toValue,
      duration: options.duration || 400,
      easing: Easing.linear
    }).start(() => {
      callback()
    })
  }

  // 处理循环边界问题
  handleLoop = (nextIndex: number) => {
    const { showItemNumber = config.DEFAULT_ITEM_NUMBER } = this.props
    const { data, curIndex }: any = this.state

    let targetIndex = -1
    // 如果是往后翻，目标值大于显示数据长度时
    if (curIndex < nextIndex && nextIndex > data.length - showItemNumber - 1) {
      // 获取目标index
      targetIndex = nextIndex % showItemNumber + showItemNumber
    }

    // 如果是操作往前翻，当目标值小于原始数据的第一个值时
    if (curIndex > nextIndex && nextIndex < showItemNumber + 1) {
      // 获得目标index
      targetIndex = data.length - showItemNumber * 2 + nextIndex
    }

    targetIndex === -1 ? this.setState({ curIndex: nextIndex }) : this.skilpTo(targetIndex)
  }

  // 跳转到目标位置
  skilpTo = (targetIndex: number) => {
    const value = -(targetIndex * this.minItemWidth)
    this.setState({
      curIndex: targetIndex,
      sports: new Animated.Value(value)
    })
  }
}

export default SwiperView

