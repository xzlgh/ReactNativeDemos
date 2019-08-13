
// 转换渲染时的数组
export const getRenderData = (sourceData: string[], containerAccount: number, isLoop: boolean): string[] => {
  if (!sourceData || sourceData.length === 0) return []
  let _rawLen = sourceData.length, result = []
  let modelNumber = Math.max(1, Math.ceil((containerAccount - _rawLen) / containerAccount) ) 
  // 获取前后需要补充的元素个数
  let fontPaddingLength = isLoop 
      ? (containerAccount + Math.floor(containerAccount / 2)) 
      : containerAccount
  let endPaddingLength = isLoop 
      ? (modelNumber + 1) * containerAccount 
      : modelNumber * containerAccount + Math.floor(containerAccount / 2)

  let revertData = sourceData.slice().reverse()
  // 补前面的值
  for (let i = 0; i < fontPaddingLength; i++) {
    result.unshift(revertData[i % _rawLen])
  }
  // 赋值
  for (let i = 0; i < _rawLen; i++) {
    result.push(sourceData[i])
  }
  // 补后面的值
  for (let i = 0; i < endPaddingLength; i++) {
    result.push(sourceData[i % _rawLen])
  }

  return result
}





