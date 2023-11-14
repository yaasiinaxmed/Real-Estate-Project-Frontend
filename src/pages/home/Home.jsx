import React from "react";
import Hero from "../../components/homeContent/Hero";
import LatestProperty from "../../components/homeContent/LatestProperty";

function Home() {
  return (
    <div className="w-full">
      <Hero />
      <LatestProperty />
    </div>
  );
}

export default Home;
