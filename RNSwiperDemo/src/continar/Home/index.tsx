import React from 'react'
import { View, Text, TouchableOpacity, Button, StyleSheet, Dimensions, Linking } from "react-native";
import Toast from '../../Components/Toast'
// import Swipper from '../SwipperDemo'
import Carousel from '../Carousel'

import * as config from './config'


class Home extends React.Component<any> {
  static navigationOptions = {
    headerTitle: 'Home'
  }
  render() {
    return (
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <View style={{width: Dimensions.get('window').width - 40}}>
          <Carousel 
            sourceData={config.sourceData}
            boxStyles={{height: 80}}
          />
          <Button title="点我 跳转到mobikwik" onPress={this.linOptertor}/>
        </View>
      </View>
    )
  }
  chooseItem = (value: string) => {
    console.log(value)
  }

  linOptertor = () => {
    
  }
}

export default Home

export const styles = StyleSheet.create({
  box: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  BtnWrapper: {
    marginTop: 40
  },
  btnText: {
    width: 100,
    lineHeight: 34,
    color: '#fff',
    textAlign: 'center',
    backgroundColor: '#841584'
  }
})

