import React, { useState } from "react";
import { Alert, StyleSheet, View, TextInput, TouchableOpacity, Text } from "react-native";

export const SignUp = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
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

    // Password strength validation (minimum 6 characters)
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      return false;
    } else {
      setPasswordError("");
    }

    // Name validation (only characters)
    const nameRegex = /^[A-Za-z]+$/;
    if (!nameRegex.test(firstName)) {
      setFirstNameError("First name can only contain letters");
      return false;
    } else {
      setFirstNameError("");
    }

    if (!nameRegex.test(lastName)) {
      setLastNameError("Last name can only contain letters");
      return false;
    } else {
      setLastNameError("");
    }

    return true;
  };

  const emailInputChangeHandler = text => {
    setEmail(text);
    if (text !== "") {
      validateEmail(text);
    } else {
      setEmailError("");
    }
  };

  const validateEmail = text => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(text)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  const passwordInputChangeHandler = text => {
    setPassword(text);
    if (text !== "") {
      validatePassword(text);
    } else {
      setPasswordError("");
    }
  };

  const validatePassword = text => {
    if (text.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
    } else {
      setPasswordError("");
    }
  };

  const firstNameInputChangeHandler = text => {
    setFirstName(text);
    if (text !== "") {
      validateFirstName(text);
    } else {
      setFirstNameError("");
    }
  };

  const validateFirstName = text => {
    const nameRegex = /^[A-Za-z]+$/;
    if (!nameRegex.test(text)) {
      setFirstNameError("First name can only contain letters");
    } else {
      setFirstNameError("");
    }
  };

  const lastNameInputChangeHandler = text => {
    setLastName(text);
    if (text !== "") {
      validateLastName(text);
    } else {
      setLastNameError("");
    }
  };

  const validateLastName = text => {
    const nameRegex = /^[A-Za-z]+$/;
    if (!nameRegex.test(text)) {
      setLastNameError("Last name can only contain letters");
    } else {
      setLastNameError("");
    }
  };

  const checkPasswordStrength = password => {
    if (password.length < 4) {
      return "Poor";
    } else if (password.length < 8) {
      return "Fair";
    } else if (password.length < 12) {
      return "Good";
    } else {
      return "Very Good";
    }
  };

  const signUpHandler = async () => {
    if (validateFields()) {
      const res = await fetch("https://apple-farm-server.vercel.app/user/signup", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });
      const data = await res.json();
      if (data) {
        if (data.message === "User already exists") {
          setMsg(data.message);
        } else {
          try {
            await AsyncStorage.setItem("key", email);
            console.log("Data stored successfully.");
          } catch (error) {
            console.log("Error storing data: ", error);
          }
          navigation.navigate("AllPlaces", { email: email });
        }
      }
    }
  };

  return (
    <View style={styles.form}>
      <View style={styles.view}>
        <Text style={styles.label}>First Name</Text>
        <TextInput style={styles.input} onChangeText={firstNameInputChangeHandler} value={firstName} />
        {firstNameError !== "" && <Text style={styles.errorText}>{firstNameError}</Text>}
        <Text style={styles.label}>Last Name</Text>
        <TextInput style={styles.input} onChangeText={lastNameInputChangeHandler} value={lastName} />
        {lastNameError !== "" && <Text style={styles.errorText}>{lastNameError}</Text>}
        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} onChangeText={emailInputChangeHandler} value={email} />
        {emailError !== "" && <Text style={styles.errorText}>{emailError}</Text>}
        <Text style={styles.label}>Password</Text>
        <TextInput style={styles.input} onChangeText={passwordInputChangeHandler} value={password} secureTextEntry />
        {passwordError !== "" && <Text style={styles.errorText}>{passwordError}</Text>}
        {password !== "" && <Text style={styles.errorText}>Password Strength: {checkPasswordStrength(password)}</Text>}
        {msg && <Text style={styles.validationMsg}>{msg}</Text>}
        <TouchableOpacity onPress={signUpHandler} style={styles.buttons}>
          <Text style={styles.btnText}>SignUp</Text>
        </TouchableOpacity>
        <View style={{ marginVertical: 10 }}>
          <Text style={{ textAlign: "center" }}>
            Already have an account?{" "}
            <Text style={styles.btn} onPress={() => navigation.navigate("Login")}>
              login
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  form: { flex: 1, padding: 24, justifyContent: "center" },
  view: { backgroundColor: "#fff", borderRadius: 10, padding: 24 },
  label: { fontWeight: "bold", marginBottom: 3, color: "#50C878" },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderRadius: 10,
    borderBottomColor: "#50C878",
    borderBottomWidth: 2,
    backgroundColor: "#a0defb",
  },
  errorText: { color: "red", marginBottom: 8 },
  buttons: { backgroundColor: "#50C878", borderRadius: 10, paddingVertical: 8 },
  btnText: { textAlign: "center", color: "#fff", fontSize: 20, textTransform: "uppercase" },
  btn: { color: "#50C878" },
  validationMsg: { marginVertical: 10, color: "#50C878", textAlign: "center" },
  passwordStrength: { marginTop: 8, color: "#50C878" },
});
