import React, { useEffect, useState } from "react";
import Modal from "../../components/DonateQuestions";
import { addDonation, getDonors } from "../../context/apis";
import Select from "react-select";
import { getFullName } from "../../utilities/utility";
import { toast } from "react-toastify";

const AddDonorInCamp = ({ isModalOpen, setIsModalOpen, campDetails, mode,handleDonorsList }) => {
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
        organization_id: campDetails?.organization_id,
        user_id: selectedOption?.value,
        user_action: "Donate",
        blood_donation_status: "Pending",
        blood_group:donor?.[0]?.blood_group
      };
//       isIn: [['Donate', 'Decline']]
// [['Pending', 'Completed', 'Cancelled']]
      if(campDetails?.type === "BLOOD BANK"){

        payload.donation_center_id=campDetails?.id;

        }else{
          payload.donation_camp_id=campDetails?.id
        }

      console.log(campDetails, "payload", payload);

      const response = await addDonation(payload);
      console.log("res", response);
      handleDonorsList();
      toast.success(response?.message);
      setIsModalOpen(false);
    } catch (e) {
      console.log("e", e);
    }
  };

  const getDonorsList = async () => {
    try {
      const response = await getDonors();
      if (response?.users?.length) {
        
        setDonorsList(response?.users);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getDonorsList();
  }, []);

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
          <h2 className="text-2xl font-bold text-primary">Camp</h2>
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
              <h2 className="text-xl font-bold text-black mb-4">
                Camp Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
                <div className="w-full">
                  <label className="font-medium text-sm">Donaor Name</label>
                  <Select
                    options={donorsList?.map((item) => ({
                      label: getFullName(item),
                      value: item?.id,
                    }))}
                    value={selectedOption}
                    onChange={handleChange}
                    isSearchable
                    placeholder="Select a donor"
                    className="w-full max-w-md"
                    styles={customStyles}
                  />
                </div>
                <div className="w-full">
                  <label className="font-medium text-sm">Organization Id</label>
                  <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={campDetails?.organization_id || ""}
                    className="input-field p-3 w-full"
                    disabled
                  />
                </div>
                <div className="w-full">
                  <label className="font-medium text-sm">Center Name</label>
                  <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={campDetails?.name || ""}
                    className="input-field p-3 w-full"
                    disabled
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
              Add
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AddDonorInCamp;
