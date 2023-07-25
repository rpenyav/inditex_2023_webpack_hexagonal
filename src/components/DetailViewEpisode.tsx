import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../infrastructure/redux/root-reducer";
import { useParams } from "react-router-dom";
import { fetchEpisodes } from "../infrastructure/redux/detail";
import GlobalLayout from "../layout/GlobalLayout";


import PodcasterCardDetail from "./PodcasterCardDetail";
import { AppDispatch } from "../infrastructure/redux/store";

const DetailViewEpisode: React.FC = () => {
  const { podcastId, episodeId } = useParams<{
    podcastId: string;
    episodeId: string;
  }>();
  const dispatch = useDispatch<AppDispatch>();
  const episodes = useSelector((state: RootState) => state.episodes.episodes);
  const [isEpisodesLoaded, setIsEpisodesLoaded] = useState(false);
  const [isEpisodeFound, setIsEpisodeFound] = useState(true);

  useEffect(() => {
    dispatch(fetchEpisodes(podcastId!)); // Realizar una nueva llamada a la API
  }, [dispatch, podcastId]);

  useEffect(() => {
    const episode = episodes.find((ep) => ep.trackId === parseInt(episodeId!));
    setIsEpisodesLoaded(true);
    setIsEpisodeFound(episode !== undefined);
  }, [episodes, episodeId]);

  if (!isEpisodesLoaded) {
    return <div>Loading...</div>;
  }

  if (!isEpisodeFound || !episodeId) {
    return <div>Episode not found</div>;
  }

  const episode = episodes.find((ep) => ep.trackId === parseInt(episodeId!));

  if (!episode) {
    return <div>Episode not found</div>;
  }

  return (
    <GlobalLayout>
      <div className="row">
        <div className="col-md-3">
          <div className="card">
            <div className="card-body m-4">
              <PodcasterCardDetail podcastId={podcastId!} />
            </div>
          </div>
        </div>
        <div className="col-md-9">
          <h2 className="mb-4">{episode!.trackName}</h2>
          <div dangerouslySetInnerHTML={{ __html: episode!.description }}></div>
          <div className="mt-5">
            <audio controls className="custom-audio-player">
              <source src={episode.episodeUrl} type="audio/mpeg" />
              Your browser does not support the audio tag.
            </audio>
          </div>
        </div>
      </div>
    </GlobalLayout>
  );
};

export default DetailViewEpisode;
