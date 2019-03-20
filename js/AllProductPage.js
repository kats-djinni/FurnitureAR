"use strict";

import React, { Component } from "react";

import {
  StyleSheet,
  View,
  Image,
  TouchableHighlight,
  Button,
  AsyncStorage,
  FlatList
} from "react-native";
import { connect } from "react-redux"
import { Text } from "react-native-elements"
import { getAllProducts, pickProduct } from "./store/products";
import FavoriteButton from "./FavoriteButton";

class AllProductPage extends Component {
  componentDidMount() {
    this.props.getProducts();
  }

  handlePress = event => {
    this.props.addPickedItem(event);
    this.props.visibilityChange();
  };

  _storeFavorite = async item => {
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
    console.log("this.props.children: ", this.props.children);
    return (
      <View style={styles.listContainer}>
        <Text h4 style={styles.AllProductPage}>Choose Products</Text>
        <FlatList
          data={this.props.products}
          renderItem={({ item }) => (
            <View>
              <Text>Name: {item.displayName}</Text>
              <TouchableHighlight
                onPress={() => this.handlePress(item)}
                style={{ width: 200, height: 200 }}
              >
                <Image
                  style={{ width: 200, height: 200 }}
                  source={{ uri: item.thumbnail }}
                />
              </TouchableHighlight>
              <View style={styles.imageContainer}>
                <FavoriteButton faveItem={item} />
              </View>
            </View>
          )}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }
}

var styles = StyleSheet.create({
  AllProductPage: {
    fontFamily: "Arial",
    fontSize: 30,
    color: "#444B50",
    textAlignVertical: "center",
    textAlign: "center",
    margin: 5
  },
  listContainer: {
    flex: 1,
    flexDirection: "column",
    flexWrap: "wrap",
    fontFamily: "Arial",
    fontSize: 50,
    color: "#000000",
    textAlignVertical: "center",
    textAlign: "center",
    margin: 20
  },
  SingleItem: {
    flex: 1
  },
  imageContainer: {
    flex: 1
  },
})

const mapStateToProps = state => ({
  products: state.products.products
});

const mapDispatchToProps = dispatch => ({
  getProducts: () => dispatch(getAllProducts()),
  addPickedItem: item => dispatch(pickProduct(item))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllProductPage);
