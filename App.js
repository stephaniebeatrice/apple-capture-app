import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AllPlaces from "./screens/AllPlaces";
import AddPlace from "./screens/AddPlace";
import IconButton from "./components/UI/IconButton";
import { Colors } from "./constants/colors";
import Map from "./screens/Map";
import { Text } from "react-native";

import PlaceDetails from "./screens/PlaceDetails";
import { Login } from "./screens/Login";
import { SignUp } from "./screens/Signup";
import { useLayoutEffect, useState } from "react";

const Stack = createNativeStackNavigator();

export default function App() {
  const [email, setEmail] = useState("");

  const getAuth = () => {
    //check from local storage if we have an email to authenticate a user
    let email = localStorage.getItem("email");
    if (email) {
      setEmail(email);
    }
  };
  useLayoutEffect(() => {
    getAuth();
  }, [email]);

  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: Colors.primary500 },
            headerTintColor: Colors.gray700,
            contentStyle: { backgroundColor: Colors.gray700 },
          }}
        >
          {!email && (
            <>
              <Stack.Screen
                name="Login"
                component={Login}
                options={({ navigation }) => ({
                  title: "Login",
                  // headerRight: ({ tintColor }) => <IconButton icon="add" size={24} color={tintColor} onPress={() => navigation.navigate("AddPlace")} />,
                })}
              />
              <Stack.Screen
                name="Signup"
                component={SignUp}
                options={({ navigation }) => ({
                  title: "Sign up",
                  // headerRight: ({ tintColor }) => <IconButton icon="add" size={24} color={tintColor} onPress={() => navigation.navigate("AddPlace")} />,
                })}
              />
              <Stack.Screen
                name="AllPlaces"
                component={AllPlaces}
                options={({ navigation }) => ({
                  title: "APPLES",
                  headerRight: ({ tintColor }) => (
                    <IconButton icon="add" size={24} color={tintColor} onPress={() => navigation.navigate("AddPlace")} />
                  ),
                })}
              />
            </>
          )}
          <Stack.Screen
            name="AddPlace"
            component={AddPlace}
            options={{
              title: "Add a new Place",
            }}
          />
          <Stack.Screen name="Map" component={Map} />
          <Stack.Screen
            name="PlaceDetails"
            component={PlaceDetails}
            options={{
              title: "Loading Place...",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
