/**
 * author: xiongzilian
 * create_date: 2019-06-26
 */
import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  Dimensions,  
  Easing,
  Animated
} from 'react-native'

import PropTypes from 'prop-types'

const {width, height} = Dimensions.get('window');
const viewHeight = 35

const defaultTime = 2000;


interface Props {
  message: string,
  time?: number,
  position?: string,
  onDismiss: Function
}

class ToastView extends React.Component<Props> {
  moveAnim = new Animated.Value(height / 12);
  opacityAnim = new Animated.Value(0);
  dismissHandler: any = null;

  constructor(props: any) {
    super(props);
    this.state = {
      message: props.message != undefined ? props.message : '',
      time: props.time !== undefined ? props.time*1000 : defaultTime
    }
  }

  // 因componentWillReceiveProps钩子函数被移除,暂时使用此钩子函数代替,后期如果想到好的处理方式,可做调整
  shouldComponentUpdate(nextProps: any, nextState: any) {
    if (nextProps.message !== this.props.message) {
      this.setState({
        message: nextProps.message != undefined ? nextProps.message : '',
        time: nextProps.time !== undefined ? nextProps.time*1000 : defaultTime
      })
      clearTimeout(this.dismissHandler)
      this.timingDismiss()
    }
    return true
  }

  render() {
    const {message}: any = this.state
    return (
      <View style={styles.container} pointerEvents='none'>
        <Animated.View 
          style={[styles.textContainer, {bottom: this.moveAnim, opacity: this.opacityAnim}]}>
          <Text style={styles.defaultText}>{message}</Text>
        </Animated.View>
      </View>
    )
  }

  componentDidMount() {
    // 开始动画
    Animated.timing(
      this.moveAnim,
      {
        toValue: height/8,
        duration: 80,
        easing: Easing.ease
      }
    ).start(this.timingDismiss);
    Animated.timing(
      this.opacityAnim,
      {
        toValue: 1,
        duration: 100,
        easing: Easing.linear
      }
    ).start();
  }

  componentWillUnmount() {
    clearTimeout(this.dismissHandler)
  }

  timingDismiss = () => {
    const {time}: any = this.state
    this.dismissHandler = setTimeout(() => {
      this.dismiss()
    }, time)
  }

  dismiss = () => {
    Animated.timing(
      this.opacityAnim,
      {
        toValue: 0,
        duration: 100,
        easing: Easing.linear
      }
    ).start(this.onDismiss)
  }

  onDismiss = () => {
    if (this.props.onDismiss) {
      this.props.onDismiss()
    }
  }
}

export default ToastView


export const styles = StyleSheet.create({
  textContainer: {
    backgroundColor: 'rgba(0,0,0,.6)',
    borderRadius: 8,
    padding: 10,
    maxWidth: width / 2,
    alignSelf: "flex-end",
  },
  defaultText: {
    color: "#FFF",
    fontSize: 15,
  },
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    flexDirection: "row",
    justifyContent: "center",
  }
})









