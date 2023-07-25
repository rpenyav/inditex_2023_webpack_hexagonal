import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Podcast } from "./types";

export interface MusicAlbumsState {
  list: Podcast[];
  ultimas24Horas: number; // Almacenamos en store el tiempo de la última solicitud
  isLoading: boolean;
}

const initialState: MusicAlbumsState = {
  list: [],
  ultimas24Horas: 0,
  isLoading: true,
};

const musicAlbumsSlice = createSlice({
  name: "podcasts",
  initialState,
  reducers: {
    updateMusicAlbums: (
      state,
      action: PayloadAction<{ podcasts: Podcast[]; ultimas24Horas: number }>
    ) => {
      state.list = action.payload.podcasts;
      state.ultimas24Horas = action.payload.ultimas24Horas;
      state.isLoading = false;
    },
  },
});

export const { updateMusicAlbums } = musicAlbumsSlice.actions;
export default musicAlbumsSlice.reducer;
