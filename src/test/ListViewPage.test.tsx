import { Provider } from "react-redux";
import { configureStore, EnhancedStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom"; //MemoryRouter por el useNavigate
import { render, screen, fireEvent } from "@testing-library/react";
import rootReducer, { RootState } from "../infrastructure/redux/root-reducer";
import ListViewPage from "../components/ListViewPage";
import React from "react";

describe("Test - ListViewPage Component", () => {
  let store: EnhancedStore<RootState>;

  beforeEach(() => {
    // Configuración inicial del store
    store = configureStore({
      reducer: rootReducer,
      preloadedState: {
        podcasts: {
          list: [
            {
              id: "1",
              title: "Podcast Random Nadie Sabe Nada",
              author: "Berto y Andreu",
              image: "image1.jpg",
              summary: "Lorem ipsum",
            },
            {
              id: "2",
              title: "Podcast Crims",
              author: "Carles Porta",
              image: "image2.jpg",
              summary: "Lorem ipsum dolor site amet",
            },
          ],
          ultimas24Horas: 24,
          isLoading: false,
        },
      },
    });
  });

  test("renderizado sin errores", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ListViewPage />
        </MemoryRouter>
      </Provider>
    );
  });

  test("filtrado podcasts cuando escribimos texto", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ListViewPage />
        </MemoryRouter>
      </Provider>
    );

    const filterInput = screen.getByPlaceholderText("Filter podcasts");
    fireEvent.change(filterInput, { target: { value: "Random" } });

    const podcast1 = screen.getByText(/Podcast Random Nadie Sabe Nada/i);
    const podcast2 = screen.queryByText(/Podcast Crims/i);

    expect(podcast1).toBeInTheDocument();
    expect(podcast2).not.toBeInTheDocument();
  });

  test("paginacion al usar los botones next y prev", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ListViewPage />
        </MemoryRouter>
      </Provider>
    );

    //la página default es la 1
    expect(screen.getByText("1")).toHaveClass("btn-secondary");

    //click en next
    const nextButton = screen.getByText("Next");
    fireEvent.click(nextButton);

    //click en prev
    const prevButton = screen.getByText("Prev");
    fireEvent.click(prevButton);

    //retorno a la pagina default
    expect(screen.getByText("1")).toHaveClass("btn-secondary");
  });

  test("la funcion llamada al clickar en un podcast funciona OK", () => {
    const onPodcastClick = jest.fn();
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ListViewPage onPodcastClick={onPodcastClick} />
        </MemoryRouter>
      </Provider>
    );

    // Click en el primer podcast
    const podcast1 = screen.getByRole("heading", {
      name: /Podcast Random Nadie Sabe Nada/i,
    });
    fireEvent.click(podcast1);

    //La función se llamó una vez con los argumentos correctos
    expect(onPodcastClick).toHaveBeenCalledTimes(1);
    expect(onPodcastClick).toHaveBeenCalledWith({
      id: "1",
      title: "Podcast Random Nadie Sabe Nada",
      author: "Berto y Andreu",
      image: "image1.jpg",
      summary: "Lorem ipsum",
    });
  });
});
