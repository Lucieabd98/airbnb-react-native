import { useNavigation } from "@react-navigation/core";
import {
  SafeAreaView,
  ScrollView,
  View,
  StyleSheet,
  Text,
  TextInput,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";

const SignInScreen = ({ navigation, setUserToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async () => {
    setErrorMessage("");
    if (email && password) {
      try {
        const response = await axios.post(
          "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/log_in",
          {
            email: email,
            password: password,
          }
        );
        // console.log(response.data);
        const token = response.data.token;
        setUserToken(token);
        alert("You've been logged in");
      } catch (error) {
        console.log(error.response.data.error);
        setErrorMessage(error.response.data.error);
      }
    } else {
      setErrorMessage("Please fill all fields.");
    }
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{
        alignItems: "center",
      }}
    >
      <View
        style={{
          padding: 80,
          alignItems: "center",
          gap: 90,
        }}
      >
        <View style={styles.logoContainer}>
          <FontAwesome6 name="airbnb" style={styles.logo} />
          <Text style={{ fontSize: 22, color: "#717171" }}>Sign In</Text>
        </View>
        <View style={{ gap: 20 }}>
          <TextInput
            style={styles.input}
            value={email}
            placeholder="E-mail"
            onChangeText={(text) => {
              setEmail(text);
              setErrorMessage("");
            }}
          ></TextInput>
          <TextInput
            style={styles.input}
            value={password}
            secureTextEntry={true}
            placeholder="Password"
            onChangeText={(text) => {
              setPassword(text);
              setErrorMessage("");
            }}
          ></TextInput>
        </View>
        <View style={{ gap: 20 }}>
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
              Sign In
            </Text>
          </TouchableOpacity>
          <Pressable
            onPress={() => {
              navigation.navigate("SignUp");
            }}
          >
            <Text style={{ color: "#717171" }}>No account ? Register</Text>
          </Pressable>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default SignInScreen;

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
});
