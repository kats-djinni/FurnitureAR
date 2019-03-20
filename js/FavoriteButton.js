import React, { Component } from "react";
import { View, StyleSheet, AsyncStorage, Image, TouchableHighlight } from "react-native";
import { Button } from "react-native-elements";

export default class FavoriteButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false
    };
  }

  handlePress = () => {
    this.setState({ active: !this.state.active });
    console.log("this.props.faveItem: ", this.props.faveItem);
    this._storeFavorite(this.props.faveItem);
  };

  _storeFavorite = async item => {
    console.log("inside _storeFavorite");
    try {
      const faveStr = await AsyncStorage.getItem("favorites");

      if (faveStr !== null) {
        const favesArr = JSON.parse(faveStr);
        const faves = [...favesArr, item];
        await AsyncStorage.setItem("favorites", JSON.stringify(faves));
      } else {
        await AsyncStorage.setItem("favorites", JSON.stringify([item]));
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
    <View style={{justifyContent: "center"}}>
      <TouchableHighlight onPress={() => this.handlePress()}   style={this.state.active ? styles.btnActive : styles.btn}>
            <Image source={require("./res/icons/solid-heart.png")} />
        </TouchableHighlight>
    </View>
    );
  }
}

var styles = StyleSheet.create({
  btnActive: {
    fontFamily: "Arial",
    fontSize: 50,
    color: "#000000",
    textAlignVertical: "center",
    textAlign: "center",
    // margin: 20
  },

  btn: {
    flex: 1,
    padding: 10
  }
});
