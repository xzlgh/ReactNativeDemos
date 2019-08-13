import { StyleSheet } from 'react-native'

export const DEFAULT_CONTENT_NUMBER = 3 // 默认显示个数
export const defaultFontSizeArr = [34, 18] // 默认显示的文字大小

// 样式
export const styles = StyleSheet.create({
  carouselBox: {
    flexDirection: 'row',
    position: 'relative',
    overflow: 'hidden'
  },
  wrapper: {
    flexDirection: "row",
    height: 48
  },
  controlWrapper: {
    zIndex: 99,
    position: 'absolute',
    alignSelf: 'center',
  },
  btnText: {
    fontSize: 32,
    lineHeight: 40,
    fontWeight: '400'
  },
  preBtn: {
    left: 0,
  },
  nextBtn: {
    right: 0
  }
})



