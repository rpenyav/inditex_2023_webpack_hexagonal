import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
//lazy load
const HomePageView = lazy(() => import("../../components/HomePageView"));
const DetailViewPage = lazy(() => import("../../components/DetailViewPage"));
const DetailViewEpisode = lazy(() => import("../../components/DetailViewEpisode"));

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePageView />} />
          <Route path="/podcast/:podcastId" element={<DetailViewPage />} />
          <Route
            path="/podcast/:podcastId/episode/:episodeId"
            element={<DetailViewEpisode />}
          />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AppRoutes;
