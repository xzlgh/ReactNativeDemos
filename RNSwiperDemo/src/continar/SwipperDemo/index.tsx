import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Easing,
  Animated,
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
  _panResponder: any  // 触摸事件响应者
  startTime: any // 触摸开始时间
  endTime: any // 触摸结束时间

  frontPaddingLength: any // 原始数据往前填充的个数
  data: any[] // 填充转换完后的数据

  static defaultProps = {
    defaultIndex: 0,  // 默认选中的值
    sourceData: [], // 默认的源数据
    showItemNumber: config.DEFAULT_ITEM_NUMBER, // 默认展示的数据条数
    chooseChange: () => {}
  }

  constructor(props: any) {
    super(props);

    let font = props.showItemNumber + Math.floor(props.showItemNumber / 2);

    this.state = {
      moveCenterIndex: -1,
      curIndex: font + props.defaultIndex - 1,
      sports: new Animated.Value(-(this.minItemWidth * props.showItemNumber)),
      offset: 0
    }

    this.frontPaddingLength = font;
    this.data = utils.turnOfData(props.sourceData, props.showItemNumber);
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
    // 创建触摸对象
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
    const { curIndex }:any = this.state
    this.skilpTo(curIndex)
  }

  count = 0
  render() {
    const { sports, curIndex, offset }: any = this.state
    return (
      <View>
        <View>
          <Text >{`count: ${this.count++}`}</Text>
          <Text >{`offset: ${offset}`}</Text>
          <Text >{`curIndex: ${curIndex}`}</Text>
          <Text >{`centerIndex: ${this.centerIndex}`}</Text>
        </View>
        <View style={styles.box}>
          <View style={styles.swiper} {...this._panResponder.panHandlers}>
            <Animated.View style={[styles.swiperContain, { left: sports }]}>
              {this.renderItem()}
            </Animated.View>
          </View>

          <TouchableOpacity
            style={[styles.touchWrapper, styles.btnPre]}
            onPress={() => { 
              this.handlePressBtn(-1) 
            }}
          >
            <Text style={styles.btnText}>&lt;</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.touchWrapper, styles.btnNext]}
            onPress={() => { 
              this.handlePressBtn(1) 
            }}
          >
            <Text style={styles.btnText}>&gt;</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  renderItem = (): JSX.Element[] => {
    let { offset, moveCenterIndex }: any = this.state
    let curCenter = moveCenterIndex !== -1 ? moveCenterIndex : this.centerIndex
    return this.data.map((item: Data, ind: number): JSX.Element => {
      return (
        <ItemView
          offset={offset}
          key={ind}
          centerIndex={curCenter}
          index={ind}
          data={item}
          scalingArr={this.getItemScaleArr}
        />
      )
    })
  }

  // 开始手势操作
  _handlePanResponderGrant = (evt: any, gestureState: any) => {
    this.startTime = evt.nativeEvent.timestamp
  }
  // 手势move事件
  _handlePanResponderMove = (evt:any, gestureState: any) => {
    // 最近一次的移动距离为gestureState.move{X,Y}, 从成为响应者开始时的累计手势移动距离为gestureState.d{x,y}
    const {curIndex}: any = this.state
    let _left = -curIndex * this.minItemWidth + gestureState.dx
    let _stepModal = gestureState.dx % this.minItemWidth
    let _step = gestureState.dx / this.minItemWidth
    let _moveStep = _step > 0 ? Math.floor(_step) : Math.ceil(_step)
    this.moveTo(_left)
    this.setState({offset: _stepModal, moveCenterIndex: this.centerIndex - _moveStep})
  }

  // 触摸操作结束
  _handlePanResponderEnd = (evt: any, gestureState: any) => {

    const { showItemNumber = config.DEFAULT_ITEM_NUMBER, chooseChange = () => {} } = this.props
    const { curIndex }: any = this.state
    let pageX = evt.nativeEvent.pageX, dx = gestureState.dx
    this.endTime = evt.nativeEvent.timestamp

    // 计算滑动数据（步长，动画延续时间）
    let _tounchEndData = this.calcAnimatedOfTouchEnd(dx, showItemNumber)

    // 直接点击某一个值
    if (dx === 0 && Math.abs(Math.round(dx / this.minItemWidth)) === 0) {
      // 获取目标位置到当前curIndex的数据个数
      let _leftStep = utils.getStepToLeft(pageX, showItemNumber, this.getItemScaleArr)
      // 执行点击操作
      this.handleChooseItem(curIndex + _leftStep - 1)
      return
    }

    // 确定选中的内容
    chooseChange(this.data[_tounchEndData.targetIndex + Math.floor(showItemNumber / 2)])
    this.starAnimated(_tounchEndData, () => {
      this.handleLoop(curIndex, _tounchEndData.targetIndex)
    })
  }

  // 计算滑动动画数据
  calcAnimatedOfTouchEnd = (dx: number, showItemNumber: number) => {

    const { curIndex }:any = this.state
    let _duration = 200

    // 计算滑动到的目标位置, 最大滑动的距离为显示的数据个数
    let _step = Math.min(Math.abs(Math.round(dx / this.minItemWidth)), showItemNumber)
    let _targetStep = dx > 0 ? -_step : _step

    // 如果移动的距离为0，即为点击操作
    if (dx !== 0 && _targetStep === 0 && this.endTime - this.startTime < 300) {
      _targetStep = dx > 0 ? -1 : 1
      _duration = 400
    }
    let targetIndex = curIndex + _targetStep

    return {
      targetIndex,
      toValue: -targetIndex * this.minItemWidth,
      duration: _duration
    }
  }

  // 点击具体值
  handleChooseItem = (clickIndex: number) => {
    // 跳转个数
    const skipTimes = Math.abs(clickIndex - this.centerIndex)
    if (skipTimes === 0) return
    // 是否点右边的
    const isForwer = this.centerIndex < clickIndex
    // 如果是往前翻
    isForwer ? this.handlePressBtn(skipTimes) : this.handlePressBtn(-skipTimes)
  }

  // 左右点击按钮: 负值往前翻  为正往后翻  具体值为步长
  handlePressBtn = (skipTimes: number = 0) => {
    const { chooseChange = () => {} } = this.props
    const { curIndex }: any = this.state
    let nextIndex = curIndex + skipTimes
    const value = -(curIndex * this.minItemWidth) - skipTimes * this.minItemWidth

    chooseChange(this.data[this.centerIndex + skipTimes])
    this.starAnimated({ toValue: value, offset: true }, () => {
      this.handleLoop(curIndex, nextIndex)
    })
  }

  // 处理循环边界问题
  handleLoop = (curIndex: number, nextIndex: number) => {
    const { sourceData }: any = this.props
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

    // _targetIndex !== -1 && this.skilpTo(_targetIndex)
    _targetIndex === -1 ? this.setState({curIndex: nextIndex, offset: 0, moveCenterIndex: -1}) : this.skilpTo(_targetIndex)
  }

  // 移动动效
  starAnimated = (options: StartAnimatedOptions, callback: Function) => {
    const { sports, curIndex }: any = this.state

    let curLeft = -curIndex * this.minItemWidth

    Animated.timing(sports, {
      toValue: options.toValue,
      duration: options.duration || 400,
      easing: Easing.linear
    }).start(() => {
      callback()
    })

    options.offset === true && sports.addListener(({value}: any) => {
      let _distance = value - curLeft
      this.setState({offset: _distance, moveCenterIndex: -1})
    })
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
      offset: 0,
      moveCenterIndex: -1,
      curIndex: targetIndex,
      sports: new Animated.Value(value)
    })
  }
}

export default SwiperView

