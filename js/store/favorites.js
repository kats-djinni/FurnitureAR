import { AsyncStorage } from "react-native";
import { tsIndexSignature } from "@babel/types";

const GOT_FAVORITES = "GOT_FAVORITES";
const ADD_FAVORITE = "ADD_FAVORITE";
const DELETE_FAVORITE = "DELETE_FAVORITE";
const CLEAR_FAVORITES = "CLEAR_FAVORITES";

const initialState = {
  favorites: []
};

const gotFavorites = favorites => {
  return {
    type: GOT_FAVORITES,
    favorites
  };
};

const addFavorite = favorites => {
  return {
    type: ADD_FAVORITE,
    favorites
  };
};

const deleteFavorite = favorites => {
  return {
    type: DELETE_FAVORITE,
    favorites
  };
};

const clearFavorites = () => {
  return {
    type: CLEAR_FAVORITES,
    favorites: []
  };
};

export const getAllFavorites = () => {
  return async dispatch => {
    try {
      const value = await AsyncStorage.getItem("favorites");
      if (value !== null) {
        const parsedValue = JSON.parse(value);
        dispatch(gotFavorites(parsedValue));
      } else {
        dispatch(gotFavorites([]));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const storeFavorite = item => {
  return async dispatch => {
    try {
      const faveStr = await AsyncStorage.getItem("favorites");
      if (faveStr !== null) {
        const favesArr = JSON.parse(faveStr);

        const duplicate = favesArr.filter(
          products => products.displayName === item.displayName
        );

        console.log("seeing double", duplicate);
        if (!duplicate.length) {
          const faves = [...favesArr, item];
          await AsyncStorage.setItem("favorites", JSON.stringify(faves));
          dispatch(addFavorite(faves));
        }
      } else {
        await AsyncStorage.setItem("favorites", JSON.stringify([item]));
        dispatch(addFavorite(JSON.stringify([item])));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const removeFavorite = faveItem => {
  return async dispatch => {
    try {
      const faveArr = await AsyncStorage.getItem("favorites");
      if (faveArr !== null) {
        const newFaveArr = JSON.parse(faveArr);

        const indexFinder = element => {
          return element.name == faveItem.name;
        };
        const index = newFaveArr.findIndex(indexFinder);

        if (index > -1) {
          newFaveArr.splice(index, 1);
        }
        AsyncStorage.setItem("favorites", JSON.stringify(newFaveArr));
        dispatch(deleteFavorite(newFaveArr));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const removeAllFavorites = () => {
  return async dispatch => {
    AsyncStorage.clear();
    dispatch(clearFavorites());
  };
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_FAVORITES:
      return { ...state, favorites: action.favorites };
    case ADD_FAVORITE:
      return { ...state, favorites: action.favorites };
    case DELETE_FAVORITE:
      return { ...state, favorites: action.favorites };
    case CLEAR_FAVORITES:
      return { ...state, favorites: action.favorites };
    default:
      return state;
  }
}
