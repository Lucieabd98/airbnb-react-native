import { View, Text, ActivityIndicator, ScrollView } from "react-native";

import { useState, useEffect } from "react";
import axios from "axios";

const RoomScreen = ({ route }) => {
  const { id } = route.params;

  const [date, setData] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    const response = await axios.get(
      "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms/" + id
    );
    setData(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return isLoading ? (
    <ActivityIndicator color="#FFB100" />
  ) : (
    <ScrollView>
      <Text>{id}</Text>
    </ScrollView>
  );
};

export default RoomScreen;
