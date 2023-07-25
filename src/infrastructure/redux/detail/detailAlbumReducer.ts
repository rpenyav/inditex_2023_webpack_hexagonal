import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PodcastDetail } from "./types";
import { fetchAlbumDetail } from "../../../domain/usecases/detailAlbumActions";

export interface MusicAlbumsDetailState {
  detail: PodcastDetail | null;
  ultimas24Horas: number;
  isLoading: boolean;
}

const initialState: MusicAlbumsDetailState = {
  detail: null,
  ultimas24Horas: 0,
  isLoading: true,
};

const musicAlbumsDetailSlice = createSlice({
  name: "musicAlbumsDetail",
  initialState,
  reducers: {
    updateMusicAlbumsDetail: (
      state,
      action: PayloadAction<{ podcasts: PodcastDetail; ultimas24Horas: number }>
    ) => {
      state.detail = action.payload.podcasts;
      state.ultimas24Horas = action.payload.ultimas24Horas;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAlbumDetail.fulfilled, (state, action) => {
      state.detail = action.payload;
      state.isLoading = false;
    });
  },
});

export const { updateMusicAlbumsDetail } = musicAlbumsDetailSlice.actions;
export default musicAlbumsDetailSlice.reducer;
