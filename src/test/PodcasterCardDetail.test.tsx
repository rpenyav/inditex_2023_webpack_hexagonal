import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import PodcasterCardDetail from "../components/PodcasterCardDetail";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../infrastructure/redux/root-reducer";
import React from "react";

describe("PodcasterCardDetail Component", () => {
  beforeEach(() => {
    const store = configureStore({
      reducer: rootReducer,
      preloadedState: {
        getPodcastById: {
          podcast: {
            artworkUrl600: "image.jpg",
            collectionName: "Nombre de la colección",
            artistName: "Nombre del artista",
            description: "Descripción del podcast",
          },
          loading: false,
          error: null,
        },
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <PodcasterCardDetail podcastId="1" />
        </MemoryRouter>
      </Provider>
    );
  });

  test("renderizado sin errores", () => {
    // Verificar el componente
    const podcasterCardDetailElement = screen.getByTestId(
      "podcaster-card-detail"
    );
    expect(podcasterCardDetailElement).toBeInTheDocument();
  });

  test("carga de datos", () => {
    // Verificar que el mensaje de carga ya no esté presente
    const loadingElement = screen.queryByText("Loading...");
    expect(loadingElement).not.toBeInTheDocument();

    // Verificar que los datos del podcast se muestren correctamente
    const collectionNameElement = screen.getByText("Nombre de la colección");
    expect(collectionNameElement).toBeInTheDocument();

    const artistNameElement = screen.getByText("by: Nombre del artista");
    expect(artistNameElement).toBeInTheDocument();
  });
});
