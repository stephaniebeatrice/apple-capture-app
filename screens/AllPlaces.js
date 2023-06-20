import { useEffect, useState } from "react";

import { useIsFocused } from "@react-navigation/native";

import PlacesList from "../components/Places/PlacesList";
import { fetchData, fetchPlaces } from "../util/database";

function AllPlaces({ navigation }) {
  const [loadedPlaces, setLoadedPlaces] = useState([]);
 
  const isFocused = useIsFocused();
  
<PlacesList places={loadedPlaces} />;
  useEffect(() => {
    async function loadPlaces() {
      const places = await fetchData();
      // console.log("WAIT", places);
      setLoadedPlaces(places);
    }

    if (isFocused) {
      loadPlaces();
    }
  }, [isFocused]);  
  return   
  
  
  
}

export default AllPlaces;
