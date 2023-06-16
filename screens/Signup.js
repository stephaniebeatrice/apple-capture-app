import React, { useState } from "react";
import { Alert, StyleSheet, View, TextInput, Button, Text } from "react-native";

export const SignUp = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [msg, setMsg] = useState("");
  const signUpHandler = async () => {
    if (email === "" || password === "" || firstName === "" || lastName === "") {
      Alert.alert("please enter all the fields");
    } else {
      const res = await fetch("https://y-sooty-seven.vercel.app/user/signup", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });
      const data = await res.json();
      if (data) {
        if (data.message === "User already exists") {
          setMsg(data.message);
        } else {
          setMsg("");
          navigation.navigate("AllPlaces");
        }
      }
    }
  };

  return (
    <View style={styles.form}>
      <Text style={styles.label}>firstName</Text>
      <TextInput style={styles.input} onChangeText={text => setFirstName(text)} value={firstName} />
      <Text style={styles.label}>lastName</Text>
      <TextInput style={styles.input} onChangeText={text => setLastName(text)} value={lastName} />
      <Text style={styles.label}>Email</Text>
      <TextInput style={styles.input} onChangeText={text => setEmail(text)} value={email} />
      <Text style={styles.label}>Password</Text>
      <TextInput style={styles.input} onChangeText={text => setPassword(text)} value={password} />
      {msg && <Text style={{ marginVertical: 10, color: "#50C878", textAlign: "center" }}>{msg}</Text>}
      <Button onPress={signUpHandler} title="Sign up" />
      <View style={{ marginVertical: 10 }}>
        <Button onPress={() => navigation.navigate("Login")} title="Login" />
      </View>
    </View>
  );
};

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
    color: "#50C878",
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: "#0570c9",
    borderBottomWidth: 2,
    backgroundColor: "#a0defb",
  },
});
