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

class SwiperView extends React.Component<Props> {
  
  sports = new Animated.Value(0)
  itemWidth = 0 // 初始化一个item的宽度

  static defaultProps = {
    sourceData: [],
    showItemNumber: 5
  }

  constructor(props: any) {
    super(props)
    this.state = {
      curIndex: 1,
      data: utils.turnOfData(props.sourceData, props.showItemNumber)
    }
    this.itemWidth = (client.width - 30) / props.showItemNumber
    this.sports = new Animated.Value(-itemWidth) // 设置动画初始值
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
            style={[styles.swiperContain, {left: this.sports}]}
          >
            {/* {this.props.children} */}
            {this.renderItem()}
          </Animated.View>
        </View>
        <View style={styles.btnWrapper}>
            <Button title="上一页" onPress={this.handlePressPre}/>
            <Button title="下一页" onPress={this.handlePressNext}/>
          </View>
      </View>
    )
  }

  renderItem = (): JSX.Element[] => {
    let { data, curIndex }:any = this.state
    return data.map((item: Data, index: number): JSX.Element => {
      let isShowRs = index === curIndex
      let curStyle = index === curIndex ? styles.itemChildrenCurrent : {}
      return (
        <View key={index} style={styles.item1}>
          <Text style={[styles.itemChildren, curStyle]}>{item.text}</Text>
          {isShowRs && <Text style={styles.itemChildrenPrefix}>Rs</Text>}
        </View>
      )
    })
  }

  // 上一个
  handlePressPre = () => {
    this.animatedRight()
  }
  // 下一个
  handlePressNext = () => {
    this.animatedLeft()
  }

  // 向左的动画
  animatedLeft = () => {
    const { curIndex }:any = this.state  
    const value = -(curIndex * itemWidth + itemWidth)

    Animated.timing(this.sports, {
      toValue: value,
      easing: Easing.linear
    }).start(); //开始执行动画
    this.setState({curIndex: (curIndex+1)})
  }

  // 向右动画
  animatedRight = () => {
    const { curIndex }:any = this.state  
    const value = -(curIndex * itemWidth - itemWidth)

    Animated.timing(this.sports, {
      toValue: value,
      easing: Easing.linear
    }).start(); //开始执行动画
    this.setState({curIndex: (curIndex-1)})
  }
}

class App extends React.Component {
  render() {
    return (
      <View style={styles.app}>
        <SwiperView>
          <View style={styles.item1}>
            <Text style={styles.itemChildren}>7000</Text>
          </View>
          <View style={styles.item2}>
            <Text style={styles.itemChildren}>3000</Text>
          </View>
          <View style={styles.item1}>
            <Text style={styles.itemChildren}>5000</Text>
          </View>
          <View style={styles.item2}>
            <Text style={styles.itemChildren}>7000</Text>
          </View>
          <View style={styles.item1}>
            <Text style={styles.itemChildren}>3000</Text>
          </View>
          <View style={styles.item2}>
            <Text style={styles.itemChildren}>5000</Text>
          </View>
          <View style={styles.item1}>
            <Text style={styles.itemChildren}>7000</Text>
          </View>
          <View style={styles.item2}>
            <Text style={styles.itemChildren}>3000</Text>
          </View>
        </SwiperView>
      </View>
    )
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

  item1: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'pink',
  },

  item2: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green',
  },

  itemChildren: {
    color: '#939393',
    textAlign: 'center',
  },

  itemChildrenCurrent: {
    color: '#F3802C',
  },

  itemChildrenPrefix: {
    color: '#F3802C',
    textAlign: 'center'
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

