import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { useIsFocused } from "@react-navigation/native";

import PlacesList from "../components/Places/PlacesList";
import { fetchData, fetchPlaces } from "../util/database";
// import { Colors } from "react-native/Libraries/NewAppScreen";
import { Colors } from "../constants/colors";

function AllPlaces({ route }) {
  const [loadedPlaces, setLoadedPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [email, setEmail] = useState("");
  const isFocused = useIsFocused();
  // const email = "kelvinmomanyi3@gmail.com";
  // console.log(email);
  const data = route.params;
  // console.log("this is all places data via params", data);
  useEffect(() => {
    async function loadPlaces() {
      setLoading(true);
      const places = await fetchData(data);
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
        <PlacesList places={loadedPlaces} />
      )}
    </View>
  );
}

export default AllPlaces;
