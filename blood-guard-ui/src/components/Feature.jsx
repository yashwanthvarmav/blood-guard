import React from "react";
import { Link } from "react-router-dom";
import { MdLocationOn, MdBloodtype, MdNotificationsActive } from "react-icons/md";
import { FaBell, FaBook, FaRobot } from "react-icons/fa";
import { AiOutlineCheckCircle } from "react-icons/ai";

const Feature = () => {
  const features = [
    {
      icon: <AiOutlineCheckCircle size={70} color="#B71C1C" />,
      title: "Can I Donate Blood?",
      description: "Quick checks to ensure your eligibility.",
    },
    {
      icon: <MdLocationOn size={70} color="#B71C1C" />,
      title: "Nearby Camps and Centers",
      description: "Find donation centers close to you.",
    },
    {
      icon: <MdNotificationsActive size={70} color="#B71C1C" />,
      title: "Real-Time Notifications",
      description: "Stay updated about upcoming donation events.",
    },
    {
      icon: <FaBell size={70} color="#B71C1C" />,
      title: "Personalized Reminders",
      description: "Receive tailored reminders based on your eligibility.",
    },
    {
      icon: <FaBook size={70} color="#B71C1C" />,
      title: "Educational Resources",
      description: "Learn about safe blood donation practices.",
    },
    {
      icon: <FaRobot size={70} color="#B71C1C" />,
      title: "Support Bot",
      description: "Helps donors and organizations with queries and issues.",
    },
  ];

  return (
    <div className="flex flex-col items-center gap-8 py-16 text-gray-800 mt-14">
      <h1 className="text-center text-4xl font-poppins text-primary font-bold mb-10">
        Why Choose Blood Guard?
      </h1>
      {/* First Row */}
      <div className="flex justify-center gap-16 pt-3 w-full">
        {features.slice(0, 3).map((feature, index) => (
          <Link
            key={index}
            className="flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500"
          >
            <div className="bg-[#F9DDDD] w-28 h-28 rounded-full flex justify-center items-center mb-2">
              {feature.icon}
            </div>
            <p>{feature.title}</p>
            <span className="text-gray-600 text-center mt-1">{feature.description}</span>
          </Link>
        ))}
      </div>
      {/* Second Row */}
      <div className="flex justify-center gap-16 pt-3 w-full">
        {features.slice(3).map((feature, index) => (
          <Link
            key={index}
            className="flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500"
          >
            <div className="bg-[#F9DDDD] w-28 h-28 rounded-full flex justify-center items-center mb-2">
              {feature.icon}
            </div>
            <p>{feature.title}</p>
            <span className="text-gray-600 text-center mt-1">{feature.description}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Feature;
