import React from "react";
import BloodImg from "../assests/healthy-man-donating-his-blood.svg";

const FeatureDetailsNewOne = () => {
  return (
    <div className="mb-24 mt-24">
      <h2 className="text-center text-4xl font-poppins text-primary font-bold mb-16">
        Why Donate Blood?
      </h2>
      <div className="flex flex-col md:flex-row items-center md:items-start">
        <img className="md:w-1/2 w-full md:pr-8" src={BloodImg} alt="blood" />
        <div className="md:w-1/2 w-full md:pl-8">
          <h2 className="mt-6 text-2xl font-poppins text-primary font-bold">
            Discover the impact of your contribution.
          </h2>
          <div className="mt-12">
            <ul className="mt-4 space-y-2 text-gray-700 font-poppins">
              <li>
                💓 <strong>Save Lives:</strong> Every donation saves up to three
                lives.
              </li>
              <li>
                🏥 <strong>Support Healthcare:</strong> Help hospitals maintain
                emergency readiness.
              </li>
              <li>
                🔄 <strong>Improve Your Health:</strong> Stimulate new red blood
                cells and maintain iron levels.
              </li>
              <li>
                🩸 <strong>Rare Blood Types:</strong> Support patients with rare
                blood type needs.
              </li>
              <li>
                🤝 <strong>Community Contribution:</strong> Spread kindness and
                generosity.
              </li>
            </ul>
          </div>
          <p className="mt-10 text-lg font-poppins text-gray-800 italic">
            "Be someone's hope. Donate blood today and make a lasting impact on lives."
          </p>
        </div>
      </div>
    </div>
  );
};

export default FeatureDetailsNewOne;
