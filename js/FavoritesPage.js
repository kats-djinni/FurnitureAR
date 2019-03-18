"use strict";

import React, { Component } from "react";
import { StyleSheet, View, Text, Image, FlatList } from "react-native";
import { Card } from "react-native-elements";

export default class FavoritesPage extends Component {
  constructor() {
    super();
    this.state = {
      favorites: [
        {
          name: "assets/3txPAhYeu-x",
          displayName: "Office Chair",
          authorName: "Ryan Donaldson",
          objurl:
            "https://poly.googleapis.com/downloads/fp/1551711596400293/3txPAhYeu-x/3DjXPukLzqV/model.obj",
          mtlurl:
            "https://poly.googleapis.com/downloads/fp/1551711596400293/3txPAhYeu-x/3DjXPukLzqV/materials.mtl",
          formatType: "OBJ",
          thumbnail:
            "https://lh3.googleusercontent.com/dlwexhUXTVDfcmJayQRruP6IqK35UG1hw5C8Wmv-5E7d-cAfVQf5ThJ1cmiayHc"
        },
        {
          name: "assets/7Q_Ab2HLll1",
          displayName: "Couch | Wde",
          authorName: "Danny Bittman",
          objurl:
            "https://poly.googleapis.com/downloads/fp/1552556729377784/7Q_Ab2HLll1/c7YDClm08KI/model.obj",
          mtlurl:
            "https://poly.googleapis.com/downloads/fp/1552556729377784/7Q_Ab2HLll1/c7YDClm08KI/materials.mtl",
          formatType: "OBJ",
          thumbnail:
            "https://lh3.googleusercontent.com/XyxaRG8WVfk1Iirhe5SLZ5M_G164xBiOQVSUYY78mCnIZFaSIoMkmHvkrpe6I5Hgzg"
        },
        {
          name: "assets/3txPAhYeu-x",
          displayName: "Office Chair",
          authorName: "Ryan Donaldson",
          objurl:
            "https://poly.googleapis.com/downloads/fp/1551711596400293/3txPAhYeu-x/3DjXPukLzqV/model.obj",
          mtlurl:
            "https://poly.googleapis.com/downloads/fp/1551711596400293/3txPAhYeu-x/3DjXPukLzqV/materials.mtl",
          formatType: "OBJ",
          thumbnail:
            "https://lh3.googleusercontent.com/dlwexhUXTVDfcmJayQRruP6IqK35UG1hw5C8Wmv-5E7d-cAfVQf5ThJ1cmiayHc"
        },
        {
          name: "assets/7Q_Ab2HLll1",
          displayName: "Couch | Wde",
          authorName: "Danny Bittman",
          objurl:
            "https://poly.googleapis.com/downloads/fp/1552556729377784/7Q_Ab2HLll1/c7YDClm08KI/model.obj",
          mtlurl:
            "https://poly.googleapis.com/downloads/fp/1552556729377784/7Q_Ab2HLll1/c7YDClm08KI/materials.mtl",
          formatType: "OBJ",
          thumbnail:
            "https://lh3.googleusercontent.com/XyxaRG8WVfk1Iirhe5SLZ5M_G164xBiOQVSUYY78mCnIZFaSIoMkmHvkrpe6I5Hgzg"
        }
      ]
    };
  }

  render() {
    return (
      <View style={styles.listContainer}>
        <Text style={styles.AllProductPage}>Favorites</Text>
        <FlatList
          data={this.state.favorites}
          renderItem={({ item, index }) => (
            <Card key={index}>
              <Text>Name: {item.displayName}</Text>
              <Image
                style={{ width: 200, height: 200 }}
                source={{ uri: item.thumbnail }}
              />
            </Card>
          )}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }
}

var styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    flexDirection: "column",
    flexWrap: "wrap",
    fontFamily: "Arial",
    fontSize: 50,
    color: "#000000",
    textAlignVertical: "center",
    textAlign: "center",
    margin: 20
  },
  SingleItem: {
    flex: 1
  }
});
