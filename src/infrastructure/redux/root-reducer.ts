import { combineReducers } from "@reduxjs/toolkit";
import podcastsReducer from "./list/musicAlbumsReducer";
import musicAlbumsDetailReducer from "./detail/detailAlbumReducer";
import episodesReducer from "./detail/episodesReducer";
import getPodcastByIdSlice from "./detail/podcastByIdReducer";

const rootReducer = combineReducers({
  podcasts: podcastsReducer,
  albumDetails: musicAlbumsDetailReducer,
  episodes: episodesReducer,
  getPodcastById: getPodcastByIdSlice,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
