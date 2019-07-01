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

import { posConfigs } from './config'

const {width, height} = Dimensions.get('window');
const viewHeight = 35

const defaultTime = 2000; // 默认toast展示时间

interface Props {
  message: string, // toast提示信息
  time?: number, // toast显示时间
  position?: string, // toast显示时间
  onDismiss: Function
}

class ToastView extends React.Component<Props> {
  moveAnim = new Animated.Value(height);
  opacityAnim = new Animated.Value(0);
  dismissHandler: any = null;

  static defaultProps = {
    time: defaultTime,
    position: 'center'
  }

  constructor(props: any) {
    super(props);
    let _config = posConfigs[props.position]
    this.state = {
      message: props.message != undefined ? props.message : '',
      time: props.time*1000,
      position: props.position,
      posConfig: _config
    }
    this.moveAnim = new Animated.Value(_config.startAnimHeight)
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
    const {message, posConfig, position}: any = this.state
    let _animConfig = position === 'bottom' 
                      ? {bottom: this.moveAnim, opacity: this.opacityAnim}
                      : {top: this.moveAnim, opacity: this.opacityAnim}
    return (
      <View style={styles.container}>
        <Animated.View 
          style={[styles.textContainer, position === 'bottom' && styles[posConfig.styleName], _animConfig]}>
          <Text style={styles.defaultText}>{message}</Text>
        </Animated.View>
      </View>
    )
  }

  componentDidMount() {
    const {posConfig: {endAnimHeight}}: any = this.state
    // 启动动画
    Animated.timing(
      this.moveAnim,
      {
        toValue: endAnimHeight,
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


export const styles: any = StyleSheet.create({
  textContainer: {
    backgroundColor: 'rgba(0,0,0,.6)',
    borderRadius: 8,
    padding: 10,
    maxWidth: width * 0.8,
    alignSelf: 'flex-start'
  },
  posBottom: {
    alignSelf: 'flex-end'
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









