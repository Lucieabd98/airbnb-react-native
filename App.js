import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";

import axios from "axios";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

import SignInScreen from "./screens/SignInScreen";
import SignUpScreen from "./screens/SignUpScreen";
import HomeScreen from "./screens/HomeScreen";

import { useEffect, useState } from "react";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState(null);

  const setUserToken = async (token) => {
    // console.log(token, "coucou");
    if (token) {
      await AsyncStorage.setItem("userToken", token);
    } else {
      await AsyncStorage.removeItem("userToken");
    }
    setToken(token);
    setIsLoading(false);
  };

  // console.log(token);

  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem("userToken");
        setUserToken(userToken);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    bootstrapAsync();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {token === null ? (
          <>
            <Stack.Screen name="SignIn" options={{ title: "Sign In" }}>
              {(props) => (
                <SignInScreen {...props} setUserToken={setUserToken} />
              )}
            </Stack.Screen>
            <Stack.Screen name="SignUp" options={{ title: "Sign Up" }}>
              {(props) => (
                <SignUpScreen {...props} setUserToken={setUserToken} />
              )}
            </Stack.Screen>
          </>
        ) : (
          <Stack.Screen name="Home" options={{ headerShown: false }}>
            {() => (
              <Tab.Navigator
                screenOptions={{
                  headerShown: false, // TabHome
                  tabBarActiveTintColor: "tomato",
                  tabBarInactiveTintColor: "gray",
                }}
              >
                <Tab.Screen
                  name="TabHome"
                  options={{
                    tabBarLabel: "Home",
                    tabBarIcon: ({ color, size }) => (
                      <Ionicons name={"home"} size={size} color={color} />
                    ),
                  }}
                >
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen
                        name="Home"
                        options={{
                          headerTitle: () => (
                            <FontAwesome6
                              name="airbnb"
                              style={{ color: "#EB5A62", fontSize: 30 }}
                            />
                          ),
                        }}
                      >
                        {(props) => (
                          <HomeScreen {...props} setUserToken={setUserToken} />
                        )}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>
              </Tab.Navigator>
            )}
          </Stack.Screen>
        )}
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
