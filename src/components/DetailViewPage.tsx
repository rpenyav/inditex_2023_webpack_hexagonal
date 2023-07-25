import React from "react";

import { useParams } from "react-router-dom";
import GlobalLayout from "../layout/GlobalLayout";
import Episodes from "./Episodes";

import PodcasterCardDetail from "./PodcasterCardDetail";

const DetailViewPage: React.FC = () => {
  const { podcastId } = useParams<{ podcastId: string }>();

  return (
    <GlobalLayout>
      <div className="row" data-testid="detail-view-page">
        <div className="col-md-3">
          <div className="card">
            <div className="card-body m-4">
              <PodcasterCardDetail podcastId={podcastId!} />
            </div>
          </div>
        </div>
        <div className="col-md-9">
          <Episodes podcastId={podcastId} />
        </div>
      </div>
    </GlobalLayout>
  );
};

export default DetailViewPage;
