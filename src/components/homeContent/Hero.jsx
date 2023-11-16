import React from "react";
import { Link } from "react-router-dom";
import heroImg from "../../assets/hero.jpg";

function Hero() {
  return (
    <section
      className="w-full h-[100vh] bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${heroImg})` }}
    >
      <div className="container  h-full flex items-center justify-center flex-col gap-2">
        <h2 className="text text-2xl md:text-3xl !leading-[2rem] sm:!leading-[3rem] text-center text-white font-medium whitespace-normal">
          Are you looking for a property <br className="hidden md:block" /> That
          perfectly matches your requirements?
        </h2>
        <p className="text-xl md:text-2xl text-center text-white font-normal ">
          Discover it with ease!
        </p>
        <Link to="/properties">
          <button className="bg-white mt-2 text-primaryColor px-8 py-2 h-[44px] font-medium flex items-center justify-center rounded-3xl duration-100 hover:scale-110 ">
            Explore Now
          </button>
        </Link>
      </div>
    </section>
  );
}

export default Hero;
