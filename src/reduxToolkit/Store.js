import { configureStore } from "@reduxjs/toolkit";
import MayanSlice from "./Mayanslice/MayanSlice";

export const store = configureStore({
  reducer: {
    MayanDoc: MayanSlice,
  },
});
