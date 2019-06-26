/**
 * author: xiongzilian
 * create_date: 2019-06-26
 */
import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  AppRegistry
} from 'react-native'

let viewRoot: any = null

class RootView extends React.Component<any> {
  constructor(props: any) {
    super(props)
    viewRoot = this
    this.state = {
      view: null,
    }
  }

  render() {
    const { view }: any = this.state
    return (
      <View 
        style={styles.rootView} 
        pointerEvents="box-none" // 发生在本组件显示范围内（但不是子组件显示范围内）的事件交给本组件,在子组件显示范围内交给子组件处理。
      >
        {view}
      </View>
    )
  }

  static setView = (view: JSX.Element) => {
    viewRoot.setState({view: view})
  }
}

export const styles = StyleSheet.create({
  // 蒙层设置
  rootView: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    flexDirection: "row",
    justifyContent: "center",
  } 
})










