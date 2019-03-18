/**
 * Copyright (c) 2017-present, Viro, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  StyleSheet,
  PixelRatio,
  TouchableHighlight,
  Image
} from 'react-native';

import {
  ViroBox,
  ViroMaterials,
  ViroVRSceneNavigator,
  ViroARSceneNavigator
} from 'react-viro'


import { Overlay } from 'react-native-elements'
import AllProducts from './js/AllProductPage'
import FavoritesPage from './js/FavoritesPage'
import Icon from 'react-native-vector-icons/FontAwesome'


/*
 TODO: Insert your API key below
 */
var sharedProps = {
  apiKey: "7C313AAF-F252-430D-9124-1B1DF5CE1CA2",
}

// Sets the default scene you want for AR and VR
var InitialARScene = require('./js/HelloWorldSceneAR')

// This determines which type of experience to launch in, or UNSET, if the user should
// be presented with a choice of AR or VR. By default, we offer the user a choice.
// var defaultNavigatorType = UNSET;

export default class ViroSample extends Component {
  constructor() {
    super();

    this.state = {
      sharedProps : sharedProps,

      isVisible: false,
      visibleFavorites: false
    }
  }

  productsButton = () => {
    this.setState({isVisible: true})
  }

  favoritesButton = () => {
    this.setState({
      visibleFavorites: true
    })
  }

  // Replace this function with the contents of _getVRNavigator() or _getARNavigator()
  // if you are building a specific type of experience.
  render() {
    return(
      <View style={localStyles.outer} >

        <ViroARSceneNavigator style={localStyles.arView} {...this.state.sharedProps}
          initialScene={{scene: InitialARScene}} />

        <View style={localStyles.navBar}>
          <TouchableHighlight underlayColor={'#00000000'} 
            onPress={this.productsButton}>
            <Image source={require("./js/res/btn_mode_objects.png")} />
          </TouchableHighlight>

          <TouchableHighlight underlayColor={'#00000000'} >
            onPress={this.favoritesButton}>
            <Image source={require("./js/res/btn_mode_objects.png")} />
          </TouchableHighlight>

          <TouchableHighlight underlayColor={'#00000000'} >
            <Image source={require("./js/res/btn_mode_objects.png")} />
          </TouchableHighlight>
        </View>

        <Overlay 
          isVisible={this.state.isVisible} 

          overlayBackgroundColor="#ACC6C7"

          // windowBackgroundColor="gray"
          width="auto"
          height="auto"
          onBackdropPress={() => this.setState({ isVisible: false })}>
            <AllProducts />
        </Overlay>

        <Overlay 
          isVisible={this.state.visibleFavorites} 
          overlayBackgroundColor="#E5E8E9"
          width="auto"
          height={700}
          onBackdropPress={() => this.setState({ visibleFavorites: false })}>
            <FavoritesPage />
        </Overlay> 

      </View>
    )
  }
}

var localStyles = StyleSheet.create({
  outer : {
    flex : 1,
  },

  arView: {
    flex:1,
  },

  buttons : {
    height: 80,
    width: 80,
    paddingTop:20,
    paddingBottom:20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor:'#f0f8ff',
    borderRadius: 10,
    borderWidth: 1,
    // borderColor: '#ffffff00',
    borderColor: '#00000000'
  },

  navBar: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: "space-around",
    position: 'absolute',  
    left: 0, 
    right: 0, 
    bottom: 77
  }
});

module.exports = ViroSample
