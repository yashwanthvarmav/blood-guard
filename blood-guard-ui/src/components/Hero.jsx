import React from "react";
import ArrowIcon from "../assests/arrow_icon.svg";
import HeroImg from "../assests/home-1.png";
import { Link, useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <div
      className="flex flex-col md:flex-row flex-wrap bg-primary rounded-lg px-6 md:px-10 lg:px-20 md:pr- lg:pr-0"
      style={{ background: "linear-gradient(135deg, #B71C1C, #F44336)" }}
    >
      <div className="md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]">
        <p className="text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight">
          Donate Blood, Save Lives!
        </p>
        <div className="flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light">
          <p>
            Join the mission to make a difference. Your small act of kindness can save a life today.
          </p>
        </div>
        <Link
          to="/login"
          className="flex items-center gap-2 bg-white px-8 py-3 rounded-full text-gray-600 text-sm m-auto md:m-0 hover:scale-105 border-2 border-transparent animate-glow focus:outline-none"
        >
          Donate <img className="w-3" src={ArrowIcon} alt="arrow-right" />
        </Link>
      </div>
      <div className="md:w-1/2 md:pr-0  lg:pr-0 relative flex justify-center items-center">
        <img
          className="absolute inset-0 w-full h-full object-cover rounded-lg"
          src={HeroImg}
          alt="hero-img"
        />
      </div>
    </div>
  );
};

export default Hero;
