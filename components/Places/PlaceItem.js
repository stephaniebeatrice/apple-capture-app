import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import { Colors } from "../../constants/colors";
import Button from "../UI/Button";

function PlaceItem({ place, onSelect }) {
  const truncateText = (text) => {
    if (text.length > 15) {
      return text.substring(0, 15) + "...";
    }
    return text;
  };
  console.log(["place item", place]);
  return (
    <Pressable
      style={({ pressed }) => [styles.item, pressed && styles.pressed]}
      onPress={onSelect.bind(this, place.id)}
    >
      <View style={styles.info}>
        <View style={styles.view}>
          <Text style={styles.text}> Yop</Text>
          <Text style={styles.title}> {place.yop}</Text>
        </View>
        <View style={styles.view}>
          <Text style={styles.text}> Breed</Text>
          <Text style={styles.title}>{place.breed}</Text>
        </View>
        <View style={styles.view}>
          <Text style={styles.text}> Row</Text>
          <Text style={styles.title}>{place.row}</Text>
        </View>
        <View style={styles.view}>
          <Text style={styles.text}> Column</Text>
          <Text style={styles.title}>{place.column}</Text>
        </View>
        <View style={styles.view}>
          <Text style={styles.text}> Address</Text>
          <Text style={styles.title}>{truncateText(place.address)}</Text>
        </View>
        <Button onPress={onSelect.bind(this, place.id)}>Apple Details</Button>
      </View>
    </Pressable>
  );
}

export default PlaceItem;

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "flex-start",
    borderRadius: 6,
    marginVertical: 12,
    backgroundColor: Colors.primary500,
    elevation: 2,
    shadowColor: "black",
    shadowOpacity: 0.15,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 2,
  },
  view: {
    justifyContent: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    padding: 4,
    borderColor: Colors.primary800,
    borderRadius: 4,
    elevation: 1,
    marginHorizontal: 5,
  },
  text: {
    flex: 1,
    fontSize: 18,
    color: "white",
    marginHorizontal: 5,
    fontWeight: "bold",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  pressed: {
    opacity: 0.9,
  },
  image: {
    flex: 1,
    borderBottomLeftRadius: 4,
    borderTopLeftRadius: 4,
    height: 100,
  },
  info: {
    flex: 2,
    padding: 12,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    color: Colors.gray700,
    flex: 1,
  },
  address: {
    fontSize: 12,
    color: Colors.gray700,
  },
});
