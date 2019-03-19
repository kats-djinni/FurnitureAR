import React, { Component } from 'react'
import { TouchableOpacity, StyleSheet, AsyncStorage, Image } from 'react-native'
import { Button } from 'react-native-elements'
import SvgUri from 'react-native-svg-uri'

export default class FavoriteButton extends Component {
    constructor (props) {
        super(props)
        this.state = {
            active: false
        }
    }

    handlePress = () => {
        this.setState({active: !this.state.active})
        console.log("this.props.faveItem: ", this.props.faveItem)
        this._storeFavorite(this.props.faveItem)
    }

    _storeFavorite = async item => {
        console.log('inside _storeFavorite')
        try {
            const faveStr = await AsyncStorage.getItem("favorites")
        
            if (faveStr !== null) {
                const favesArr = JSON.parse(faveStr)
                const faves = [...favesArr, item]
                await AsyncStorage.setItem("favorites", JSON.stringify(faves));
            } else {
                await AsyncStorage.setItem("favorites", JSON.stringify([item]));
            }
        } catch (error) {
            console.log(error);
        }
    }

    render () {

        return (
            // <Button
            //     type="clear"
            //     style={ this.state.active? styles.btnActive : styles.btn}
            //     onPress={() => this.handlePress()}>
            <Image width="100" height="100" source={require('.././_ionicons_svg_md-heart-empty.svg')} /> 
            // </Button>
        )
    }
}

var styles = StyleSheet.create({
  btnActive: {
    fontFamily: "Arial",
    fontSize: 50,
    color: "#000000",
    textAlignVertical: "center",
    textAlign: "center",
    margin: 20
  },

  btn: {
    flex: 1
  }
});