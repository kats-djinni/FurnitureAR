import { AsyncStorage } from "react-native";

const GOT_ALL_FAVORITES = "GOT_ALL_FAVORITES";
const ADD_NEW_FAVORITE = "ADD_NEW_FAVORITE";

const initialState = {
  favorites: [
    {
      name: "assets/3txPAhYeu-x",
      displayName: "Office Chair",
      authorName: "Ryan Donaldson",
      objurl:
        "https://poly.googleapis.com/downloads/fp/1551711596400293/3txPAhYeu-x/3DjXPukLzqV/model.obj",
      mtlurl:
        "https://poly.googleapis.com/downloads/fp/1551711596400293/3txPAhYeu-x/3DjXPukLzqV/materials.mtl",
      formatType: "OBJ",
      thumbnail:
        "https://lh3.googleusercontent.com/dlwexhUXTVDfcmJayQRruP6IqK35UG1hw5C8Wmv-5E7d-cAfVQf5ThJ1cmiayHc"
    },
    {
      name: "assets/7Q_Ab2HLll1",
      displayName: "Couch | Wde",
      authorName: "Danny Bittman",
      objurl:
        "https://poly.googleapis.com/downloads/fp/1552556729377784/7Q_Ab2HLll1/c7YDClm08KI/model.obj",
      mtlurl:
        "https://poly.googleapis.com/downloads/fp/1552556729377784/7Q_Ab2HLll1/c7YDClm08KI/materials.mtl",
      formatType: "OBJ",
      thumbnail:
        "https://lh3.googleusercontent.com/XyxaRG8WVfk1Iirhe5SLZ5M_G164xBiOQVSUYY78mCnIZFaSIoMkmHvkrpe6I5Hgzg"
    },
    {
      name: "assets/3txPAhYeu-x",
      displayName: "Office Chair",
      authorName: "Ryan Donaldson",
      objurl:
        "https://poly.googleapis.com/downloads/fp/1551711596400293/3txPAhYeu-x/3DjXPukLzqV/model.obj",
      mtlurl:
        "https://poly.googleapis.com/downloads/fp/1551711596400293/3txPAhYeu-x/3DjXPukLzqV/materials.mtl",
      formatType: "OBJ",
      thumbnail:
        "https://lh3.googleusercontent.com/dlwexhUXTVDfcmJayQRruP6IqK35UG1hw5C8Wmv-5E7d-cAfVQf5ThJ1cmiayHc"
    },
    {
      name: "assets/7Q_Ab2HLll1",
      displayName: "Couch | Wde",
      authorName: "Danny Bittman",
      objurl:
        "https://poly.googleapis.com/downloads/fp/1552556729377784/7Q_Ab2HLll1/c7YDClm08KI/model.obj",
      mtlurl:
        "https://poly.googleapis.com/downloads/fp/1552556729377784/7Q_Ab2HLll1/c7YDClm08KI/materials.mtl",
      formatType: "OBJ",
      thumbnail:
        "https://lh3.googleusercontent.com/XyxaRG8WVfk1Iirhe5SLZ5M_G164xBiOQVSUYY78mCnIZFaSIoMkmHvkrpe6I5Hgzg"
    }
  ]
};

export const gotAllFavorites = favorites => ({
  type: GOT_ALL_FAVORITES,
  favorites
});

export const addedNewFavorite = favorite => ({
  type: ADD_NEW_FAVORITE,
  favorite
});

export const getFavorites = () => async dispatch => {
  //   console.log("parsed favorites", JSON.parse(AsyncStorage.favorites));
  console.log("hi");
  await dispatch(gotAllFavorites(JSON.parse(AsyncStorage.favorites)));
};

//   if ((JSON.parse(AsyncStorage.favorites)) !== undefined) {
//     dispatch(gotAllFavorites(JSON.parse(AsyncStorage.favorites)));
//   } else console.log("hi");
// };

// export const pickProduct = item => {
//   return dispatch => {
//     dispatch(pickedProduct(item));
//   };
// };

export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_ALL_FAVORITES:
      return { ...state, favorites: action.favorites };
    case ADD_NEW_FAVORITE:
      const favorites = [...state, action.favorite];
      AsyncStorage.setItem("favorites", JSON.stringify(favorites));
      return favorites;
    default:
      return state;
  }
}
