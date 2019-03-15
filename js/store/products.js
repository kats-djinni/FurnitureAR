const GOT_PRODUCTS = "GOT_PRODUCTS";

const initialState = {
  products: []
};

export const gotAllProducts = products => ({
  type: GOT_PRODUCTS,
  products
});

export const getAllProducts = () => {
  return dispatch => {
    fetch("https://funiture-ar.firebaseio.com/products.json")
      .catch(err => console.log(err))
      .then(res => res.json())
      .then(parsedRes => {
        const products = parsedRes;
        dispatch(gotAllProducts(products));
        console.log("hello", products);
      });
  };
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_PRODUCTS:
      return { ...state, products: action.products };
    default:
      return state;
  }
}
