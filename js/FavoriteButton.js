import React, { Component } from "react";
import {
  View,
  StyleSheet,
  AsyncStorage,
  Image,
  TouchableHighlight
} from "react-native";
import { Button } from "react-native-elements";

export default class FavoriteButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: null
    };
  }

  async componentDidMount() {
    const bool = await this.props.active;
    this.setState({ active: bool });
  }

  handlePress = () => {
    this.setState({ active: !this.state.active });
    this._storeFavorite(this.props.faveItem);
  };

  _storeFavorite = async item => {
    try {
      const faveStr = await AsyncStorage.getItem("favorites");

      if (faveStr !== null) {
        const favesArr = JSON.parse(faveStr);
        const duplicate = favesArr.filter(
          products => products.displayName === item.displayName
        );
        if (duplicate.length) {
          const check = await this.props.remove();
        } else {
          const faves = [...favesArr, item];
          await AsyncStorage.setItem("favorites", JSON.stringify(faves));
        }
      } else {
        await AsyncStorage.setItem("favorites", JSON.stringify([item]));
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <View style={{ justifyContent: "center" }}>
        <TouchableHighlight
          onPress={() => this.handlePress()}
          style={this.state.active ? styles.btnActive : styles.btn}
        >
          <Image
            style={this.state.active ? styles.imageActive : styles.image}
            source={require("./res/icons/heart-outline.png")}
          />
        </TouchableHighlight>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  btnActive: {
    color: "#000000"
  },

  btn: {
    flex: 1,
    padding: 10
  },
  imageActive: {
    tintColor: "red"
  },
  image: {
    tintColor: "white"
  }
});
