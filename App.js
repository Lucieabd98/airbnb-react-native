import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";

const Stack = createNativeStackNavigator();

import SignInScreen from "./screens/SignInScreen";
import SignUpScreen from "./screens/SignUpScreen";

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <>
          <Stack.Screen name="SignIn" options={{ title: "Sign In" }}>
            {(props) => <SignInScreen {...props} coucou="coucou" />}
          </Stack.Screen>
          <Stack.Screen name="SignUp" options={{ title: "Sign Up" }}>
            {(props) => <SignUpScreen {...props} coucou="coucou" />}
          </Stack.Screen>
        </>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
