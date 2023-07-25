import { createAsyncThunk } from "@reduxjs/toolkit";
import { PodcastById } from "../../infrastructure/redux/detail/types";

export const fetchPodcastById = createAsyncThunk(
  "podcast/fetchPodcastById",
  async (podcastId: string) => {
    // Obtener los datos de la lista de top podcasts
    const response = await fetch(
      "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json"
    );
    const data = await response.json();
    const results = data.feed.entry;

    // Buscar el registro que coincide con el podcastId
    const selectedPodcast = results.find(
      (entry: any) => entry.id.attributes["im:id"] === podcastId
    );

    // Obtener los campos necesarios del registro seleccionado
    const artworkUrl600 = selectedPodcast["im:image"][2].label;
    const collectionName = selectedPodcast["im:name"].label;
    const artistName = selectedPodcast["im:artist"].label;
    const description = selectedPodcast.summary.label;

    return {
      artworkUrl600,
      collectionName,
      artistName,
      description,
    } as PodcastById;
  }
);
