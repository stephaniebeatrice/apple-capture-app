import { StatusBar } from 'expo-status-bar'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { useState, useLayoutEffect } from 'react'

import IconButton from './components/UI/IconButton'
import { Colors } from './constants/colors'
import AddPlace from './screens/AddPlace'
import AllPlaces from './screens/AllPlaces'
import Map from './screens/Map'
import { Login } from './screens/Login'
import PlaceDetails from './screens/PlaceDetails'
import { SignUp } from './screens/Signup'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { View, StyleSheet } from 'react-native'
import { StartScreen } from './screens/StartScreen'

const Stack = createNativeStackNavigator()

export default function App() {
	const [email, setEmail] = useState('')

	const retrieveData = async () => {
		try {
			const value = await AsyncStorage.getItem('key')
			setEmail(value)
			if (value !== null) {
				console.log('Retrieved data: ', value)
			} else {
				console.log('No data found.', value)
			}
			return value
		} catch (error) {
			console.log('Error retrieving data: ', error)
		}
	}

	useLayoutEffect(() => {
		async function fetchData() {
			const email = await retrieveData()
			setEmail(email)
			console.log(email, 'layou')
		}
		fetchData()
	}, [email])
	console.log(email, 'OUTS')

	return (
		<>
			<StatusBar style="dark" />
			<NavigationContainer>
				<Stack.Navigator
					screenOptions={{
						headerStyle: { backgroundColor: '#50C878' },
						headerTintColor: Colors.gray700,
						contentStyle: { backgroundColor: Colors.gray700 }
					}}
				>
					{!email && (
						<>
							<Stack.Screen
								name="Start"
								component={StartScreen}
								options={({ navigation }) => ({
									title: 'Get Started',
									headerShown: false
									// headerRight: ({ tintColor }) => <IconButton icon="add" size={24} color={tintColor} onPress={() => navigation.navigate("AddPlace")} />,
								})}
							/>
							<Stack.Screen
								name="Login"
								component={Login}
								options={({ navigation }) => ({
									title: 'Login'
									// headerRight: ({ tintColor }) => <IconButton icon="add" size={24} color={tintColor} onPress={() => navigation.navigate("AddPlace")} />,
								})}
							/>
							<Stack.Screen
								name="Signup"
								component={SignUp}
								options={({ navigation }) => ({
									title: 'Sign up'
									// headerRight: ({ tintColor }) => <IconButton icon="add" size={24} color={tintColor} onPress={() => navigation.navigate("AddPlace")} />,
								})}
							/>
						</>
					)}
					<Stack.Screen
						name="AllPlaces"
						component={AllPlaces}
						options={({ navigation }) => ({
							title: 'APPLES',
							initialParams: { email: 'initial params' },
							headerRight: ({ tintColor }) => (
								<View style={styles.circle}>
									<IconButton
										icon="add"
										size={24}
										color={tintColor}
										onPress={() =>
											navigation.navigate('AddPlace', { email: email })
										}
									/>
								</View>
							)
						})}
					/>

					<Stack.Screen
						name="AddPlace"
						component={AddPlace}
						options={{
							title: 'Add a New Place'
						}}
					/>
					<Stack.Screen name="Map" component={Map} />
					<Stack.Screen
						name="PlaceDetails"
						component={PlaceDetails}
						options={{
							title: 'Loading Place...'
						}}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</>
	)
}
const styles = StyleSheet.create({
	circle: {
		width: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: '#e8e6e6',
		justifyContent: 'center',
		alignItems: 'center'
	}
})
