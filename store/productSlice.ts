import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import apiClient from "../app/utils/api";
import { IProduct } from "../app/types";

interface ProductState {
  products: IProduct[];
  product: IProduct | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  product: null,
  loading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await apiClient.get<IProduct[]>("/products");
      return response.data;
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch products";
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const fetchProductDetails = createAsyncThunk(
  "products/fetchDetails",
  async (id: string, thunkAPI) => {
    try {
      const response = await apiClient.get<IProduct>(`/products/${id}`);
      return response.data;
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch product details";
      return thunkAPI.rejectWithValue(message);
    }
  },
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearProductDetails: (state) => {
      state.product = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<IProduct[]>) => {
          state.loading = false;
          state.products = action.payload;
        },
      )
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(fetchProductDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchProductDetails.fulfilled,
        (state, action: PayloadAction<IProduct>) => {
          state.loading = false;
          state.product = action.payload;
        },
      )
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearProductDetails } = productSlice.actions;
export default productSlice.reducer;
