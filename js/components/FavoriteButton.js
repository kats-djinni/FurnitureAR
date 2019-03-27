import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity
} from "react-native"
import { connect } from "react-redux"
import { storeFavorite, removeFavorite } from ".././store/favorites"

export class FavoriteButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: null
    };
  }

  async componentDidMount() {
    const bool = await this.props.active;
    this.setState({ active: bool });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.category !== this.props.category) {
      const bool = this.props.active;
      this.setState({ active: bool });
    }
  }

  handlePress = () => {
    this.setState({ active: !this.state.active });
    if (this.state.active === false) {
      this.props.addFavorite(this.props.faveItem);
    } else if (this.state.active === true) {
      this.props.removeFavorite(this.props.faveItem);
    }
  };

  render() {
    return (
      <View style={{ justifyContent: "center" }}>
        <TouchableOpacity
          onPress={() => this.handlePress()}
          style={this.state.active ? styles.btnActive : styles.btn}
        >
          <Image
            style={this.state.active ? styles.imageActive : styles.image}
            source={require(".././res/icons/heart-outline.png")}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addFavorite: item => dispatch(storeFavorite(item)),
    removeFavorite: item => dispatch(removeFavorite(item))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(FavoriteButton);

var styles = StyleSheet.create({
  btnActive: {
    backgroundColor: "transparent"
  },

  btn: {
    // flex: 1,
    padding: -5,   
    backgroundColor: "transparent"
  },
  imageActive: {
    tintColor: "#D85A60"
  },
  image: {
    tintColor: "#CBCDCB"
  }
});
