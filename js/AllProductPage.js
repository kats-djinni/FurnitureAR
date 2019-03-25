"use strict";

import React, { Component } from "react";

import {
  StyleSheet,
  View,
  Image,
  TouchableHighlight,
  FlatList,
  Picker
} from "react-native";
import { connect } from "react-redux";
import { Text } from "react-native-elements";
import { getAllProducts, pickProduct, pickType } from "./store/products";
import {
  getAllFavorites,
  storeFavorite,
  removeFavorite
} from "./store/favorites";
import ProductList from "./ProductList";
import FavoriteButton from "./FavoriteButton";

export class AllProductPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: [],
      currentProducts: [],
      category: "all"
    };
  }

  componentDidMount() {
    this.props.getProducts();
    this.props.getFavorites().then(faves => {
      this.setState({ favorites: faves });
    });
  }

  handlePress = event => {
    this.props.addPickedItem(event);
    this.props.visibilityChange();
  };

  handleFilter(itemValue) {
    this.setState({ category: itemValue });

    this.props.filterProducts(itemValue);
  }

  filterFave = async item => {
    try {
      const faveArr = this.props.favorites;
      if (faveArr !== null) {
        const duplicate = faveArr.filter(
          products => products.displayName === item.displayName
        );
        if (duplicate.length) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    console.log("current", this.props.products);
    const filter =
      this.state.category === "all"
        ? this.props.products
        : this.props.filteredProducts;

    return (
      <View style={styles.listContainer}>
        <Text h4 style={styles.AllProductPage}>
          Choose Products
        </Text>
        <Picker
          selectedValue={this.state.category}
          onValueChange={(itemValue, itemIndex) => this.handleFilter(itemValue)}
        >
          <Picker.Item label="All" value="all" />
          <Picker.Item label="Chairs" value="chair" />
          <Picker.Item label="Couches" value="couch" />
        </Picker>

        <ProductList data={filter} filterFave={filter} />

        {/* <FlatList
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
                  itemIndex={index}
                  active={this.filterFave(item)}
                />
              </View>
            </View>
          )}
          keyExtractor={(item, index) => index}
        /> */}
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
  products: state.products.products,
  favorites: state.favorites.favorites,
  filteredProducts: state.products.filteredProducts
});

const mapDispatchToProps = dispatch => ({
  getProducts: () => dispatch(getAllProducts()),
  addPickedItem: item => dispatch(pickProduct(item)),
  getFavorites: () => dispatch(getAllFavorites()),
  addFavorite: item => dispatch(storeFavorite(item)),
  removeFavorite: index => dispatch(removeFavorite(index)),
  filterProducts: type => dispatch(pickType(type))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllProductPage);
