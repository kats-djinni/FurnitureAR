import { AppRegistry } from "react-native";
import React, { Component } from "react";
import App from "./App.js";
import { Provider } from "react-redux";
import store from "./js/store";

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}

AppRegistry.registerComponent("ViroSample", () => Root);

// The below line is necessary for use with the TestBed App
AppRegistry.registerComponent("ViroSample", () => Root);
