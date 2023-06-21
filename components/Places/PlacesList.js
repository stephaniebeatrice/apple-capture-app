import { useNavigation } from "@react-navigation/native";
import { FlatList, StyleSheet, Text, View } from "react-native";
import AppleCard from "../UI/card";

import { Colors } from "../../constants/colors";
import PlaceItem from "./PlaceItem";

function PlacesList({ places }) {
  const navigation = useNavigation();

  function selectPlaceHandler(id) {
    navigation.navigate("PlaceDetails", {
      placeId: id,
    });
  }

  if (!places || places.length === 0) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>
          No places added yet - start adding some!
        </Text>
      </View>
    );
  }
  const info = {
    name: "Apple Store",
    categories: "Electronics",
    deliveryTime: "30 mins",
    distance: "2.5 km",
    image: require("../../assets/formPage.jpeg"), // Assuming you have the image file in your project's assets folder
  };

  return (
    <>
      {/* <FlatList
        style={styles.list}
        data={places}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <PlaceItem place={item} onSelect={selectPlaceHandler} />
        )}
      /> */}
      <FlatList
        style={styles.list}
        data={places}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <AppleCard info={info} place={item} onSelect={selectPlaceHandler} />
        )}
      />
    </>
  );
}

export default PlacesList;

const styles = StyleSheet.create({
  list: {
    margin: 24,
    flex: 1,
  },
  fallbackContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fallbackText: {
    fontSize: 16,
    color: Colors.primary200,
  },
});
