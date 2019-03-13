'use strict';

import React, { Component } from 'react';

import {StyleSheet} from 'react-native';

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
  ViroAnimations
} from 'react-viro';

export default class HelloWorldSceneAR extends Component {

  constructor() {
    super();

    // Set initial state here
    this.state = {
      text : "Initializing AR..."
    };

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
  }

  render() {
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized} >
        <ViroText text={this.state.text} scale={[.5, .5, .5]} position={[0, 0, -1]} style={styles.helloWorldTextStyle} />

        <ViroBox materials={["grid"]} position={[0, -.5, -1]} scale={[.3, .3, .1]}  animation={{name: "rotate", run: true, loop: true}}/>

        <ViroAmbientLight color={"#aaaaaa"} />

        <ViroSpotLight innerAngle={5} outerAngle={90} direction={[0,-1,-.2]}
          position={[0, 3, 1]} color="#ffffff" castsShadow={true} />
          
        <ViroNode>
          <Viro3DObject dragType="FixedDistance" onDrag={()=>{}}
              source={require('./res/emoji_smile/emoji_smile.vrx')}
              resources={[require('./res/emoji_smile/emoji_smile_diffuse.png'),
                  require('./res/emoji_smile/emoji_smile_normal.png'),
                  require('./res/emoji_smile/emoji_smile_specular.png')]}
              position={[-.5, .5, -1]}
              scale={[.2, .2, .2]}
              type="VRX" />

        {/* stool below */}
          {/* <Viro3DObject dragType="FixedDistance" rotation={[10, 0, 0]} onDrag={()=>{}}
              source={require('./res/stool/Stool_01(1).obj')}
              resources={[require('./res/stool/Stool_01.mtl')]}
              position={[-.5, .5, -1]}
              scale={[.007, .007, .007]}
              type="OBJ" /> */}

          <Viro3DObject dragType="FixedDistance" rotation={[10, 0, 0]} onDrag={()=>{}}
              source={require('./res/sofa/model.obj')}
              resources={[require('./res/sofa/materials.mtl')]}
              position={[-.2, .2, -2]}
              scale={[1, 1, 1]}
              type="OBJ" />
        </ViroNode>
      </ViroARScene>
    );
  }

  _onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      this.setState({
        text : "Hello World!"
      });
    } else if (state == ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }
}

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',  
  },
})

ViroMaterials.createMaterials({
  grid: {
    diffuseTexture: require('./res/grid_bg.jpg'),
  },
})

ViroAnimations.registerAnimations({
  rotate: {
    properties: {
      rotateY: "+=90"
    },
    duration: 250, //.25 seconds
  },
})

module.exports = HelloWorldSceneAR;
