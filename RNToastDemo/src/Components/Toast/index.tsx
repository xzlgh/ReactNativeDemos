import React from 'react';

import RootView from './RootView'
import ToastView from './ToastView'


class Toast {
  // 实现定义函数
  static show(msg: string, time?: number, position?: string) {
    RootView.setView(<ToastView 
      message={msg}
      time={time}
      position={position}
      onDismiss={() => {
        RootView.setView()
      }}
    />)
  };
}

export default Toast



