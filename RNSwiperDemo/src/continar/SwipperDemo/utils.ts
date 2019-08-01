import { Data } from './interface'
import {
  DEFAULT_ITEM_FIVE_WITH_SCALE
} from './config'


//#region  ============================== 业务逻辑函数 ===============================
// /**
//  * 获取默认的缩放比
//  * @returns 返回缩放比数组
//  */
// export const getDefaultScale = (): number[] => {
//   return DEFAULT_ITEM_FIVE_WITH_SCALE
// }


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
  let endPaddingLength = showNumber + Math.max(0, showNumber - rawLen)
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


//#region  ============================== 工具类函数 ===============================

// /**
//  * 用数组自身填充数组到指定长度
//  * @param arr 需要填充的数组,数组长度需小于目标长度
//  * @param len 需要满足的长度
//  */
// export const fillArrayForLength = (arr: Data[], oldLength: number, targetLength: number): Data[] => {
//   let _data = arr
//   let _curLength = arr.length

//   if (_curLength > targetLength) return _data

//   if (_curLength < targetLength && oldLength < targetLength - _curLength) {
//     _data = _data.concat(_data)
//     _data = fillArrayForLength(_data, oldLength, targetLength)
//   } else {
//     let j = 0
//     while (targetLength > _data.length) {
//       _data.push(_data[j])
//       j++;
//     }
//   }

//   return _data
// }

//#endregion ============================================================


