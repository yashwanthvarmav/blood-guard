import React, { useEffect, useState } from "react";
import { MdBloodtype } from "react-icons/md";
import { useTimer } from "react-timer-hook";
import { faqs, ServiceData } from "../../utilities/constants";
import GroupIcon from "../../assests/group_profiles.png";
import Location from "../../assests/Frame.png";
import Chart from "react-apexcharts";
import Modal from "../../components/DonateQuestions";
import { formatAddress, formatCardRangeDates } from "../../utilities/utility";
import { getBloodCamps, getBloodCenters } from "../../context/apis";
import { useAuth } from "../../context/AuthContext";

const OrganizationDashboard = () => {
  const { profileDate } = useAuth();
  const expiryTimestamp = new Date("2024-12-05T00:00:00");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedOption, setSelectedOption] = useState("");
  const [bloodCenters, setBloodCenters] = useState([]);
  const [bloodCamps, setBloodCamps] = useState([]);

  const data = {
    options: {
      chart: {
        type: "bar",
        height: 350,
      },
      xaxis: {
        categories: ["O+", "A-", "B+", "AB-", "B-", "AB+", "A+", "O-"],
      },
      colors: [
        "#AEDFF7",
        "#FFC5B9",
        "#C6F7E2",
        "#FFF6A5",
        "#E2CFFC",
        "#FAD6A5",
        "#FFDFDF",
        "#CFE4FC",
      ],
      plotOptions: {
        bar: {
          distributed: true,
          borderRadius: 5,
        },
      },
      dataLabels: {
        style: {
          colors: ["#333"],
          fontSize: "14px",
          fontWeight: "bold",
        },
      },
      title: {
        text: "Blood Stock Levels",
        align: "center",
        style: {
          fontSize: "18px",
          fontWeight: "bold",
          color: "#4A4A4A",
        },
      },
    },
    series: [
      {
        name: "Stock Count",
        data: [50, 5, 30, 10, 15, 16, 90, 120],
      },
    ],
  };

  console.log("select options->", selectedOption);
  const handleSubmit = () => {
    // console.log("formdata->", formData);
  };

  const nextStep = () => {
    if (currentStep < faqs?.length) setCurrentStep(currentStep + 1);
    if (currentStep === faqs?.length) {
      handleSubmit();
    }
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };
  const { seconds, minutes, hours, days } = useTimer({
    expiryTimestamp,
    onExpire: () => console.warn("onExpire called"),
  });
  console.log("sexonds->", expiryTimestamp, seconds, minutes, hours, days);

  const cards = [
    { title: "Blood Requests", count: 25, bgColor: "bg-[#FEE2E2]", icon: "🩸" },
    { title: "New Donors", count: 12, bgColor: "bg-[#FFF7ED]", icon: "🤝" },
    { title: "Appointments", count: 8, bgColor: "bg-[#ECFDF5]", icon: "📅" },
    { title: "Notifications", count: 4, bgColor: "bg-[#F3E8FF]", icon: "🔔" },
  ];

  const getBloodCentersList = async () => {
    try {
      const response = await getBloodCenters({
        organization_id: profileDate?.user?.id,
      });
      setBloodCenters(response);
    } catch (e) {
      console.log(e);
    }
  };

  const getBloodCampsList = async () => {
    try {
      const response = await getBloodCamps({
        organization_id: profileDate?.user?.id,
      });
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
    <div className="w-full px-5 py-5">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
        {cards?.length && cards?.map((card, index) => (
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

      {/* <div className="p-6 bg-white rounded-lg shadow-md mt-12">
        <Chart
          options={data?.options}
          series={data?.series}
          type="bar"
          height={350}
        />
      </div> */}

      <div className="flex justify-between mt-16">
        <h1 className="font-bold text-lg text-purple-400">Blood Camps</h1>
        <p className="text-sm underline text-blue-400">View More</p>
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-10  position-absolute">
        {bloodCamps?.camps?.length && bloodCamps?.camps?.map((item, index) => (
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
        {bloodCenters?.centers?.length && bloodCenters?.centers?.map((item, index) => (
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
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <div className="flex justify-between">
            <h2 className="text-2xl font-bold text-primary">Donate</h2>
            <button
              className=" text-gray-600 hover:text-gray-900"
              onClick={() => setIsModalOpen(false)}
            >
              ✕
            </button>
          </div>

          <div className="max-w-4xl mx-auto p-6 bg-gray-50 rounded-lg shadow-lg mt-10">
            <div className="flex justify-center items-center flex-wrap mb-8">
              {faqs?.length && faqs?.map((step, index) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold m-1 ${
                      currentStep >= index + 1
                        ? "bg-primary text-white"
                        : "bg-gray-300 text-gray-600"
                    }`}
                  >
                    {index + 1}
                  </div>
                </div>
              ))}
            </div>

            {/* Step Content */}
            <div className="bg-white p-6 rounded-md shadow-md input-wrapper">
              {faqs?.length && faqs?.map(
                (item, index) =>
                  currentStep === index + 1 && (
                    <div>
                      <h2 className="text-xl font-medium  mb-4">
                        {index + 1}. {item?.question}
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ml-5">
                        <div className="flex flex-col items-start space-y-4">
                          {/* <label className="text-lg font-medium">
                            Do you agree?
                          </label> */}
                          <div className="flex space-x-6">
                            <label
                              className={`flex items-center space-x-2 px-4 py-2 border rounded-lg cursor-pointer ${
                                selectedOption === "yes"
                                  ? "bg-red-100 border-red-500 text-red-600"
                                  : "bg-white border-gray-300 text-gray-700"
                              }`}
                            >
                              <input
                                type="radio"
                                name="yesno"
                                value="yes"
                                className="hidden"
                                checked={selectedOption === "yes"}
                                onChange={(e) =>
                                  setSelectedOption(e.target.value)
                                }
                              />
                              <span style={{ marginLeft: "0px" }}>Yes</span>
                            </label>

                            <label
                              className={`flex items-center space-x-2 px-4 py-2 border rounded-lg cursor-pointer ${
                                selectedOption === "no"
                                  ? "bg-red-100 border-red-500 text-red-600"
                                  : "bg-white border-gray-300 text-gray-700"
                              }`}
                            >
                              <input
                                type="radio"
                                name="yesno"
                                value="no"
                                className="hidden ml-0"
                                checked={selectedOption === "no"}
                                onChange={(e) =>
                                  setSelectedOption(e.target.value)
                                }
                              />
                              <span style={{ marginLeft: "0px" }}>No</span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <button
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`px-6 py-2 rounded-lg ${
                  currentStep === 1
                    ? "bg-gray-300 text-gray-600"
                    : "bg-primary text-white"
                }`}
              >
                Back
              </button>
              <button
                onClick={nextStep}
                // disabled={currentStep === 4}
                className={`px-6 py-2 rounded-lg ${
                  currentStep === faqs?.length
                    ? "bg-gray-300 text-gray-600"
                    : "bg-primary text-white"
                }`}
              >
                {currentStep === faqs?.length ? "Submit" : "Next"}
              </button>
            </div>
          </div>
          {/* <button
            className="px-4 py-2 mt-4 text-white bg-red-600 rounded-lg hover:bg-red-700"
            onClick={() => setIsModalOpen(false)}
          >
            Close Modal
          </button> */}
        </Modal>
      )}
    </div>
  );
};

export default OrganizationDashboard;
