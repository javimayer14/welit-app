import React, { useState } from "react";
import { View, Text } from "react-native";
import Loadinng from "../../components/Loading";
import { isLoading } from "expo-font";
import addStoryForm from "../../components/Stories/AddStoryForm";
import AddStoryForm from "../../components/Stories/AddStoryForm";

export default function AddRestaurant(props) {
  const { navigation } = props;
  const [isLoading, setIsloading] = useState(false);
  return (
    <View>
      <Text>add History</Text>
      <AddStoryForm navigation={navigation} setIsloading={setIsloading} />
      <Loadinng isVisible={isLoading} text="Creando Historia" />
    </View>
  );
}
