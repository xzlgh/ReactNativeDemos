import React from 'react'
import { View, Text, TouchableOpacity, Button, StyleSheet  } from "react-native";
import Toast from '../../Components/Toast'
import SwiperDemo from '../SwiperDemo'

import * as config from './config'


class Home extends React.Component<any> {
  static navigationOptions = {
    headerTitle: 'Home'
  }
  render() {
    return (
      <SwiperDemo
        sourceData={config.dataSource}
      />
    )
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

