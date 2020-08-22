import React, {useState} from "react";
import Navigation from "./app/navigation/navigation";
import { AsyncStorage } from 'react-native';

import { Image, StyleSheet } from "react-native"
import { YellowBox } from "react-native";
import { Button } from "react-native-elements";
import { firebaseApp } from "./app/utils/FireBase";
import Onboarding from "react-native-onboarding-swiper"; // 0.4.0
import navigation from "./app/navigation/navigation";

const HAS_LAUNCHED = 'hasLaunched';

YellowBox.ignoreWarnings(["Setting a timer"]);


export default function App() {
  const [initial, setInitial] = useState(checkIfFirstLaunch())

  const Initial = () => {
  
    return (
      <Onboarding
      onDone={() =>  setInitial(false)}
      nextLabel={"Siguiente"}
      skipLabel={"Omitir"}
        pages={[
          { 
            backgroundColor: "#fe6e58",
            image: (
              <Image style={styles.onBoardingImage} source={require("./assets/img/libro-castillo.png")} />
            ),
            title: "¡ Bienvenido a WeLit !",
            subtitle: "donde las historias cobran vida gracias a tu creatividad",
          },
          {
            backgroundColor: "#00a680",
            image: (
              <Image style={styles.onBoardingImage} source={require("./assets/img/example-medal.png")} />
            ),
            title: "¿De que se trata?",
            subtitle: "Welit es una plataforma donde los usuarios dan rienda suelta a su imaginacion para crear historias facinantes en conjunto",
          },
          {
            backgroundColor: "#fe6e58",
            image: (
              <Image  style={styles.onBoardingImage} source={require("./assets/img/example-medal.png")} />
            ),
            title: "¿Como participar?",
            subtitle: "Es muy facil, selecciona cualquier historia activa y postulá el siguiente capitulo, relatá como deberia seguir",
          },
          {
            backgroundColor: "#00a680",
            image: (
              <Image  style={styles.onBoardingImage} source={require("./assets/img/example-medal.png")} />
            ),
            title: "¿Como participar?",
            subtitle: "Si tu capitulo es el mas votado en el transcurso del dia, se convierte en parte de la historia oficialmente, gracias a esto sumas puntos y medallas",
          },
          {
            backgroundColor: "#fe6e58",
            image: (
              <Image  style={styles.onBoardingImage} source={require("./assets/img/example-medal.png")} />
            ),
            title: "Empieza ya",
            subtitle: "Aumenta de nivel hasta convertirte en creador experto.¡Recorda que cada ronda finaliza a las 20hs!",
          },
        ]}
      />
    );
  };
  return initial ? <Initial/> : <Navigation/> 
}






function setAppLaunched() {
  AsyncStorage.setItem(HAS_LAUNCHED, 'true');
}

async function checkIfFirstLaunch() {
  try {
    const hasLaunched = await AsyncStorage.getItem(HAS_LAUNCHED);
    if (hasLaunched === null) {
      setAppLaunched();
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
}

const styles = StyleSheet.create({

  onBoardingImage:{
    width:200 ,
    height:200
  }
  
});
