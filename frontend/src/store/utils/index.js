import { configureStore } from "@reduxjs/toolkit";

import themeModeReducer from "./ThemeMode";

const store = configureStore({
  reducer: {
    themeMode: themeModeReducer,
  },
});

export default store;
