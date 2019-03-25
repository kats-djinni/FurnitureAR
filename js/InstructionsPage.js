"use strict";

import React, {Component} from "react";

import { 
    StyleSheet,
    View,
    Image,
    Dimensions
} from "react-native";

import { Text} from "react-native-elements";

const InstructionsPage = () => {
    return (
        <View style={styles.container}>
            <View style={styles.buttonOption}>
                < Text style = {styles.optionText}> check favorite products </Text>
                <Image style={styles.arrow} source={require("./res/left-arrow.png")} />
            </View>
            <View style={styles.buttonOption}>
                <Text style={styles.optionText}>add a product</Text>
                <Image style={styles.arrow} source={require("./res/straight-arrow.png")} />
            </View>
            <View style={styles.buttonOption}>
                <Text style={styles.optionText}>take a screenshot</Text>
                <Image style={styles.arrow} source={require("./res/right-arrow.png")} />
            </View>
        </View>
    )

}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    // alignContent: "flex-end",
    // justifyContent: "flex-end",
    backgroundColor: "transparent",
    // textAlignVertical: "center",
    // textAlign: "center",
  },

  buttonOption: {
    // position: "relative",
    flex: 3,
    alignContent: "flex-end",
    flexDirection: "column",
    flexWrap: "wrap",
    alignSelf: "flex-end",
    margin: 10,
    padding: 2
  },

  arrow: {
      position: "relative",
      width: Dimensions.get("window").width * 0.15,
      height: 55,
      margin: "auto",
      tintColor: "#D85A60",
      shadowColor: "white",
      left: "12%"
  },

  optionText: {
      color: "white",
      fontWeight: "bold",
      fontFamily: "AlNile-Bold",
      marginBottom: 5
  }
})

export default InstructionsPage