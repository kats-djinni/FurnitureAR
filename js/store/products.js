const GOT_PRODUCTS = "GOT_PRODUCTS";
const PICKED_ITEM = "PICKED_ITEM";

const initialState = {
  products: [],
  pickedProducts: []
};

export const gotAllProducts = products => ({
  type: GOT_PRODUCTS,
  products
});

const pickedProduct = item => ({
  type: PICKED_ITEM,
  item
});

export const getAllProducts = () => {
  return dispatch => {
    fetch("https://funiture-ar.firebaseio.com/products.json")
      .catch(err => console.log(err))
      .then(res => res.json())
      .then(parsedRes => {
        const products = parsedRes;
        dispatch(gotAllProducts(products));
      });
  };
};

export const pickProduct = item => {
  return dispatch => {
    dispatch(pickedProduct(item));
  };
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_PRODUCTS:
      return { ...state, products: action.products };
    case PICKED_ITEM:
      return {
        ...state,
        pickedProducts: [...state.pickedProducts, action.item]
      };
    default:
      return state;
  }
}
