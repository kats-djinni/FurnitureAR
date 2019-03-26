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
import { connect } from "react-redux"
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
    super()
    this.state = {
      favorites: []
    }
  }

  async componentDidMount() {
    await this.props.getFavorites()
    .then(favorites => {
      this.setState({favorites: this.props.favorites})
    })
    .catch(console.error)
  }

  _deleteFavorite = async (index) => {
    await this.props.removeFavorite(index)
    await this.props.getFavorites()
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
      <View style={styles.listContainer}>
        <Text style={styles.AllProductPage}>No favorites</Text>
      </View>
    ) : (
      <View style={styles.listContainer}>
        <Text h4 style={styles.header}>
          Favorites
        </Text>

        <FlatList
          data={this.state.favorites}
          renderItem={({ item, index }) => (
            <View>
              <Card>
                <Text style={styles.itemName}>{item.displayName}</Text>
                  <TouchableHighlight onPress={() => this._handlePress(item)}>
                    <Image
                      style={styles.faveImage}
                      source={{ uri: item.thumbnail }}
                    />
                  </TouchableHighlight>
              </Card>
              <TouchableHighlight onPress={() => this._deleteFavorite(index)}>
                <View style={styles.imageContainer}>
                  <Image
                    tintColor="red"
                    source={require(".././res/icons/clear-icon.png")}
                  />
                </View>
              </TouchableHighlight>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
        <Button
          type="outline"
          raised={true}
          buttonStyle={styles.clearButton}
          title="Clear All"
          containerStyle={{ width: Dimensions.get("window").width * 0.55 }}
          onPress={() => this.props.clearFavorites()}
        />
      </View>
    );
  }
}

var styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    flexDirection: "column",
    flexWrap: "wrap",
    fontFamily: "Arial",
    fontSize: 50,
    color: "#444B50",
    textAlignVertical: "center",
    textAlign: "center",
    margin: 20
  },
  SingleItem: {
    flex: 1
  },
  faveImage: {
    resizeMode: "cover",
    width: 150,
    height: 150
  },

  itemName: {
    fontWeight: "bold",
    textAlign: "center",
    padding: 5
  },

  imageContainer: {
    justifyContent: "center",
    alignItems: "center"
  },

  header: {
    textAlign: "center",
    color: "#444B50"
  },

  clearButton: {
    // width: Dimensions.get("window").width * 0.5
  }
})

const mapStateToProps = (state) => {
    return {
      favorites: state.favorites.favorites
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getFavorites: () => dispatch(getAllFavorites()),
    removeFavorite: (index) => dispatch(removeFavorite(index)),
    clearFavorites: () => dispatch(removeAllFavorites()),
    addPickedItem: item => dispatch(pickProduct(item)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FavoritesPage)
