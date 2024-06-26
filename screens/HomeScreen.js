import {
  Text,
  Button,
  View,
  FlatList,
  ScrollView,
  ActivityIndicator,
  Image,
  StyleSheet,
  Pressable,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Entypo } from "@expo/vector-icons";
import axios from "axios";
import { useState, useEffect } from "react";

const HomeScreen = ({ setUserToken, navigation }) => {
  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    response = await axios.get(
      "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms"
    );
    // console.log(response.data);
    setData(response.data);
    setIsLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const yellowStars = (rating) => {
    const yellowStarsTab = [];
    for (let i = 0; i < rating; i++) {
      yellowStarsTab.push(
        <Entypo name="star" key={i} size={22} color="#FFB100" />
      );
    }

    for (let j = rating; j < 5; j++) {
      yellowStarsTab.push(
        <Entypo key={j} name="star" size={22} color="grey" />
      );
    }

    return yellowStarsTab;
  };

  return isLoading ? (
    <ActivityIndicator color="#EB5A62" />
  ) : (
    <>
      <View
        style={{
          padding: 20,
          backgroundColor: "white",
        }}
      >
        <FlatList
          data={data}
          keyExtractor={(elem) => elem._id}
          renderItem={({ item }) => {
            const userUrl = item.user.account.photo.url;
            return (
              <Pressable
                style={{
                  backgroundColor: "white",
                  height: 300,
                  borderBottomWidth: 1,
                  borderBottomColor: "lightgrey",
                  marginBottom: 30,
                }}
                onPress={() => {
                  navigation.navigate("Room", { id: item._id });
                }}
              >
                <View
                  style={{
                    height: "70%",
                    width: "100%",
                    backgroundColor: "red",
                  }}
                >
                  <Image
                    source={{ uri: item.photos[0].url }}
                    style={{
                      height: "100%",
                      width: "100%",
                    }}
                  />
                  <Text
                    style={{
                      position: "relative",
                      bottom: 48,
                      backgroundColor: "black",
                      width: 70,
                      height: 35,
                      color: "white",
                      fontSize: 18,
                      textAlign: "center",
                      justifyContent: "center",
                    }}
                  >
                    {item.price}€
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    display: "flex",
                  }}
                >
                  <View
                    style={{
                      width: "75%",
                      justifyContent: "space-around",
                    }}
                  >
                    <Text
                      style={{ fontSize: 20 }}
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
                      {item.title}
                    </Text>
                    <View style={{ flexDirection: "row" }}>
                      {yellowStars(item.ratingValue)}
                    </View>
                  </View>
                  <View style={{ width: "35%" }}>
                    <Image
                      source={{ uri: userUrl }}
                      style={{
                        height: 80,
                        width: 80,
                        borderRadius: 50,
                      }}
                    />
                  </View>
                </View>
              </Pressable>
            );
          }}
        ></FlatList>
      </View>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    // padding: 30,
  },
});
