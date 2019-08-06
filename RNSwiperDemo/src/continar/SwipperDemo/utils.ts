import { Data } from './interface'
import {
  client,
  viewClient,
  clientMargin
} from './config'


//#region  ============================== 业务逻辑函数 ===============================

/**
 * 获取当前点击元素到屏幕左侧的元素序号
 * @param pageX 当前点击的点距离根节点的X轴距离
 * @param showNumber 屏幕显示的轮播元素个数
 * @param scaleArr 元素缩放比： [中间，相邻，间隔1，间隔2,...]
 */
export const getStepToLeft = (pageX: number, showNumber: number, scaleArr: number[]) => {
  // 屏幕宽度中线的x坐标值
  const centerX = client.width / 2
  // 显示内容中间值的元素序号
  const centerIndex = Math.floor(showNumber / 2)
  let _x = 0
  for(let i = 0; i < showNumber; i++) {
    _x += scaleArr[Math.abs(centerIndex - i)] * viewClient.width
    if ((_x + clientMargin / 2) > pageX) return i+1
  }
  return 0
}

/**
 * 将数据转换成轮播所需要的数组数据
 * @param data 渲染数据数组
 * @param showNumber 可视的item数量
 * @returns Arrary  前后分别增加一个数据，帮助平滑过渡
 */
export const turnOfData = (data: Data[], showNumber: number) => {
  // 校验传入参数，确保正确
  if (!data || data.length <= 0) return []
  let rawLen = data.length
  // let endPaddingLength = showNumber + Math.max(0, showNumber - rawLen)
  let endPaddingLength = 2 * showNumber
  let frontPaddingLength = showNumber
  let result = []
  let revertData = data.slice().reverse()
  // 补前面的值
  for (let i = 0; i < frontPaddingLength; i++) {
    result.unshift(revertData[i % rawLen])
  }
  // 赋值
  for (let i = 0; i < rawLen; i++) {
    result.push(data[i])
  }
  // 补后面的值
  for (let i = 0; i < endPaddingLength; i++) {
    result.push(data[i % rawLen])
  }
  return result
}


//#endregion ============================================================

