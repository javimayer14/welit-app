import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, View, Text, Image, ScrollView } from "react-native";
import { Card, ListItem, Button, Icon, Header } from "react-native-elements";
import ActionButton from "react-native-action-button";
import CountDown from "react-native-countdown-component";
import * as firebase from "firebase";
import AppIntroSlider from 'react-native-app-intro-slider'; 

export default function Restaurant(props) {
  const { navigation } = props;
  const [user, setUser] = useState(null);
  const [segundosRestates, setSegundos] = useState(null);

  let x = null;

  useEffect(() => {
    setSegundos(450)    

    firebase.auth().onAuthStateChanged((userInfo) => {
      setUser(userInfo);
      x =5;
    });
    //segundosRestantes();

  }, []);

  function segundosRestanteszz(){
    const hoy =  new Date();
    const horas = parseInt(hoy.getHours())
    const minutos = parseInt(hoy.getMinutes())
    const segundos = parseInt(hoy.getSeconds())
    const segundosTranscurridosDelDia = parseInt(((horas * 3600) + (minutos * 60) + (segundos)))
    const horaCierre = parseInt((22 * 3600))
    const final = horaCierre - segundosTranscurridosDelDia


    console.log("STATE : " + segundosRestates)
    console.log("USUARIO LOGGED : " + user)

  // if(final < 0){
  //   let finalNegativo =  (final) + (24*3600)
  //   console.log("RESTANTE EN IF" + finalNegativo)
  //   setSegundosRestantes(finalNegativo)   

  //}
  }

  const slides = [
    {
      key: 1,
      title: 'Title 1',
      text: 'Description.\nSay something cool',
      image: "https://firebasestorage.googleapis.com/v0/b/welit-3d309.appspot.com/o/storyImages%2Fpiramides.jpg?alt=media&token=a34ef33f-203f-40ae-a039-55d342bcd31c",
      backgroundColor: '#59b2ab',
    },
    {
      key: 2,
      title: 'Title 2',
      text: 'Other cool stuff',
      image: "https://firebasestorage.googleapis.com/v0/b/welit-3d309.appspot.com/o/storyImages%2Fpiramides.jpg?alt=media&token=a34ef33f-203f-40ae-a039-55d342bcd31c",
      backgroundColor: '#febe29',
    },
    {
      key: 3,
      title: 'Rocket guy',
      text: 'I\'m already out of descriptions\n\nLorem ipsum bla bla bla',
      image: "https://firebasestorage.googleapis.com/v0/b/welit-3d309.appspot.com/o/storyImages%2Fpiramides.jpg?alt=media&token=a34ef33f-203f-40ae-a039-55d342bcd31c",
      backgroundColor: '#22bcb5',
    }
  ];
    const stories = [
      {
        id: 1,
        usuario: null,
        imagen:
          "https://firebasestorage.googleapis.com/v0/b/welit-3d309.appspot.com/o/storyImages%2Fcuadro_galeria.jpg?alt=media&token=c49a9954-af7e-413e-b4fc-1f24387f576f",
        comentarios: [
          {
            
              id: 1,
              usuario: {
                id: "post",
                nombre: "Javier",
                apellido: "Mayer",
                email: "pepito@mujita",
                score: {
                  id: 1,
                  medallaOro: 1,
                  medallaPlata: 2,
                  medallaBronce: 5,
                  puntuacion: 0,
                  medallabronce: 0,
                },
                rango: "Pluma plateada 3",
                createAt: null,
              },
              mg: 8,
              comentario:
                "Al caer la tarde, dos desconocidos se encuentran en los oscuros corredores de una galeria de cuadros. Con un ligero escalofrio uno le dijo al otro",
              ganador: 1,
              capitulo: 1,
              createAt: "2000-01-01T00:00:00.000+0000",
            },
            {
            id: 1,
            usuario: {
              id: "post",
              nombre: "Vivky",
              apellido: "mayer",
              email: "pepito@mujita",
              score: {
                id: 1,
                medallaOro: 1,
                medallaPlata: 2,
                medallaBronce: 5,
                puntuacion: 0,
                medallabronce: 0,
              },
              rango: "Pluma plateada 3",
              createAt: null,
            },
            mg: 8,
            comentario:
              "Eres el elegido. El individuo no entendia porque se lo habia dicho, y comenzo a hacerle muchas preguntas , a las que el otro no responddio, solo lo miro fijamente a los ojos y moviendo los brazos agitadamente, como quien imita el vuelo de un pajaro se fue",
            ganador: 1,
            capitulo: 2,
            createAt: "2000-01-01T00:00:00.000+0000",
          },
          {
            id: 1,
            usuario: {
              id: "post",
              nombre: "Javier",
              apellido: "Mayer",
              email: "pepito@mujita",
              score: {
                id: 1,
                medallaOro: 1,
                medallaPlata: 2,
                medallaBronce: 5,
                puntuacion: 0,
                medallabronce: 0,
              },
              rango: "Pluma plateada 3",
              createAt: null,
            },
            mg: 8,
            comentario:
              "Cruzo entonces la ciuadad en busa de lo que el ni siquiera sabia. Cuando entro al hCruzo entonces la ciuadad en busa de lo que el ni siquiera sabia. Cuando entro al hCruzo entonces la ciuadad en busa de lo que el ni siquiera sabia. Cuando entro al hCruzo entonces la ciuadad en busa de lo que el ni siquiera sabia. Cuando entro al hCruzo entonces la ciuadad en busa de lo que el ni siquiera sabia. Cuando entro al hCruzo entonces la ciuadad en busa de lo que el ni siquiera sabia. Cuando entro al hCruzo entonces la ciuadad en busa de lo que el ni siquiera sabia. Cuando entro al hCruzo entonces la ciuadad en busa de lo que el ni siquiera sabia. Cuando entro al hall principal todavia en penumbras sintio como sus pies chapoteaban a cada paso , le parecio extraño y al prender los reflectores descubrio que no se trataba de aagua sino de sangre proveniente de perro muertos",
            ganador: 0,
            createAt: "2000-01-01T00:00:00.000+0000",
          },
          {
            id: 1,
            usuario: {
              id: "post",
              nombre: "Liliana",
              apellido: "Segato",
              email: "alberto@gmail",
              score: {
                id: 1,
                medallaOro: 7,
                medallaPlata: 7,
                medallaBronce: 7,
                puntuacion: 0,
                medallabronce: 0,
              },
              rango: "Pluma plateada 2",
              createAt: null,
            },
            mg: 8,
            comentario:
              "Desconsertado, Rafael, que asi se llamaba nuestro protagonista, penso en una broma de mal gusto, pero no podia olvidarse de esa mirada que lo dejo perplejo y lo siguio durante dias, algo le decia que debia volver a la muestra de arte. Quiza allli encontraria una respuesta.",
            ganador: 1,
            capitulo:3,
            createAt: "2000-01-01T00:00:00.000+0000",
          },
 
        ],
        genero: "fantasia",
        titulo: "El hombre y el cuadro",
        relato:
          "Al caer la tarde, dos desconocidos se encuentran en los oscuros corredores de una galeria de cuadros. Con un ligero escalofrio uno le dijo al otro",
        createAt: null,
        activo: 1,
      },
      {
        id: 1,
        usuario: null,
        imagen:
          "https://firebasestorage.googleapis.com/v0/b/welit-3d309.appspot.com/o/storyImages%2Fpiramides.jpg?alt=media&token=a34ef33f-203f-40ae-a039-55d342bcd31c",
        comentarios: [
          {
            id: 1,
            usuario: {
              id: "post",
              nombre: "Vivky",
              apellido: "mayer",
              email: "pepito@mujita",
              score: {
                id: 1,
                medallaOro: 1,
                medallaPlata: 2,
                medallaBronce: 5,
                puntuacion: 0,
                medallabronce: 0,
              },
              rango: "Pluma plateada 3",
              createAt: null,
            },
            mg: 8,
            comentario:
              "Eres el elegido. El individuo no entendia porque se lo habia dicho, y comenzo a hacerle muchas preguntas , a las que el otro no responddio, solo lo miro fijamente a los ojos y moviendo los brazos agitadamente, como quien imita el vuelo de un pajaro se fue",
            ganador: 1,
            createAt: "2000-01-01T00:00:00.000+0000",
          },
          {
            id: 1,
            usuario: {
              id: "post",
              nombre: "Javier",
              apellido: "Mayer",
              email: "pepito@mujita",
              score: {
                id: 1,
                medallaOro: 1,
                medallaPlata: 2,
                medallaBronce: 5,
                puntuacion: 0,
                medallabronce: 0,
              },
              rango: "Pluma plateada 3",
              createAt: null,
            },
            mg: 8,
            comentario:
              "Cruzo entonces la ciuadad en busa de lo que el ni siquiera sabia. Cuando entro al hCruzo entonces la ciuadad en busa de lo que el ni siquiera sabia. Cuando entro al hCruzo entonces la ciuadad en busa de lo que el ni siquiera sabia. Cuando entro al hCruzo entonces la ciuadad en busa de lo que el ni siquiera sabia. Cuando entro al hCruzo entonces la ciuadad en busa de lo que el ni siquiera sabia. Cuando entro al hCruzo entonces la ciuadad en busa de lo que el ni siquiera sabia. Cuando entro al hCruzo entonces la ciuadad en busa de lo que el ni siquiera sabia. Cuando entro al hCruzo entonces la ciuadad en busa de lo que el ni siquiera sabia. Cuando entro al hall principal todavia en penumbras sintio como sus pies chapoteaban a cada paso , le parecio extraño y al prender los reflectores descubrio que no se trataba de aagua sino de sangre proveniente de perro muertos",
            ganador: 0,
            createAt: "2000-01-01T00:00:00.000+0000",
          },
          {
            id: 1,
            usuario: {
              id: "post",
              nombre: "Liliana",
              apellido: "Segato",
              email: "alberto@gmail",
              score: {
                id: 1,
                medallaOro: 7,
                medallaPlata: 7,
                medallaBronce: 7,
                puntuacion: 0,
                medallabronce: 0,
              },
              rango: "Pluma plateada 2",
              createAt: null,
            },
            mg: 8,
            comentario:
              "Desconsertado, Rafael, que asi se llamaba nuestro protagonista, penso en una broma de mal gusto, pero no podia olvidarse de esa mirada que lo dejo perplejo y lo siguio durante dias, algo le decia que debia volver a la muestra de arte. Quiza allli encontraria una respuesta.",
            ganador: 1,
            createAt: "2000-01-01T00:00:00.000+0000",
          },
          {
            id: 1,
            usuario: {
              id: "post",
              nombre: "Javier",
              apellido: "Mayer",
              email: "pepito@mujita",
              score: {
                id: 1,
                medallaOro: 1,
                medallaPlata: 2,
                medallaBronce: 5,
                puntuacion: 0,
                medallabronce: 0,
              },
              rango: "Pluma plateada 3",
              createAt: null,
            },
            mg: 8,
            comentario:
              "Comentario de prueba 2",
            ganador: 0,
            createAt: "2000-01-01T00:00:00.000+0000",
          }
        ],
        genero: "fantasia",
        titulo: "Piramides en el cielo",
        relato:
          "Al caer la tarde, dos desconocidos se encuentran en los oscuros corredores de una galeria de cuadros. Con un ligero escalofrio uno le dijo al otro",
        createAt: null,
        activo: 1,
      },
    ];

  return (
    <ScrollView style={styles.viewBody}>
      <Header
        barStyle="light-content"
        containerStyle={{
          backgroundColor: "#FFF",
          justifyContent: "space-around",
          borderBottomColor: "#DDDDDD",
          borderRadius: 5,
          borderBottomWidth: 3,
        }}
        centerComponent={
          <View>
          <Text>{segundosRestates}</Text>

          </View>
        }
      />
      {stories.map((story, index) => (
        <Card
          key = {index}
          image={{ uri: story.imagen }}
          containerStyle={styles.bodyCard}
          imageStyle={styles.imageCard}
        >
 
          <Text style={styles.titleCard}>{story.titulo}</Text>
          <Text style={styles.textCard}>{story.relato.substr(0, 90)}...</Text>
          <Button
            icon={
              <Icon
                type="material-community"
                name="eye-outline"
                color="#ffffff"
                iconStyle={styles.iconButton}
              />
            }
            buttonStyle={styles.btnView}
            title="Ver historia"
            onPress={() => navigation.navigate("Story", { story })}
          />
        </Card>
      ))}

      {user && <AddStoryButton navigation={navigation} />}
    </ScrollView>
  );
}

function AddStoryButton(props) {
  const { navigation } = props;
  return (
    <ActionButton
      buttonColor="#00a680"
      onPress={() => navigation.navigate("AddStory")}
    />
  );
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
  },
  btnView: {
    backgroundColor: "#00a680",
    borderRadius: 0,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 0,
  },
  imageCard: {
    height: 100,
    marginLeft: 20,
    marginRight: 20,
  },
  bodyCard: {
    margin: 20,
    padding: 0,
  },
  textCard: { margin: 15, fontSize:16 },
  titleCard: {
    fontWeight: "bold",
    fontSize: 25,
    marginLeft: 15,
  },
  iconButton: {
    marginRight: 5,
  },
});
