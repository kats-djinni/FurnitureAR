const GOT_PRODUCTS = "GOT_PRODUCTS";

const initialState = {
  products: [
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

const getAllProducts = products => ({
  type: GOT_PRODUCTS,
  products
});

export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_PRODUCTS:
      return { ...state, products: action.products };
    default:
      return state;
  }
}
