import React, { useState } from "react";
import { StyleSheet, View, TextInput, Text, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [msg, setMsg] = useState("");

  const validateFields = () => {
    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      return false;
    } else {
      setEmailError("");
    }

    // Password length validation
    if (password.length === 0) {
      setPasswordError("Please enter your password");
      return false;
    } else {
      setPasswordError("");
    }

    return true;
  };

  const loginHandler = async () => {
    if (validateFields()) {
      const res = await fetch("https://apple-farm-server.vercel.app/user/login", {
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
          try {
            await AsyncStorage.setItem("key", email);
            console.log("Data stored successfully.");
          } catch (error) {
            console.log("Error storing data: ", error);
          }
          navigation.navigate("AllPlaces");
        }
      } else {
        setMsg("Invalid email or password"); // Throw an error message
      }
    }
  };

  return (
    <View style={styles.form}>
      <View style={styles.view}>
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      {emailError !== "" && (
        <Text style={styles.errorText}>{emailError}</Text>
      )}
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry
      />
      {passwordError !== "" && (
        <Text style={styles.errorText}>{passwordError}</Text>
      )}
      {msg && (
        <Text style={styles.validationMsg}>{msg}</Text>
      )}
      <TouchableOpacity onPress={loginHandler} style={styles.buttons}>
        <Text style={styles.btnText} >Login</Text>
      </TouchableOpacity>
      
      <View style={{ marginVertical: 10 }}>
        <TouchableOpacity onPress={()=> navigation.navigate("Signup")} style={styles.buttons}>
        <Text style={styles.btnText} >Signup</Text>
      </TouchableOpacity>
       
      </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    flex: 1,
     padding: 24,    
    justifyContent:'center',    
    
  },
  view: {
    
    backgroundColor:'#fff', 
    borderRadius:10,      
     padding:24,
     
    
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
    borderRadius:10,
    borderBottomColor: "#50C878",
    borderBottomWidth: 2,
    backgroundColor: "#a0defb",
  },
  errorText: {
    color: "red",
    marginBottom: 8,
  },
  buttons:{
  backgroundColor: "#50C878",
  borderRadius:10,
  paddingVertical:8,
  },
  btnText:{
    textAlign:'center',
    color:'#fff',
    fontSize:20,
    textTransform:'uppercase',
  },
  validationMsg: {
    marginVertical: 10,
    color: "#50C878",
    textAlign: "center",
  },
});
