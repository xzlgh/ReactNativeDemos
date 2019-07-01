import React from 'react';

import RootView from './RootView'
import ToastView from './ToastView'
import LoadingView from './LoadingView'


class Toast {
  // 隐藏Toast
  static hide = () => {
    RootView.setView()
  }

  // 实现定义函数, 提示信息
  static info(msg: string, time?: number, position?: string) {
    RootView.setView(<ToastView 
      message={msg}
      time={time}
      position={position}
      onDismiss={this.hide}
    />)
  };

  // Toast Loading
  static loading(text?:string, time?: number, minTime?: number, maxTime?: number) {
    RootView.setView(<LoadingView 
      text={text}
      time={time}
      onDismiss={this.hide}
    />)
  }
}

export default Toast



