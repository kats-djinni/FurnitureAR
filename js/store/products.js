const GOT_PRODUCTS = 'GOT_PRODUCTS';
const PICKED_ITEM = 'PICKED_ITEM';
const DELETE_ONE_ITEM = 'DELETE_ONE_ITEM';
const DELETE_ALL = 'DELETE_ALL'
const CHANGE_Y_INDEX = 'CHANGE_Y_INDEX'

const initialState = {
  products: [],
  pickedProducts: [],
  favoritedItem: {}
}

export const gotAllProducts = products => ({
  type: GOT_PRODUCTS,
  products
});

const pickedProduct = item => ({
  type: PICKED_ITEM,
  item
});

const deletedProduct = item => ({
  type: DELETE_ONE_ITEM,
  item
})

const deletedAll = () => ({
  type: DELETE_ALL
})

const changedY = (objIndex, num) => ({
  type:CHANGE_Y_INDEX,
  objIndex,
  num
})

export const getAllProducts = () => {
  return dispatch => {
    fetch('https://funiture-ar.firebaseio.com/products.json')
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
    item.position = [0,0,0]
    dispatch(pickedProduct(item));
  };
};

export const deleteProduct = item => {
  return dispatch => {
    dispatch(deletedProduct(item))
  }
}

export const deleteAll = () => {
  return dispatch => {
    dispatch(deletedAll())
  }
}

export const changeY = (objIndex, num ) => {
  return dispatch => {
    dispatch(changedY(objIndex, num))
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_PRODUCTS:
      return { ...state, products: action.products };
    case PICKED_ITEM:
      return {
        ...state,
        pickedProducts: [...state.pickedProducts, action.item]
      };
    case DELETE_ONE_ITEM:
      let newArr = state.pickedProducts.slice()
      newArr[action.item] = null
      return {
        ...state,
        pickedProducts: newArr 
      }
    case DELETE_ALL:
      return {
        ...state,
        pickedProducts: []
      }
    case CHANGE_Y_INDEX:
    let arr = state.pickedProducts.slice()
      arr[action.objIndex].position = arr[action.objIndex].position.slice()
      arr[action.objIndex].position[1] = arr[action.objIndex].position[1] + action.num
      return {
        ...state, 
        pickedProducts: arr
      }
    default:
      return state;
  }
}
