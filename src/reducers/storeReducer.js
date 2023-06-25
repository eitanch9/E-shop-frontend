// Importing necessary action types from '../Imports'
import {
  ADD_TO_CART,
  CLEAR_CART,
  REMOVE_FROM_CART,
  SAVE_PAYMENT_METHOD,
  SAVE_SHIPPING_ADDRESS,
  USER_SIGNIN,
  USER_SIGNOUT,
} from '../Imports';

export const storeReducer = (state, { type, payload }) => {
  switch (type) {
    case ADD_TO_CART:
      // Extracting the payload (newItem) from the action
      const newItem = payload;

      // Checking if the item being added already exists in the cart
      const existingItem = state.cart.cartItems.find(
        (item) => item._id === newItem._id
      );

      // Updating the cartItems based on whether the item exists or not
      const cartItems = existingItem
        ? // If the item exists, map through the existing cartItems and replace the matching item with the new item
          state.cart.cartItems.map((item) =>
            item._id === existingItem._id ? newItem : item
          )
        : // If the item doesn't exist, add the new item to the existing cartItems
          [...state.cart.cartItems, newItem];

      // Saving the updated cartItems in localStorage
      localStorage.setItem('cartItems', JSON.stringify(cartItems));

      // Updating the state with the updated cartItems
      return { ...state, cart: { ...state.cart, cartItems } };

    case REMOVE_FROM_CART:
      const itemToRemove = payload;

      // Filtering out the item to be removed from the cartItems array
      const updatedCartItems = state.cart.cartItems.filter(
        (item) => item._id !== itemToRemove._id
      );

      // Saving the updated cartItems in localStorage
      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));

      // Updating the state with the updated cartItems
      return { ...state, cart: { ...state.cart, cartItems: updatedCartItems } };

    case CLEAR_CART:
      const clearedCartItems = [];

      localStorage.setItem('cartItems', JSON.stringify(clearedCartItems));

      // Updating the state with the cleared cartItems
      return { ...state, cart: { ...state.cart, cartItems: clearedCartItems } };

    case USER_SIGNIN:
      const userInfo = payload;

      // Updating the state with the userInfo
      return { ...state, userInfo };

    case USER_SIGNOUT:
      // Clearing userInfo, cartItems, shippingAddress, and paymentMethod in the state
      return {
        ...state,
        userInfo: null,
        cart: { cartItems: [], shippingAddress: {}, paymentMethod: '' },
      };

    case SAVE_SHIPPING_ADDRESS:
      const shippingAddress = payload;

      // Updating the state with the shippingAddress
      return { ...state, cart: { ...state.cart, shippingAddress } };

    case SAVE_PAYMENT_METHOD:
      const paymentMethod = payload;

      // Updating the state with paymentMethod
      return { ...state, cart: { ...state.cart, paymentMethod } };

    default:
      return state;
  }
};
