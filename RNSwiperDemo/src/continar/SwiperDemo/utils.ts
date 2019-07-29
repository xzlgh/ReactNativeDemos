import { Data } from './interface'

/**
 * 
 * @param arr 需要填充的数组
 * @param len 需要满足的长度
 */
export const fillArrayForLength = (arr: Data[], len: number): Data[] => {
  let _data = arr
  let lenth = _data.length

  if (length >= len) return _data

  if (length < len && length < len - length) {
    _data.concat(_data)
    fillArrayForLength(_data, len)
  }

  let j = 0
  while (length < len) {
    _data.push(_data[j]);
    j++;
  }

  return _data
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
  // 如果待显示的数据不够可视数据量，则按顺序截取数组里面的值
  let _data = data
  let length = _data.length
  let firstItem = _data[0]
  let endItem = _data[length - 1]
  if (length < showNumber) {
    // 填充数组
    _data = fillArrayForLength(_data, length)
  }
  return _data
}



