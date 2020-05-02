import React from "react";
import Navigation from "./app/navigation/navigation";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import { firebaseApp } from "./app/utils/FireBase";

export default function App() {
  return <Navigation />;
}
