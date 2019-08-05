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
} from 'react-native';

import {
  SwiperProps,
  Data,
  StartAnimatedOptions
} from './interface'

import * as config from './config'
import * as utils from './utils'

import ItemView from './ItemView'

const styles = config.styles

class SwiperView extends React.Component<SwiperProps> {
  _panResponder: any
  startTime: any
  endTime: any
  static defaultProps = {
    defaultIndex: 1,
    sourceData: [],
    showItemNumber: config.DEFAULT_ITEM_NUMBER
  }

  constructor(props: any) {
    super(props)

    this.state = {
      curIndex: props.showItemNumber - Math.floor(props.showItemNumber / 2) + props.defaultIndex - 1,
      moveLeft: -(props.showItemNumber - Math.floor(props.showItemNumber / 2) + props.defaultIndex - 1) * this.minItemWidth,
      data: utils.turnOfData(props.sourceData, props.showItemNumber),
      sports: new Animated.Value(-(this.minItemWidth * props.showItemNumber))
    }
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

  get currentLeft() {
    let {curIndex}: any = this.state
    return -(curIndex * this.minItemWidth)
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      // 要求成为响应者：
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onShouldBlockNativeResponder: (evt, gestureState) => false,
      // 响应事件
      onPanResponderGrant: this._handlePanResponderGrant,
      onPanResponderMove: this._handlePanResponderMove,
      onPanResponderRelease: this._handlePanResponderEnd,
      onPanResponderTerminate: this._handlePanResponderEnd,
    });
  }

  componentDidMount() {
    const { curIndex }: any = this.state
    this.skilpTo(curIndex)
  }

  render() {
    const { sports }: any = this.state
    return (
      <View style={styles.box} {...this._panResponder.panHandlers}>
        <View style={styles.swiper}>
          <Animated.View style={[styles.swiperContain, { left: sports }]}>
            {this.renderItem()}
          </Animated.View>
        </View>

        <TouchableOpacity
          style={[styles.touchWrapper, styles.btnPre]}
          onPress={() => { 
            // this.handlePressPre() 
          }}
        >
          <Text style={styles.btnText}>&lt;</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.touchWrapper, styles.btnNext]}
          onPress={() => { 
            // this.handlePressNext() 
          }}
        >
          <Text style={styles.btnText}>&gt;</Text>
        </TouchableOpacity>
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
          // clickItem={this.handleChooseItem}
        />
      )
    })
  }

  // 开始手势操作
  _handlePanResponderGrant = (evt: any, gestureState: any) => {
    // 开始手势操作。给用户一些视觉反馈，让他们知道发生了什么事情！
    // gestureState.{x,y} 现在会被设置为0
    
    console.log(gestureState.dx, '_handlePanResponderGrant')    
    this.startTime = evt.nativeEvent.timestamp
  }
  // 手势move事件
  _handlePanResponderMove = (evt:any, gestureState: any) => {
    // 最近一次的移动距离为gestureState.move{X,Y}
    // 从成为响应者开始时的累计手势移动距离为gestureState.d{x,y}

    console.log(gestureState.dx, '_handlePanResponderMove')    
    let _left = this.currentLeft + gestureState.dx
    this.moveTo(_left)
  }
  // 触摸操作结束
  _handlePanResponderEnd = (evt: any, gestureState: any) => {
    // 用户放开了所有的触摸点，且此时视图已经成为了响应者。或者 另一个组件已经成为了新的响应者，所以当前手势将被取消。
    // 一般来说这意味着一个手势操作已经成功完成。
    console.log(gestureState.dx, '_handlePanResponderEnd')
    // 处理curIndex的值
    let x = gestureState.dx
    let _step = Math.max(Math.abs(x / this.minItemWidth), Math.abs(Math.round(x / this.minItemWidth)))
    let _targetIndex = x > 0 ? _step : -_step
    const {curIndex}: any = this.state
    const {showItemNumber=config.DEFAULT_ITEM_NUMBER} = this.props
    console.log(curIndex, _targetIndex, 'touchEnd')
    this.handleChooseItem(curIndex + _targetIndex + Math.floor(showItemNumber / 2))
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
    console.log(curIndex)
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
    const { showItemNumber }: any = this.props
    const { data, curIndex }: any = this.state

    let targetIndex = -1
    // 如果是往后翻，目标值大于显示数据长度时
    if (curIndex < nextIndex && nextIndex > data.length - showItemNumber - 1) {
      // 获取目标index
      // targetIndex = nextIndex - showItemNumber - 1
      targetIndex = 2 * showItemNumber + nextIndex - data.length
    }

    // 如果是操作往前翻，当目标值小于原始数据的第一个值时
    if (curIndex > nextIndex && nextIndex < showItemNumber) {
      // 获得目标index
      // targetIndex = nextIndex + showItemNumber + 1
      targetIndex = data.length - 2 * showItemNumber + nextIndex
    }

    targetIndex === -1 ? this.setState({ curIndex: nextIndex }) : this.skilpTo(targetIndex)
  }

  // move到指定的值
  moveTo = (targetLeft: number) => {
    this.setState({
      // moveLeft: targetLeft,
      sports: new Animated.Value(targetLeft)
    })
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

