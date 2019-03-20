"use strict";

import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  AsyncStorage,
  Button,
  TouchableHighlight
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
      if (value !== null) {
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
      const faveArr = await AsyncStorage.getItem("favorites");
      if (faveArr !== null) {
        const newFaveArr = JSON.parse(faveArr);
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
                  style={styles.faveImage}
                  source={{ uri: item.thumbnail }}
                />
              </Card>
              {/* <FavoriteButton /> */}
              <TouchableHighlight
                onPress={() => this._removeFavorite(index)}
              >
                <Image source={require("./res/icons/clear-icon.png")}/>
              </TouchableHighlight>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
        <Button type="outline "title="Clear All" onPress={() => this._clearData()} />
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
  },
  faveImage: {
    resizeMode: "cover",
    width: 150, 
    height: 150
  }
});

export default FavoritesPage;
