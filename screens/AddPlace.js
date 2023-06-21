import { useEffect, useState } from "react";
import PlaceForm from "../components/Places/PlaceForm";
import { storeData } from "../util/database";

function AddPlace({ navigation, route }) {
  // const [email, setEmail] = useState("");
  async function createPlaceHandler(place) {
    // const retrieveData = async () => {
    //   try {
    //     const value = await AsyncStorage.getItem("key");
    //     // setEmail(value);
    //     if (value !== null) {
    //       console.log("Retrieved data: ", value);
    //     } else {
    //       console.log("No data found.", value);
    //     }
    //     return value;
    //   } catch (error) {
    //     console.log("Error retrieving data: ", error);
    //   }
    // };
    // const getValue = async () => {
    //   const value = await retrieveData();
    //   console.log("value in place details", value);
    //   // return value;
    //   setEmail(value);
    // };

    // getValue();

    const { email } = route.params;
    console.log("ethe", email ? email : "no email");

    if (!email) {
      console.log("no email");
      return;
    }
    await storeData(place, email);

    navigation.navigate("AllPlaces");
  }

  return <PlaceForm onCreatePlace={createPlaceHandler} />;
}
export default AddPlace;
