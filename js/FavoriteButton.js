import React, { Component } from "react";
import { View, StyleSheet, Image, TouchableHighlight } from "react-native";
import { connect } from "react-redux";
import { storeFavorite, removeFavorite } from "./store/favorites";

export class FavoriteButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: null
    };
  }

  async componentDidMount() {
    const bool = await this.props.active;

    await this.setState({ active: bool });
  }

  handlePress = async () => {
    this.setState({ active: !this.state.active });
    if (this.state.active === false) {
      await this.props.addFavorite(this.props.faveItem);
    } else if (this.state.active === true) {
      await this.props.removeFavorite(this.props.faveItem);
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

const mapDispatchToProps = dispatch => {
  return {
    addFavorite: item => dispatch(storeFavorite(item)),
    removeFavorite: index => dispatch(removeFavorite(index))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(FavoriteButton);

var styles = StyleSheet.create({
  btnActive: {},

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
