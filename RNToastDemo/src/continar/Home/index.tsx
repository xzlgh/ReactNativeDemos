import React from 'react'
import { View, Text, TouchableOpacity, Button, StyleSheet  } from "react-native";
import Toast from '../../Components/Toast'

class Home extends React.Component<any> {
  static navigationOptions = {
    headerTitle: 'Home'
  }
  render() {
    return (
      <View>
        <Text>This is Home page</Text>
        <View style={styles.box}>
          {/* 点击我 */}
          <TouchableOpacity style={styles.BtnWrapper} onPress={this.ClickBtn}>
            <Text style={styles.btnText}>Toast show</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  ClickBtn = () => {
    Toast.show('测试')
    this.props.navigation.navigate('Child')
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

