import React, { Component } from "react";
import { connect } from "react-redux";
import { View, StyleSheet, TouchableHighlight, Image } from "react-native";
import { deleteProduct, deleteAll } from './js/store/products'
import { ViroARSceneNavigator } from "react-viro";

import { Overlay } from "react-native-elements";
import AllProducts from "./js/AllProductPage";
import FavoritesPage from "./js/FavoritesPage";

var sharedProps = {
  apiKey: "7C313AAF-F252-430D-9124-1B1DF5CE1CA2"
};

var InitialARScene = require("./js/HomeScreen");

export default class ViroSample extends Component {
  constructor() {
    super();

    this.state = {
      sharedProps: sharedProps,
      isVisible: false,
      visibleFavorites: false,
      visibleItemBar: false,
      // selectedItem: {},
      itemIndex: 0
    };
  }

  productsButton = () => {
    this.setState({ isVisible: true });
  };

  changeVisibility = () => {
    this.setState({ isVisible: !this.state.isVisible });
  };
  
  triggerItemBar = (key) => {
    this.setState({
      visibleItemBar: !this.state.visibleItemBar,
      itemIndex: key
    })

  }

  favoritesButton = () => {
    this.setState({
      visibleFavorites: true
    });
  };

  deleteButton = async () => {
    await this.props.deleteProduct(this.state.itemIndex)
    this.setState({visibleItemBar: !this.state.visibleItemBar})
    }

  
  deleteAllButton = () => {
    this.props.deleteAll()
    this.setState({visibleItemBar: !this.state.visibleItemBar})
  }
  
  homeScreenButtons = () => {
    return (
      
      <View style={localStyles.outer}>
        <ViroARSceneNavigator
          style={localStyles.arView}
          {...this.state.sharedProps}
          initialScene={{ 
            scene: InitialARScene,
            passProps: {trigger: this.triggerItemBar}
          }}
          
        />

        <View style={localStyles.navBar}>
          <TouchableHighlight
            underlayColor={"#00000000"}
            onPress={this.productsButton}
          >
            <Image source={require("./js/res/btn_mode_objects.png")} />
          </TouchableHighlight>

          <TouchableHighlight
            underlayColor={"#00000000"}
            onPress={this.favoritesButton}
          >
            <Image source={require("./js/res/btn_mode_objects.png")} />
          </TouchableHighlight>

          <TouchableHighlight underlayColor={"#00000000"}>
            <Image source={require("./js/res/btn_mode_objects.png")} />
          </TouchableHighlight>
        </View>

        <Overlay
          isVisible={this.state.isVisible}
          overlayBackgroundColor="#ACC6C7"
          width="auto"
          height="auto"
          onBackdropPress={() => this.setState({ isVisible: false })}
        >
          <AllProducts visibilityChange={this.changeVisibility} />
        </Overlay>

        <Overlay
          isVisible={this.state.visibleFavorites}
          overlayBackgroundColor="#E5E8E9"
          width="auto"
          height={700}
          onBackdropPress={() => this.setState({ visibleFavorites: false })}
        >
          <FavoritesPage />
        </Overlay>
      </View>
    );
  }
  
  itemButtons = () => {
    return (
      
      <View style={localStyles.outer}>
        <ViroARSceneNavigator
          style={localStyles.arView}
          {...this.state.sharedProps}
          initialScene={{ scene: InitialARScene }}
        />

        <View style={localStyles.itemBar}>
          <TouchableHighlight
            underlayColor={"#00000000"}
            onPress={this.deleteButton}
          >
            <Image source={require("./js/res/btn_mode_objects.png")} />
          </TouchableHighlight>

          <TouchableHighlight
            underlayColor={"#00000000"}
            onPress={this.deleteAllButton}
          >
            <Image source={require("./js/res/btn_mode_objects.png")} />
          </TouchableHighlight>

          <TouchableHighlight
            underlayColor={"#00000000"}
            onPress={this.favoritesButton}
          >
            <Image source={require("./js/res/btn_mode_objects.png")} />
          </TouchableHighlight>

        </View>

        <Overlay
          isVisible={this.state.visibleFavorites}
          overlayBackgroundColor="#E5E8E9"
          width="auto"
          height={700}
          onBackdropPress={() => this.setState({ visibleFavorites: false })}
        >
          <FavoritesPage />
        </Overlay>
      </View>
    );
  }
  
  
  render() {
    if (this.state.visibleItemBar) {
      return this.itemButtons();
    } else {
      return this.homeScreenButtons();
    }
  }
}

var localStyles = StyleSheet.create({
  outer: {
    flex: 1
  },

  arView: {
    flex: 1
  },

  buttons: {
    height: 80,
    width: 80,
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#f0f8ff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#00000000"
  },

  navBar: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 77
  },
  
  itemBar: {
    flex: 1,
    alignSelf: "flex-end",
    position: "absolute",
    top: 100
  }
});

const mapStateToProps = state => ({
  products: state.products.products,
  pickedItem: state.products.pickedProducts
});

const mapDispatchToProps = dispatch => ({
  deleteProduct: (item) => dispatch(deleteProduct(item)),
  deleteAll: () => dispatch(deleteAll())
});

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(ViroSample);
