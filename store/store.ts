import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import productReducer from "./productSlice";
import authReducer from "./authSlice"; // Import auth slice

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productReducer,
    auth: authReducer, // Registered auth channel
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
