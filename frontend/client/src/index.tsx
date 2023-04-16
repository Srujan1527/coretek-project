import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import App from "./App";
import coretekReducer from "./state/state";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import {
  persistStore,
  persistReducer,

} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";

const persistConfig = {
  key: "coretek",
  storage,
};

const persistedReducer = persistReducer(persistConfig, coretekReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});


let appPersistor = persistStore(store);
// Define the action creator for the register action

// Dispatch the register action before persisting the store

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={appPersistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
