import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

import PlacesList from "../components/Places/PlacesList";
import { fetchData, fetchPlaces } from "../util/database";
// import { Colors } from "react-native/Libraries/NewAppScreen";
import { Colors } from "../constants/colors";

function AllPlaces({ navigation, route }) {
  const [loadedPlaces, setLoadedPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [email, setEmail] = useState("");
  const isFocused = useIsFocused();
  // const data = "kelvinmomanyi3@gmail.com";
  // console.log(email);
  const data2 = route.params.email;
  console.log("this is all places data via params", data2);
  useEffect(() => {
    async function loadPlaces() {
      setLoading(true);

      const places = await fetchData(data2);
      setLoadedPlaces(places);
      setLoading(false);
    }

    if (isFocused) {
      loadPlaces();
    }
  }, [isFocused]);

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      {loading ? (
        <ActivityIndicator size="large" color={Colors.primary800} />
      ) : (
        <LinearGradient
          colors={["#158c38", "rgb(142, 72, 85)"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          locations={[0.1, 0.9]}
          style={{ flex: 1 }}
        >
          <PlacesList places={loadedPlaces} />
        </LinearGradient>
      )}
    </View>
  );
}

export default AllPlaces;
