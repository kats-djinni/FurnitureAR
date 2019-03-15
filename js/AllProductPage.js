"use strict";

import React, { Component } from "react";

import { StyleSheet, View, Text, Image } from "react-native";
// import console = require("console");
import store from "./store";
import { connect } from "react-redux";

export default class AllProductPage extends Component {
  constructor() {
    super();
    this.state = {
      products: []
    };
  }

  componentDidMount() {
    store.getState();
  }

  render() {
    return (
      <View style={styles.AllProductPage}>
        <Text style={styles.AllProductPage}>This is All Product Page!!!!!</Text>
        {this.props.products.map(item => {
          return (
            <View>
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
    marginTop: 20
  }
});

const mapStateToProps = state => ({
  products: state.products.products
});

module.exports = connect(mapStateToProps)(AllProductPage);
