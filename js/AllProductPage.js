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
import { connect } from "react-redux";
import { Text } from "react-native-elements";
import { getAllProducts, pickProduct } from "./store/products";
import FavoriteButton from "./FavoriteButton";

export class AllProductPage extends Component {
  constructor() {
    super();
    this.state = {
      favorites: []
    };
  }
  async componentDidMount() {
    this.props.getProducts();
    await this._retrieveData();
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
      const updatedFaves = await AsyncStorage.getItem("favorites");
      this.setState({ favorites: updatedFaves });
    } catch (error) {
      console.log(error);
    }
  };

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("favorites");
      if (value !== null) {
        const parsedValue = JSON.parse(value);
        this.setState({ favorites: parsedValue });
      } else {
        this.setState({ favorites: [] });
      }
    } catch (error) {
      console.log(error);
    }
  };

  _removeFavorite = async index => {
    try {
      const faveArr = await AsyncStorage.getItem("favorites");
      if (faveArr !== null) {
        const newFaveArr = JSON.parse(faveArr);
        if (index > -1) {
          newFaveArr.splice(index, 1);
        }
        AsyncStorage.setItem("favorites", JSON.stringify(newFaveArr));
        this.setState({ favorites: newFaveArr });
      }
    } catch (error) {
      console.log(error);
    }
  };

  filterFave = async item => {
    try {
      const faveStr = await AsyncStorage.getItem("favorites");

      if (faveStr !== null) {
        const favesArr = JSON.parse(faveStr);
        const duplicate = favesArr.filter(
          products => products.displayName === item.displayName
        );
        if (duplicate.length) {
          return true;
        } else return false;
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <View style={styles.listContainer}>
        <Text h4 style={styles.AllProductPage}>
          Choose Products
        </Text>
        <FlatList
          data={this.props.products}
          renderItem={({ item, index }) => (
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
                <FavoriteButton
                  faveItem={item}
                  active={this.filterFave(item)}
                  remove={() => this._removeFavorite(index)}
                />
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
  }
});

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
