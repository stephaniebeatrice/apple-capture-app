import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";

import IconButton from "./components/UI/IconButton";
import { Colors } from "./constants/colors";
import AddPlace from "./screens/AddPlace";
import AllPlaces from "./screens/AllPlaces";
import Map from "./screens/Map";

import { useLayoutEffect, useState } from "react";
import { Login } from "./screens/Login";
import PlaceDetails from "./screens/PlaceDetails";
import { SignUp } from "./screens/Signup";

const Stack = createNativeStackNavigator();

export default function App() {
  const [email, setEmail] = useState("");

  const getAuth = () => {
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
