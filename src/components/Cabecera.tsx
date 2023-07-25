import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../infrastructure/redux/root-reducer";
import SpinnerIcon from "./SpinnerIcon";

const Cabecera: React.FC = () => {
  const isLoading = useSelector((state: RootState) => state.podcasts.isLoading);
  const isLoadingDetail = useSelector(
    (state: RootState) => state.albumDetails.isLoading
  );

  return (
    <div
      className="row pt-3 pb-3 border-bottom mb-4"
      data-testid="cabecera-component"
    >
      <div className="col">
        <h4>
          <Link to="/">Podcaster</Link>
        </h4>
      </div>
      <div className="col-1 d-flex justify-content-end align-items-center">
        {isLoading && isLoadingDetail ? <SpinnerIcon /> : null}
      </div>
    </div>
  );
};

export default Cabecera;
