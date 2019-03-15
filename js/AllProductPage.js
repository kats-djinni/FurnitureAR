"use strict";

import React, { Component } from "react";

import { StyleSheet, View, Text, Image, Button } from "react-native";
// import console = require("console");
import store from "./store";
import { connect } from "react-redux";
import { getAllProducts } from "./store/products";

class AllProductPage extends Component {
  constructor(props) {
    super(props);
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
                // onPress ={(item) => this.props.pickItem(item)}
              />
              <Button
              onPress={(item) => this.props.pickItem(item)}
            title="Press Me"
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
