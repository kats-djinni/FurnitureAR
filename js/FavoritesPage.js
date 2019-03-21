"use strict";

import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Image,
  FlatList,
  AsyncStorage,
  TouchableHighlight,
  Dimensions
} from "react-native";
import { Card, Text, Button } from "react-native-elements";
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
        <Text h4 style={styles.header}>
          Favorites
        </Text>

        <FlatList
          data={this.state.favorites}
          renderItem={({ item, index }) => (
            <View>
              <Card>
                <Text style={styles.itemName}>{item.displayName}</Text>
                <Image
                  style={styles.faveImage}
                  source={{ uri: item.thumbnail }}
                />
              </Card>
              {/* <FavoriteButton /> */}
              <TouchableHighlight onPress={() => this._removeFavorite(index)}>
                <View style={styles.imageContainer}>
                  <Image
                    tintColor="red"
                    source={require("./res/icons/clear-icon.png")}
                  />
                </View>
              </TouchableHighlight>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
        <Button
          type="outline"
          raised="true"
          buttonStyle={styles.clearButton}
          title="Clear All"
          containerStyle={{ width: Dimensions.get("window").width * 0.55 }}
          onPress={() => this._clearData()}
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
    color: "#444B50",
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
  },

  itemName: {
    fontWeight: "bold",
    textAlign: "center",
    padding: 5
  },

  imageContainer: {
    justifyContent: "center",
    alignItems: "center"
  },

  header: {
    textAlign: "center",
    color: "#444B50"
  },

  clearButton: {
    // width: Dimensions.get("window").width * 0.5
  }
});

export default FavoritesPage;
