import React, { Component } from "react";
import {
  View,
  Image,
  FlatList,
  TouchableHighlight,
  Text,
  StyleSheet
} from "react-native";
import FavoriteButton from "./FavoriteButton";

export default class ProductList extends Component {
  state = {};
  render() {
    console.log("com", this.props.data);
    return (
      <FlatList
        data={this.props.data}
        renderItem={({ item, index }) => (
          <View>
            <Text>Name: {item.displayName}</Text>
            <TouchableHighlight
              onPress={() => this.handlePress(item)}
              style={{ width: 200, height: 200 }}
            >
              <Image
                style={{ width: 200, height: 200 }}
                source={{ uri: item.thumbnail }}
              />
            </TouchableHighlight>
            <View style={styles.imageContainer}>
              <FavoriteButton
                faveItem={item}
                itemIndex={index}
                active={this.props.filterFave(item)}
              />
            </View>
          </View>
        )}
        keyExtractor={(item, index) => index}
      />
    );
  }
}

var styles = StyleSheet.create({
  AllProductPage: {
    fontFamily: "Arial",
    fontSize: 30,
    color: "#444B50",
    textAlignVertical: "center",
    textAlign: "center",
    margin: 5
  },
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
  imageContainer: {
    flex: 1
  }
});
