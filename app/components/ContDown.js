import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Text } from "react-native-elements";

export default function ContDown(props) {
  const [seconds, setSeconds] = useState();
  const [minutes, setMinutes] = useState();
  const [hours, setHours] = useState();

  const {timeFinish, showAlert, setRender, onFinish} = props 
  const { FinishHour, FinishMinutes } = timeFinish
  useEffect(() => {
      
    })

  const diff = () => {
    // fecha actual en milisegundos 
    let now = new Date().getTime();
    //Hora de finalizacion de la ronda
    let finishTime = finishRoundTime();
    // diferencia entre hora actual y hora de finalizacion
    let distance = finishTime.getTime() - now;
    return distance;
  };

  const finishRoundTime = () => {
    let countDownDate = new Date();
    countDownDate.setHours(FinishHour ? FinishHour : 20,FinishMinutes ? FinishMinutes : 0, 0, 0);
    return countDownDate;
  };

  const addDayToDistance = () => {
    let finishTime = finishRoundTime();
    finishTime =
      finishTime.getTime() + 24 * 60 * 60 * 1000 - new Date().getTime();
    return finishTime;
  };

  const calculateHour = (distance) => {
    var hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    setHours(hours);
  };

  const calculateMunutes = (distance) => {
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    setMinutes(minutes);
  }
  ;
  const calculateSeconds = (distance) => {
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    setSeconds(seconds);
  };


  var x = setInterval(function () {
    let distance = diff();
   

    let a  = finishRoundTime()


    if (a === new Date()) {
      console.log("DISTANCE ENTRO PORQUE SON IGUALES",distance)
      

    }
    if (distance < 0) {
      distance = addDayToDistance();

    }

    calculateSeconds(distance);
    calculateMunutes(distance);
    calculateHour(distance);

  }, 1000);
  return (
    <View style={styles.contdownContainer}>
      <View style={styles.numbreContain}>
        <Text style={styles.numberContDown}>
          {hours < 10 ? "0" + hours : hours}
        </Text>
      </View>
      <Text style={styles.separator}>:</Text>
      <View style={styles.numbreContain}>
        <Text style={styles.numberContDown}>
          {minutes < 10 ? "0" + minutes : minutes}
        </Text>
      </View>
      <Text style={styles.separator}>:</Text>
      <View style={styles.numbreContain}>
        <Text style={styles.numberContDown}>
          {seconds < 10 ? "0" + seconds : seconds}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  numberContDown: {
    fontSize: 30,
    fontWeight: "bold",

    textAlign: "center",
  },
  contdownContainer: {
    flexDirection: "row",
  },
  numbreContain: {
    flexDirection: "row",
    margin: 5,
    padding: 15,
    backgroundColor: "#FFF",
    borderRadius: 10,
    borderWidth: 3,
    borderColor: "#00a680",
  },
  separator: {
    fontSize: 30,
    marginTop: 20,
    fontWeight: "bold",
  },
});
