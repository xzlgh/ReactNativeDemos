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
  frontPaddingLength: any
  static defaultProps = {
    defaultIndex: 0,
    sourceData: [],
    showItemNumber: config.DEFAULT_ITEM_NUMBER
  }

  constructor(props: any) {
    super(props)

    let font = props.showItemNumber + Math.floor(props.showItemNumber / 2);

    this.state = {
      curIndex: font + props.defaultIndex - 1,
      data: utils.turnOfData(props.sourceData, props.showItemNumber),
      sports: new Animated.Value(-(this.minItemWidth * props.showItemNumber))
    }
    this.frontPaddingLength = font
  }

  // 获取可视的多个轮播宽度缩放比
  get getItemScaleArr(): number[] {
    const { widthScale } = this.props
    return widthScale || config.DEFAULT_ITEM_FIVE_WITH_SCALE
  }

  // get 最小的item宽度
  get minItemWidth() {
    return this.getItemScaleArr[this.getItemScaleArr.length - 1] * config.viewClient.width
  }

  // get 可视轮播中间内容的索引
  get centerIndex() {
    let { curIndex }: any = this.state
    let { showItemNumber }: any = this.props
    return curIndex + Math.floor(showItemNumber / 2)
  
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      // 要求成为响应者：
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onShouldBlockNativeResponder: (evt, gestureState) => true,
      // 响应事件
      onPanResponderGrant: this._handlePanResponderGrant,
      onPanResponderMove: this._handlePanResponderMove,
      onPanResponderRelease: this._handlePanResponderEnd,
      onPanResponderTerminate: this._handlePanResponderEnd,
    });
  }

  componentDidMount() {
    // const { showItemNumber, defaultIndex }: any = this.props
    const { curIndex, data }:any = this.state
    this.skilpTo(curIndex)
  }

  render() {
    const { sports }: any = this.state
    return (
      <View style={styles.box}>
        <View style={styles.swiper} {...this._panResponder.panHandlers}>
          <Animated.View style={[styles.swiperContain, { left: sports }]}>
            {this.renderItem()}
          </Animated.View>
        </View>

        <TouchableOpacity
          style={[styles.touchWrapper, styles.btnPre]}
          onPress={() => { 
            this.handlePressPre() 
          }}
        >
          <Text style={styles.btnText}>&lt;</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.touchWrapper, styles.btnNext]}
          onPress={() => { 
            this.handlePressNext() 
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
          clickItem={this.handleChooseItem}
        />
      )
    })
  }

  // 开始手势操作
  _handlePanResponderGrant = (evt: any, gestureState: any) => {
    // 开始手势操作。给用户一些视觉反馈，让他们知道发生了什么事情！
    // gestureState.{x,y} 现在会被设置为0    
    this.startTime = evt.nativeEvent.timestamp
  }
  // 手势move事件
  _handlePanResponderMove = (evt:any, gestureState: any) => {
    // 最近一次的移动距离为gestureState.move{X,Y}
    // 从成为响应者开始时的累计手势移动距离为gestureState.d{x,y}
    const {curIndex}: any = this.state
    let _left = (-curIndex * this.minItemWidth)+ gestureState.dx
    this.moveTo(_left)
  }
  // 触摸操作结束
  _handlePanResponderEnd = (evt: any, gestureState: any) => {
    // 用户放开了所有的触摸点，且此时视图已经成为了响应者。或者 另一个组件已经成为了新的响应者，所以当前手势将被取消。
    // 一般来说这意味着一个手势操作已经成功完成。

    const {showItemNumber=config.DEFAULT_ITEM_NUMBER} = this.props    
    const {curIndex}: any = this.state    
    let x = gestureState.dx
    let pageX = evt.nativeEvent.pageX    

    // 计算滑动到的目标位置, 最大滑动的距离为显示的数据个数    
    let _step = Math.min(Math.abs(Math.round(x / this.minItemWidth)), showItemNumber)
    let _targetStep = x > 0 ? -_step : _step

    
    // 如果滑动目标个数为0，且有点击，检查点击位置
    if (_targetStep === 0) {
      // 获取目标位置到当前curIndex的数据个数
      let _leftStep = utils.getStepToLeft(pageX, showItemNumber, this.getItemScaleArr)
      console.log( curIndex, _leftStep, this.centerIndex, '距离左侧的元素个数值')
      // 执行点击操作
      this.handleChooseItem(curIndex + _leftStep - 1)
      return
    }

    // 滑动到目标位置
    this.starAnimated({
      toValue: -(curIndex + _targetStep) * this.minItemWidth,
      duration: 200
    }, () => {
      // 滑到目标位置后，检查循环边界
      this.handleLoop(curIndex + _targetStep)
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
    const {chooseChange = () => {}} = this.props
    const { curIndex, data }: any = this.state
    const value = -curIndex * this.minItemWidth - skipTimes * this.minItemWidth

    chooseChange(data[this.centerIndex + skipTimes]) 
    this.starAnimated({ toValue: value }, () => {
      this.handleLoop(curIndex + skipTimes)
    })
  }

  // 上一个
  handlePressPre = (skipTimes: number = 1) => {
    const {chooseChange = () => {}} = this.props
    const { curIndex, data }: any = this.state
    const value = -curIndex * this.minItemWidth + skipTimes * this.minItemWidth

    chooseChange(data[this.centerIndex - skipTimes])          
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
    const { sourceData }: any = this.props
    const { curIndex }: any = this.state
    let sourceLength = sourceData.length
    let _targetIndex = -1

    // 往前翻
    if ((nextIndex < curIndex) && (nextIndex < this.frontPaddingLength)) {
      _targetIndex = sourceLength + nextIndex
    }

    // 往后翻
    if ((nextIndex > curIndex) && (nextIndex >= this.frontPaddingLength + sourceLength)) {
      _targetIndex = nextIndex - sourceLength
    } 

    _targetIndex === -1 ? this.setState({curIndex: nextIndex}) : this.skilpTo(_targetIndex)
  }

  // move到指定的值
  moveTo = (targetLeft: number) => {
    this.setState({
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

