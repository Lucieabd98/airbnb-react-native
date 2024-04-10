import { Text, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = ({ setUserToken }) => {
  return (
    <>
      <Text>coucou</Text>
      <Button
        title="clique"
        onPress={() => {
          setUserToken(null);
        }}
      ></Button>
    </>
  );
};

export default HomeScreen;
