import React, { Component } from "react";

import {
  ViroNode,
  Viro3DObject,
  ViroARPlaneSelector,
  ViroARPlane,
  ViroText
} from "react-viro";


export default class SingleProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rotation: [0, 0, 0],
      scale: [0.75, 0.75, 0.75]
    };
    this._onRotate = this._onRotate.bind(this);
    this._onPinch = this._onPinch.bind(this);
  }

  _onRotate(rotateState, rotationFactor, source) {
    if (rotateState == 3) {
      this.setState({
        rotation: [
          this.state.rotation[0],
          this.state.rotation[1] + rotationFactor,
          this.state.rotation[2]
        ]
      });
    }
  }

  _onPinch(pinchState, scaleFactor, source) {
    if (pinchState === 3) {
      this.setState({
        scale: [
          this.state.scale[0] * scaleFactor,
          this.state.scale[1] * scaleFactor,
          this.state.scale[2] * scaleFactor
        ]
      });
    }
  }

  render() {
    //placeholder:
    // const initialScale = this.props.initialScale
    //divisor should be initialScale of object
    const pinchScale = (this.state.scale[0] / 0.75) * 100;
    return (
      <ViroNode onDrag={() => {}}>
        <ViroARPlaneSelector>
          <ViroText
            text={Math.round(pinchScale).toString() + "%"}
            textAlign="center"
            textAlignVertical="top"
            textLineBreakMode="justify"
            textClipMode="clipToBounds"
            color="#ff0000"
            width={2}
            height={2}
            style={{
              fontFamily: "Arial",
              fontSize: 20,
              fontWeight: "400",
              fontStyle: "italic",
              color: "#fff"
            }}
            position={this.props.item.position}
          />
          <Viro3DObject
            source={{
              uri: this.props.item.objurl
            }}
            resources={[
              {
                uri: this.props.item.mtlurl
              }
            ]}
            position={this.props.item.position}
            scale={this.state.scale}
            rotation={this.state.rotation}
            onPinch={this._onPinch}
            onRotate={this._onRotate}
            onClick={() => this.props.triggerItem(this.props.index)}
            type="OBJ"
          />
        </ViroARPlaneSelector>
      </ViroNode>
    );
  }
}
