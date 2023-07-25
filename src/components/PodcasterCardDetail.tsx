import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../infrastructure/redux/root-reducer";


import Episodes from "./Episodes";
import { fetchPodcastById } from "../infrastructure/redux/detail";
import { AppDispatch } from "../infrastructure/redux/store";

interface Props {
  showList?: boolean;
  podcastId: string;
}

const PodcasterCardDetail: React.FC<Props> = ({ showList, podcastId }) => {
  const dispatch = useDispatch<AppDispatch>();
  const podcast = useSelector(
    (state: RootState) => state.getPodcastById.podcast
  );

  useEffect(() => {
    dispatch(fetchPodcastById(podcastId));
  }, [dispatch, podcastId]);

  if (!podcast) {
    return <div data-testid="podcaster-card-detail">Loading...</div>;
  }

  const { artworkUrl600, collectionName, artistName, description } = podcast;

  return (
    <div data-testid="podcaster-card-detail">
      <Link to={`/podcast/${podcastId}`}>
        <img
          src={artworkUrl600}
          alt={collectionName}
          className="img-fluid"
          style={{ width: "100%" }}
        />
      </Link>
      <h4 className="mt-3">
        <Link className="black-link" to={`/podcast/${podcastId}`}>
          {collectionName}
        </Link>
      </h4>
      <p>
        <em>by: {artistName}</em>
      </p>
      <p className="m-0">
        <strong>Description</strong>
      </p>
      <p>
        <em>{description}</em>
      </p>
      {!showList ? null : <Episodes podcastId={podcastId} />}
    </div>
  );
};

export default PodcasterCardDetail;
