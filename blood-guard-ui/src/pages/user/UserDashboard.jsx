import React, { useEffect, useState } from "react";
import { useTimer } from "react-timer-hook";
import { ServiceData } from "../../utilities/constants";
import GroupIcon from "../../assests/group_profiles.png";
import Location from "../../assests/Frame.png";
import {
  formatAddress,
  formatCardRangeDates,
  getQuote,
} from "../../utilities/utility";
import BloodDonationQuestions from "../../components/BloodDonationQuestions";
import { useAuth } from "../../context/AuthContext";
import { getBloodCamps, getBloodCenters } from "../../context/apis";
import Timer from "./Timer";
import moment from "moment";

const UserDashboard = () => {
  const { profileDate } = useAuth();
  const [expiryTimestamp, setExpiryTimestamp] = useState(new Date());
  const [userDetails, setUserDetails] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bloodCenters, setBloodCenters] = useState([]);
  const [bloodCamps, setBloodCamps] = useState([]);
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (profileDate?.user?.eligibility?.next_eligibility_date) {
      console.log("profileDate->", profileDate);
      setKey((prevKey) => prevKey + 1);
      const eligibilityDate = new Date(
        profileDate.user.eligibility.next_eligibility_date
      );
      setExpiryTimestamp(eligibilityDate);
    }
    setUserDetails(profileDate);
  }, [profileDate]);

  console.log("sexonds->", expiryTimestamp);

  const cards = [
    { title: "Request Made", count: 35, bgColor: "bg-[#FEE2E2]", icon: "📤" },
    {
      title: "Pending Requests",
      count: 12,
      bgColor: "bg-[#FFF7ED]",
      icon: "⏳",
    },
    {
      title: "Approved Requests",
      count: 22,
      bgColor: "bg-[#ECFDF5]",
      icon: "✅",
    },
    {
      title: "Rejected Requests",
      count: 5,
      bgColor: "bg-[#F3E8FF]",
      icon: "❌",
    },
  ];

  const getBloodCentersList = async () => {
    try {
      const response = await getBloodCenters();
      setBloodCenters(response);
    } catch (e) {
      console.log(e);
    }
  };

  const getBloodCampsList = async () => {
    try {
      const response = await getBloodCamps();
      setBloodCamps(response);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getBloodCampsList();
    getBloodCentersList();
  }, []);

  return (
    <>
      {profileDate?.user?.eligibility?.status &&
        profileDate?.user?.eligibility?.status !== "Eligible" && (
          <div className="relative isolate flex items-center gap-x-6 overflow-hidden bg-gray-50 px-6 py-2.5 sm:px-3.5 sm:before:flex-1">
            <div
              aria-hidden="true"
              className="absolute left-[max(-7rem,calc(50%-52rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
            >
              <div
                style={{
                  clipPath:
                    "polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)",
                }}
                className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30"
              />
            </div>
            <div
              aria-hidden="true"
              className="absolute left-[max(45rem,calc(50%+8rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
            >
              <div
                style={{
                  clipPath:
                    "polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)",
                }}
                className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30"
              />
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <p className="text-sm/6 text-gray-900">
                <strong className="font-semibold">
                  {profileDate?.user?.eligibility?.status}
                </strong>
                <svg
                  viewBox="0 0 2 2"
                  aria-hidden="true"
                  className="mx-2 inline size-0.5 fill-current"
                >
                  <circle r={1} cx={1} cy={1} />
                </svg>
                You can actively participate in donating blood starting from{" "}
                {moment(
                  profileDate?.user?.eligibility?.next_eligibility_date
                ).format("DD/MM/YYYY")}
              </p>
            </div>
            <div className="flex flex-1 justify-end">
              <button
                type="button"
                className="-m-3 p-3 focus-visible:outline-offset-[-4px]"
              >
                <span className="sr-only">Dismiss</span>
              </button>
            </div>
          </div>
        )}

      <div className="w-full px-5 py-5">
        <div className=" flex justify-between items-center mb-20">
          <div className="bg-white p-6 rounded-lg shadow-md text-center w-full max-w-md border-l-4 border-red-500">
            <h2 className="text-xl font-semibold text-red-700 italic">
              {/* "Your blood can save lives. Donate now and be someone's hero." */}
              "{getQuote()}"
            </h2>
            <p className="text-sm text-gray-500 mt-2 text-right">
              - Blood Guard
            </p>
          </div>
          {expiryTimestamp && (
            <Timer
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
              expiryTimestamp={expiryTimestamp}
              profileDate={profileDate}
            />
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
          {cards.map((card, index) => (
            <div
              key={index}
              className={`p-6 rounded-lg shadow-md flex flex-col items-center justify-center ${card.bgColor}`}
            >
              <div className="text-4xl mb-4">{card.icon}</div>
              <h3 className="text-lg font-semibold text-gray-800">
                {card.title}
              </h3>
              <p className="text-2xl font-bold text-gray-900 mt-2">
                {card.count}
              </p>
            </div>
          ))}
        </div>

        <div className="flex justify-between mt-16">
          <h1 className="font-bold text-lg text-purple-400">Blood Camps</h1>
          <p className="text-sm underline text-blue-400">View More</p>
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-10  position-absolute">
          {bloodCamps?.camps?.map((item, index) => (
            <div
              key={index}
              className="relative bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200"
            >
              <div
                className={`absolute w-16 text-center top-1 -right-3 transform rotate-45 text-xs font-medium px-2  py-1 rounded ${"bg-green-600 text-white"}`}
              >
                {item?.status}
              </div>
              <div className=" bg-red-100 text-center p-3 ">
                <p className="text-sm font-semibold text-red-600">
                  {formatCardRangeDates(item?.start_date, item?.end_date)} •
                  {item?.open_timings}
                </p>
              </div>

              <div className="p-4">
                <h3 className="text-lg font-bold text-red-600 mb-3">
                  {item?.name}
                </h3>
                <div className="flex justify-between mb-3">
                  <span className="font-semibold text-xs  text-black bg-[#AEDFF7] px-3 py-1 rounded-lg">
                    {item?.type}
                  </span>
                  <span className="font-semibold text-xs  text-black bg-[#FFC5B9] px-3 py-1 rounded-lg">
                    Local Health Department
                  </span>
                </div>

                <div className="flex items-start text-gray-500 text-sm mb-4">
                  <img src={Location} alt="location" className="w-5 h-5" />

                  <p className="ml-2">{formatAddress(item)}</p>
                </div>

                <div className=" text-gray-500 text-sm mb-4">
                  <p>Contact No: {item?.phone_number}</p>
                  <p>Email: {item?.email}</p>
                </div>

                {/* Footer */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-gray-600">
                    <img src={GroupIcon} alt="Group" className="w-10" />

                    <span>+24</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {/* </div> */}
        </div>

        <div className="flex justify-between mt-16">
          <h1 className="font-bold text-lg text-purple-400">Blood Centers</h1>
          <p className="text-sm underline text-blue-400">View More</p>
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
          {/* <div className="w-full h-[450px] "> */}
          {bloodCenters?.centers?.map((item, index) => (
            <div
              key={index}
              className="relative bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200"
            >
              <div
                className={`absolute w-16 text-center top-1 -right-3 transform rotate-45 text-xs font-medium px-2  py-1 rounded ${"bg-green-600 text-white"}`}
              >
                {item?.status}
              </div>
              <div className=" bg-red-100 text-center p-3 ">
                <p className="text-sm font-semibold text-red-600">
                  {formatCardRangeDates(item?.start_date, item?.end_date)} •
                  {item?.open_timings}
                </p>
              </div>

              <div className="p-4">
                <h3 className="text-lg font-bold text-red-600 mb-3">
                  {item?.name}
                </h3>
                <div className="flex justify-between mb-3">
                  <span className="font-semibold text-xs text-black bg-[#AEDFF7] px-3 py-1 rounded-lg">
                    {item?.type}
                  </span>
                  <span className="font-semibold text-xs  text-black bg-[#FFC5B9] px-3 py-1 rounded-lg">
                    {item?.organization_type}
                  </span>
                </div>
                <div>
                  <div className=" text-gray-500 text-sm mb-4">
                    <p>Days: {item?.open_weekly_days}</p>
                  </div>
                </div>

                <div className="flex items-start text-gray-500 text-sm mb-4">
                  <img src={Location} alt="location" className="w-5 h-5" />

                  <p className="ml-2">{formatAddress(item)}</p>
                </div>

                <div className=" text-gray-500 text-sm mb-4">
                  <p>Contact No: {item?.phone_number}</p>
                  <p>Email: {item?.email}</p>
                </div>

                {/* Footer */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-gray-600">
                    <img src={GroupIcon} alt="Group" className="w-10" />

                    <span>+24</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {isModalOpen && (
          <BloodDonationQuestions
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
          />
        )}
      </div>
    </>
  );
};

export default UserDashboard;
