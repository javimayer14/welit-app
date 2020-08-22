import React, { useState, useEffect, useReducer } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { Icon, Avatar, Divider, Card } from "react-native-elements";
import Modal from "../../components/Modal";
import { ListItem } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import  * as URLs from "../../../assets/constants/fetchs"

export default function UserScores(props) {
  const [isVisibleModal, setIsVisibleModal] = useState(false);

  const { userInfo } = props;
  const [userLoged, setUSerLoged] = useState({});

  useEffect(() => {
    function FindUserLoged() {
      const uid = userInfo.uid;
      return fetch(`${URLs.HEROKU_URL}/api/usuario/${uid}`)
        .then((response) => response.json())
        .then((json) => {
          setUSerLoged(json);
          console.log("asdads" + uid);
          return json;
        })
        .catch((error) => {
          console.error(error);
        });
    }
    FindUserLoged();
  }, []);

  return (
    <View>
      <View style={styles.viewCard}>
        <Card containerStyle={styles.cardStyle}>


          <View>
          <Text style={styles.txtRango} onPress={()=> setIsVisibleModal(true)}>{userInfo.rango.descripcion}</Text>
          <Divider />
          <Medallas userInfo={userInfo}/>
          <Divider />
            <Text style={styles.txtPuntos} >Experiencia: {userInfo.score.puntuacion} Pts</Text>
          </View>
        </Card>
      </View>
      <Divider />
      <Categoria rango={userInfo.rango.descripcion} />
      <Divider />

      <Modal isVisible={isVisibleModal} setIsVisible={setIsVisibleModal}>
        <ViewRangos />
     
      </Modal>
    </View>
  );
  function Categoria(props) {
    const { rango } = props;
    return (
      <View style={styles.viewCategoria}>
        {/* <Avatar
          rounded
          size="medium"
          containerStyle={styles.userInfoAvatar}
          source={{
            uri: "https://api.adorable.io/avatars/285/abott@adorable.png"
          }}
        /> */}
        <Text onPress={() => setIsVisibleModal(true)} style={styles.categoria}>
          {rango}
        </Text>
      </View>
    );
  }
}

const Medallas = (props) =>{
  const { userInfo } = props;

return (
  <View style={styles.view}>
  <View style={styles.viewCountMedal}>
    {userInfo.score.medallaOro ? (
      <Icon
        type="material-community"
        name="medal"
        color="#FFD700"
        size={70}
      />
    ) : (
      <Icon
      type="material-community"
      name="medal"
      color="#EEE"
      size={70}
    />
    )}
    <Text style={styles.textBronze}>{userInfo.score.medallaOro}</Text>
  </View>
  <View style={styles.viewCountMedal}>
    {userInfo.score.medallaPlata ? (
      <Icon
        type="material-community"
        name="medal"
        color="#B9B9B9"
        size={70}
      />
    ) : (
      <Icon
      type="material-community"
      name="medal"
      color="#EEE"
      size={70}
    />
    )}
    <Text style={styles.textSilver}>{userInfo.score.medallaPlata}</Text>
  </View>
  <View style={styles.viewCountMedal}>
    {userInfo.score.medallaBronce ? (
      <Icon
        type="material-community"
        name="medal"
        style={styles.medal}
        color="#8C7853"
        size={70}
      />
    ) : (
      <Icon
      type="material-community"
      name="medal"
      color="#EEE"
      size={70}
    />
    )}
    <Text style={styles.textGold}>{userInfo.score.medallaBronce}</Text>
  </View>
</View>
)
}

function ViewRangos() {
  console.log("rangos");
  const list = [
    {
      name: "Pluma plateada 1 ",
      avatar_url:
        "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
      subtitle: "(PP1)",
    },
    {
      name: "Pluma plateada 2",
      avatar_url:
        "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
    },
    {
      name: "Pluma plateada 3",
      avatar_url:
        "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
    },
    {
      name: "Pluma plateada selecta",
      avatar_url:
        "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
    },
    {
      name: "Pluma dorada 1",
      avatar_url:
        "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
    },
    {
      name: "Pluma dorada 2",
      avatar_url:
        "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
    },
    {
      name: "Pluma dorada 3",
      avatar_url:
        "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
    },
    {
      name: "Pluma dorada master",
      avatar_url:
        "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
    },
    {
      name: "Dramaturgo distinguido 1",
      avatar_url:
        "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
    },
    {
      name: "Dramaturgo distinguido 2",
      avatar_url:
        "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
    },
    {
      name: "Dramaturgo distinguido selecto",
      avatar_url:
        "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
    },
    {
      name: "Guardian de las letras",
      avatar_url:
        "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
    },
    {
      name: "Novelista legendario",
      avatar_url:
        "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
    },
    {
      name: "Novelista legendario master",
      avatar_url:
        "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
    },
    {
      name: "Escritor supremo",
      avatar_url:
        "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
    },
    {
      name: "Escritor supremo mundial",
      avatar_url:
        "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
    },
  ];
  return (
    <ScrollView>
      {list.map((l, i) => (
        <ListItem
          key={i}
          leftAvatar={{ source: { uri: l.avatar_url }, size: "medium" }}
          title={l.name}
          subtitle={l.subtitle ? l.subtitle : null}
          titleStyle={{ fontSize: 20 }}
          bottomDivider
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  view: {
    justifyContent: "center",
    flexDirection: "row",
    marginLeft: 30,
    marginRight: 30,
  },
  image: {
    height: 50,
    width: 50,
    marginBottom: 2,
  },
  textGold: {
    fontWeight: "bold",
    fontSize: 19,
    marginBottom: 10,
    textAlign: "center",
    color: "#8C7853",
  },
  textSilver: {
    fontWeight: "bold",
    fontSize: 19,
    marginBottom: 10,
    textAlign: "center",
    color: "#B9B9B9",
  },
  textBronze: {
    fontWeight: "bold",
    fontSize: 19,
    marginBottom: 10,
    textAlign: "center",
    color: "#FFD700",
  },
  medal: {},
  viewCountMedal: {
    justifyContent: "center",
    marginBottom: 20,
  },
  categoria: {
    alignContent: "center",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 20,
  },
  userInfoAvatar: {
    marginRight: 20,
    marginLeft: 20,
  },
  viewCategoria: {
    alignContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  viewCard: {
    alignItems: "center",
    alignSelf: "center",
    position: "absolute",
    top: '-150%',
    width:"100%"

  },
  cardStyle:{
    width:"80%"
  },
  txtPuntos:{
    alignSelf:"center",
    fontSize:15,
    marginTop:10
    },
    txtRango:{
      alignSelf:"center",
      fontSize:20,
      marginBottom:10
    }
});
