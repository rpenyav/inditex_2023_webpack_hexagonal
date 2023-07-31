import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../infrastructure/redux/root-reducer";
import React from "react";
import DetailViewPage from "../pages/DetailViewPage";

describe("DetailViewPage Component", () => {
  test("renderizado sin errores", () => {
    const store = configureStore({
      reducer: rootReducer,
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <DetailViewPage />
        </MemoryRouter>
      </Provider>
    );
    // Verificar el componente
    const detailViewPageElement = screen.getByTestId("detail-view-page");
    expect(detailViewPageElement).toBeInTheDocument();
  });
});
