import { createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { RootState } from "../../infrastructure/redux/root-reducer";
import { Podcast } from "../../infrastructure/redux/list/types";

/**
 *  realizamos la solicitud para obtener los registros desde la API.
 */
const apiUrl = process.env.REACT_APP_API_URL;

export const fetchMusicAlbum = createAsyncThunk(
  "podcasts/fetchMusicAlbum",
  async (_, { getState, dispatch }) => {
    const state = getState() as RootState;
    const { ultimas24Horas } = state.podcasts; //se compara el estado lastfetchtime con la hora actual
    const horaActual = Date.now();
    const unDiaEnMilisegundos = 24 * 60 * 60 * 1000; //se inicializa una variable con un día

    if (horaActual - ultimas24Horas > unDiaEnMilisegundos) {
      if (!apiUrl) {
        throw new Error("API URL is not defined in environment variables.");
      }

      //según el resultado se hace la solicitud a la API
      const response = await fetch(apiUrl);
      const data = await response.json();

      const podcasts = data.feed.entry.map((entry: any) => ({
        id: entry.id.attributes["im:id"],
        title: entry["im:name"].label,
        author: entry["im:artist"].label,
        image: entry["im:image"][2].label,
        summary: entry.summary.label,
      })) as Podcast[];

      dispatch(updateMusicAlbums({ podcasts, ultimas24Horas: horaActual })); //se updatea el listado y el timer
    }
  }
);

export const updateMusicAlbums = createAction<{
  podcasts: Podcast[];
  ultimas24Horas: number;
}>("podcasts/updateMusicAlbums");
