import React from 'react';
import { View, Text, Dimensions } from 'react-native';

import EZSwiper from 'react-native-ezswiper';

const width = Dimensions.get('window').width

const dataSource = ['3000', '5000', '7000']

class EZSwiperPage extends React.Component {
  constructor(props: any) {
    super(props)
    this.state = {
      index: 0
    }
  }
  render() {
    const {index}: any = this.state
    return (
      <EZSwiper style={{width: width, height: 200,backgroundColor: 'red', alignItems: 'center', justifyContent: 'center'}}
        dataSource={['0', '1' ,'2','3']}
        width={ width / 5 }
        height={200 }
        index={index}
        ratio={0.9}
        loop={true}
        autoplayTimeout={false}
        renderRow={this.renderRow}
        onPress={this.onPressRow}   
        />
    )
  }

  renderRow = (obj: any) => {
    return (
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <Text>3000</Text>
        <Text>Rs</Text>
      </View>
    )
  }
  onPressRow = () => {}
}

export default EZSwiperPage

