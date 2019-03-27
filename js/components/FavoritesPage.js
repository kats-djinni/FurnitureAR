"use strict";

import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Image,
  FlatList,
  TouchableHighlight,
  Dimensions
} from "react-native";
import { connect } from "react-redux";
import { Card, Text, Button } from "react-native-elements";
import {
  removeFavorite,
  getAllFavorites,
  removeAllFavorites
} from ".././store/favorites"
import { pickProduct } from ".././store/products";
import FavoriteButton from "./FavoriteButton";

export class FavoritesPage extends Component {
  constructor() {
    super();
    this.state = {
      favorites: []
    };
  }

  async componentDidMount() {
    await this.props
      .getFavorites()
      .then(favorites => {
        this.setState({ favorites: this.props.favorites });
      })
      .catch(console.error);
  }

  _deleteFavorite = async item => {
    await this.props.removeFavorite(item);
    await this.props.getFavorites();
    this.setState({
      favorites: this.props.favorites
    })
  }
  
  _handlePress = async (item) => {
    await this.props.addPickedItem(item);
    this.props.favVisibility();
  }

  render() {
    return !this.props.favorites.length ? (
      <View style={styles.container}>
        <Card>
        <Image 
          source={require('../res/sad_face.png')} 
          style={styles.noFavesImage}
        />
        <Text style={styles.noFavesText}>Looks like you don't have any favorites yet. Time to go browsing!</Text>
        </Card>
      </View>
    ) : (
      <View style={styles.container}>
        <Text h3 style={styles.header}>
          Favorites
        </Text>

        <FlatList
          data={this.state.favorites}
          renderItem={({item }) => (
            <View style={styles.container}>
              <Card
                title={<Text style={styles.itemName}>{item.displayName}</Text>}
              >
                  <TouchableHighlight onPress={() => this._handlePress(item)}>
                    <Image
                      style={styles.faveImage}
                      source={{ uri: item.thumbnail }}
                    />
                  </TouchableHighlight>
              <TouchableHighlight onPress={() => this._deleteFavorite(item)}>
                <View style={styles.imageContainer}>
                  <Image
                    style={styles.deleteButton}
                    source={require(".././res/icons/clear-circle.png")}
                  />
                </View>
              </TouchableHighlight>
              </Card>
              
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        >
        
        </FlatList>
        <Button
          type="solid"
          raised={true}
          buttonStyle={styles.clearButton}
          title="Clear All"
          titleProps={styles.buttonText}
          // containerStyle={{ width: Dimensions.get("window").width * 0.55 }}
          onPress={() => this.props.clearFavorites()}
        />
      </View>
    );
  }
}

var styles = StyleSheet.create({

  container: {
    textAlignVertical: "center",
    textAlign: "center",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center"
  },

  faveImage: {
    width: 150,
    height: 150,
    alignSelf: "center"
  },

  noFavesImage: {
      width: 185,
      height: 185,
  },

  itemName: {
    fontWeight: "bold",
    textAlign: "center",
    padding: 5,
    fontFamily: "Didot",
    fontSize: 15
  },

  imageContainer: {
    justifyContent: "center",
    alignItems: "center"
  },

  header: {
    textAlign: "center",
    color: "#394730",
    fontFamily: "Didot-Bold"
  },

  noFavesText: {
    color: "#394730",
    fontWeight: "bold",
    fontFamily: "Didot",
    fontSize: 35
  },

  deleteButton: {
    tintColor: "#D85A60"
  },

  clearButton: {
    backgroundColor: "#394730"
  },

  buttonText: {
    color: "#F8FBF5",
    fontWeight:"bold",
    fontFamily: "Didot"
  }
});

const mapStateToProps = state => {
  return {
    favorites: state.favorites.favorites
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getFavorites: () => dispatch(getAllFavorites()),
    removeFavorite: (index) => dispatch(removeFavorite(index)),
    clearFavorites: () => dispatch(removeAllFavorites()),
    addPickedItem: item => dispatch(pickProduct(item)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FavoritesPage);
