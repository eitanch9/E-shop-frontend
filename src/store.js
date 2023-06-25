import { storeReducer, createContext, useReducer } from './Imports';

export const Store = createContext();

// Define the initial state of the store
const initialState = {
  cart: {
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],
    shippingAddress: localStorage.getItem('shippingAddress')
      ? JSON.parse(localStorage.getItem('shippingAddress'))
      : {},
    paymentMethod: localStorage.getItem('paymentMethod')
      ? localStorage.getItem('paymentMethod')
      : '',
  },
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,
};

export function StoreProvider(props) {
  // Use the reducer hook to manage state updates and provide the state and dispatch values to the store context
  const [state, dispatch] = useReducer(storeReducer, initialState);
  const body = { state, dispatch };

  // Render the provider with the value prop containing the state and dispatch values
  return <Store.Provider value={body}>{props.children}</Store.Provider>;
}
