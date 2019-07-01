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
            title="点我"
            onPress={this.handleClick}
          />
        </View>
        <View style={{margin: 20}}>
          <Button 
            title="再次点击"
            onPress={this.handleClick2}
          />
        </View>
        <View style={{margin: 20}}>
          <Button 
            title="测试事件"
            onPress={this.handleClick3}
          />
        </View>
        <View style={{margin: 20}}>
          <Text>{text + num}</Text>
        </View>
      </View>
    )
  }
  handleClick = () => {
    Toast.show('This is child!', 5)
  }
  handleClick2 = () => {
    Toast.show('第二次点击!', 5)
  }
  handleClick3 = () => {
    const {num}: any = this.state
    this.setState({text: 'test text', num: num})
  }
}





