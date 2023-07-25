import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import GlobalLayout from "../layout/GlobalLayout";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../infrastructure/redux/root-reducer";
import React from "react";

describe("Test - GlobalLayout Component", () => {
  test("renderizado sin errores", () => {
    const store = configureStore({
      reducer: rootReducer,
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <GlobalLayout>
            <div>Contenido de prueba</div>
          </GlobalLayout>
        </BrowserRouter>
      </Provider>
    );

    const contenidoPrueba = screen.getByText("Contenido de prueba");
    expect(contenidoPrueba).toBeInTheDocument();
  });

  test("renderizado de Cabecera component", () => {
    const store = configureStore({
      reducer: rootReducer,
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <GlobalLayout>
            <div>Contenido de prueba</div>
          </GlobalLayout>
        </BrowserRouter>
      </Provider>
    );

    const cabeceraComponent = screen.getByTestId("cabecera-component");
    expect(cabeceraComponent).toBeInTheDocument();
  });
});
