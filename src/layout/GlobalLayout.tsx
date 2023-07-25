import React from "react";
import { Cabecera } from "../components";
import { GlobalLayoutProps } from "../domain/entities/GlobalLayoutProps";

const GlobalLayout: React.FC<GlobalLayoutProps> = ({ children }) => {
  return (
    <>
      <div className="container">
        <Cabecera />
        {children}
      </div>
    </>
  );
};

export default GlobalLayout;
