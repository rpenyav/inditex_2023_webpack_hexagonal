import { createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { Episode } from "../../infrastructure/redux/detail/types";

const apiUrlDetail = process.env.REACT_APP_API_URL_DETAIL;

export const fetchEpisodes = createAsyncThunk(
  "episodes/fetchEpisodes",
  async (podcastId: string) => {
    const response = await fetch(
      `${apiUrlDetail}?id=${podcastId}&media=podcast&entity=podcastEpisode&limit=20`
    );
    const data = await response.json();
    const episodes = data.results as Episode[];
    return episodes;
  }
);

export const updateEpisodes = createAction<Episode[]>(
  "episodes/updateEpisodes"
);
