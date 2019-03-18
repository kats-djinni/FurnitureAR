"use strict";

import React, { Component } from "react";
import { connect } from "react-redux";
import { StyleSheet } from "react-native";
import SingleProduct from './SingleProduct'

import {
  ViroARScene,
  ViroText,
  ViroBox,
  ViroMaterials,
  ViroNode,
  ViroConstants,
  Viro3DObject,
  ViroAmbientLight,
  ViroSpotLight,
  ViroAnimations,
  ViroARPlaneSelector
} from "react-viro";

export default class HelloWorldSceneAR extends Component {
  constructor(props) {
    super(props);

    // Set initial state here
    this.state = {
      // text: "Initializing AR...",
      // rotation: [0, 0, 0],
      // scale: [1, 1, 1]
    };


    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
    // this._onRotate = this._onRotate.bind(this);
    // this._onPinch = this._onPinch.bind(this);
    this._render3DObj = this._render3DObj.bind(this)
    this._defaultView = this._defaultView.bind(this)
  }
  _onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      this.setState({
        text: "Hello World!"
      });
    } else if (state == ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }


  _render3DObj(){
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized}>
        <ViroAmbientLight color={"#aaaaaa"} />

        <ViroSpotLight
          innerAngle={5}
          outerAngle={90}
          direction={[0, -1, -0.2]}
          position={[0, 3, 1]}
          color="#ffffff"
          castsShadow={true}
        />
        {this.props.products.map((item, index) => {
          return (  
              <SingleProduct item={item} key={index}/>
          )
        })}
      </ViroARScene> 
    )
  }
  
  _defaultView(){
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized}>
        <ViroAmbientLight color={"#aaaaaa"} />
      </ViroARScene> 
    )
  }
  
  render() {
    const itemOne = this.props.products[0]
    console.log('this.props.pickedProduct', itemOne)
    
    if (this.props.products.length > 0) {
      return this._render3DObj()
    } else {
      return this._defaultView()
    }
  }
}

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: "Arial",
    fontSize: 30,
    color: "#ffffff",
    textAlignVertical: "center",
    textAlign: "center"
  }
});

ViroMaterials.createMaterials({
  grid: {
    diffuseTexture: require("./res/grid_bg.jpg")
  }
});

ViroAnimations.registerAnimations({
  rotate: {
    properties: {
      rotateY: "+=90"
    },
    duration: 250 //.25 seconds
  }
});

// module.exports = HelloWorldSceneAR;
const mapStateToProps = state => ({
  products: state.products.pickedProducts
});

// const mapDispatchToProps = dispatch => ({
//   getProducts: () => dispatch(getAllProducts())
// });

module.exports = connect(mapStateToProps, null)(HelloWorldSceneAR);
