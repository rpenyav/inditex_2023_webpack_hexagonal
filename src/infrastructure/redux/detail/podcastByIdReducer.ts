import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PodcastById } from "./types";
import { fetchPodcastById } from "../../../domain/usecases/podcastByIdActions";

/**
 *  reducer específico para mostrar la card del artista.
 *  la descripcion no viene en el detalle y he tenido que llamar el endpoint general y obtener e lartista segun
 *  el idPodcast
 *
 */
interface PodcastByIdState {
  podcast: PodcastById | null;
  loading: boolean;
  error: string | null;
}

const initialState: PodcastByIdState = {
  podcast: null,
  loading: true,
  error: null,
};

const getPodcastByIdSlice = createSlice({
  name: "podcast",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPodcastById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      fetchPodcastById.fulfilled,
      (state, action: PayloadAction<PodcastById>) => {
        state.podcast = action.payload;
        state.loading = false;
        state.error = null;
      }
    );
    builder.addCase(fetchPodcastById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to fetch podcast.";
    });
  },
});

export default getPodcastByIdSlice.reducer;
