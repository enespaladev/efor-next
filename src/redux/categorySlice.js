import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCategories = createAsyncThunk(
  'category/fetchCategories',
  async () => {
    const res = await axios.get('https://nutsroastermachine.com/api/categories');
    return res.data;
  }
);

const categorySlice = createSlice({
  name: 'category',
  initialState: {
    categories: [],
    isLoading: false,
    isFetched: false,
    selectedCategoryId: null,
  },
  reducers: {
    setSelectedCategoryId: (state, action) => {
      state.selectedCategoryId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.isLoading = false;
        state.isFetched = true;
      })
      .addCase(fetchCategories.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { setSelectedCategoryId } = categorySlice.actions;
export default categorySlice.reducer;
