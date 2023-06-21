import { useEffect, useState } from "react";
import { ScrollView, Image, View, Text, StyleSheet } from "react-native";

import OutlinedButton from "../components/UI/OutlinedButton";
import { Colors } from "../constants/colors";
import { deleteItemById, fetchPlaceDetails } from "../util/database";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

function PlaceDetails({ route, navigation }) {
  const [fetchedPlace, setFetchedPlace] = useState();
  const [email, setEmail] = useState("");

  const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("key");
      // setEmail(value);
      if (value !== null) {
        console.log("Retrieved data: ", value);
      } else {
        console.log("No data found.", value);
      }
      return value;
    } catch (error) {
      console.log("Error retrieving data: ", error);
    }
  };
  const getValue = async () => {
    const value = await retrieveData();
    console.log("value in place details", value);
    // return value;
    setEmail(value);
  };

  getValue();
  console.log(email);
  console.log("this is the value", email);
  function showOnMapHandler() {
    navigation.navigate("Map", {
      initialLat: fetchedPlace.geoLocation.lat,
      initialLng: fetchedPlace.geoLocation.lng,
    });
  }
  function deleteHandler() {
    console.log(selectedPlaceId);
    deleteItemById(selectedPlaceId);
    // navigation.navigate("AllPlaces");
  }

  async function logoutHandler() {
    await AsyncStorage.removeItem("key");
    navigation.navigate("Login");
  }

  const selectedPlaceId = route.params.placeId;

  useEffect(() => {
    // console.log("selected", route.params.placeId);
    async function loadPlaceData() {
      const place = await fetchPlaceDetails(selectedPlaceId, email);
      // console.log("placedetails", place);
      setFetchedPlace(place);
      navigation.setOptions({
        title: "Apple Details",
      });
    }
    //adding placedata
    loadPlaceData();
  }, [selectedPlaceId, email]);

  if (!fetchedPlace) {
    return (
      <View style={styles.fallback}>
        <Text>Loading place data...</Text>
      </View>
    );
  }

  // console.log("this is the place details fetched place", fetchedPlace);
  return (
    <ScrollView>
      <Text style={styles.title}>Apple Details</Text>
      <View style={styles.table}>
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.cellText}>YOP</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.cellText}>{fetchedPlace.YOP}</Text>
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
        <OutlinedButton icon={"trash-bin"} onPress={deleteHandler}>
          Delete Item
        </OutlinedButton>
        <OutlinedButton icon={"trash-bin"} onPress={logoutHandler}>
          Logout
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
