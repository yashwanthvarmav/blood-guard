import React, { useEffect, useState } from "react";
import Modal from "../../components/DonateQuestions";
import { createCamps, editCamps } from "../../context/apis";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";

const AddCampsModal = ({
  isModalOpen,
  setIsModalOpen,
  editCamp,
  mode,
  getBloodCampsList,
  setEditCamp,
  setcampDetails
}) => {
  const { profileDate } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(
    mode === "edit"
      ? editCamp
      : {
          name: "",
          status: "ACTIVE",
          address_line_one: "",
          address_line_two: "",
          city: "",
          state: "",
          country: "",
          zipcode: "",
          phone_number: "",
          email: "",
          camp_type: "",
          start_date: "",
          end_date: "",
          open_timings: "09:00 AM - 06:00 PM",
          collaboration_with: "",
          organization_id: profileDate?.user?.id,
        }
  );
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (mode === "edit") setFormData(editCamp);
  }, [editCamp]);

  const handleSubmit = async () => {
    try {
      const { start_time, end_time, ...rest } = formData;

      if (mode === "edit") {
        const test = { ...rest };
        const { name, organization_id, type, camp_type, ...remainingObjects } =
          test;
        console.log("remain->", remainingObjects);
        const response = await editCamps(editCamp?.id, {
          ...remainingObjects,
        });
        toast.success(response.message);
        setcampDetails(prev=>({...prev,...remainingObjects}))
        setEditCamp(null);
        setIsModalOpen(false);
      } else {
        const response = await createCamps({ ...rest });
        console.log("response", response);
        toast.success("Created successfully");
      }
      getBloodCampsList();
      setIsModalOpen(false);
    } catch (e) {
      console.log("e", e);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const nextStep = () => {
    if (currentStep < 2) setCurrentStep(currentStep + 1);
    if (currentStep === 2) {
      handleSubmit();
    }
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  console.log("formdata->", formData);

  return (
    <div>
      {" "}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="flex justify-between w-full ">
          <h2 className="text-2xl font-bold text-primary">
            {mode === "edit" ? "Edit" : "Create"} Camp
          </h2>
          <button
            className=" text-gray-600 hover:text-gray-900"
            onClick={() => setIsModalOpen(false)}
          >
            ✕
          </button>
        </div>

        <div className="  p-6 bg-gray-50 rounded-lg shadow-lg mt-10 ">
          <div className="bg-white p-6 rounded-md shadow-md input-wrapper">
            {currentStep === 1 && (
              <div>
                <h2 className="text-xl font-bold text-black mb-4">
                  Camp Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
                  <div className="w-full">
                    <label className="font-medium text-sm">Camp Name</label>
                    <input
                      type="text"
                      placeholder="Camp Name"
                      name="name"
                      onChange={handleChange}
                      value={formData?.name}
                      className="input-field p-3 w-full"
                      disabled={mode === "edit"}
                    />
                    {errors?.name && (
                      <p className="text-red-600 text-sm pl-3">{errors.name}</p>
                    )}
                  </div>
                  <div className="w-full">
                    <label className="font-medium text-sm">Email</label>
                    <input
                      type="text"
                      name="email"
                      placeholder="Email"
                      onChange={handleChange}
                      value={formData?.email}
                      className="input-field p-3 w-full"
                    />
                    {errors?.email && (
                      <p className="text-red-600 text-sm pl-3">
                        {errors.email}
                      </p>
                    )}
                  </div>
                  <div className="w-full flex flex-col">
                    <label className="font-medium text-sm">Status</label>
                    <select
                      onChange={handleChange}
                      className="input-field p-3"
                      name="status"
                      value={formData?.status || ""}
                    >
                      <option value="" disabled>
                        Select status
                      </option>
                      <option value="ACTIVE">Active</option>
                      <option value="INACTIVE">In Active</option>
                      <option value="PENDING">Pending</option>
                    </select>
                  </div>
                  <div className="w-full">
                    <label className="font-medium text-sm">Phone number</label>
                    <input
                      type="text"
                      placeholder="Phone number"
                      name="phone_number"
                      onChange={handleChange}
                      value={formData?.phone_number}
                      className="input-field p-3 w-full"
                    />
                    {errors?.phone_number && (
                      <p className="text-red-600 text-sm pl-3">
                        {errors.phone_number}
                      </p>
                    )}
                  </div>

                  <div className="w-full">
                    <label className="font-medium text-sm">
                      Collaboration with
                    </label>
                    <input
                      type="text"
                      placeholder="Collaboration with"
                      className="input-field p-3 w-full"
                      name="collaboration_with"
                      onChange={handleChange}
                      value={formData?.collaboration_with}
                    />
                    {errors?.collaboration_with && (
                      <p className="text-red-600 text-sm pl-3">
                        {errors.collaboration_with}
                      </p>
                    )}
                  </div>
                  <div className="w-full flex flex-col">
                    <label className="font-medium text-sm">Camp type</label>
                    <select
                      onChange={handleChange}
                      className="input-field p-3"
                      name="camp_type"
                      value={formData?.camp_type || ""}
                      disabled={mode === "edit"}
                    >
                      <option value="" disabled>
                        Select Organization Type
                      </option>
                      <option value="Government">Government</option>
                      <option value="Private">Private</option>
                      <option value="NGO">NGO</option>
                    </select>
                  </div>
                  <div className="w-full">
                    <label className="font-medium text-sm">start date</label>
                    <input
                      type="Date"
                      id="start-time"
                      name="start_date"
                      value={formData?.start_date}
                      onChange={handleChange}
                      className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-indigo-300 focus:border-indigo-500 text-gray-700"
                    />
                  </div>
                  <div className="w-full">
                    <label className="font-medium text-sm">End date</label>
                    <input
                      type="Date"
                      id="start-time"
                      name="end_date"
                      value={formData?.end_date}
                      onChange={handleChange}
                      className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-indigo-300 focus:border-indigo-500 text-gray-700"
                    />
                  </div>

                  <div className="w-full">
                    <label className="font-medium text-sm">Start time</label>
                    <input
                      type="time"
                      id="start-time"
                      name="start_time"
                      value={formData?.start_time}
                      onChange={handleChange}
                      className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-indigo-300 focus:border-indigo-500 text-gray-700"
                    />
                  </div>

                  <div className="w-full">
                    <label className="font-medium text-sm">End time</label>
                    <input
                      type="time"
                      id="end-time"
                      name="end_time"
                      value={formData?.end_time}
                      onChange={handleChange}
                      className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-indigo-300 focus:border-indigo-500 text-gray-700"
                    />
                  </div>
                </div>
              </div>
            )}
            {currentStep === 2 && (
              <div className="">
                <h2 className="text-xl font-bold text-black mb-4">
                  Address Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="font-medium text-sm">
                      Address Line 1
                    </label>
                    <input
                      type="text"
                      placeholder="Address Line 1"
                      className="input-field p-3 w-full "
                      name="address_line_one"
                      onChange={handleChange}
                      value={formData?.address_line_one}
                    />
                  </div>
                  <div>
                    <label className="font-medium text-sm">
                      Address Line 2
                    </label>
                    <input
                      type="text"
                      placeholder="Address Line 2"
                      className="input-field p-3 w-full"
                      name="address_line_two"
                      onChange={handleChange}
                      value={formData?.address_line_two}
                    />
                  </div>
                  <div>
                    <label className="font-medium text-sm">City</label>
                    <input
                      type="text"
                      placeholder="City"
                      className="input-field p-3 w-full"
                      name="city"
                      onChange={handleChange}
                      value={formData?.city}
                    />
                  </div>

                  <div>
                    <label className="font-medium text-sm">State</label>
                    <input
                      type="text"
                      placeholder="State"
                      className="input-field p-3 w-full"
                      name="state"
                      onChange={handleChange}
                      value={formData?.state}
                    />
                  </div>
                  <div>
                    <label className="font-medium text-sm">Country</label>
                    <input
                      type="text"
                      placeholder="Country"
                      className="input-field p-3 w-full"
                      name="country"
                      onChange={handleChange}
                      value={formData?.country}
                    />
                  </div>

                  <div>
                    <label className="font-medium text-sm">Zip code</label>
                    <input
                      type="text"
                      placeholder="Zip Code"
                      className="input-field p-3 w-full"
                      name="zipcode"
                      onChange={handleChange}
                      value={formData?.zipcode}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="flex justify-between mt-8">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`px-6 py-2 rounded-lg ${

"bg-gray-300 text-gray-600"

              }`}
            >
              Back
            </button>
            <button
              onClick={nextStep}
              // disabled={currentStep === 4}
              className={`px-6 py-2 rounded-lg ${


                   "bg-primary text-white"
              }`}
            >
              {currentStep === 2
                ? mode === "edit"
                  ? "Save"
                  : "Submit"
                : "Next"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AddCampsModal;
