import { Data } from './interface'

//#region  ============================== 业务逻辑函数 ===============================
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

  if (length < showNumber) {
    // 填充数组
    _data = fillArrayForLength(_data, length, showNumber)
  }

  let firstItems = _data.slice(0, showNumber)
  let endItems = _data.slice(-showNumber)
  _data = [...firstItems, ..._data]
  _data = [..._data, ...endItems]

  return _data
}


//#endregion ============================================================


//#region  ============================== 工具类函数 ===============================

/**
 * 用数组自身填充数组到指定长度
 * @param arr 需要填充的数组,数组长度需小于目标长度
 * @param len 需要满足的长度
 */
export const fillArrayForLength = (arr: Data[], oldLength: number, targetLength: number): Data[] => {
  let _data = arr
  let _curLength = arr.length

  if (_curLength > targetLength) return _data

  if (_curLength < targetLength && oldLength < targetLength - _curLength) {
    _data = _data.concat(_data)
    _data = fillArrayForLength(_data, oldLength, targetLength)
  } else {
    let j = 0
    while (targetLength > _data.length) {
      _data.push(_data[j])
      j++;
    }
  }

  return _data
}

//#endregion ============================================================


