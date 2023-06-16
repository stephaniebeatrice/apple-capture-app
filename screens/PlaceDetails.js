import { useEffect, useState } from "react";
import { ScrollView, Image, View, Text, StyleSheet } from "react-native";

import OutlinedButton from "../components/UI/OutlinedButton";
import { Colors } from "../constants/colors";
import { fetchData, fetchPlaceDetails } from "../util/database";

function PlaceDetails({ route, navigation }) {
  const [fetchedPlace, setFetchedPlace] = useState();

  function showOnMapHandler() {
    navigation.navigate("Map", {
      initialLat: fetchedPlace.location.lat,
      initialLng: fetchedPlace.location.lng,
    });
  }

  const selectedPlaceId = route.params.placeId;

  useEffect(() => {
    // console.log("selected", route.params.placeId);
    async function loadPlaceData() {
      const place = await fetchPlaceDetails(selectedPlaceId);
      // console.log("placedetails", place);
      setFetchedPlace(place);
      navigation.setOptions({
        title: place.title,
      });
    }

    loadPlaceData();
  }, [selectedPlaceId]);

  if (!fetchedPlace) {
    return (
      <View style={styles.fallback}>
        <Text>Loading place data...</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <Text style={styles.title}>Apple Details</Text>
      <View style={styles.table}>
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.cellText}>YOP</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.cellText}>{fetchedPlace.yop}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.cellText}>COLUMN</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.cellText}>{fetchedPlace.column}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.cellText}>Row </Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.cellText}>{fetchedPlace.row}</Text>
          </View>
        </View>
        {/* Add more rows as needed */}
      </View>
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>HDH -{fetchedPlace.address}</Text>
        </View>
        <OutlinedButton icon="map" onPress={showOnMapHandler}>
          View on Map
        </OutlinedButton>
      </View>
    </ScrollView>
  );
}

export default PlaceDetails;

const styles = StyleSheet.create({
  fallback: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    alignItems: "center",
    color: Colors.primary500,
  },

  locationContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.primary500,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
  table: {
    borderWidth: 1,
    borderColor: Colors.primary800,
    marginVertical: 10,
  },
  row: {
    flexDirection: "row",
  },
  column: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.primary800,
    padding: 10,
  },
  cellText: {
    textAlign: "center",
    color: Colors.primary500,
  },
});
