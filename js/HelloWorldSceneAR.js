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
  ViroDirectionalLight
} from "react-viro";

export default class HelloWorldSceneAR extends Component {
  constructor(props) {
    super(props);

    // Set initial state here
    this.state = {
    };


    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
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
      <ViroARScene onTrackingUpdated={this._onInitialized} physicsWorld={{gravity:[0, -9.81, 0]}}>
        {/* <ViroAmbientLight color="#ffffff" intensity={20}/> */}
        {/* <ViroDirectionalLight color="#ffffff" direction={[0,-1,-.2]}/> */}
          <ViroSpotLight
              innerAngle={90}
              outerAngle={90}
              direction={[0, -1, -0.2]}
              position={[0.05, 2, 0]}
              color="#f441d0"
              //color="#f44141"
              // color="#f4ee41"
              //color="#4149f4"
              
              castsShadow={true}
              intensity={250}

          />
          <ViroNode dragType="FixedDistance" onDrag={() => {}}>
            <Viro3DObject
              source={require('./res/ikea_sofa/IKE020010.obj')}
              resources={[require('./res/ikea_sofa/IKE020010.mtl')]}
              position={[0.05, 0, -1]}
              scale={[0.005, 0.005, 0.005]}
              type="OBJ" /> 
          </ViroNode> 
          
      <ViroNode dragType="FixedDistance" onDrag={() => {}}>
            <Viro3DObject
              source={require('./res/ikea_armchair/IKEA-Karlstad_Footstool_and_Armchair-3D.obj')}
              resources={[require('./res/ikea_armchair/IKEA-Karlstad_Footstool_and_Armchair-3D.mtl')]}
              position={[0.05, 0, -1]}
              scale={[0.005, 0.005, 0.005]}
              type="OBJ" /> 
          </ViroNode>

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
  },
});

ViroAnimations.registerAnimations({
  rotate: {
    properties: {
      rotateY: "+=90"
    },
    duration: 250 //.25 seconds
  }
});

const mapStateToProps = state => ({
  products: state.products.pickedProducts
});


module.exports = connect(mapStateToProps, null)(HelloWorldSceneAR);
