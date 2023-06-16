import PlaceForm from "../components/Places/PlaceForm";
import { storeData } from "../util/database";

function AddPlace({ navigation }) {
  async function createPlaceHandler(place) {
    await storeData(place);
    navigation.navigate("AllPlaces");
  }

  return <PlaceForm onCreatePlace={createPlaceHandler} />;
}
export default AddPlace;
