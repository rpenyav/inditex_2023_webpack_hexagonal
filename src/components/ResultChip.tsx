import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../infrastructure/redux/root-reducer";
import { Podcast } from "../infrastructure/redux/list";

interface ResultChipProps {
  filterText: string;
}

const ResultChip: React.FC<ResultChipProps> = ({ filterText }) => {
  const [resultCount, setResultCount] = useState(0);
  const podcasts = useSelector((state: RootState) => state.podcasts.list);

  useEffect(() => {
    const filteredPodcasts = podcasts.filter((podcast: Podcast) => {
      const searchStr = `${podcast.title} ${podcast.author}`.toLowerCase();
      return searchStr.includes(filterText.toLowerCase());
    });
    setResultCount(filteredPodcasts.length);
  }, [filterText, podcasts]);

  return (
    <div>
      <span className="badge rounded-pill bg-primary">{resultCount}</span>
    </div>
  );
};

export default ResultChip;
