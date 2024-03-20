import React from "react";
import Carousel from "./Carousel";
import WeeklyTheme from "./WeeklyTheme";
import Latest from "./Latest";
import BestPainter from "./BestPainter";

const Home = () => {
  return (
    <>
      <Carousel />
      <WeeklyTheme />
      <Latest />
      <BestPainter />
    </>
  );
};

export default Home;
