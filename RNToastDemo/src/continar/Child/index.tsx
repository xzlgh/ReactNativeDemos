import React from 'react'
import {View, Button, Text} from 'react-native'
import Toast from '../../Components/Toast'

export default class Child extends React.Component<any> {

  constructor(props: any) {
    super(props)
    this.state = {
      num: 0,
      text: ''
    }
  }
  render() {
    const {text, num}: any = this.state
    return (
      <View>
        <View style={{margin: 20}}>
          <Button 
            title="验证toast是否可一pointerEvents"
            onPress={this.handleClick4}
          />
        </View>
        <View style={{margin: 20}}>
          <Button 
            title="点我"
            onPress={this.handleClick}
          />
        </View>
        <View style={{margin: 20}}>
          <Button 
            title="显示loading"
            onPress={this.handleClick2}
          />
        </View>
        <View style={{margin: 20}}>
          <Button 
            title="隐藏toast"
            onPress={this.handleClick3}
          />
        </View>
        <View style={{margin: 20}}>
          <Button 
            title="toast success click"
            onPress={this.handleClick5}
          />
        </View>
        <View style={{margin: 20}}>
          <Text>{num}</Text>
        </View>
      </View>
    )
  }
  handleClick = () => {
    Toast.info('This is child!', 4000)
  }
  handleClick2 = () => {
    Toast.loading('', 3000)
    setTimeout(() => {
      console.log("我执行了")
      Toast.info('测试我的Info', 4000)
    }, 2000)
  }
  handleClick3 = () => {
    Toast.hide()
  }
  handleClick4 = () => {
    let {num}: any = this.state
    num++
    this.setState({num: num})
  }
  handleClick5 = () => {
    Toast.success('login', 20000)
  }
}





