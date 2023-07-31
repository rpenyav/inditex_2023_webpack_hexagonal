import React from "react";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../infrastructure/redux/root-reducer";
import HomePageView from "../pages/HomePageView";
import { setupIndexedDB } from '../../src/infrastructure/helpers/db';

// Mock de la función setupIndexedDB para que devuelva datos ficticios
jest.mock('../../src/infrastructure/helpers/db', () => ({
  setupIndexedDB: jest.fn().mockResolvedValue({
    put: jest.fn(),
    getAll: jest.fn().mockResolvedValue([
      // Aquí puedes agregar los datos ficticios que deseas devolver
      { id: "1", title: "Podcast 1", author: "Autor 1", image: "image1.jpg", summary: "Resumen 1" },
      { id: "2", title: "Podcast 2", author: "Autor 2", image: "image2.jpg", summary: "Resumen 2" },
      // ... más datos ficticios si los necesitas
    ]),
  }),
}));

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


