export const initialState = {
  basket: [],
  user: null,
};

// Selector
export const getBasketTotal = (basket) =>
  basket?.reduce((acc, prod) => acc + prod.price, 0);

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_BASKET':
      return {
        ...state,
        basket: [...state.basket, action.item],
      };

    case 'REMOVE_FROM_BASKET':
      const index = state.basket.findIndex((b) => b.id === action.id);

      const newBasket = [...state.basket];

      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn('Invalid item to remove id ', action.id);
      }

      return {
        ...state,
        basket: newBasket,
      };

    case 'CLEAR_BASKET':
      return {
        ...state,
        basket: [],
      };

    case 'SET_USER':
      return {
        ...state,
        user: action.user,
      };
    default:
      return state;
  }
};

export default reducer;
