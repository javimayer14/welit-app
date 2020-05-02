import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button, Icon, Divider } from "react-native-elements";

export default function NotLogin(props) {
    const { texto , navigation, setIsVisibleModalLogin} = props
  return (
    <View>
      <Text style={styles.txtIrLogin}>
        Debe iniciar sesion para porder acceder
      </Text>
      <Button title="Ir al Login" onPress={()=>goLogin()} buttonStyle={styles.btnIrLogin} />
    </View>
  );


  function goLogin(){
    navigation.navigate('Login')
      setIsVisibleModalLogin(false)
  }

  }



  const styles = StyleSheet.create({
    btnIrLogin: {
        backgroundColor: "#00a680",
        margin: 20,
      },
      txtIrLogin: {
        fontSize: 25,
        margin: 20,
        fontWeight: "bold",
        alignItems: "center",
        alignContent: "center",
      }
  })
