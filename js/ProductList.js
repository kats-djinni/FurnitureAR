import React, { Component } from "react";
import {
  View,
  Image,
  FlatList,
  TouchableHighlight,
  Text,
  StyleSheet
} from "react-native";
import { connect } from "react-redux";
import FavoriteButton from "./FavoriteButton";
import {
  getAllFavorites,
  storeFavorite,
  removeFavorite
} from "./store/favorites";

class ProductList extends Component {
  state = {
    favorites: []
  };

  componentDidMount() {
    this.props.getFavorites();
  }

  filterFave = item => {
    const faveArr = this.props.favorites;
    if (faveArr !== null || faveArr !== undefined) {
      const foundItem = faveArr.filter(
        products => products.displayName == item.displayName
      );
      if (foundItem.length) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  render() {
    return (
      <FlatList
        data={this.props.data}
        renderItem={({ item, index }) => (
          <View>
            <Text>Name: {item.displayName}</Text>
            <TouchableHighlight
              onPress={() => this.props.handlePress(item)}
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
                category={this.props.category}
                active={this.filterFave(item)}
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

const mapStateToProps = state => ({
  products: state.products.products,
  favorites: state.favorites.favorites
});

const mapDispatchToProps = dispatch => ({
  // getProducts: () => dispatch(getAllProducts()),
  getFavorites: () => dispatch(getAllFavorites())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductList);
