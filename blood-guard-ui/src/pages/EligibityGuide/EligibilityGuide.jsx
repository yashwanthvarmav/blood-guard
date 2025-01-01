import React from "react";
import KnowImage1 from "../../assests/know-1.png";
import KnowImage2 from "../../assests/know-2.png";
import KnowImage3 from "../../assests/know-3.png"
import KnowImage4 from "../../assests/know-4.png";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";

const EligibilityGuide = () => {
  const navigate = useNavigate();
  return (
    <div>
      {/* Section 1: Why Eligibility Matters */}
      <section className="bg-gray-100 py-10 px-5 md:px-20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center">
          <img
            src={KnowImage1}
            alt="Why Eligibility Matters"
            className="md:w-1/2 w-full rounded-lg shadow-lg mb-6 md:mb-0 md:mr-8"
          />
          <div className="md:w-1/2 w-full">
            <h2 className="text-3xl font-bold text-red-800 mb-4">
              Know Why Eligibility is Important
            </h2>
            <p className="text-gray-600 mb-6">
              Ensuring donor eligibility is essential to protect both donors and
              recipients. Blood donation involves rigorous guidelines to ensure
              safety and efficacy. By understanding eligibility, you can prepare
              to donate and make a difference.
            </p>
            <button onClick = {() => navigate('/login')} className="px-6 py-3 text-white bg-red-600 rounded-lg hover:bg-red-700">
              Check My Eligibility
            </button>
          </div>
        </div>
      </section>

      {/* Section 2: General Eligibility Criteria */}
      <section className="bg-white py-10 px-5 md:px-20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 w-full md:mr-8">
            <h2 className="text-3xl font-bold text-red-800 mb-4">
              Are You Eligible to Donate Blood?
            </h2>
            <p className="text-gray-600 mb-6">
              To donate blood, you must meet the following general requirements:
              <ul className="list-disc list-inside mt-4">
                <li>Age: 18–65 years.</li>
                <li>Weight: At least 50 kg (110 lbs).</li>
                <li>Overall Health: Feeling healthy and well today.</li>
              </ul>
              Check our detailed criteria for more insights.
            </p>
            <button onClick = {() => navigate('/login')} className="px-6 py-3 text-white bg-red-600 rounded-lg hover:bg-red-700">
              Learn More
            </button>
          </div>
          <img
            src={KnowImage2}
            alt="General Eligibility Criteria"
            className="md:w-1/2 w-full rounded-lg shadow-lg mt-6 md:mt-0"
          />
        </div>
      </section>

      {/* Section 3: Temporary Ineligibility */}
      <section className="bg-gray-100 py-10 px-5 md:px-20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center">
          <img
            src={KnowImage3}
            alt="Temporary Ineligibility"
            className="md:w-1/2 w-full rounded-lg shadow-lg mb-6 md:mb-0 md:mr-8"
          />
          <div className="md:w-1/2 w-full">
            <h2 className="text-3xl font-bold text-red-800 mb-4">
              What Causes Temporary Ineligibility?
            </h2>
            <p className="text-gray-600 mb-6">
              You might be temporarily ineligible due to:
              <ul className="list-disc list-inside mt-4">
                <li>Recent blood donation (3 months).</li>
                <li>Vaccinations in the past 4 weeks.</li>
                <li>Recent surgeries, tattoos, or travel.</li>
                <li>Current illness or infection.</li>
              </ul>
              Your eligibility can change, so revisit the criteria periodically.
            </p>
            <button onClick = {() => navigate('/login')} className="px-6 py-3 text-white bg-red-600 rounded-lg hover:bg-red-700">
              Check When I Can Donate
            </button>
          </div>
        </div>
      </section>

      {/* Section 4: Permanent Ineligibility */}
      <section className="bg-white py-10 px-5 md:px-20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 w-full md:mr-8">
            <h2 className="text-3xl font-bold text-red-800 mb-4">
              Conditions for Permanent Ineligibility
            </h2>
            <p className="text-gray-600 mb-6">
              Some conditions make individuals permanently ineligible to donate
              blood, such as:
              <ul className="list-disc list-inside mt-4">
                <li>History of HIV/AIDS or hepatitis B/C.</li>
                <li>Bleeding disorders or severe chronic diseases.</li>
              </ul>
              Consult a medical professional for advice on your eligibility.
            </p>
            <button onClick = {() => navigate('/contact')} className="px-6 py-3 text-white bg-red-600 rounded-lg hover:bg-red-700">
              Talk to an Expert
            </button>
          </div>
          <img
            src={KnowImage4}
            alt="Permanent Ineligibility"
            className="md:w-1/2 w-full rounded-lg shadow-lg mt-6 md:mt-0"
          />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default EligibilityGuide;
