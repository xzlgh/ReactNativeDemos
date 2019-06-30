import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Dimensions } from 'react-native';

const {height} = Dimensions.get('window')

interface Props {
	text?: string, // loading下方显示的文字内容
	time?: number, // 显示的loading时间  单位：毫秒
}

class Loading extends React.Component<Props> {
	static defaultProps = {
		text: '',
		time: 7000, // 默认loading加载最长时间为7秒
	}

	render() {
		const {text} = this.props
		return (
			<View style={styles.container}>
				<View style={styles.loadingWrapper}>
					<ActivityIndicator 
						size={50}
						color='#FFAB2F'
						style={styles.loading}
					/>
					<Text>{text}</Text>
				</View>
			</View>
		)
	}
}

export default Loading

export const styles = StyleSheet.create({
	container: {
		position: "absolute",
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		flexDirection: "row",
		justifyContent: "center",
	},
	loadingWrapper: {
		top: height / 2 - 30,
		backgroundColor: 'transparent',
	},
	loading: {
		width: 100,
		height: 100
	}
})




