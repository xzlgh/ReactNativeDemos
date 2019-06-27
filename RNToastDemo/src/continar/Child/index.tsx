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
            title="再次点击"
            onPress={this.handleClick2}
          />
        </View>
      </View>
    )
  }
  handleClick = () => {
    Toast.show('This is child!', 4)
  }
  handleClick2 = () => {
    Toast.show('第二次点击!', 5)
  }
}





