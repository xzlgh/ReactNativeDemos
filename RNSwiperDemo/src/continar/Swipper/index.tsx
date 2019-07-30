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
  Props,
  Data,
  StartAnimatedOptions
} from './interface'

import * as utils from './utils'

const client = Dimensions.get('window')

const DEFAULT_ITEM_NUMBER = 5

class SwiperView extends React.Component<Props> {

  itemHalfNumber = 0 // 可显示内容的数量
  itemWidth = 0 // 初始化一个item的宽度
  itemMinWidth = 0 // 初始化时最小的一个item宽度

  static defaultProps = {
    sourceData: [],
    showItemNumber: DEFAULT_ITEM_NUMBER
  }

  constructor(props: any) {
    super(props)
    this.itemHalfNumber = Math.floor(props.showItemNumber / 2)
    this.itemWidth = (client.width - 30) / props.showItemNumber
    this.itemMinWidth = this.itemWidth - this.itemHalfNumber * 5

    this.state = {
      curIndex: props.showItemNumber,
      data: utils.turnOfData(props.sourceData, props.showItemNumber),
      sports: new Animated.Value(-(this.itemMinWidth * props.showItemNumber))
    }
  }

  get centerIndex() {
    let { curIndex }: any = this.state
    return curIndex + this.itemHalfNumber
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
          <Button title="上一页" onPress={this.handlePressPre()} />
          <Button title="下一页" onPress={this.handlePressNext()} />
        </View>
      </View>
    )
  }

  renderItem = (): JSX.Element[] => {
    let { data }: any = this.state
    return data.map((item: Data, ind: number): JSX.Element => {
      // 根据位置设置content的盒模型样式
      let _boxWidth = utils.getBoxStyle(this.itemWidth, ind, this.centerIndex)
      // 根据位置设置文字样式
      let _contentStyle = utils.getCurContentStyle(styles, ind, this.centerIndex)
      return (
        <View key={ind} style={[styles.item, { width: _boxWidth }]}>
          <Text style={[styles.itemContent, _contentStyle]} onPress={this.handleChooseItem(ind)}>
            {item.text}
          </Text>
        </View>
      )
    })
  }
  
  // 点击具体值
  handleChooseItem = (clickIndex: number) => () => {
    // 跳转个数
    const skipTimes = Math.abs(clickIndex - this.centerIndex)
    if(skipTimes === 0) return
    // 是否点右边的
    const isForwer = this.centerIndex < clickIndex
    // 如果是往前翻
    ;(isForwer ? this.handlePressNext(skipTimes) : this.handlePressPre(skipTimes))()
  }

  // 下一个
  handlePressNext = (skipTimes: number = 1) => () => {
    const { curIndex }: any = this.state
    const value = -curIndex * this.itemMinWidth - skipTimes * this.itemMinWidth

    this.starAnimated({toValue: value}, () => {
      this.handleLoop(curIndex, curIndex + skipTimes)
    })
  }

  // 上一个
  handlePressPre = (skipTimes: number = 1) => () => {
    const { curIndex }: any = this.state
    const value = -curIndex * this.itemMinWidth + skipTimes * this.itemMinWidth

    this.starAnimated({toValue: value}, () => {
      this.handleLoop(curIndex, curIndex - skipTimes)
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

  // 处理循环单个问题
  handleLoop = (curIndex: number, nextIndex: number) => {
    const { showItemNumber = DEFAULT_ITEM_NUMBER } = this.props
    const { data }: any = this.state
    let targetIndex = -1
    // 如果是往后翻，目标值大于显示数据长度时
    if (curIndex < nextIndex && nextIndex > data.length - showItemNumber - 1) {
      // 获取目标index
      // targetIndex = data.length - showItemNumber
      targetIndex = nextIndex % showItemNumber + showItemNumber
    }
    
    // 如果是操作往前翻，当目标值小于原始数据的第一个值时
    if (curIndex > nextIndex && nextIndex < showItemNumber + 1) {
      // 获得目标index
      targetIndex = data.length - showItemNumber * 2 + nextIndex
    }

    if (targetIndex === -1) {
      this.setState({ curIndex: nextIndex })
      return
    }
    this.skilpTo(targetIndex)
  }

  // 跳转到目标位置
  skilpTo = (targetIndex: number) => {
    const value = -(targetIndex * this.itemMinWidth)
    this.setState({
      curIndex: targetIndex, 
      sports: new Animated.Value(value)
    })
  }
}

export default SwiperView

export const styles = StyleSheet.create({
  app: {
    marginTop: 20,
    flex: 1,
    alignItems: 'center',
    position: 'relative',
  },

  box: {
    position: 'relative',
    width: client.width - 30,
    overflow: 'hidden'
  },

  swiperContain: {
    flexDirection: 'row',
  },

  item: {
    justifyContent: 'center',
  },

  itemContent: {
    flexWrap:'nowrap',
    textAlign: 'center',
    color: '#DBDBDB',
    fontSize: 10,   
    fontWeight: '500',     
    fontFamily: 'SourceHanSansCN-Medium',
  },

  itemCurrentContent: {
    color: '#F3802C',
    fontSize: 34,
  },

  itemAdjacentContent: {
    color: '#939393',
    fontSize: 18,
  },

  itemIntervalContent: {
    color: '#DBDBDB',
    fontSize: 10,
  },

  btnWrapper: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 80,
    width: '100%',

  }
})

