import React from "react";
import Hero from "../../components/homeContent/Hero";
import LatestProperty from "../../components/homeContent/LatestProperty";
import Features from "../../components/homeContent/Featuers";

function Home() {
  return (
    <div className="w-full">
      <Hero />
      <Features/>
      <LatestProperty />
    </div>
  );
}

export default Home;
