import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  Image,
  FlatList,
  Pressable,
} from "react-native";

import MapView, { Marker } from "react-native-maps";
import { PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";

import { useState, useEffect } from "react";
import axios from "axios";

const AroundMeScreen = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();

  const getPermission = async () => {
    try {
      // console.log("hey");
      // demander la permission

      const { status } = await Location.requestForegroundPermissionsAsync();

      //   console.log(status); // granted/denied

      if (status === "granted") {
        const location = await Location.getCurrentPositionAsync();
        // console.log(location.coords.latitude);
        setLatitude(location.coords.latitude);
        // console.log(location.coords.longitude);
        setLongitude(location.coords.longitude);
      } else {
        alert("position refusée");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPermission();
  }, []);

  const fetchData = async () => {
    const response = await axios.get(
      "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms/around?" +
        "latitude=" +
        latitude +
        "&" +
        "longitude=" +
        longitude
    );
    setData(response.data);
    // console.log(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [latitude, longitude]);

  return isLoading ? (
    <ActivityIndicator color="#FFB100" />
  ) : (
    <View>
      <View>
        <MapView
          style={{ width: "100%", height: "100%" }}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: 48.856614,
            longitude: 2.3522219,
            latitudeDelta: 0.2,
            longitudeDelta: 0.2,
          }}
          showsUserLocation={true}
        >
          {data.map((oneOffer, index) => {
            return (
              <Marker
                key={index}
                coordinate={{
                  longitude: oneOffer.location[0],
                  latitude: oneOffer.location[1],
                }}
              />
            );
          })}
        </MapView>
      </View>
    </View>
  );
};

export default AroundMeScreen;
