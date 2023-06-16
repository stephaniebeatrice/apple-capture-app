import { useCallback, useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

import { Colors } from "../../constants/colors";
import { Place } from "../../models/place";
import Button from "../UI/Button";
import LocationPicker from "./LocationPicker";

function PlaceForm({ onCreatePlace }) {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredID, setEnteredID] = useState("");
  const [enteredBreed, setEnteredBreed] = useState("");
  const [enteredRow, setEnteredRow] = useState("");
  const [enteredColumn, setEnteredColumn] = useState("");
  const [enteredYOP, setEnteredYOP] = useState("");

  const [pickedLocation, setPickedLocation] = useState();
  const [isFormValid, setIsFormValid] = useState(false);

  const checkFormValidity = () => {
    const isIDValid = enteredID?.trim() !== "";
    const isBreedValid = enteredBreed?.trim() !== "";
    const isRowValid = enteredRow?.trim() !== "";
    const isColumnValid = enteredColumn?.trim() !== "";
    const isYOPValid = enteredYOP?.trim() !== "";
    const isLocationValid = pickedLocation?.trim() !== "";
    return isIDValid && isBreedValid && isRowValid && isColumnValid && isYOPValid && isLocationValid;
  };

  function changeColumnHandler(enteredText) {
    setEnteredColumn(enteredText);
    setIsFormValid(checkFormValidity());
  }
  function changeRowHandler(enteredText) {
    setEnteredRow(enteredText);
    setIsFormValid(checkFormValidity());
  }
  function changeIDHandler(enteredText) {
    setEnteredID(enteredText);
    setIsFormValid(checkFormValidity());
  }
  function changeBreedHandler(enteredText) {
    setEnteredBreed(enteredText);
    setIsFormValid(checkFormValidity());
  }
  function changeYOPHandler(enteredText) {
    setEnteredYOP(enteredText);
    setIsFormValid(checkFormValidity());
  }

  const pickLocationHandler = useCallback(
    location => {
      console.log("===========================LOCATION==========================");
      console.log(location);
      if (location) setPickedLocation(location);
      setIsFormValid(checkFormValidity());
    },
    [pickedLocation]
  );

  function savePlaceHandler() {
    if (!isFormValid) {
      Alert.alert("Fill all the Details before submitting");
      return; // Exit the function if the form is not valid
    }
    const placeData = new Place(enteredTitle, enteredID, enteredYOP, enteredBreed, enteredRow, enteredColumn, pickedLocation);
    onCreatePlace(placeData);
    console.log("ddf", placeData);
  }

  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Apple ID</Text>
        <TextInput style={styles.input} onChangeText={changeIDHandler} value={enteredID} />
        <Text style={styles.label}>YOP</Text>
        <TextInput style={styles.input} onChangeText={changeYOPHandler} value={enteredYOP} />
        <Text style={styles.label}>Breed</Text>
        <TextInput style={styles.input} onChangeText={changeBreedHandler} value={enteredBreed} />
        <Text style={styles.label}>Row</Text>
        <TextInput style={styles.input} onChangeText={changeRowHandler} value={enteredRow} />
        <Text style={styles.label}>Column</Text>
        <TextInput style={styles.input} onChangeText={changeColumnHandler} value={enteredColumn} />
      </View>
      {/* <ImagePicker onTakeImage={takeImageHandler} /> */}
      <LocationPicker onPickLocation={pickLocationHandler} />
      <Button onPress={savePlaceHandler} disabled={!isFormValid}>
        Add Place
      </Button>
      <View style={styles.view} />
    </ScrollView>
  );
}

export default PlaceForm;

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },
  view: {
    height: 200,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
    color: Colors.primary500,
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary100,
  },
});
