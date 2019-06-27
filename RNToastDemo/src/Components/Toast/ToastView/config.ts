import { Dimensions } from 'react-native'

const {height, width} = Dimensions.get('window')

// 位置配置信息
export const posConfigs: any = {
  bottom: {
    styleName: 'posBottom',
    startAnimHeight: 16,
    endAnimHeight: 34
  },
  center: {
    startAnimHeight: height / 2 + 10,
    endAnimHeight: height / 2 - 10
  },
  top: {
    startAnimHeight: 16,
    endAnimHeight: 34
  }
}










