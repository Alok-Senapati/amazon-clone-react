export const initialState = {
  basket: [],
  user: null,
  address: null,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        basket: [...state.basket, action.item],
      };
    case "REMOVE_FROM_CART":
      let newBasket = [...state.basket];
      newBasket.splice(action.index, 1);
      return {
        ...state,
        basket: [...newBasket],
      };
    case "SET_USER":
      return {
        ...state,
        user: action.item,
      };
    case "SET_ADDRESS":
      return {
        ...state,
        address: action.item,
      };
    case "CLEAR_CART":
      return {
        ...state,
        basket: [],
      };
    default:
      return state;
  }
};
