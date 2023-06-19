import { useEffect, useState } from "react";

import { useIsFocused } from "@react-navigation/native";

import PlacesList from "../components/Places/PlacesList";
import { fetchData, fetchPlaces } from "../util/database";

function AllPlaces({ route }) {
  const [loadedPlaces, setLoadedPlaces] = useState([]);

  const isFocused = useIsFocused();
  const email = "kelvinmomanyi3@gmail.com";
  console.log(email);

  useEffect(() => {
    async function loadPlaces() {
      const places = await fetchData(email);
      // console.log("WAIT", places);
      setLoadedPlaces(places);
    }

    if (isFocused) {
      loadPlaces();
    }
  }, [isFocused]);

  return <PlacesList places={loadedPlaces} />;
}

export default AllPlaces;
