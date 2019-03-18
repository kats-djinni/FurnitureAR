'use strict';

import React, { Component } from 'react';

import { StyleSheet, View, Text, Image, TouchableHighlight } from 'react-native';
// import store from "./store";
import { connect } from 'react-redux';
import { getAllProducts, pickProduct } from './store/products';



class AllProductPage extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   products: []
    // };
  }

  componentDidMount() {
    this.props.getProducts();
  }

  handlePress = (event) => {
    this.props.addPickedItem(event)
    this.props.visibilityChange()
  }
  
  render() {
    return (
      <View style={styles.AllProductPage}>
        <Text style={styles.AllProductPage}>Choose Products</Text>
        {this.props.products.map((item, index) => {
          return (
            <View key={index}>
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
              
            </View>
          );
        })}
      </View>
    );
  }
}

var styles = StyleSheet.create({
  AllProductPage: {
    fontFamily: 'Arial',
    fontSize: 50,
    color: '#000000',
    textAlignVertical: 'center',
    textAlign: 'center',
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
  getProducts: () => dispatch(getAllProducts()),
  addPickedItem: (item) => dispatch(pickProduct(item))
});

export default connect(mapStateToProps, mapDispatchToProps)(AllProductPage);
