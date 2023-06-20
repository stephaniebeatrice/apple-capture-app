import PlaceForm from "../components/Places/PlaceForm";
import { storeData } from "../util/database";

function AddPlace({ navigation, route }) {
  async function createPlaceHandler(place) {
    const { email } = route.params;
    console.log("ethe", email);
    await storeData(place, email);
    navigation.navigate("AllPlaces", { email: email });
  }

  return <PlaceForm onCreatePlace={createPlaceHandler} />;
}
export default AddPlace;
