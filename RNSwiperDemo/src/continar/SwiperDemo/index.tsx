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
  Data
} from './interface'

import * as utils from './utils'

const client = Dimensions.get('window')
const itemWidth = (client.width - 30) / 5

const DEFAULT_ITEM_NUMBER = 5

class SwiperView extends React.Component<Props> {

  sports = new Animated.Value(0)
  itemWidth = 0 // 初始化一个item的宽度
  itemMinWidth = 0 // 初始化时最小的一个item宽度

  static defaultProps = {
    sourceData: [],
    showItemNumber: DEFAULT_ITEM_NUMBER
  }

  constructor(props: any) {
    super(props)
    this.state = {
      curIndex: props.showItemNumber,
      index: Math.floor(props.showItemNumber / 2) + props.showItemNumber,
      data: utils.turnOfData(props.sourceData, props.showItemNumber)
    }
    this.itemWidth = (client.width - 30) / props.showItemNumber
    this.itemMinWidth = this.itemWidth - Math.floor(props.showItemNumber / 2) * 5
    this.sports = new Animated.Value(-(this.itemMinWidth * props.showItemNumber)) // 设置动画初始值
  }

  componentDidMount() {
    // 转换sourceData数据
    // 赋值给state
  }

  render() {
    return (
      <View style={styles.app}>
        <View style={styles.box}>
          <Animated.View
            style={[styles.swiperContain, { left: this.sports }]}
          >
            {this.renderItem()}
          </Animated.View>
        </View>
        <View style={styles.btnWrapper}>
          {/* <Button title="上一页" onPress={this.handlePressPre} /> */}
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
          <Text style={[styles.itemContent, _contentStyle]}>{item.text}</Text>
        </View>
      )
    })
  }
  
  // 下一个
  handlePressNext = () => {
    const { curIndex, index }: any = this.state
    const { showItemNumber }: any = this.props
    const value = -(curIndex * this.itemMinWidth + this.itemMinWidth)

    //开始执行动画
    Animated.timing(this.sports, {
      toValue: value,
      duration: 700,
      easing: Easing.linear

    }).start(() => {
      // 动画结束后的回调函数
      this.handleLoop(curIndex, curIndex + 1)
      this.setState({ curIndex: curIndex + 1, index: index + 1 })
    }); 
  }

  // // 上一个
  // handlePressPre = () => {
  //   const { curIndex, index }: any = this.state
  //   const { showItemNumber }: any = this.props
  //   const value = -(curIndex * this.itemMinWidth - this.itemMinWidth)

  //   // 动画效果
  //   Animated.timing(this.sports, {
  //     toValue: value,
  //     duration: 700,
  //     easing: Easing.linear
  //   }).start(() => {
  //     // 动画结束后的回调函数
  //     this.handleLoop(curIndex, curIndex - 1)
  //     this.setState({ curIndex: curIndex - 1, index: index - 1 })
  //   }); 
  // }

  // 处理循环单个问题
  handleLoop = (curIndex: number, nextIndex: number) => {
    const { showItemNumber=DEFAULT_ITEM_NUMBER } = this.props
    const { data }: any = this.state
    let targetIndex = -1
    // 如果是上一个当前为原始数据第一个
    if (curIndex > nextIndex && curIndex === showItemNumber + 1 && nextIndex === showItemNumber) {
      // 获取目标index
      targetIndex = data.length - showItemNumber
    }
    
    // 如果是操作下一个，当前原始数据为最后一个
    if (curIndex < nextIndex && curIndex === (data.length - showItemNumber - 1) && nextIndex === (data.length - showItemNumber)) {
      // 获得目标index
      targetIndex = showItemNumber
    }
    if (targetIndex === -1) return
    this.skilpTo(targetIndex)
  }

  // 跳转到目标位置
  skilpTo = (targetIndex: number) => {
    const { showItemNumber = DEFAULT_ITEM_NUMBER } = this.props
    const value = -(targetIndex * this.itemMinWidth - this.itemMinWidth)
    console.log("目标index:", targetIndex, "当前index", '')
    Animated.timing(this.sports, {
      toValue: value,
      duration: 0,
      easing: Easing.linear
    }).start()
    // this.setState({curIndex: targetIndex, index: targetIndex + Math.floor(showItemNumber / 2)})
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

