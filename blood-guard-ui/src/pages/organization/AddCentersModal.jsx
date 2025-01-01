import React, { useEffect, useState } from "react";
import Modal from "../../components/DonateQuestions";
import { toast } from "react-toastify";
import { createCenter, editCenter } from "../../context/apis";
import { useAuth } from "../../context/AuthContext";

const AddCentersModal = ({
  isModalOpen,
  setIsModalOpen,
  editCenterData,
  mode,
  getBloodCentersList,
  setEditCenter,
  setcampDetails
}) => {
  const { profileDate } = useAuth();

  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState(
    mode === "edit" ? editCenterData : {}
  );
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (mode === "edit") setFormData(editCenterData);
  }, [editCenterData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  console.log("add->", currentStep, mode);

  const handleSubmit = async () => {
    try {
      console.log("add->", currentStep);

      if (mode === "edit") {
        const {
          name,
          organization_id,
          type,
          organization_type,
          ...remainingObjects
        } = formData;
        console.log("remain->", remainingObjects);
        const response = await editCenter(editCenterData?.id, {
          ...remainingObjects,
        });
        toast.success(response.message);
        setEditCenter(null);
        setcampDetails(prev=>({...prev,...remainingObjects}))
      setIsModalOpen(false);
      } else {
        const response = await createCenter({
          ...formData,
          organization_id: profileDate?.user?.id,
          type: "BLOOD BANK",
        });
        console.log("response", response);
        toast.success("Created successfully");
      }
      getBloodCentersList();
      setIsModalOpen(false);
    } catch (e) {
      console.log("e", e);
    }
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

  useEffect(() => {
    setFormData(editCenterData);
  }, [editCenterData]);

  return (
    <div>
      {" "}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="flex justify-between w-full">
          <h2 className="text-2xl font-bold text-primary">Blood Centers</h2>
          <button
            className=" text-gray-600 hover:text-gray-900"
            onClick={() => setIsModalOpen(false)}
          >
            ✕
          </button>
        </div>

        <div className=" p-6 bg-gray-50 rounded-lg shadow-lg mt-10">
          <div className="bg-white p-6 rounded-md shadow-md input-wrapper">
            {currentStep === 1 && (
              <div>
                <h2 className="text-xl font-bold text-black mb-4">
                  Blood Center Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="w-full">
                    <label className="font-medium text-sm">Name</label>

                    <input
                      type="text"
                      placeholder="Name"
                      name="name"
                      onChange={handleChange}
                      value={formData?.first_name || formData?.name}
                      disabled={mode === "edit"}
                      className="input-field p-3 w-full"
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
                  <div className="w-full flex flex-col">
                    <label className="font-medium text-sm">
                      Organization type
                    </label>
                    <select
                      onChange={handleChange}
                      className="input-field p-3"
                      name="organization_type"
                      value={formData?.organization_type || ""}
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
                    <label className="font-medium text-sm">Open timings</label>
                    <input
                      type="text"
                      placeholder="Open timings"
                      name="open_timings"
                      onChange={handleChange}
                      value={formData?.open_timings}
                      className="input-field p-3 w-full"
                    />
                    {errors?.open_timings && (
                      <p className="text-red-600 text-sm pl-3">
                        {errors.open_timings}
                      </p>
                    )}
                  </div>
                  <div className="w-full">
                    <label className="font-medium text-sm">
                      Holiday timings
                    </label>
                    <input
                      type="text"
                      placeholder="Holiday timings"
                      name="holiday_timings"
                      onChange={handleChange}
                      value={formData?.holiday_timings}
                      className="input-field p-3 w-full"
                    />
                    {errors?.holiday_timings && (
                      <p className="text-red-600 text-sm pl-3">
                        {errors.holiday_timings}
                      </p>
                    )}
                  </div>
                  <div className="w-full">
                    <label className="font-medium text-sm">
                      Open weekly days
                    </label>
                    <input
                      type="text"
                      placeholder="Open weekly days"
                      name="open_weekly_days"
                      onChange={handleChange}
                      value={formData?.open_weekly_days}
                      className="input-field p-3 w-full"
                    />
                    {errors?.open_weekly_days && (
                      <p className="text-red-600 text-sm pl-3">
                        {errors.open_weekly_days}
                      </p>
                    )}
                  </div>
                  <div className="w-full">
                    <label className="font-medium text-sm">Phone number</label>

                    <input
                      type="text"
                      placeholder="Name"
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
              {currentStep === 2 ? "Save" : "Next"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AddCentersModal;
