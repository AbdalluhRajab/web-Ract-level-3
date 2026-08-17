import { initialData } from "../data/seed.js";

export function dataReducer(state, action) {
  switch (action.type) {
    case "CREATE_RESOURCE":
      return { ...state, [action.resource]: [action.record, ...state[action.resource]] };
    case "UPDATE_RESOURCE":
      return { ...state, [action.resource]: state[action.resource].map((record) => record.id === action.record.id ? { ...record, ...action.record } : record) };
    case "DELETE_RESOURCE":
      return { ...state, [action.resource]: state[action.resource].filter((record) => record.id !== action.id) };
    case "ADD_TO_CART": {
      const existing = state.cart.find((item) => item.productId === action.product.id);
      const cart = existing
        ? state.cart.map((item) => item.productId === action.product.id ? { ...item, quantity: item.quantity + 1 } : item)
        : [...state.cart, { productId: action.product.id, name: action.product.name, price: action.product.price, quantity: 1 }];
      return { ...state, cart };
    }
    case "SET_CART_QUANTITY":
      return { ...state, cart: state.cart.map((item) => item.productId === action.productId ? { ...item, quantity: Math.max(1, action.quantity) } : item) };
    case "REMOVE_FROM_CART":
      return { ...state, cart: state.cart.filter((item) => item.productId !== action.productId) };
    case "CLEAR_CART":
      return { ...state, cart: [] };
    case "RESET_DATA":
      return initialData;
    default:
      return state;
  }
}
