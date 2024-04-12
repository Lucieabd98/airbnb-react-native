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

import { Entypo } from "@expo/vector-icons";

const RoomScreen = ({ route }) => {
  const { id } = route.params;

  //   console.log( id);

  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [show, setShow] = useState("Show more");
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();

  //   console.log(latitude);
  //   console.log(longitude);

  const getPermission = async () => {
    try {
      // console.log("hey");
      // demander la permission

      const { status } = await Location.requestForegroundPermissionsAsync();

      console.log(status); // granted/denied

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
      "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms/" + id
    );
    setData(response.data);
    console.log(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const yellowStars = (rating) => {
    const yellowStarsTab = [];
    for (let i = 0; i < rating; i++) {
      yellowStarsTab.push(<Entypo name="star" size={22} color="#FFB100" />);
    }

    for (let j = 0; j < 5 - rating; j++) {
      yellowStarsTab.push(<Entypo name="star" size={22} color="grey" />);
    }

    return yellowStarsTab;
  };

  return isLoading ? (
    <ActivityIndicator color="#FFB100" />
  ) : (
    <ScrollView>
      <View>
        <View>
          <FlatList
            horizontal={true}
            data={data.photos}
            keyExtractor={(elem) => elem.picture_id}
            renderItem={({ item }) => {
              return (
                <Image
                  source={{ uri: item.url }}
                  style={{ height: 250, width: 400 }}
                />
              );
            }}
          ></FlatList>
        </View>
        <View style={{ padding: 10, gap: 10 }}>
          <View style={{ flexDirection: "row" }}>
            <View style={{ width: "75%", justifyContent: "space-around" }}>
              <Text
                style={{ fontSize: 20 }}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {data.title}
              </Text>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
              >
                <View style={{ flexDirection: "row" }}>
                  {yellowStars(data.ratingValue)}
                </View>
                <Text style={{ color: "grey" }}>{data.reviews} reviews</Text>
              </View>
            </View>
            <View style={{ width: "35%" }}>
              <Image
                style={{ height: 80, width: 80, borderRadius: 50 }}
                source={{ uri: data.user.account.photo.url }}
              />
            </View>
          </View>
          <View>
            <Text
              style={{ fontSize: 15 }}
              numberOfLines={show === "Show more" ? 3 : undefined}
              ellipsizeMode="tail"
            >
              {data.description}
            </Text>
            <Pressable
              onPress={() => {
                if (show === "Show more") {
                  setShow("Show less");
                } else {
                  setShow("Show more");
                }
              }}
            >
              <Text style={{ fontSize: 14, color: "grey", marginTop: 10 }}>
                {show}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
      <View>
        <MapView
          style={{ width: "100%", height: 250 }}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: 48.856614,
            longitude: 2.3522219,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
          showsUserLocation={true}
        >
          <Marker
            coordinate={{
              longitude: data.location[0],
              latitude: data.location[1],
            }}
          />
        </MapView>
      </View>
    </ScrollView>
  );
};

export default RoomScreen;
