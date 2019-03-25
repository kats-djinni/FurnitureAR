import React, { Component } from "react";
import { connect } from "react-redux";
import {
  View,
  StyleSheet,
  TouchableHighlight,
  Image,
  Dimensions,
  Text
} from "react-native";

import { deleteProduct, deleteAll } from './js/store/products'
import { getAllFavorites } from './js/store/favorites'
import { ViroARSceneNavigator } from "react-viro";

import { Overlay } from "react-native-elements";
import AllProducts from "./js/AllProductPage";
import FavoritesPage from "./js/FavoritesPage";
import FavoriteButton from "./js/FavoriteButton"
import IntroductionsPage from "./js/InstructionsPage"

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
      itemIndex: 0,
      cameraPermission: false,
      screenshotUrl:'',
      photoPreviewVisibility: false
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
  
  takeScreenShot = async () => {
    const res = await this.ARSceneNav.sceneNavigator.takeScreenshot(`picture`, true)

    this.setState({ 
      screenshotUrl: "file://" + res.url,
      photoPreviewVisibility: true
    });
    
    setTimeout(() => {
      this.setState({
        photoPreviewVisibility: !this.state.photoPreviewVisibility,
      })
    }, 3000) 
  }
  
  _deletePreview = () => {
    this.setState({photoPreviewVisibility: !this.state.photoPreviewVisibility})
  }
  
  favoritesButton = () => {
    this.setState({visibleFavorites: true})
  };

  singleItemFavoriteButton = () => {
      this.setState({
        visibleItemBar: !this.state.visibleItemBar
      })
  }

  filterFave = async item => {
    try {
      const faveArr = this.props.favorites
      if (faveArr !== null) {
        const duplicate = faveArr.filter(
          products => products.displayName === item.displayName
        )
        if (duplicate.length) {
          return true;
        } else {
          return false
        }
      } else {
        return false
      }
    } catch (error) {
      console.log(error);
    }
  }

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
          ref={ARSceneNav => (this.ARSceneNav = ARSceneNav)}
          
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

          <TouchableHighlight
            onPress={this.takeScreenShot}>
            <Image source={require("./js/res/icons/camera.png")} accessibilityLabel="camera icon"/>
          </TouchableHighlight>
        </View>

        <Overlay
          isVisible={this.state.visibleFavorites}
          overlayBackgroundColor = "transparent"
          width={Dimensions.get("window").width * 0.87}
          height={Dimensions.get("window").height * 0.75}
          onBackdropPress={() => this.setState({ visibleFavorites: false })}
        >
          <IntroductionsPage />
        </Overlay>
        
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
          width={Dimensions.get("window").width * 0.87}
          height={Dimensions.get("window").height * 0.75}
          onBackdropPress={() => this.setState({ visibleFavorites: false })}
        >
          <FavoritesPage />
        </Overlay>
        
        <Overlay
          isVisible={this.state.photoPreviewVisibility}
          overlayBackgroundColor="#E3E8E9"
          width={Dimensions.get("window").width * 0.75}
          height={Dimensions.get("window").height * 0.75}
          onBackdropPress={() => this.setState({ photoPreviewVisibility: false })}
         >
          <Image source={{uri: this.state.screenshotUrl}} style={localStyles.backgroundImage} />

          <View style={localStyles.savingIcon} display={"flex"}>
            <Text style={localStyles.savingMessage}>saving...</Text>
            <Image source={require("./js/res/animation/progressBar.gif")} />
          </View>         
        </Overlay>
        
      </View>
    );
  }
  
  itemButtons = () => {
    const item = this.props.pickedItem[this.state.itemIndex]
    const itemIndex = this.props.products.indexOf(item)

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

          <FavoriteButton faveItem={item} itemIndex={itemIndex} active={this.filterFave(item)} onPress={this.singleItemFavoriteButton} />
    
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
  },
  savingIcon: {
    flex: 1,
    alignSelf: "center",
    justifyContent: "center",
  },
  savingMessage : {
    textAlign: 'center',
    fontFamily: "Arial",
    fontWeight: 'bold',
    fontSize: 30,
    color: "#fff",
    backgroundColor:  'rgba(62, 244, 95, 0.5)'
  },
  
  backgroundImage: {
    position: 'absolute',
    top: 5,
    left: 5,
    bottom: 5,
    right: 5,
  }
});

const mapStateToProps = state => ({
  products: state.products.products,
  pickedItem: state.products.pickedProducts,
  favorites: state.favorites.favorites
});

const mapDispatchToProps = dispatch => ({
  deleteProduct: (item) => dispatch(deleteProduct(item)),
  deleteAll: () => dispatch(deleteAll()),
  getFavorites: () => dispatch(getAllFavorites())
});

module.exports = connect(mapStateToProps,mapDispatchToProps)(ViroSample);
