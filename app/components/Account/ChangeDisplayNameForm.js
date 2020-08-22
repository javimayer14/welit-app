import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Input, Button } from "react-native-elements";
import * as firebase from "firebase";
import  * as URLs from "../../../assets/constants/fetchs"


export default function CahngeDisplayNameForm(props) {
  const { displayName, setIsVisibleModal, setReloadData, toastRef } = props;
  const [newDisplayName, setNewDisplayName] = useState(null); 
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
 
  const updateDisplayNameApi = (idUser) =>{
     fetch(`${URLs.HEROKU_URL}/api/usuario/${idUser}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: idUser,
        nombre: newDisplayName,
        createAt: Date.now(),
      
      }),
    });

  }
  const updateDisplayName = () => {
    setError(null);
    if (!newDisplayName) {
      setError("Wl nombre del usuario no ha cambiado");
    } else {
      setIsLoading(true);
      const update = {
        displayName: newDisplayName
      };
      firebase
        .auth()
        .currentUser.updateProfile(update)
        .then(() => {
          setIsLoading(false);
          toastRef.current.show("Nombre actualizado");
          updateDisplayNameApi(firebase
            .auth()
            .currentUser.uid)
          setReloadData(true);
          setIsVisibleModal(false);
        })
        .catch(() => {
          setError("Error al actualizar el nombre");
          setIsLoading(false);
        });
    }
  };
  return (
    <View style={styles.view}>
      <Input
        placeholder="Nombre"
        containerStyle={styles.input}
        defaultValue={displayName && displayName}
        onChange={e => setNewDisplayName(e.nativeEvent.text)}
        rightIcon={{
          type: "material-community",
          name: "account-circle-outline",
          color: "#c2c2c2"
        }}
        errorMessage={error}
      />
      <Button
        title="Cambiar nombre"
        containerStyle={styles.btnContainerStyle}
        buttonStyle={styles.btn}
        onPress={updateDisplayName}
        loading={isLoading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10
  },
  input: {
    marginBottom: 10
  },
  btnContainerStyle: {
    marginTop: 20,
    width: "100%"
  },
  btn: {
    backgroundColor: "#00a680"
  }
});
