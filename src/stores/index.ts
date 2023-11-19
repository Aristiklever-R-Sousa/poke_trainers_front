import { configureStore } from "@reduxjs/toolkit";
import trainerReducer from "./trainer";

const store = configureStore({
  reducer: {
    trainer: trainerReducer
  }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type:
export type AppDispatch = typeof store.dispatch

export default store;
