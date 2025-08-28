// productSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProductsByCategory = createAsyncThunk(
  'product/fetchProductsByCategory',
  async (catId) => {
    const res = await axios.get(`https://nutsroastermachine.com/api/products?cat_id=${catId}`);
    return res.data;
  }
);

export const fetchProductById = createAsyncThunk(
  'product/fetchProductById',
  async (Id) => {
    const res = await axios.get(`https://nutsroastermachine.com/api/products?id=${Id}`);
    return res.data?.[0] ?? null;
  }
);

const productSlice = createSlice({
  name: 'product',
  initialState: {
    products: [],
    isLoading: false,
    isFetched: false,
    selectedProduct: null,
    selectedProductId: null, // <-- düzeltme
    error: null,
  },
  reducers: {
    setSelectedProductId: (state, action) => {
      state.selectedProductId = action.payload; // <-- düzeltme
    },
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.products = action.payload;
        state.isLoading = false;
        state.isFetched = true;
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      // ↓↓↓ ürün detayı için loading akışı
      .addCase(fetchProductById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.selectedProduct = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { setSelectedProductId, setSelectedProduct } = productSlice.actions;
export default productSlice.reducer;
