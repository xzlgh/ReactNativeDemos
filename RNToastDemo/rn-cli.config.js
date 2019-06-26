module.exprots = {
  getTransformModulePath() {
    return require.resolve("react-native-typescript-transformer")
  },
  getSourceExts() {
    return ['ts', 'tsx']
  }
}