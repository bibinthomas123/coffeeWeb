import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./state";
import CssBaseline from "@mui/material/CssBaseline";
import ThemeProvider from "./theme";
import NotistackProvider from "./components/notistackProvider";

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <CssBaseline />
        <NotistackProvider>
          <App />
        </NotistackProvider>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
