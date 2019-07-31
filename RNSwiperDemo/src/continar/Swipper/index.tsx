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
const viewClient = {
  width: client.width - 80,
  height: client.height
}

const DEFAULT_CONTENT_FONT_SIZE = 94 // 默认按比例最大的字体大小
const DEFAULT_ITEM_NUMBER = 5 // 默认的轮播显示个数
const DEFAULT_ITEM_FIVE_WITH_SCALE = [0.36, 0.2, 0.12]  // 默认5个显示时宽度缩放比

class SwiperView extends React.Component<Props> {

  static defaultProps = {
    sourceData: [],
    showItemNumber: DEFAULT_ITEM_NUMBER
  }

  constructor(props: any) {
    super(props)

    this.state = {
      curIndex: props.showItemNumber,
      data: utils.turnOfData(props.sourceData, props.showItemNumber),
      sports: new Animated.Value(-(this.minItemWidth * props.showItemNumber))
    }
  }

  // 获取样式名称数组
  getItemContentClassNames = (): StyleSheet[] => {
    const _styles:any = styles
    return [_styles.itemCurrentContent, _styles.itemAdjacentContent, _styles.itemIntervalContent]
  }

  // 获取Item文字的样式
  getItemContentStyle = (index: number): StyleSheet => {
    const styleClassNames = this.getItemContentClassNames()
    return styleClassNames[index] || styleClassNames[styleClassNames.length - 1]
  }

  // 获取指定索引的文字字体大小
  getItemContentFontSize = (index: number): number => {
    const scales = this.getItemWidthScale()
    return (scales[index] || scales[scales.length - 1]) * DEFAULT_CONTENT_FONT_SIZE
  }

  // 获取指定索引的Item宽度
  getItemWidth = (index: number): number => {
    const scales = this.getItemWidthScale()
    return (scales[index] || scales[scales.length - 1]) * viewClient.width
  }

  // 获取可视的多个轮播宽度缩放比
  getItemWidthScale = (): number[] => {
    const { widthScale } = this.props
    return widthScale || DEFAULT_ITEM_FIVE_WITH_SCALE
  }

  // get 最小的item宽度
  get minItemWidth() {
    return this.getItemWidth(-1)
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
      const centerDistance = Math.abs(ind - this.centerIndex)
      // 获取样式和宽度
      let _boxWidth = this.getItemWidth(centerDistance)
      let _contentStyle: any = this.getItemContentStyle(centerDistance)
      let _contentFontSize = this.getItemContentFontSize(centerDistance)
      return (
        <View key={ind} style={[styles.item, { width: _boxWidth }]}>
          <Text style={[styles.itemContent, _contentStyle, {fontSize: _contentFontSize}]} onPress={() => { this.handleChooseItem(ind) }}>
            {item.text}
          </Text>
        </View>
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
    const { showItemNumber = DEFAULT_ITEM_NUMBER } = this.props
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

export const styles = StyleSheet.create({
  app: {
    marginTop: 20,
    flex: 1,
    alignItems: 'center',
    position: 'relative',
  },

  box: {
    position: 'relative',
    width: viewClient.width,
    overflow: 'hidden'
  },

  swiperContain: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  item: {
    justifyContent: 'center',
  },

  itemContent: {
    flexWrap: 'nowrap',
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

