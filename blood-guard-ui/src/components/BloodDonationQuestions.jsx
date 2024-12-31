import React, { useEffect, useState } from "react";
import Modal from "./DonateQuestions";
import { faqs } from "../utilities/constants";
import { bloodEligibility, getQuestions } from "../context/apis";
import { toWords } from "number-to-words";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const BloodDonationQuestions = ({ isModalOpen, setIsModalOpen }) => {
  const { profileDate } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedOption, setSelectedOption] = useState({});
  const [questionsList, setQuestionsList] = useState([]);

  console.log("select options->", selectedOption);

  const getQuestionsElgibility = async () => {
    try {
      const user = { ...profileDate };
      const output = Object.fromEntries(
        Object.entries(selectedOption).map(([key, value]) => [
          `question_${toWords(key).replace(/ /g, "_")}`, // Convert to words and replace spaces with underscores
          value === "yes",
        ])
      );
      console.log("output->", output);
      const data = {
        user_id: profileDate?.user?.id,
        answers: { ...output },
      };
      const response = await bloodEligibility(data);
      if (response?.eligibilityStatus?.eligibility !== "Eligible") {
        user.user.eligibility = {
          status: response?.eligibilityStatus?.eligibility,
          next_eligibility_date:
            response?.eligibilityStatus?.disqualification_end_date,
        };

        toast.error(response?.eligibilityStatus?.disqualification_type);
      }
      else{
        user.user.eligibility = {
          status: response?.eligibilityStatus?.eligibility,
        };
        localStorage.setItem("user", JSON.stringify(user));
        toast.success("your eligible to donate");
      }
      
      setIsModalOpen(false);
      console.log("questions->", response);
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmit = () => {
    getQuestionsElgibility();
    // console.log("formdata->", formData);
  };

  const nextStep = () => {
    console.log(questionsList,"fasqqqqs" )
    if (currentStep < questionsList.length) setCurrentStep(currentStep + 1);
    if (currentStep === questionsList.length) {
      handleSubmit();
    }
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const getQuestionsData = async () => {
    try {
      const questions = await getQuestions();
      console.log("questions->", questions);
      setQuestionsList(questions);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getQuestionsData();
  }, []);
  console.log("selected->", selectedOption);
  return (
    <>
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
            {questionsList?.map((step, index) => (
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
            {questionsList?.map(
              (item, index) =>
                currentStep === index + 1 && (
                  <div key={index + 1}>
                    <h2 className="text-xl font-medium  mb-4">
                      {index + 1}. {item?.question_text}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ml-5">
                      <div className="flex flex-col items-start space-y-4">
                        <div className="flex space-x-6">
                          <label
                            className={`flex items-center space-x-2 px-4 py-2 border rounded-lg cursor-pointer ${
                              selectedOption?.[index + 1] === "yes"
                                ? "bg-red-100 border-red-500 text-red-600"
                                : "bg-white border-gray-300 text-gray-700"
                            }`}
                          >
                            <input
                              type="radio"
                              name="yesno"
                              value="yes"
                              className="hidden"
                              checked={selectedOption?.[index + 1] === "yes"}
                              onChange={(e) => {
                                const keyV = index + 1;
                                setSelectedOption((prev) => ({
                                  ...prev,
                                  [keyV]: e.target.value,
                                }));
                              }}
                            />
                            <span style={{ marginLeft: "0px" }}>Yes</span>
                          </label>

                          <label
                            className={`flex items-center space-x-2 px-4 py-2 border rounded-lg cursor-pointer ${
                              selectedOption?.[index + 1] === "no"
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
                              onChange={(e) => {
                                const keyV = index + 1;
                                setSelectedOption((prev) => ({
                                  ...prev,
                                  [keyV]: e.target.value,
                                }));
                              }}
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
                currentStep === questionsList.length
                  ? "bg-gray-300 text-gray-600"
                  : "bg-primary text-white"
              }`}
            >
              {currentStep === questionsList.length ? "Submit" : "Next"}
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
    </>
  );
};

export default BloodDonationQuestions;
