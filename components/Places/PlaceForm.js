import { useCallback, useState } from 'react'
import {
	Alert,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	View,
	ImageBackground
} from 'react-native'

import { Colors } from '../../constants/colors'
import { Place } from '../../models/place'
import Button from '../UI/Button'
import LocationPicker from './LocationPicker'
//import LinearGradient from 'react-native-linear-gradient'
import { LinearGradient } from 'expo-linear-gradient'

function PlaceForm({ onCreatePlace }) {
	const [enteredID, setEnteredID] = useState('')
	const [enteredBreed, setEnteredBreed] = useState('')
	const [enteredRow, setEnteredRow] = useState('')
	const [enteredColumn, setEnteredColumn] = useState('')
	const [enteredYOP, setEnteredYOP] = useState('')

	const [pickedLocation, setPickedLocation] = useState()
	const [isFormValid, setIsFormValid] = useState(false)

	const checkFormValidity = () => {
		const isIDValid = enteredID?.trim() !== ''
		const isBreedValid = enteredBreed?.trim() !== ''
		const isRowValid = enteredRow?.trim() !== ''
		const isColumnValid = enteredColumn?.trim() !== ''
		const isYOPValid = enteredYOP?.trim() !== ''
		// const isLocationValid = pickedLocation?.trim() !== "";
		return (
			isIDValid && isBreedValid && isRowValid && isColumnValid && isYOPValid
			// isLocationValid
		)
	}

	function changeColumnHandler(enteredText) {
		setEnteredColumn(enteredText)
		setIsFormValid(checkFormValidity())
	}
	function changeRowHandler(enteredText) {
		setEnteredRow(enteredText)
		setIsFormValid(checkFormValidity())
	}
	function changeIDHandler(enteredText) {
		setEnteredID(enteredText)
		setIsFormValid(checkFormValidity())
	}
	function changeBreedHandler(enteredText) {
		setEnteredBreed(enteredText)
		setIsFormValid(checkFormValidity())
	}
	function changeYOPHandler(enteredText) {
		setEnteredYOP(enteredText)
		setIsFormValid(checkFormValidity())
	}

	const pickLocationHandler = useCallback((location) => {
		try {
			if (location) {
				setPickedLocation(location)
				if (pickedLocation) {
					setIsFormValid(true)
				}
				console.log('picklocation handler', location)
			}
		} catch (error) {
			console.log('An error occurred in pickLocationHandler:', error)
		}
	}, [])

	function savePlaceHandler() {
		if (!isFormValid) {
			Alert.alert('Fill all the Details before submitting')
			return
		}
		const placeData = new Place(
			enteredID,
			enteredYOP,
			enteredBreed,
			enteredRow,
			enteredColumn,
			pickedLocation
		)
		onCreatePlace(placeData)
	}

	return (
		<ImageBackground
			source={require('../../assets/formPage.jpeg')}
			style={styles.backgroundImage}
		>
			<LinearGradient
				colors={['rgba(0,0,0,0.5)', 'rgba(0,0,0,0)']}
				style={styles.overlay}
			/>

			<ScrollView style={styles.form}>
				<View style={styles.container}>
					<Text style={styles.label}>Apple ID</Text>
					<TextInput
						style={styles.input}
						onChangeText={changeIDHandler}
						value={enteredID}
					/>

					<Text style={styles.label}>YOP</Text>
					<TextInput
						style={styles.input}
						onChangeText={changeYOPHandler}
						value={enteredYOP}
					/>
					<Text style={styles.label}>Breed</Text>
					<TextInput
						style={styles.input}
						onChangeText={changeBreedHandler}
						value={enteredBreed}
					/>
					<Text style={styles.label}>Row</Text>
					<TextInput
						style={styles.input}
						onChangeText={changeRowHandler}
						value={enteredRow}
					/>
					<Text style={styles.label}>Column</Text>
					<TextInput
						style={styles.input}
						onChangeText={changeColumnHandler}
						value={enteredColumn}
					/>
				</View>
				{/* <ImagePicker onTakeImage={takeImageHandler} /> */}
				<LocationPicker onPickLocation={pickLocationHandler} />
				<Button onPress={savePlaceHandler} disabled={!isFormValid}>
					Add Place
				</Button>
				<View style={styles.view} />
			</ScrollView>
		</ImageBackground>
	)
}

export default PlaceForm

const styles = StyleSheet.create({
	form: {
		flex: 1,
		padding: 30
	},
	backgroundImage: {
		flex: 1,
		resizeMode: 'cover'
	},
	container: {
		flex: 1
	},
	overlay: {
		...StyleSheet.absoluteFillObject
	},
	view: {
		height: 200
	},
	label: {
		fontWeight: 'bold',
		marginBottom: 4,
		color: '#5bc75d',
		marginRight: 10
	},
	input: {
		width: '80%',
		height: 40,
		borderWidth: 1,
		borderColor: '#ccc',
		marginBottom: 12,
		padding: 10,
		//flex: 1,
		// marginVertical: 8,
		// paddingHorizontal: 4,
		// paddingVertical: 8,
		fontSize: 16,
		// borderBottomColor: Colors.primary700,
		// borderBottomWidth: 2,
		backgroundColor: Colors.primary100,
		borderRadius: 30
	},
	submitButton: {
		backgroundColor: 'green',
		borderRadius: 30,
		marginTop: 12,
		paddingVertical: 10,
		alignItems: 'center'
	}
})
