import { createSlice } from "@reduxjs/toolkit";
import { Episode } from "./types";
import { fetchEpisodes, updateEpisodes } from ".";

export interface EpisodesState {
  episodes: Episode[];
  isLoaded: boolean;
}

const initialState: EpisodesState = {
  episodes: [],
  isLoaded: false,
};

const episodesSlice = createSlice({
  name: "episodes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEpisodes.pending, (state) => {
        state.isLoaded = true;
      })
      .addCase(fetchEpisodes.fulfilled, (state, action) => {
        state.episodes = action.payload;
        state.isLoaded = false;
      })
      .addCase(updateEpisodes, (state, action) => {
        state.episodes = action.payload;
        state.isLoaded = false;
      });
  },
});

export default episodesSlice.reducer;
