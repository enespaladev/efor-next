// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   language: 'en', // LocalStorage erişimi burada yapılamaz (server çalışır)
// };

// export const languageSlice = createSlice({
//   name: 'language',
//   initialState,
//   reducers: {
//     setLanguage: (state, action) => {
//       state.language = action.payload;

//       // Bu satır sadece tarayıcıda çalışsın
//       if (typeof window !== 'undefined') {
//         localStorage.setItem('language', action.payload);
//       }
//     },
//   },
// });

// export const { setLanguage } = languageSlice.actions;

// export default languageSlice.reducer;


import { createSlice } from '@reduxjs/toolkit';

// Server-side için safe initial state
const initialState = {
  language: 'tr' // Default değer
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
    initializeLanguage: (state, action) => {
      // Sadece henüz set edilmemişse initialize et
      if (state.language === 'tr') {
        state.language = action.payload;
      }
    }
  }
});

export const { setLanguage, initializeLanguage } = languageSlice.actions;
export default languageSlice.reducer;