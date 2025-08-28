// blogslice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://nutsroastermachine.com/api',
  timeout: 15000,
});

const toArray = (resData) =>
  Array.isArray(resData) ? resData
    : (Array.isArray(resData?.data) ? resData.data : []);

// --- LIST ---
export const fetchBlogs = createAsyncThunk('blog/fetchBlogs', async () => {
  const { data } = await api.get('/blogs');
  return data ?? [];
});

// --- DETAIL BY ID ---
export const fetchBlogById = createAsyncThunk(
  'blog/fetchBlogById',
  async (Id) => {
    const res = await api.get(`/blogs`, { params: { id: Id } });
    return res.data?.[0] ?? null;
  }
);

// --- DETAIL BY SLUG (client-side filter) ---
export const fetchBlogBySlug = createAsyncThunk(
  'blog/fetchBlogBySlug',
  async ({ slug, lang }, { rejectWithValue }) => {
    try {
      const res = await api.get('/blogs');
      const items = toArray(res.data);
      const needle = decodeURIComponent(String(slug)).toLowerCase();

      const hit = items.find(b => {
        const byLang = b?.[`slug_${lang}`];
        const generic = b?.slug;
        return (byLang && String(byLang).toLowerCase() === needle) ||
               (generic && String(generic).toLowerCase() === needle);
      });

      if (!hit) return rejectWithValue('Blog bulunamadı');
      return hit;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || err.message);
    }
  }
);

// --- LATEST (3) ---
export const fetchLatestBlogs = createAsyncThunk(
  'blog/fetchLatestBlogs',
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get('blogs', { params: { limit: 3 } });
      const payload = Array.isArray(res.data)
        ? res.data
        : (Array.isArray(res.data?.data) ? res.data.data : []);
      return payload;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || err.message);
    }
  }
);

const initialState = {
  blogs: [],
  blogsLoading: false,
  blogsError: null,

  isFetched: false,

  latestBlogs: [],
  latestLoading: false,
  latestError: null,

  selectedBlog: null,
  selectedBlogId: null,

  detailLoading: false,
  detailError: null,
  detailRequestId: null,
};

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    setSelectedBlogId: (state, action) => {
      state.selectedBlogId = action.payload;
    },
    setSelectedBlog: (state, action) => {
      state.selectedBlog = action.payload;
    },
    clearSelectedBlog: (state) => {
      state.selectedBlog = null;
      state.detailError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // LIST
      .addCase(fetchBlogs.pending, (state) => {
        state.blogsLoading = true;
        state.blogsError = null;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.blogsLoading = false;
        state.blogs = action.payload;
        state.isFetched = true;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.blogsLoading = false;
        state.blogsError = action.error.message || 'Liste yüklenemedi';
      })

      // DETAIL BY ID  *** isimler düzeltildi ***
      .addCase(fetchBlogById.pending, (state) => {
        state.detailLoading = true;
        state.detailError = null;
      })
      .addCase(fetchBlogById.fulfilled, (state, action) => {
        state.selectedBlog = action.payload;
        state.detailLoading = false;
      })
      .addCase(fetchBlogById.rejected, (state, action) => {
        state.detailLoading = false;
        state.detailError = action.error.message;
      })

      // DETAIL BY SLUG
      .addCase(fetchBlogBySlug.pending, (state) => {
        state.detailLoading = true;
        state.detailError = null;
      })
      .addCase(fetchBlogBySlug.fulfilled, (state, action) => {
        state.selectedBlog = action.payload;
        state.detailLoading = false;
        state.selectedBlogId = action.payload?.id ?? null;
      })
      .addCase(fetchBlogBySlug.rejected, (state, action) => {
        state.detailLoading = false;
        state.detailError = action.payload || action.error.message;
      })

      // LATEST (3)
      .addCase(fetchLatestBlogs.pending, (state) => {
        state.latestLoading = true;
        state.latestError = null;
      })
      .addCase(fetchLatestBlogs.fulfilled, (state, action) => {
        state.latestLoading = false;
        state.latestBlogs = Array.isArray(action.payload) ? action.payload.slice(0, 3) : [];
      })
      .addCase(fetchLatestBlogs.rejected, (state, action) => {
        state.latestLoading = false;
        state.latestError = action.error.message || 'Son yazılar yüklenemedi';
      });
  },
});

export const { setSelectedBlogId, setSelectedBlog, clearSelectedBlog } = blogSlice.actions;

export const selectLatestBlogs = (state) => state.blog.latestBlogs;
export const selectLatestLoading = (state) => state.blog.latestLoading;
export const selectLatestError = (state) => state.blog.latestError;

export default blogSlice.reducer;
