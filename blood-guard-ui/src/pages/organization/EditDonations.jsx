import React, { useEffect, useState } from "react";
import Modal from "../../components/DonateQuestions";
import { addDonation, editDonation, getDonors } from "../../context/apis";
import Select from "react-select";
import { getFullName } from "../../utilities/utility";
import { toast } from "react-toastify";

const EditDonorInCamp = ({ isModalOpen, setIsModalOpen, userId,handleDonorsList }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [donorsList, setDonorsList] = useState([]);

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    console.log("Selected option:", selectedOption);
  };

  const handleSubmit = async () => {
    try {
      const donor=donorsList?.filter(item=>item?.id===selectedOption?.value);
      console.log("donor->",donor,donorsList)
      const payload = {
        user_id: userId.user_id,
        blood_donation_status: selectedOption?.value,
      };
      if(selectedOption?.value === 'Cancelled'){
        payload.user_action= "Decline";
      }

    //   user_action: "Donate",

//       isIn: [['Donate', 'Decline']]
// [['Pending', 'Completed', 'Cancelled']]

      const response = await editDonation(userId?.id,payload);
      console.log("res", response);
      handleDonorsList();
      toast.success(response?.message);
      setIsModalOpen(false);
    } catch (e) {
      console.log("e", e);
    }
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      padding: "3px", // Add padding to the dropdown container
      borderRadius: "8px",
      borderColor: "#e2e8f0",
      "&:hover": { borderColor: "#cbd5e0" },
    }),
    input: (provided) => ({
      ...provided,
      padding: "5px", // Padding inside the input field
    }),
    menu: (provided) => ({
      ...provided,
      padding: "5px", // Padding inside the dropdown menu
    }),
    option: (provided, state) => ({
      ...provided,
      padding: "10px", // Padding for each option
      backgroundColor: state.isFocused ? "#edf2f7" : "#fff",
      color: "#000",
    }),
  };
  return (
    <div>
      {" "}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="flex justify-between w-svw">
          <h2 className="text-2xl font-bold text-primary">Update Status</h2>
          <button
            className=" text-gray-600 hover:text-gray-900"
            onClick={() => setIsModalOpen(false)}
          >
            ✕
          </button>
        </div>

        <div className="  p-6 bg-gray-50 rounded-lg shadow-lg mt-10 ">
          <div className="bg-white p-6 rounded-md shadow-md input-wrapper">
            <div>
             
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
                <div className="w-full">
                  <label className="font-medium text-sm">Status</label>
                  <Select
                    options={['Pending', 'Completed', 'Cancelled']?.map((item) => ({
                      label: item,
                      value: item,
                    }))}
                    value={selectedOption}
                    onChange={handleChange}
                    isSearchable
                    placeholder="Select a status"
                    className="w-full max-w-md"
                    styles={customStyles}
                  />
                </div>
            
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-8">
            <button
              onClick={() => {
                setIsModalOpen(false);
              }}
              className={`px-6 py-2 rounded-lg ${"bg-gray-300 text-gray-600"}`}
            >
              Close
            </button>
            <button
              onClick={handleSubmit}
              className={`px-6 py-2 ml-2 rounded-lg ${"bg-primary text-white"}`}
            >
              Save
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default EditDonorInCamp;
