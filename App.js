import React, { Component } from "react";
import { connect } from "react-redux";
import {
  View,
  TouchableHighlight,
  Image,
  Dimensions,
  Text
} from "react-native";
import util from 'util'
import { deleteProduct, deleteAll } from './js/store/products'
import { getAllFavorites } from './js/store/favorites'
import { ViroARSceneNavigator } from "react-viro";
import { Overlay } from "react-native-elements";
import AllProducts from "./js/components/AllProductPage";
import FavoritesPage from "./js/components/FavoritesPage";
import FavoriteButton from "./js/components/FavoriteButton"
import IntroductionsPage from "./js/components/InstructionsPage"
import SplashScreen from "./js/components/SplashScreen"
import styles from "./styles"


var sharedProps = {
  apiKey: "7C313AAF-F252-430D-9124-1B1DF5CE1CA2"
};

var InitialARScene = require("./js/components/HomeScreen");

// eslint-disable-next-line react/no-multi-comp
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
      photoPreviewVisibility: false,
      isLoading: true,
      visibleInstructions: false,
      searchingPlaneIcon: false
    };
  
  }
  
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        isLoading: false
      })
    }, 3000)

    setTimeout(() => {
      this.setState({
        visibleInstructions: true
      })
    }, 6000)

    setTimeout(() => {
      this.setState({
        visibleInstructions: false
      })
    }, 10000)
  }
  

  productsButton = () => {
    this.setState({ isVisible: true });
  };

  changeVisibility = () => {
    this.setState({ isVisible: !this.state.isVisible });
  };

  searchingPlaneIconVisibility = () => {
    this.setState({searchingPlaneIcon: !this.state.searchingPlaneIcon})
    setTimeout(() => {
      this.setState({
        searchingPlaneIcon: !this.state.searchingPlaneIcon
      })
    }, 3000)
  }
  
  changeFavVisibility = () => {
    this.setState({ visibleFavorites: !this.state.visibleFavorites})
  }
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
      
      <View style={styles.outer}>
        <ViroARSceneNavigator
          style={styles.arView}
          {...this.state.sharedProps}
          initialScene={{ 
            scene: InitialARScene,
            passProps: {trigger: this.triggerItemBar}
          }}
          ref={ARSceneNav => (this.ARSceneNav = ARSceneNav)}
          
        />

        <View style={styles.navBar}>
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
          isVisible={this.state.visibleInstructions}
          overlayBackgroundColor = "transparent"
          width={Dimensions.get("window").width * 0.87}
          height={Dimensions.get("window").height * 0.75}
          onBackdropPress={() => this.setState({ visibleInstructions: false })}
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
          <AllProducts visibilityChange={this.changeVisibility} searchingPlaneIcon={this.searchingPlaneIconVisibility} />
        </Overlay>

       {/* Searching for plan icon after choosing a product from All products page */}
        <Overlay
          isVisible={this.state.searchingPlaneIcon}
          overlayBackgroundColor = "#transparent"
          width={Dimensions.get("window").width * 0.75}
          height={Dimensions.get("window").height * 0.75}
        >
          <View style={localStyles.searchingPage}>
            <Text style={localStyles.savingMessage}>Scan the room and select placement!</Text>
          </View>
        </Overlay>

        <Overlay
          isVisible={this.state.visibleFavorites}
          overlayBackgroundColor="#E3E8E9"
          width={Dimensions.get("window").width * 0.87}
          height={Dimensions.get("window").height * 0.75}
          onBackdropPress={() => this.setState({ visibleFavorites: false })}
        >
          <FavoritesPage favVisibility={this.changeFavVisibility}/>
        </Overlay>
        
        <Overlay
          isVisible={this.state.photoPreviewVisibility}
          overlayBackgroundColor="#E3E8E9"
          width={Dimensions.get("window").width * 0.75}
          height={Dimensions.get("window").height * 0.75}
          onBackdropPress={() => this.setState({ photoPreviewVisibility: false })}
         >
          <Image source={{uri: this.state.screenshotUrl}} style={styles.backgroundImage} />
          
          <View style={styles.savingIcon}>
            <Text style={styles.savingMessage}>saving</Text>
            <Image style={{marginTop: -10}} source={require("./js/res/animation/progressBar.gif")} />
          </View>         
        </Overlay>
        
      </View>
    );
  }
  
  itemButtons = () => {
    const item = this.props.pickedItem[this.state.itemIndex]
    const itemIndex = this.props.products.indexOf(item)

    return (

      <View style={styles.outer}>
        <ViroARSceneNavigator
          style={styles.arView}
          {...this.state.sharedProps}
          initialScene={{ scene: InitialARScene }}
        />
        
        <View style={styles.itemBar}>
          <TouchableHighlight
            onPress={this.deleteButton}
          >
            <Image source={require("./js/res/icons/delete-outline.png")} style={styles.itemButton}/>
          </TouchableHighlight>
          
          <TouchableHighlight
            onPress={this.deleteButton}
          >
            <Image source={require("./js/res/icons/delete-outline.png")} style={styles.itemButton}/>
          </TouchableHighlight>
          
          <TouchableHighlight
            onPress={this.deleteAllButton}
          >
            <Image source={require("./js/res/icons/box-outline.png")} style={styles.itemButton}/>
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
    if (this.state.isLoading) {
      return <SplashScreen />
    }
    if (this.state.visibleItemBar) {
      return this.itemButtons();
    } else {
      return this.homeScreenButtons();
    }
  }
}

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
