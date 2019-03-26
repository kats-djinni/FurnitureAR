import React, { Component } from "react"
import { View, Image } from "react-native"
import styles from "../../styles"

export default class SplashScreen extends Component {
  render() {
    const viewStyles = [styles.container, { backgroundColor: 'white' }];
    return (
      <View style={viewStyles}>
        <Image source={require('../res/splashscreen.png')}  style={{width: '100%', height: '100%'}}/>
      </View>
    );
  }
}

