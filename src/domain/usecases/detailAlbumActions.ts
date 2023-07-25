import { createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { PodcastDetail } from "../../infrastructure/redux/detail/types";

const apiUrlDetail = process.env.REACT_APP_API_URL_DETAIL;

export const fetchAlbumDetail = createAsyncThunk(
  "podcasts/fetchAlbumDetail",
  async (params: { podcastId: string }): Promise<PodcastDetail> => {
    const { podcastId } = params;
    const url = `${apiUrlDetail}?id=${podcastId}&media=podcast`;

    const response = await fetch(url);
    const data = await response.json();

    return data.results[0] as PodcastDetail;
  }
);

export const updateMusicAlbumsDetail = createAction<{
  podcasts: PodcastDetail[];
  ultimas24Horas: number;
}>("musicAlbumsDetail/updateMusicAlbumsDetail");
