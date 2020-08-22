import React, { useState,useEffect } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { Card, ListItem, Button, Icon } from "react-native-elements";
import Carousel from "react-native-banner-carousel";
import  * as URLs from "../../assets/constants/fetchs"

export default function CarouselComents(props) {

  const { arrayComents, width, user, setIsVisibleModalLogin } = props;
  const [comentsState, setComentsState] = useState(arrayComents);


  // useEffect(()=>{
  //   let coments=[]
  //   comentsState.map((c)=>{
  //     const usuario = c.usuario
  //     if(usuario?.id === user?.id){
  //       c = {...c, liked:true}
  //       coments.push(c)
  //     }
  //     setComentsState(coments)
  //   })

  // })
  const incrementLikeRequest = (coment) => { 
    console.log('coment.id:',parseInt(coment.id))
    console.log('user.id:',user?.uid)

    fetch(`${URLs.HEROKU_URL}/api/reacciones`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      }, 
      body: JSON.stringify({
        comentario:{
          id : parseInt(coment.id)
        },
        usuario:{
          id:user?.uid
        }
      }),
    });
  };

  const isDisable =(reactionList)=> {
    console.log('reactionList ',reactionList)
    console.log('reactionList ',reactionList.includes(user?.uid))

    return reactionList.includes(user?.uid) 
  }
  const incrementLike = (index) => {
      if (user) {
      let coment = comentsState[index];
      incrementLikeRequest(coment);
      console.log("LAAL");
      coment.reacciones.push('temporal')
      coment.disable = true;
      setComentsState([...comentsState]);
      } else {
       setIsVisibleModalLogin(true);
     }
  }
  const comentsParticiping = comentsState.filter((coments)=>{
    return coments.participando == 1 && coments.ganador == 0
  })
console.log(comentsParticiping,"comentsParticiping")
  return (
    <View style={styles.container}>
      {comentsParticiping.length !== 0 ?
    <Carousel
      autoplay
      autoplayTimeout={15000}
      loop
      index={0}
      pageSize={width}
      pageIndicatorStyle={styles.indicator}
      activePageIndicatorStyle={styles.indicatorActive}
    >
      {comentsParticiping.map((comentario, index) =>
        
          <Card
            key={index}
            titleStyle={styles.titleCard}
            title={comentario.usuario.nombre}
            width={width * 0.9}
            containerStyle={styles.card}
          >
            <Text style={{ marginBottom : 10, fontSize: 18, textAlign:"justify" }}>
              {comentario.comentario}
            </Text>
              <Button
                icon={
                  <Icon
                    type="material-community"
                    name="heart"
                    color= {isDisable(comentario.reacciones) || comentario.disable ? "#CCC" : "#00a680"}
                    size={35}
                  />
                }
                onLongPress={()=>{console.log("LONG")}}
                buttonStyle={styles.btnView}
                containerStyle={styles.btnContainer}
                title={comentario.reacciones.length < 1 ? '0' : comentario.reacciones.length}
                type="outline"
                disabled={isDisable(comentario.reacciones)}
                onPress={() => {isDisable(comentario.reacciones) || comentario.disable ? null : incrementLike(index)} }
              />
          
          </Card>
      )}
    </Carousel>
    : <Text style={styles.comentsEmpty}>¡Se el primero en continuar con la historia aportando tu fragmento!</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignSelf:"center"
},
  indicator: {
    backgroundColor: "#00a680",
  },
  indicatorActive: {
    backgroundColor: "#00ffc5",
  },
  card: {
    alignItems: "center",
    alignContent: "center",
 alignSelf:"center"

  },
  btnView: {
    borderRadius: 0,
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 10,
  },
  btnContainer: {
    alignItems: "flex-start",
  },
  titleCard:{
    flexDirection:"row",
    alignSelf:"flex-start"
  },
  comentsEmpty:{
    margin:40,
    fontSize:15,
    textAlign:"center",
    color:"#00a680"
  }
});
