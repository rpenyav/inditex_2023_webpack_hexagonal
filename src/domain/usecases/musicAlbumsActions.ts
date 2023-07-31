import { createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { RootState } from "../../infrastructure/redux/root-reducer";
import { Podcast } from "../../infrastructure/redux/list/types";
import { openDB } from 'idb';

const apiUrl = process.env.REACT_APP_API_URL;


/**
 *  Se ha aplicado IndexedDB
 *  para la persistencia d edatos en la obtencion del global de los podcasts
 * 
 * */
 
//object store
const setupIndexedDB = async () => {
  const db = await openDB('podcastDatabase', 1, {
    upgrade(db) {
      db.createObjectStore('podcasts');
    },
  });
  return db;
};

export const fetchMusicAlbum = createAsyncThunk(
  "podcasts/fetchMusicAlbum",
  async (_, { getState, dispatch }) => {
    const state = getState() as RootState;
    const { ultimas24Horas } = state.podcasts;
    const horaActual = Date.now();
    const unDiaEnMilisegundos = 24 * 60 * 60 * 1000;
    const db = await setupIndexedDB();

    if (horaActual - ultimas24Horas > unDiaEnMilisegundos) {
      if (!apiUrl) {
        throw new Error("API URL is not defined in environment variables.");
      }

      const response = await fetch(apiUrl);
      const data = await response.json();

      const podcasts = data.feed.entry.map((entry: any) => ({
        id: entry.id.attributes["im:id"],
        title: entry["im:name"].label,
        author: entry["im:artist"].label,
        image: entry["im:image"][2].label,
        summary: entry.summary.label,
      })) as Podcast[];

      //Guardar en IndexedDB
      for (const podcast of podcasts) {
        await db.put('podcasts', podcast, podcast.id);
      }

      dispatch(updateMusicAlbums({ podcasts, ultimas24Horas: horaActual }));
    } else {
      //Recuperar de IndexedDB
      const podcasts = await db.getAll('podcasts');
      dispatch(updateMusicAlbums({ podcasts, ultimas24Horas }));
    }
  }
);

export const updateMusicAlbums = createAction<{
  podcasts: Podcast[];
  ultimas24Horas: number;
}>("podcasts/updateMusicAlbums");
