import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { ItemTextProps } from '../interface'

export default class ItemText extends React.Component<ItemTextProps> {
  render() {
    const { dataText } = this.props
    return (
      <View style={styles.itemBox}>
        <Text style={[styles.itemText]}>{dataText}</Text>
      </View>
    )
  }
}

export const styles = StyleSheet.create({
  itemBox: {

  },
  itemText: {

  }
})

