"use strict";

import React, { Component } from "react";

import { StyleSheet, View, Text, Image } from "react-native";
// import console = require("console");
import store from "./store";
import { connect } from "react-redux";
import { getAllProducts } from "./store/products";

class AllProductPage extends Component {
  constructor() {
    super();
    this.state = {
      products: []
    };
  }

  componentDidMount() {
    this.props.getProducts();
  }

  render() {
    return (
      <View style={styles.AllProductPage}>
        <Text style={styles.AllProductPage}>Choose Products</Text>
        {this.props.products.map((item, index) => {
          return (
            <View key={index}>
              <Text>Name: {item.displayName}</Text>
              <Image
                style={{ width: 200, height: 200 }}
                source={{ uri: item.thumbnail }}
              />
            </View>
          );
        })}
      </View>
    );
  }
}

var styles = StyleSheet.create({
  AllProductPage: {
    fontFamily: "Arial",
    fontSize: 50,
    color: "#000000",
    textAlignVertical: "center",
    textAlign: "center",
    margin: 20
  },
  SingleItem: {
    flex: 1
  }
});

const mapStateToProps = state => ({
  products: state.products.products
});

const mapDispatchToProps = dispatch => ({
  getProducts: () => dispatch(getAllProducts())
});

export default connect(mapStateToProps, mapDispatchToProps)(AllProductPage);
