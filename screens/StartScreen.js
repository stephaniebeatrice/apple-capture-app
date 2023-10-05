import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import {
	Image,
	StatusBar,
	StyleSheet,
	View,
	TouchableOpacity,
	Text
} from 'react-native'

export const StartScreen = ({ navigation }) => {
	const handlerPress = () => {
		navigation.navigate('Login')
	}
	return (
		<LinearGradient
			start={{ x: 0, y: 0 }}
			end={{ x: 0, y: 1 }}
			colors={['#a0defb', '#E0F0F8']}
			style={st.ctn}
		>
			<StatusBar barStyle="dark-content" />
			<View style={{ flex: 0.95, justifyContent: 'space-between' }}>
				<View style={{ paddingTop: 80 }}>
					<Image
						source={{
							uri: 'https://img.freepik.com/free-vector/realistic-fresh-red-apple-with-drops_1284-39957.jpg?w=740&t=st=1687298730~exp=1687299330~hmac=94487aa6f1cc75c7b0f67c5f24c0ed8c4d2fbd07e72a4bff6febab86d16767ea'
						}}
						style={{ width: '100%', height: 300 }}
					/>
				</View>
				<View style={{ flex: 1, justifyContent: 'space-between' }}>
					<View
						style={{
							paddingVertical: 30,
							paddingHorizontal: 10,
							fontWeight: '700'
						}}
					>
						<Text style={st.txtHdr}>Welcome</Text>
						<Text style={st.txt}>
							To Moi University app farm management application{' '}
						</Text>
					</View>
					<View style={st.btnCtn}>
						<View style={st.btn}>
							<TouchableOpacity onPress={handlerPress} style={st.buttons}>
								<Text style={st.btnText}>Get started</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</View>
		</LinearGradient>
	)
}
const st = StyleSheet.create({
	ctn: { flex: 1, justifyContent: 'space-between' },
	btnCtn: { paddingHorizontal: 20 },
	btn: { padding: 8 },
	headerContainer: { paddingVertical: 20, paddingHorizontal: 10 },
	header: { fontSize: 16, fontWeight: '500' },
	txtHdr: { paddingVertical: 10, fontSize: 24, textAlign: 'center' },
	txt: { textAlign: 'center' },
	buttons: {
		backgroundColor: '#50C878',
		borderRadius: 10,
		paddingVertical: 10
	},
	btnText: { textAlign: 'center' }
})
