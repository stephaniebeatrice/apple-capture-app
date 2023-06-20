import { useNavigation } from '@react-navigation/native'
import { FlatList, StyleSheet, Text, View, ImageBackground } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

import { Colors } from '../../constants/colors'
import PlaceItem from './PlaceItem'

function PlacesList({ places }) {
	const navigation = useNavigation()

	function selectPlaceHandler(id) {
		navigation.navigate('PlaceDetails', {
			placeId: id
		})
	}

	if (!places || places.length === 0) {
		return (
			<View style={styles.fallbackContainer}>
				<Text style={styles.fallbackText}>
					No places added yet - start adding some!
				</Text>
			</View>
		)
	}

	return (
		<FlatList
			style={styles.list}
			data={places}
			keyExtractor={(item, index) => index.toString()}
			renderItem={({ item }) => (
				<PlaceItem place={item} onSelect={selectPlaceHandler} />
			)}
		/>
	)
}

export default PlacesList

const styles = StyleSheet.create({
	list: {
		margin: 24
	},
	fallbackContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'white'
	},
	fallbackText: {
		fontSize: 16,
		color: 'black'
	}
})
