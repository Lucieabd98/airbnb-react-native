import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TextInput,
  Pressable,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { FontAwesome6 } from "@expo/vector-icons";
import { useState } from "react";
import axios from "axios";

const SignUpScreen = ({ navigation, setUserToken }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async () => {
    setErrorMessage("");
    if (email && username && description && password && confirmPassword) {
      if (password === confirmPassword) {
        try {
          const response = await axios.post(
            "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/sign_up",
            {
              email: email,
              username: username,
              description: description,
              password: password,
            }
          );
          console.log(response.data);
          const token = response.data.token;

          setUserToken(token);
          // alert("Your account has been successfully created.");
        } catch (error) {
          console.log(error.response.data.error);
          setErrorMessage(error.response.data.error);
        }
      } else {
        setErrorMessage("Passwords must be the same.");
      }
    } else {
      setErrorMessage("Please fill all fields.");
    }
  };

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{
        alignItems: "center",
      }}
    >
      <View
        style={{
          padding: 50,
          alignItems: "center",
          gap: 30,
        }}
      >
        <View style={styles.logoContainer}>
          <FontAwesome6 name="airbnb" style={styles.logo} />
          <Text style={{ fontSize: 22, color: "#717171" }}>Sign Up</Text>
        </View>
        <View style={{ gap: 20 }}>
          <TextInput
            style={styles.input}
            value={email}
            placeholder="E-mail"
            onChangeText={(text) => {
              setEmail(text);
            }}
          ></TextInput>
          <TextInput
            style={styles.input}
            value={username}
            placeholder="Username"
            onChangeText={(text) => {
              setUsername(text);
            }}
          ></TextInput>
          <TextInput
            style={styles.description}
            value={description}
            placeholder="Describe yourself in a few words..."
            onChangeText={(text) => {
              setDescription(text);
            }}
            multiline={true}
          ></TextInput>
          <TextInput
            style={styles.input}
            value={password}
            secureTextEntry={true}
            placeholder="Password"
            onChangeText={(text) => {
              setPassword(text);
            }}
          ></TextInput>
          <TextInput
            style={styles.input}
            value={confirmPassword}
            secureTextEntry={true}
            placeholder="Confirm Password"
            onChangeText={(text) => {
              setConfirmPassword(text);
            }}
          ></TextInput>
        </View>
        <View
          style={{
            gap: 20,
            marginTop: 15,
          }}
        >
          {errorMessage && (
            <Text style={{ color: "red", textAlign: "center" }}>
              {errorMessage}
            </Text>
          )}
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              handleSubmit();
            }}
          >
            <Text style={{ color: "#717171", fontWeight: "bold" }}>
              Sign Up
            </Text>
          </TouchableOpacity>
          <Pressable
            onPress={() => {
              navigation.navigate("SignIn");
            }}
          >
            <Text style={{ color: "#717171" }}>
              Already have an account ? Sign in
            </Text>
          </Pressable>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: "center",
    gap: 20,
  },
  logo: {
    fontSize: 100,
    color: "#EB5A62",
  },
  input: {
    width: 300,
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: "#EB5A62",
  },
  button: {
    borderWidth: 3,
    borderColor: "#EB5A62",
    height: 50,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },

  description: {
    gap: 50,
    height: 80,
    borderWidth: 1,
    borderColor: "#EB5A62",
    padding: 10,
  },
});

export default SignUpScreen;
