import { View, Text, Button } from "react-native";

const MyProfileScreen = ({ setUserToken }) => {
  return (
    <View>
      <Text>coucou</Text>
      <Button
        title="déconnexion"
        onPress={() => {
          setUserToken(null);
        }}
      ></Button>
    </View>
  );
};

export default MyProfileScreen;
