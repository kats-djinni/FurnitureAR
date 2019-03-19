"use strict";

import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  AsyncStorage,
  Button
} from "react-native";
import { Card } from "react-native-elements";
import FavoriteButton from "./FavoriteButton";

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
      console.log("looking for value", value);
      if (value !== null) {
        console.log("inside if statement");
        const parsedValue = JSON.parse(value);
        this.setState({ favorites: parsedValue });
      } else {
        this.setState({ favorites: [] });
      }
    } catch (error) {
      console.log(error);
    }
  };

  _clearData = async () => {
    try {
      await AsyncStorage.clear();
      this.setState({ favorites: [] });
    } catch (error) {
      console.log(error);
    }
  };

  _removeFavorite = async index => {
    try {
      console.log("hi");
      const faveArr = await AsyncStorage.getItem("favorites");
      if (faveArr !== null) {
        const newFaveArr = JSON.parse(faveArr);
        // const index = newFaveArr.indexOf(item);
        console.log("what", index);
        console.log("looking for array", newFaveArr);
        console.log("looking for index", index);
        if (index > -1) {
          newFaveArr.splice(index, 1);
        }
        AsyncStorage.setItem("favorites", JSON.stringify(newFaveArr));
        this.setState({ favorites: newFaveArr });
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
          renderItem={({ item, index }) => (
            <View>
              <Card>
                <Text>Name: {item.displayName}</Text>
                <Image
                  style={{ width: 200, height: 200 }}
                  source={{ uri: item.thumbnail }}
                />
              </Card>
              <FavoriteButton />
              <Button
                title="Remove From Favorites"
                onPress={() => this._removeFavorite(index)}
              />
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
        <Button title="Clear All" onPress={() => this._clearData()} />
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
