import React, { useEffect, useState } from "react";
import { useTimer } from "react-timer-hook";

const Timer = ({ expiryTimestamp, setIsModalOpen, profileDate }) => {
  const [timeLeft, setTimeLeft] = useState({});

  const eligibility = profileDate?.user?.eligibility;
  const isPermanentlyDisqualified =
    eligibility?.status === "Permanent Disqualification";
  const isDateNotOver =
    eligibility?.status === "Temporary Disqualification" &&
    new Date(profileDate?.user?.eligibility?.next_eligibility_date || null) >
      new Date();

  const disabled = isPermanentlyDisqualified || isDateNotOver;

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const expiryTime = new Date(
        profileDate?.user?.eligibility?.next_eligibility_date || null
      ).getTime();
      const difference = expiryTime - now;

      if (difference <= 0) {
        setTimeLeft({});
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    console.log(profileDate?.user, "expiryDate");

    calculateTimeLeft();
    const intervalId = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(intervalId);
  }, [profileDate?.user?.eligibility?.next_eligibility_date]);

  const { days, hours, minutes, seconds } = timeLeft;

  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-lg font-semibold text-gray-800">Countdown Timer</h2>
      <div className="flex items-center space-x-4 text-center">
        <div className="flex flex-col items-center bg-blue-50 p-2 rounded-lg">
          <span className="text-lg font-semibold text-blue-600">{days||0}</span>
          <span className="text-xs text-gray-600">Days</span>
        </div>
        <div className="flex flex-col items-center bg-blue-50 p-2 rounded-lg">
          <span className="text-lg font-bold text-blue-600">{hours||0}</span>
          <span className="text-xs text-gray-600">Hours</span>
        </div>
        <div className="flex flex-col items-center bg-blue-50 p-2 rounded-lg">
          <span className="text-lg font-bold text-blue-600">{minutes||0}</span>
          <span className="text-xs text-gray-600">Minutes</span>
        </div>
        <div className="flex flex-col items-center bg-blue-50 p-2 rounded-lg">
          <span className="text-lg font-bold text-blue-600">{seconds||0}</span>
          <span className="text-xs text-gray-600">Seconds</span>
        </div>
      </div>

      {/* <button
        onClick={() => {
          setIsModalOpen(true);
        }}
        disabled={!!profileDate?.user?.eligibility?.next_eligibility_date}
        className="px-4 py-2 mt-4 text-white bg-red-600 rounded-lg hover:bg-red-700 shadow-md"
      >
        Eligibility Check
      </button> */}

      <button
        onClick={() => {
          setIsModalOpen(true);
        }}
        // disabled={disabled}
        className={`px-4 py-2 mt-4 rounded-lg shadow-md ${
          disabled&&false
            ? "bg-gray-400 text-gray-300 cursor-not-allowed"
            : "bg-red-600 text-white hover:bg-red-700"
        }`}
      >
        Eligibility Check h
      </button>
    </div>
  );
};

export default Timer;
