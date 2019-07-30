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
const itemWidth = (client.width - 30) / 5

const DEFAULT_ITEM_NUMBER = 5

class SwiperView extends React.Component<Props> {

  // sports = new Animated.Value(0)
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
      index: this.itemHalfNumber + props.showItemNumber,
      data: utils.turnOfData(props.sourceData, props.showItemNumber),
      sports: new Animated.Value(-(this.itemMinWidth * props.showItemNumber))
    }
    // this.sports = new Animated.Value(-(this.itemMinWidth * props.showItemNumber)) // 设置动画初始值
  }

  componentDidMount() {
    // 转换sourceData数据
    // 赋值给state
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
          <Button title="上一页" onPress={this.handlePressPre} />
          <Button title="下一页" onPress={this.handlePressNext} />
        </View>
      </View>
    )
  }

  renderItem = (): JSX.Element[] => {
    let { data, index }: any = this.state
    return data.map((item: Data, ind: number): JSX.Element => {
      // 根据位置设置content的盒模型样式
      let _boxWidth = utils.getBoxStyle(this.itemWidth, ind, index)
      // 根据位置设置文字样式
      let _contentStyle = utils.getCurContentStyle(styles, ind, index)
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
    // 如果跳转到指定的位置，动画到指定的位置
    const { curIndex, index }: any = this.state
    let targetIndex = -1
    // 如果是往前翻
    if (index > clickIndex) {
      // targetIndex = clickIndex - (index - clickIndex)
      this.handlePressPre()

    // 如果是往后翻
    } else if (index < clickIndex) {
      this.handlePressNext()
      // targetIndex = clickIndex + (clickIndex - index)
    }

    // if (targetIndex === -1) return

    // let _value = targetIndex * this.itemMinWidth
    // this.starAnimated({toValue: _value}, () => {
    //   this.handleLoop(curIndex, targetIndex)
    // })
  }

  // 下一个
  handlePressNext = () => {
    const { curIndex, sports }: any = this.state
    const value = -(curIndex * this.itemMinWidth + this.itemMinWidth)

    this.starAnimated({toValue: value}, () => {
      this.handleLoop(curIndex, curIndex + 1)
    })

    // //开始执行动画
    // Animated.timing(sports, {
    //   toValue: value,
    //   duration: 400,
    //   easing: Easing.linear

    // }).start(() => {
    //   // 动画结束后的回调函数
    //   this.handleLoop(curIndex, curIndex + 1)
    // }); 
  }

  // 上一个
  handlePressPre = () => {
    const { curIndex, sports }: any = this.state
    const value = -(curIndex * this.itemMinWidth - this.itemMinWidth)

    this.starAnimated({toValue: value}, () => {
      this.handleLoop(curIndex, curIndex - 1)
    })

    // // 动画效果
    // Animated.timing(sports, {
    //   toValue: value,
    //   duration: 400,
    //   easing: Easing.linear
    // }).start(() => {
    //   // 动画结束后的回调函数
    //   this.handleLoop(curIndex, curIndex - 1)
    // }); 
  }

  // 处理循环单个问题
  handleLoop = (curIndex: number, nextIndex: number) => {
    const { showItemNumber = DEFAULT_ITEM_NUMBER } = this.props
    const { data }: any = this.state
    let targetIndex = -1
    console.log('handleloop: ', curIndex, nextIndex)
    // 如果是往后翻，目标值大于显示数据长度时
    if (curIndex < nextIndex && nextIndex > data.length - showItemNumber - 1) {
      // 获取目标index
      // targetIndex = data.length - showItemNumber
      targetIndex = nextIndex % showItemNumber + showItemNumber
      console.log('111111111111  ',targetIndex)
    }
    
    // 如果是操作往前翻，当目标值小于原始数据的第一个值时
    if (curIndex > nextIndex && nextIndex < showItemNumber + 1) {
      // 获得目标index
      targetIndex = data.length - showItemNumber * 2 + nextIndex
      console.log('2222222222222222   ', targetIndex)
    }

    if (targetIndex === -1) {
      console.log('33333333  ', nextIndex, nextIndex + this.itemHalfNumber, this.itemHalfNumber)
      this.setState({ curIndex: nextIndex, index: nextIndex + this.itemHalfNumber })
      return
    }
    console.log('44444444444  ', targetIndex)
    this.skilpTo(targetIndex)
  }

  // 跳转到目标位置
  skilpTo = (targetIndex: number) => {
    const value = -(targetIndex * this.itemMinWidth)
    this.setState({
      curIndex: targetIndex, 
      index: targetIndex + this.itemHalfNumber,
      sports: new Animated.Value(value)
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

