import { configureStore, combineReducers } from '@reduxjs/toolkit';
import languageReducer from './languageSlice';
import categoryReducer from './categorySlice';
import productReducer from './productSlice';
import blogReducer from './blogSlice';
import seoReducer from './seoSlice';

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist';

const createStorage = () => {
  if (typeof window === 'undefined') {
    return {
      getItem: () => Promise.resolve(null),
      setItem: () => Promise.resolve(),
      removeItem: () => Promise.resolve(),
    };
  }
  return {
    getItem: (key) => Promise.resolve(localStorage.getItem(key)),
    setItem: (key, value) => Promise.resolve(localStorage.setItem(key, value)),
    removeItem: (key) => Promise.resolve(localStorage.removeItem(key)),
  };
};

// Kalıcı yapılacak reducer'lar
const persistConfig = {
  key: 'root',
  storage: createStorage(),
  whitelist: ['language'], // sadece language slice'ı kalıcı olsun
};

const rootReducer = combineReducers({
  language: languageReducer,
  category: categoryReducer,
  product: productReducer,
  blog: blogReducer,
  seo: seoReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);