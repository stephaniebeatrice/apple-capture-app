import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  Pressable,
} from "react-native";

import IconLabel from "./IconLabel";
import Button from "./Button";

const iconColor = "#6c5ce7";
const AppleCard = ({ info, place, onSelect }) => {
  const { name, categories, deliveryTime, distance, image } = info;

  return (
    <Pressable
      style={({ pressed }) => [styles.item, pressed && styles.pressed]}
      onPress={onSelect.bind(this, place.id)}
    >
      <View style={styles.container}>
        <View style={styles.cardContainer}>
          <Image style={styles.imageStyle} source={image} />
          <View style={styles.infoStyle}>
            <Text style={styles.titleStyle}>{place.address}</Text>
            <View style={styles.iconLabelStyle}>
              <Text style={styles.categoryStyle}>Breed :</Text>

              <Text style={styles.categoryStyle}>{place.breed}</Text>
            </View>

            <View style={styles.iconLabelStyle}>
              <IconLabel
                name="newspaper-outline"
                label={place.column}
                color={iconColor}
              />

              <IconLabel
                name="grid-outline"
                label={place.row}
                color={iconColor}
              />
            </View>
            <Button onPress={onSelect.bind(this, place.id)}>
              Apple Details
            </Button>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const deviceWidth = Math.round(Dimensions.get("window").width);
const offset = 65;
const radius = 20;
const styles = StyleSheet.create({
  container: {
    width: deviceWidth - 40,
    alignItems: "center",
    marginTop: 15,
    // flex: 1,
    // marginHorizontal: 10,
  },
  cardContainer: {
    width: deviceWidth - offset,
    backgroundColor: "#154938",
    height: 300,
    borderRadius: radius,

    shadowColor: "#000",
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.75,
    shadowRadius: 5,
    elevation: 9,
  },
  imageStyle: {
    height: 130,
    width: deviceWidth - offset,
    borderTopLeftRadius: radius,
    borderTopRightRadius: radius,
    opacity: 0.9,
    alignContent: "center",
    alignSelf: "center",
  },
  titleStyle: {
    fontSize: 20,
    fontWeight: "800",
    color: "white",
  },
  categoryStyle: {
    fontWeight: "200",
    // marginHorizontal: 10,
    color: "white",
  },
  infoStyle: {
    marginHorizontal: 5,
    marginVertical: 5,
  },
  iconLabelStyle: {
    flexDirection: "row",
    marginVertical: 10,
  },
});

export default AppleCard;
