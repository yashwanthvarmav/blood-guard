import React, { useEffect, useState } from "react";
import { AiOutlineSend, AiOutlineClockCircle, AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import {
  getQuote,
} from "../../utilities/utility";
import BloodDonationQuestions from "../../components/BloodDonationQuestions";
import { useAuth } from "../../context/AuthContext";
import { getHistory } from "../../context/apis";
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

  
  const getDonationHistoryList = async () => {
    try {
      const response = await getHistory(profileDate?.user?.id);
      setBloodCenters(response);
    } catch (e) {
      console.log(e);
    }
  };


  useEffect(() => {
    getDonationHistoryList();
  }, []);

  const eligibility = profileDate?.user?.eligibility;
  const isPermanentlyDisqualified =
    eligibility?.status === "Permanent Disqualification";
  const isDateNotOver =
    eligibility?.status === "Temporary Disqualification" &&
    new Date(profileDate?.user?.eligibility?.next_eligibility_date || null) >
      new Date();

  const disabled = isPermanentlyDisqualified || isDateNotOver;

  const pendingRequests=bloodCamps?.history?.length ? bloodCamps?.history?.filter(item=>item?.blood_donation_status==='Pending')?.length:0;
  const completedRequests=bloodCamps?.history?.length ? bloodCamps?.history?.filter(item=>item?.blood_donation_status==='Completed')?.length:0;
  const rejectedRequests=bloodCamps?.history?.length ? bloodCamps?.history?.filter(item=>item?.blood_donation_status==='Cancelled')?.length:0;


  return (
    <div className="h-screen">
      {profileDate?.user?.eligibility?.status && (
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
            
            {profileDate?.user?.eligibility?.status ===
              "Temporary Disqualification"
                ? `You can actively participate in donating blood starting from ${moment(
                    profileDate?.user?.eligibility?.next_eligibility_date
                  ).format("DD/MM/YYYY")}`
                :profileDate?.user?.eligibility?.status==="Permanent Disqualification"?"Your no loner to donate blood, contact admin " :profileDate?.user?.eligibility?.status === "Eligible"
                ? "You can actively participate in donating blood from today"
                : "To participate in blood donation."}
            <svg
                viewBox="0 0 2 2"
                aria-hidden="true"
                className="mx-2 inline size-0.5 fill-current"
              >
                <circle r={1} cx={1} cy={1} />
              </svg>
              <strong className="font-semibold">

     {!['Temporary Disqualification','Permanent Disqualification'].includes(profileDate?.user?.eligibility?.status)   ?        <button
        onClick={() => {
          setIsModalOpen(true);
        }}
        disabled={disabled}
        className={`px-4 py-1  rounded-lg shadow-md ${
          disabled&&false
            ? "bg-gray-400 text-gray-300 cursor-not-allowed"
            : "bg-red-600 text-white hover:bg-red-700"
        }`}
      >
        Check Eligibility
      </button>
      :
      profileDate?.user?.eligibility?.status}
              </strong>
         

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

      <div className="w-full px-5 py-5 mt-10 mb-10">
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

      

        {isModalOpen && (
          <BloodDonationQuestions
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
          />
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4" >

            <div
              key={"Total Donations"}
              className={`p-6 rounded-lg shadow-md flex flex-col items-center justify-center bg-[#FEE2E2]`}
            >
              <div className="text-4xl mb-4"><AiOutlineSend style={{ color: "#FF0000" }} /></div>
              <h3 className="text-lg font-semibold text-gray-800">
              Total Donations
              </h3>
              <p className="text-2xl font-bold text-gray-900 mt-2">
{bloodCenters?.total||0}
              </p>
            </div>


          <div
              key={"Pending Requests"}
              className={`p-6 rounded-lg shadow-md flex flex-col items-center justify-center bg-[#FFF7ED]`}
            >
              <div className="text-4xl mb-4"><AiOutlineClockCircle style={{ color: "#FFA500" }} /></div>
              <h3 className="text-lg font-semibold text-gray-800">
              Pending Donations
              </h3>
              <p className="text-2xl font-bold text-gray-900 mt-2">
{pendingRequests}
              </p>
            </div>
            <div
              key={"Completed Donations"}
              className={`p-6 rounded-lg shadow-md flex flex-col items-center justify-center bg-[#ECFDF5]`}
            >
              <div className="text-4xl mb-4"><AiOutlineCheck style={{ color: "#008000" }} /></div>
              <h3 className="text-lg font-semibold text-gray-800">
              Completed Donations
              </h3>
              <p className="text-2xl font-bold text-gray-900 mt-2">
{completedRequests}
              </p>
            </div>
            <div
              key={"Rejected Donations"}
              className={`p-6 rounded-lg shadow-md flex flex-col items-center justify-center bg-[#F3E8FF]`}
            >
              <div className="text-4xl mb-4"><AiOutlineClose style={{ color: "#800080" }} /></div>
              <h3 className="text-lg font-semibold text-gray-800">
              Rejected Donations
              </h3>
              <p className="text-2xl font-bold text-gray-900 mt-2">
{rejectedRequests}
              </p>
            </div>
        </div>
    </div>
  );
};

export default UserDashboard;
