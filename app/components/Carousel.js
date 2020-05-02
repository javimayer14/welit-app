import React, { useState } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { Card, ListItem, Button, Icon } from "react-native-elements";
import Carousel from "react-native-banner-carousel";

export default function CarouselComents(props) {
  const q = 4;
  const { arrayComents, height, width, user, setIsVisibleModalLogin } = props;
  const [comentsState, setComentsState] = useState(arrayComents);
  console.log("AARRAY COMMENTS" + comentsState);

  return (
    <Carousel
      autoplay
      autoplayTimeout={15000}
      loop
      index={0}
      pageSize={width}
      pageIndicatorStyle={styles.indicator}
      activePageIndicatorStyle={styles.indicatorActive}
    >
      {comentsState.map((comentario, index) =>
        comentario.ganador == 0 ? (
          <Card
            key={index}
            title={comentario.usuario.usuario}
            width={width * 0.8}
            containerStyle={styles.card}
          >
            <Text style={{ marginBottom: 10, fontSize: 20 }}>
              {comentario.comentario}
            </Text>
            <Button
              icon={
                <Icon
                  type="material-community"
                  name="heart"
                  color="#00a680"
                  size={35}
                />
              }
              buttonStyle={styles.btnView}
              containerStyle={styles.btnContainer}
              title={(comentario.mg).toString()}
              type="outline"
              onPress={() => incrementLike(index)}
            />
          </Card>
        ) : null
      )}
    </Carousel>
  );

  function incrementLike(index) {
    if (user) {
      const coment = comentsState[index];
      coment.mg += 1;
      coment.disable = true;
      console.log(coment);
      setComentsState([...comentsState]);

      // setComentsState([...comentsState, comentsState[index] = {...comentsState[index],index:{coment}}])
    } else {
      setIsVisibleModalLogin(true);
    }
  }
}

const styles = StyleSheet.create({
  indicator: {
    backgroundColor: "#00a680",
  },
  indicatorActive: {
    backgroundColor: "#00ffc5",
  },
  card: {
    alignItems: "center",
    alignContent: "center",
    width: 350,
    marginLeft: 0,
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
});
