import React from "react";

const Loader = () => {
  return (
    <>
   
      <div className="box">
        <span className="loader loader_main"></span>
        <span className="loading">Loading...</span>
      </div>
      <div className="box2"></div>
    </>
  );
};

export const LoaderSmall = () => {
  return <span className="loader loader_small"></span>;
};

export default Loader;
