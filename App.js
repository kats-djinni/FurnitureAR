import React, { Component } from "react";
import { connect } from "react-redux";

import {
  View,
  StyleSheet,
  TouchableHighlight,
  Image,
  Dimensions
} from "react-native";

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
            onPress={this.favoritesButton}>
            <Image width="100" height="100" source={require("./js/res/icons/heart-outline.png")} accessibilityLabel="heart icon" />
          </TouchableHighlight>

          <TouchableHighlight
            onPress={this.productsButton}>
            <Image source={require("./js/res/icons/add-circle.png")} accessibilityLabel="plus icon"/>
          </TouchableHighlight>

          <TouchableHighlight>
            <Image source={require("./js/res/icons/camera.png")} accessibilityLabel="camera icon"/>
          </TouchableHighlight>
        </View>

        <Overlay
          isVisible={this.state.isVisible}
          overlayBackgroundColor = "#E3E8E9"
          width={Dimensions.get("window").width * 0.75}
          height={Dimensions.get("window").height * 0.75}
          onBackdropPress={() => this.setState({ isVisible: false })}
        >
          <AllProducts visibilityChange={this.changeVisibility} />
        </Overlay>

        <Overlay
          isVisible={this.state.visibleFavorites}
          overlayBackgroundColor="#E3E8E9"
          width={Dimensions.get("window").width * 0.75}
          height={Dimensions.get("window").height * 0.75}
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
            onPress={this.deleteButton}
          >
            <Image source={require("./js/res/icons/delete-outline.png")} style={localStyles.itemButton}/>
          </TouchableHighlight>
          
          
          <TouchableHighlight
            onPress={this.deleteButton}
          >
            <Image source={require("./js/res/icons/delete-outline.png")} style={localStyles.itemButton}/>
          </TouchableHighlight>
          
          <TouchableHighlight
            onPress={this.deleteAllButton}
          >
            <Image source={require("./js/res/icons/broom.png")} style={localStyles.itemButton}/>
          </TouchableHighlight>
          
          <TouchableHighlight
            onPress={this.favoritesButton}
          >
            <Image source={require("./js/res/icons/heart-outline.png")} style={localStyles.itemButton}/>
          </TouchableHighlight>
          
        </View>

        <Overlay
          isVisible={this.state.visibleFavorites}
          overlayBackgroundColor="#E5E8E9"
          width={Dimensions.get("window").width * 0.8}
          height={Dimensions.get("window").height * 0.8}
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
    top: 100,
    // paddingTop: 85,
    paddingBottom: 85,
    padding: 20
  },

  itemButton: {
    //Note: tintColor changes color of icon 
    //(e.g. tintColor: "pink"
    resizeMode: "cover",
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
