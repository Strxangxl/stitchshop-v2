import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICartItem } from "../app/types";

interface CartState {
  cartItems: ICartItem[];
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
}

const addDecimals = (num: number) => {
  return Math.round(num * 100) / 100;
};

const updateCartPrices = (state: CartState) => {
  state.itemsPrice = addDecimals(
    state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0),
  );

  state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);

  state.taxPrice = addDecimals(0.15 * state.itemsPrice);

  state.totalPrice = addDecimals(
    state.itemsPrice + state.shippingPrice + state.taxPrice,
  );

  if (typeof window !== "undefined") {
    localStorage.setItem("cart", JSON.stringify(state));
  }
};

const getInitialState = (): CartState => {
  if (typeof window !== "undefined") {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      return JSON.parse(savedCart);
    }
  }
  return {
    cartItems: [],
    itemsPrice: 0,
    shippingPrice: 0,
    taxPrice: 0,
    totalPrice: 0,
  };
};

const cartSlice = createSlice({
  name: "cart",
  initialState: getInitialState(),
  reducers: {
    addToCart: (state, action: PayloadAction<ICartItem>) => {
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.product === item.product);

      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x.product === existItem.product ? item : x,
        );
      } else {
        state.cartItems.push(item);
      }

      updateCartPrices(state);
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter(
        (x) => x.product !== action.payload,
      );
      updateCartPrices(state);
    },
    clearCartItems: (state) => {
      state.cartItems = [];
      updateCartPrices(state);
    },
  },
});

export const { addToCart, removeFromCart, clearCartItems } = cartSlice.actions;
export default cartSlice.reducer;
