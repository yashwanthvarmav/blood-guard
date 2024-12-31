import React from "react";
import { FaHandsHelping, FaHeartbeat, FaRegSmileBeam } from "react-icons/fa";
import { GiChecklist, GiHealthIncrease, GiBookshelf } from "react-icons/gi";
import { MdLocationOn, MdBloodtype, MdTrackChanges } from "react-icons/md";
import { AiOutlineFileText } from "react-icons/ai";

const FeatureDetails = () => {
  return (
    <div className="mb-24 mt-24">
      {/* Donation Process Section */}
      <section className="text-center mb-16">
        <h2 className="text-4xl font-poppins text-primary font-bold mb-4">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="flex flex-col items-center">
            <GiChecklist size={70} color="#B71C1C" />
            <h3 className="text-xl font-bold mt-4">Sign Up</h3>
            <p className="text-gray-600">Create your profile.</p>
          </div>
          <div className="flex flex-col items-center">
            <MdBloodtype size={70} color="#B71C1C" />
            <h3 className="text-xl font-bold mt-4">Check Eligibility</h3>
            <p className="text-gray-600">Answer quick questions to verify eligibility.</p>
          </div>
          <div className="flex flex-col items-center">
            <MdLocationOn size={70} color="#B71C1C" />
            <h3 className="text-xl font-bold mt-4">Find a Camp</h3>
            <p className="text-gray-600">Locate a convenient donation spot.</p>
          </div>
          <div className="flex flex-col items-center">
            <FaHeartbeat size={70} color="#B71C1C" />
            <h3 className="text-xl font-bold mt-4">Donate Blood</h3>
            <p className="text-gray-600">Make your life-saving contribution.</p>
          </div>
          <div className="flex flex-col items-center">
            <MdTrackChanges size={70} color="#B71C1C" />
            <h3 className="text-xl font-bold mt-4">Track Donations</h3>
            <p className="text-gray-600">Keep track of your donation history.</p>
          </div>
        </div>
        <button className="mt-8 px-6 py-3 text-white bg-red-600 rounded-lg hover:bg-red-700">
          Get Started Now
        </button>
      </section>

      {/* Testimonials Section */}
      <section className="text-center mb-16">
        <h2 className="text-4xl font-poppins text-primary font-bold mb-4">
          Stories of Impact
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-100 p-6 rounded-lg">
            <p className="text-gray-700 italic">
              "Blood Guard helped me donate with ease. I never realized how
              simple and impactful it could be!"
            </p>
            <p className="text-gray-800 font-bold mt-4">- Priya, Regular Donor</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg">
            <p className="text-gray-700 italic">
              "Thanks to Blood Guard, I found a donor in time for my father’s
              surgery."
            </p>
            <p className="text-gray-800 font-bold mt-4">- Rohan, Recipient</p>
          </div>
        </div>
      </section>

      {/* Knowledge Hub Section */}
      {/* <section className="text-center mb-16">
        <h2 className="text-4xl font-poppins text-primary font-bold mb-4">
          Stay Informed
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          Learn everything you need to know about blood donation.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col items-center">
            <GiBookshelf size={70} color="#B71C1C" />
            <h3 className="text-xl font-bold mt-4">Articles</h3>
            <p className="text-gray-600">"10 Myths About Blood Donation," "How to Prepare for Your First Donation."</p>
          </div>
          <div className="flex flex-col items-center">
            <AiOutlineFileText size={70} color="#B71C1C" />
            <h3 className="text-xl font-bold mt-4">FAQs</h3>
            <p className="text-gray-600">"Who can donate?" "How often can I donate?"</p>
          </div>
        </div>
        <button className="mt-8 px-6 py-3 text-white bg-red-600 rounded-lg hover:bg-red-700">
          Visit Knowledge Hub
        </button>
      </section> */}
    </div>
  );
};

export default FeatureDetails;
