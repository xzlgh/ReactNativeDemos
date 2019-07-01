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
      </View>
    )
  }
  handleClick = () => {
    Toast.info('This is child!', 4)
  }
  handleClick2 = () => {
    Toast.loading()
  }
  handleClick3 = () => {
    Toast.hide()
  }
}





