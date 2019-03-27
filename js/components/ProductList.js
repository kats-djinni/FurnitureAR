import React, { Component } from "react";
import {
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet
} from "react-native";
import { Card } from "react-native-elements";
import { connect } from "react-redux";
import FavoriteButton from "./FavoriteButton";
import { getAllFavorites } from "../store/favorites";

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
        renderItem={({ item }) => (
          <View>
            <Card title={<Text style={styles.header}>{item.displayName}</Text>}>
              <TouchableOpacity
                onPress={() => this.props.handlePress(item)}
                style={{ width: 200, height: 200 }}
              >
                <Image
                  style={{ width: 200, height: 200 }}
                  source={{ uri: item.thumbnail }}
                />
              </TouchableOpacity>
              <Text style={styles.text}>Dimensions: {item.dimensions}</Text>
              <View style={styles.imageContainer}>
                <FavoriteButton
                  faveItem={item}
                  category={this.props.category}
                  active={this.filterFave(item)}
                />
              </View>
            </Card>
          </View>
        )}
        keyExtractor={(item, index) => index}
      />
    );
  }
}

var styles = StyleSheet.create({
  AllProductPage: {
    fontFamily: "Didot",
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
    fontFamily: "Didot",
    fontSize: 50,
    color: "#000000",
    textAlignVertical: "center",
    textAlign: "center",
    margin: 20
  },
  header: {
    color: "#394730",
    textAlign: "center",
    fontWeight: "300",
    fontFamily: "Didot",
    fontSize: 20
  },
  text: {
    marginBottom: 10,
    color: "#394730",
    textAlign: "center",
    fontWeight: "300",
    fontFamily: "Didot",
    fontSize: 15
  },

  imageContainer: {
    alignItems: "center",
    justifyContent: "center"
  }
});

const mapStateToProps = state => ({
  products: state.products.products,
  favorites: state.favorites.favorites
});

const mapDispatchToProps = dispatch => ({
  getFavorites: () => dispatch(getAllFavorites())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductList);
