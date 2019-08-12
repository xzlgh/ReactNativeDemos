import { Dimensions, StyleSheet } from 'react-native'

export const client = Dimensions.get('window')

export const clientMargin = 80

// 轮播文字可视区域宽和屏幕高
export const viewClient = {
  width: client.width - clientMargin,
  height: client.height
}

export const CENTER_CONTENT_COLOR = '#F3802C'  // 中间字体颜色
export const ADJACENT_CONTENT_COLOR = '#939393' // 选中内容相邻item字体颜色
export const INTERVAL_CONTENT_COLOR = '#DBDBDB' // 与选中内容的间隔文字的字体颜色

export const DEFAULT_CONTENT_FONT_SIZE = 55 // 默认基础轮播字体大小
export const DEFAULT_ITEM_NUMBER = 5 // 默认的轮播显示个数
export const DEFAULT_ITEM_FIVE_WITH_SCALE = [0.2, 0.2, 0.2]  // 默认5个显示时宽度缩放比,默认宽度为一样
export const DEFAULT_ITEM_CONTENT_COLOR_ARRAY = [CENTER_CONTENT_COLOR, ADJACENT_CONTENT_COLOR, INTERVAL_CONTENT_COLOR] // 默认的文字颜色数组

// styles
export const styles = StyleSheet.create({
  box: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },

  swiper: {
    width: viewClient.width,
    overflow: 'hidden'
  },

  swiperContain: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  touchWrapper: {
    position: 'absolute',
  },

  btnPre: {
    left: 0,
    padding: 5,
    paddingLeft: 20
  },

  btnNext: {
    right: 0,
    padding: 5,
    paddingRight: 20,
  },

  btnImg: {
    width: 20,
    height: 20,
    resizeMode: 'contain'
  },

  btnText: {
    fontSize: 26,
    lineHeight: 30,
    color: '#FF7D37'
  }
})

