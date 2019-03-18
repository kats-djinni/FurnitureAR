"use strict";

import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  AsyncStorage
} from "react-native";
import { Card } from "react-native-elements";

class FavoritesPage extends Component {
  constructor() {
    super();
    this.state = {
      favorites: []
    };
  }

  async componentDidMount() {
    await this._retrieveData();
  }

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("favorites");
      if (value !== null) {
        const parsedValue = JSON.parse(value);
        this.setState({ favorites: [parsedValue] });
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return !this.state.favorites.length ? (
      <View style={styles.listContainer}>
        <Text style={styles.AllProductPage}>No favorites</Text>
      </View>
    ) : (
      <View style={styles.listContainer}>
        <Text style={styles.AllProductPage}>Favorites</Text>

        <FlatList
          data={this.state.favorites}
          renderItem={({ item }) => (
            <Card>
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

export default FavoritesPage;
