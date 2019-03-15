"use strict";

import React, { Component } from "react";

import { StyleSheet, View, Text, Image } from "react-native";
// import console = require("console");


export default class AllProductPage extends Component {
  constructor() {
    super();
    this.state = {
      allProducts: [
        {
          name: "assets/3txPAhYeu-x",
          displayName: "Office Chair",
          authorName: "Ryan Donaldson",
          objurl: "https://poly.googleapis.com/downloads/fp/1551711596400293/3txPAhYeu-x/3DjXPukLzqV/model.obj",
          mtlurl: "https://poly.googleapis.com/downloads/fp/1551711596400293/3txPAhYeu-x/3DjXPukLzqV/materials.mtl",
          formatType: "OBJ",
          thumbnail: "https://lh3.googleusercontent.com/dlwexhUXTVDfcmJayQRruP6IqK35UG1hw5C8Wmv-5E7d-cAfVQf5ThJ1cmiayHc"
        },
        {
          name: "assets/7Q_Ab2HLll1",
          displayName: "Couch | Wde",
          authorName: "Danny Bittman",
          objurl: "https://poly.googleapis.com/downloads/fp/1552556729377784/7Q_Ab2HLll1/c7YDClm08KI/model.obj",
          mtlurl: "https://poly.googleapis.com/downloads/fp/1552556729377784/7Q_Ab2HLll1/c7YDClm08KI/materials.mtl",
          formatType: "OBJ",
          thumbnail: "https://lh3.googleusercontent.com/XyxaRG8WVfk1Iirhe5SLZ5M_G164xBiOQVSUYY78mCnIZFaSIoMkmHvkrpe6I5Hgzg"
        }
      ]
    }

  }
  
//   componentDidMount() {
//     this.setState({
//       allProducts: [
//         {
//           name: "assets/3txPAhYeu-x",
//           displayName: "Office Chair",
//           authorName: "Ryan Donaldson",
//           description: "Green rolling office chair",
//           objurl: "https://poly.googleapis.com/downloads/fp/1551711596400293/3txPAhYeu-x/3DjXPukLzqV/model.obj",
//           mtlurl: "https://poly.googleapis.com/downloads/fp/1551711596400293/3txPAhYeu-x/3DjXPukLzqV/materials.mtl",
//           formatType: "OBJ",
//           thumbnail: "https://lh3.googleusercontent.com/dlwexhUXTVDfcmJayQRruP6IqK35UG1hw5C8Wmv-5E7d-cAfVQf5ThJ1cmiayHc"
//     }
//   ]
// })
//   }

  render() {
   
    return (
      

    <View style={styles.AllProductPage}>
      <Text style={styles.AllProductPage}>This is All Product Page!!!!!</Text>
      {this.state.allProducts.map(item => {
        return  (
          <View>
            <Text>Name: {item.displayName}</Text>
            <Image
            style= {{width: 200, height: 200}}
             source={{uri: item.thumbnail}}>
           </Image>
          </View>
          
        )
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



module.exports = AllProductPage;
