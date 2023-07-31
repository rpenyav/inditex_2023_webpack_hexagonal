import React from "react";
import GlobalLayout from "../layout/GlobalLayout";
import ListViewPage from "./ListViewPage";

const HomePageView: React.FC = () => {
  return (
    <GlobalLayout>
      <ListViewPage />
    </GlobalLayout>
  );
};

export default HomePageView;
