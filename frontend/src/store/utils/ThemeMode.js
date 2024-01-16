import { createSlice } from "@reduxjs/toolkit";
import { lightColors, darkColors } from "./Colors";

const defaultState = {
  mode: localStorage.getItem("mode") || "dark",
  color: localStorage.getItem("mode") === "light" ? lightColors : darkColors,
};

const themeModeSlice = createSlice({
  name: "themeMode",
  initialState: defaultState,
  reducers: {
    setThemeMode(state, action) {
      state.mode = action.payload;
      state.color = action.payload === "light" ? lightColors : darkColors;
      localStorage.setItem("mode", action.payload);
    },
  },
});

export const setThemeMode = themeModeSlice.actions;
export default themeModeSlice.reducer;
