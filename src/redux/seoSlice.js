import { configureStore, createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchSeoData = createAsyncThunk(
  'seo/fetchData',
  async (path = '/') => {
    const response = await fetch(`https://api.nutsroastermachine.com/api/seo`);
    return response.json();
  }
);

const seoSlice = createSlice({
  name: 'seo',
  initialState: {
    data: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSeoData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSeoData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchSeoData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default seoSlice.reducer;