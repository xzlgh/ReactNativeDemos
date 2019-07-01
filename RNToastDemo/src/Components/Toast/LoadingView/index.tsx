import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Dimensions } from 'react-native';

const {height} = Dimensions.get('window')

interface Props {
	text?: string, // loading下方显示的文字内容
	time?: number, // 显示的loading时间  单位：毫秒 使用时可选传
	onDismiss: Function // 隐藏loading  最外层不需要传，已设置好
}

class Loading extends React.Component<Props> {
	_didFocusAction: any
	_willBlurAction: any
	_timer: any

	static defaultProps = {
		text: '',
		time: 7000, // 默认loading加载最长时间为7秒
	}

	componentDidMount() {
		// 如果有时间限定，则指定时间限制
		const {time} = this.props
		if (!time) return
		// 开启定时器前，先清理定时器
		clearTimeout(this._timer)
		this._timer = setTimeout(() => {
			this.onDismiss()
		}, time)
	}

	// 因componentWillReceiveProps钩子函数被移除,暂时使用此钩子函数代替,后期如果想到好的处理方式,可做调整
  shouldComponentUpdate(nextProps: any) {
		const {time} = nextProps
		if (!time) return  false
		// 平滑过渡，接收下一个loading
		clearTimeout(this._timer)
		this._timer = setTimeout(() => {
			this.onDismiss()
		}, time)

    return true
  }

	render() {
		const {text} = this.props
		return (
			<View 
				style={styles.container}				
				pointerEvents="box-only"
			>
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

	componentWillMount() {
		clearTimeout(this._timer)
		this._timer = null
	}

	// 移除loading
	onDismiss = () => {
    if (this.props.onDismiss) {
      this.props.onDismiss()
    }
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




