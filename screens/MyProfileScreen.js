import { View, Text, Button } from "react-native";

const MyProfileScreen = ({ setUserToken }) => {
  return (
    <View>
      <Text>Email de l'utilisateur</Text>
      <Text>Username</Text>
      <Text>Description</Text>
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
