import React, { useState } from "react";
import { View, Text } from "react-native";
import Loadinng from "../../components/Loading";
import { isLoading } from "expo-font";
import addStoryForm from "../../components/Stories/AddStoryForm";
import AddComentForm from "../../components/Coments/AddComentForm";

export default function AddRestaurant(props) {
  const { navigation } = props;
  const [isLoading, setIsloading] = useState(false);
  return (
    <View>
      <Text>Contribuir</Text>
      <AddComentForm navigation={navigation} setIsloading={setIsloading} />
    </View>
  );
}
