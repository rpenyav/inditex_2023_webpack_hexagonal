import React from "react";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../infrastructure/redux/root-reducer";
import { HomePageView } from "../components";

test("renderizado sin errores", () => {
  const store = configureStore({
    reducer: rootReducer,

    preloadedState: {},
  });

  render(
    <Provider store={store}>
      <BrowserRouter>
        <HomePageView />
      </BrowserRouter>
    </Provider>
  );
});
