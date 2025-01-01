import React from "react";
import PageImage1 from "../../assests/page-2-know-1.png";
import PageImage2 from "../../assests/page-2-know-2.png";
import PageImage3 from "../../assests/page-2-know-3.png";
import PageImage4 from "../../assests/page-2-know-4.png";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";

const MotivationHub = () => {
  const navigate = useNavigate();
  return (
    <div>
      {/* Section 1: Benefits of Blood Donation */}
      <section className="bg-gray-100 py-10 px-5 md:px-20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center">
          <img
            src={PageImage1}
            alt="Benefits of Blood Donation"
            className="md:w-1/2 w-full rounded-lg shadow-lg mb-6 md:mb-0 md:mr-8"
          />
          <div className="md:w-1/2 w-full">
            <h2 className="text-3xl font-bold text-red-800 mb-4">Why Donate Blood?</h2>
            <p className="text-gray-600 mb-6">
              Blood donation is not just a gift for recipients; it's a benefit for donors too:
              <ul className="list-disc list-inside mt-4">
                <li>Enhances cardiovascular health.</li>
                <li>Boosts emotional well-being.</li>
                <li>Helps in understanding your own health through routine checks.</li>
              </ul>
              Experience the joy of saving lives.
            </p>
            <button onClick = {() => navigate('/login')} className="px-6 py-3 text-white bg-red-600 rounded-lg hover:bg-red-700">
              Start Your Journey
            </button>
          </div>
        </div>
      </section>

      {/* Section 2: Quit Bad Habits, Become a Hero */}
      <section className="bg-white py-10 px-5 md:px-20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 w-full md:mr-8">
            <h2 className="text-3xl font-bold text-red-800 mb-4">Ready to Be a Hero?</h2>
            <p className="text-gray-600 mb-6">
              Certain habits, like smoking, excessive drinking, or unhealthy diets, can make you ineligible. Quitting these can:
              <ul className="list-disc list-inside mt-4">
                <li>Improve your overall health.</li>
                <li>Make you eligible to save lives through blood donation.</li>
              </ul>
              Take the first step toward a healthier, purposeful life.
            </p>
            <button onClick = {() => navigate('/contact')} className="px-6 py-3 text-white bg-red-600 rounded-lg hover:bg-red-700">
              Learn How to Quit
            </button>
          </div>
          <img
            src={PageImage2}
            alt="Quit Bad Habits"
            className="md:w-1/2 w-full rounded-lg shadow-lg mt-6 md:mt-0"
          />
        </div>
      </section>

      {/* Section 3: Overcoming Temporary Ineligibility */}
      <section className="bg-gray-100 py-10 px-5 md:px-20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center">
          <img
            src={PageImage3}
            alt="Temporary Ineligibility"
            className="md:w-1/2 w-full rounded-lg shadow-lg mb-6 md:mb-0 md:mr-8"
          />
          <div className="md:w-1/2 w-full">
            <h2 className="text-3xl font-bold text-red-800 mb-4">Your Path to Eligibility</h2>
            <p className="text-gray-600 mb-6">
              Don’t be discouraged if you're temporarily ineligible. Follow these steps:
              <ul className="list-disc list-inside mt-4">
                <li>Maintain a balanced diet and exercise.</li>
                <li>Avoid risky behaviors like unprotected travel to malaria-prone areas.</li>
                <li>Stay updated with health check-ups and vaccinations.</li>
              </ul>
              Track your progress and become eligible soon.
            </p>
            <button onClick = {() => navigate('/login')} className="px-6 py-3 text-white bg-red-600 rounded-lg hover:bg-red-700">
              Track My Progress
            </button>
          </div>
        </div>
      </section>

      {/* Section 4: Inspirational Stories */}
      <section className="bg-white py-10 px-5 md:px-20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 w-full md:mr-8">
            <h2 className="text-3xl font-bold text-red-800 mb-4">Be Inspired by Real Heroes</h2>
            <p className="text-gray-600 mb-6">
              Meet people who overcame challenges to donate blood and save lives:
              <ul className="list-disc list-inside mt-4">
                <li>A young mother who inspired her community.</li>
                <li>A recovering patient who became a regular donor.</li>
              </ul>
              Let their stories inspire you to make a difference.
            </p>
            <button onClick = {() => navigate('/contact')} className="px-6 py-3 text-white bg-red-600 rounded-lg hover:bg-red-700">
              Read Stories
            </button>
          </div>
          <img
            src={PageImage4}
            alt="Inspirational Stories"
            className="md:w-1/2 w-full rounded-lg shadow-lg mt-6 md:mt-0"
          />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default MotivationHub;
