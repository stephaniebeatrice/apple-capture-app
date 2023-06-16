import React, { useState } from "react";
import { Alert, StyleSheet, View, TextInput, Button, Text } from "react-native";

export const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const loginHandler = async () => {
    if (email === "" || password === "") {
      Alert.alert("please enter your email and password");
    } else {
      const res = await fetch("https://y-sooty-seven.vercel.app/user/login", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (data) {
        if (data.message) {
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
      <Text style={styles.label}>Email</Text>
      <TextInput style={styles.input} onChangeText={text => setEmail(text)} value={email} />
      <Text style={styles.label}>Password</Text>
      <TextInput style={styles.input} onChangeText={text => setPassword(text)} value={password} />
      {msg && <Text style={{ marginVertical: 10, color: "#50C878", textAlign: "center" }}>{msg}</Text>}
      <Button onPress={loginHandler} title="Login" />
      <View style={{ marginVertical: 10 }}>
        <Button onPress={() => navigation.navigate("Signup")} title="Sign up" />
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
