import React from "react";
import { useTimer } from "react-timer-hook";

const Timer = ({ expiryTimestamp, setIsModalOpen, profileDate }) => {
  const expiryTime = new Date(expiryTimestamp); // Ensure expiryTimestamp is properly converted to a Date object

  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
  } = useTimer({
    expiryTimestamp: expiryTime, // Pass the correct expiryTimestamp to the hook
    onExpire: () => console.warn("Timer expired"),
  });

  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-lg font-semibold text-gray-800">Countdown Timer</h2>
      <div className="flex items-center space-x-4 text-center">
        <div className="flex flex-col items-center bg-blue-50 p-2 rounded-lg">
          <span className="text-lg font-semibold text-blue-600">{days}</span>
          <span className="text-xs text-gray-600">Days</span>
        </div>
        <div className="flex flex-col items-center bg-blue-50 p-2 rounded-lg">
          <span className="text-lg font-bold text-blue-600">{hours}</span>
          <span className="text-xs text-gray-600">Hours</span>
        </div>
        <div className="flex flex-col items-center bg-blue-50 p-2 rounded-lg">
          <span className="text-lg font-bold text-blue-600">{minutes}</span>
          <span className="text-xs text-gray-600">Minutes</span>
        </div>
        <div className="flex flex-col items-center bg-blue-50 p-2 rounded-lg">
          <span className="text-lg font-bold text-blue-600">{seconds}</span>
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
        disabled={!!profileDate?.user?.eligibility?.next_eligibility_date}
        className={`px-4 py-2 mt-4 rounded-lg shadow-md ${
          !!profileDate?.user?.eligibility?.next_eligibility_date
            ? "bg-gray-400 text-gray-300 cursor-not-allowed"
            : "bg-red-600 text-white hover:bg-red-700"
        }`}
      >
        Eligibility Check
      </button>
    </div>
  );
};

export default Timer;
