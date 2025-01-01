import React from "react";
import Hero from "../components/Hero";
import Feature from "../components/Feature";
import Footer from "../components/Footer";
import FeatureDetails from "../components/FeatureDetails";
import FeatureDetailsNewOne from "../components/FeatureDetailsNewOne";

const Landing = () => {
  return (
    <div>
      <Hero />
      <Feature />
      <FeatureDetailsNewOne />
      <FeatureDetails />

      <Footer />
    </div>
  );
};

export default Landing;
