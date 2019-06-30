import React from 'react'
import {View, Button} from 'react-native'
import Toast from '../../Components/Toast'

export default class Child extends React.Component<any> {
  render() {
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





