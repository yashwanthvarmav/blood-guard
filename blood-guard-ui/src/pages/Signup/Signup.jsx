import React, { useState } from "react";
import { validate } from "../../utilities/validations";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { createAcoountInitalData } from "../../utilities/constants";
import { registerUser } from "../../context/apis";

const SignupForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(createAcoountInitalData);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const createAccount = async () => {
    try {
      const { confirmPassword, ...rest } = formData;
      let url = "/register-user";
      if (formData?.role === "ORGANIZATION") {
        url = "/register-organization";
      }
      await registerUser(url, rest);
      setFormData(createAcoountInitalData);
      setErrors({});
      toast.success("Account created succesfully");
      navigate("/login");
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleSubmit = () => {
    console.log("formdata->", formData);
    if (validate(formData, setErrors)) {
      createAccount();
      console.log("Form Data:", formData);
    }
  };
  console.log("errors->", errors);

  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
    if (currentStep === 4) {
      handleSubmit();
    }
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
      <div className="flex justify-center items-center mb-8">
        {[1, 2, 3, 4].map((step) => (
          <div key={step} className="flex items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                currentStep >= step
                  ? "bg-primary text-white"
                  : "bg-gray-300 text-gray-600"
              }`}
            >
              {step}
            </div>
            {step !== 4 && (
              <div
                className={`w-16 h-1 ${
                  currentStep > step ? "bg-primary" : "bg-gray-300"
                }`}
              ></div>
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <div className="bg-white p-6 rounded-md shadow-md input-wrapper">
        {currentStep === 1 && (
          <div>
            <h2 className="text-xl font-bold text-primary mb-4">
              Personal Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="w-full">
                <label className="font-medium text-sm">First Name</label>
                <input
                  type="text"
                  placeholder="First Name"
                  name="first_name"
                  onChange={handleChange}
                  value={formData?.first_name}
                  className="input-field p-3 w-full"
                />
                {errors?.first_name && (
                  <p className="text-red-600 text-sm pl-3">
                    {errors.first_name}
                  </p>
                )}
              </div>
              <div>
                <label className="font-medium text-sm">Last Name</label>

                <input
                  type="text"
                  name="last_name"
                  placeholder="Last Name"
                  onChange={handleChange}
                  value={formData?.last_name}
                  className="input-field p-3 w-full"
                />
                {errors?.last_name && (
                  <p className="text-red-600 text-sm pl-3">
                    {errors.last_name}
                  </p>
                )}
              </div>
              <div className="flex flex-col">
                <label className="font-medium text-sm">Date of birth</label>
                <input
                  type="date"
                  className="input-field p-3 uppercase"
                  name="date_of_birth"
                  onChange={handleChange}
                  value={formData?.date_of_birth}
                />
              </div>
              <div className="flex flex-col">
                <label className="font-medium text-sm">Gender</label>
                <select
                  className="input-field p-3"
                  name="gender"
                  onChange={handleChange}
                  value={formData?.gender}
                >
                  <option value="" disabled>
                    Select Gendar
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label className="font-medium text-sm">Blood group</label>
                <select
                  onChange={handleChange}
                  className="input-field p-3"
                  name="blood_group"
                  value={formData?.blood_group}
                >
                  <option value="" disabled>
                    Select Blood Group
                  </option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="AB-">AB+</option>
                  <option value="AB-">AB-</option>
                </select>
              </div>
            </div>
          </div>
        )}
        {currentStep === 2 && (
          <div>
            <h2 className="text-xl font-bold text-primary mb-4">
              Contact Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label className="font-medium text-sm">Primary number</label>
                <input
                  type="tel"
                  placeholder="Primary Phone Number"
                  className="input-field p-3"
                  name="primary_phone_number"
                  onChange={handleChange}
                  value={formData?.primary_phone_number}
                />
              </div>

              <div className="flex flex-col">
                <label className="font-medium text-sm">Secondary number</label>
                <input
                  type="tel"
                  placeholder="Secondary Phone Number"
                  className="input-field p-3"
                  name="secondary_phone_number"
                  onChange={handleChange}
                  value={formData?.secondary_phone_number}
                />
              </div>

              <div>
                <label className="font-medium text-sm">Email</label>
                <input
                  type="email"
                  placeholder="Email"
                  className="input-field p-3 w-full"
                  name="email"
                  onChange={handleChange}
                  value={formData?.email}
                />
                {errors?.email && (
                  <p className="text-red-600 text-sm pl-3">{errors.email}</p>
                )}
              </div>
            </div>
          </div>
        )}
        {currentStep === 3 && (
          <div>
            <h2 className="text-xl font-bold text-primary mb-4">
              Address Information
            </h2>
            <p className="font-bold mb-4 ">Home Address</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="font-medium text-sm">Address Line 1</label>
                <input
                  type="text"
                  placeholder="Address Line 1"
                  className="input-field p-3 w-full "
                  name="home_address_line_one"
                  onChange={handleChange}
                  value={formData?.home_address_line_one}
                />
              </div>
              <div>
                <label className="font-medium text-sm">Address Line 2</label>
                <input
                  type="text"
                  placeholder="Address Line 2"
                  className="input-field p-3 w-full"
                  name="home_address_line_two"
                  onChange={handleChange}
                  value={formData?.home_address_line_two}
                />
              </div>
              <div>
                <label className="font-medium text-sm">City</label>
                <input
                  type="text"
                  placeholder="City"
                  className="input-field p-3 w-full"
                  name="home_city"
                  onChange={handleChange}
                  value={formData?.home_city}
                />
              </div>

              <div>
                <label className="font-medium text-sm">State</label>
                <input
                  type="text"
                  placeholder="State"
                  className="input-field p-3 w-full"
                  name="home_state"
                  onChange={handleChange}
                  value={formData?.home_state}
                />
              </div>
              <div>
                <label className="font-medium text-sm">Country</label>
                <input
                  type="text"
                  placeholder="Country"
                  className="input-field p-3 w-full"
                  name="home_country"
                  onChange={handleChange}
                  value={formData?.home_country}
                />
              </div>

              <div>
                <label className="font-medium text-sm">Zip code</label>
                <input
                  type="text"
                  placeholder="Zip Code"
                  className="input-field p-3 w-full"
                  name="home_zip_code"
                  onChange={handleChange}
                  value={formData?.home_zip_code}
                />
              </div>
            </div>

            <p className="font-bold mt-10 mb-4 ">Work Address</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="font-medium text-sm">Address Line 1</label>
                <input
                  type="text"
                  placeholder="Address Line 1"
                  className="input-field p-3 w-full"
                  name="work_address_line_one"
                  onChange={handleChange}
                  value={formData?.work_address_line_one}
                />
              </div>

              <div>
                <label className="font-medium text-sm">Address Line 2</label>
                <input
                  type="text"
                  placeholder="Address Line 2"
                  className="input-field p-3 w-full"
                  name="work_address_line_two"
                  onChange={handleChange}
                  value={formData?.work_address_line_two}
                />
              </div>

              <div>
                <label className="font-medium text-sm">City</label>
                <input
                  type="text"
                  placeholder="City"
                  className="input-field p-3 w-full"
                  name="work_city"
                  onChange={handleChange}
                  value={formData?.work_city}
                />
              </div>

              <div>
                <label className="font-medium text-sm">State</label>
                <input
                  type="text"
                  placeholder="State"
                  className="input-field p-3 w-full"
                  name="work_state"
                  onChange={handleChange}
                  value={formData?.work_state}
                />
              </div>

              <div>
                <label className="font-medium text-sm">Country</label>
                <input
                  type="text"
                  placeholder="Country"
                  className="input-field p-3 w-full"
                  name="work_country"
                  onChange={handleChange}
                  value={formData?.work_country}
                />
              </div>

              <div>
                <label className="font-medium text-sm">Zip Code</label>
                <input
                  type="text"
                  placeholder="Zip Code"
                  className="input-field p-3 w-full"
                  name="work_zip_code"
                  onChange={handleChange}
                  value={formData?.work_zip_code}
                />
              </div>
            </div>
          </div>
        )}
        {currentStep === 4 && (
          <div>
            <h2 className="text-xl font-bold text-primary mb-4">
              Account Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="font-medium text-sm">Password</label>

                <input
                  type="password"
                  placeholder="Password"
                  className="input-field p-3 border rounded w-full"
                  name="password"
                  onChange={handleChange}
                  value={formData?.password}
                />
                {errors?.password && (
                  <p className="text-red-600 text-sm pl-3">{errors.password}</p>
                )}
              </div>
              <div>
                <label className="font-medium text-sm">Confirm password</label>

                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="input-field p-3 w-full border rounded"
                  name="confirmPassword"
                  onChange={handleChange}
                  value={formData?.confirmPassword}
                />
                {errors?.confirmPassword && (
                  <p className="text-red-600 text-sm pl-3">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
              <div className="flex flex-col">
                <label className="font-medium text-sm">Role</label>
                <select
                  className="input-field p-3 border rounded"
                  name="role"
                  onChange={handleChange}
                  value={formData?.role}
                >
                  <option>Select user type</option>
                  <option value="DONOR">DONOR</option>
                  <option value="ADMIN">ADMIN</option>
                  <option value="ORGANIZATION">ORGANISATION</option>
                </select>
              </div>
              {formData?.role === "ORGANIZATION" && (
                <div>
                  <label className="font-medium text-sm">
                    Organization code
                  </label>

                  <input
                    type="password"
                    placeholder="Confirm Password"
                    className="input-field p-3 w-full border rounded"
                    name="organization_code"
                    onChange={handleChange}
                    value={formData?.organization_code}
                  />
                  {errors?.organization_code && (
                    <p className="text-red-600 text-sm pl-3">
                      {errors.organization_code}
                    </p>
                  )}
                </div>
              )}
              <div className="flex flex-col">
                <label className="font-medium text-sm">Notification type</label>
                <select
                  className="input-field p-3 border rounded"
                  name="user_notifications"
                  onChange={handleChange}
                  value={formData?.user_notifications}
                >
                  <option>Select notification type</option>
                  <option value="Daily">Daily</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Monthly">Monthly</option>
                </select>
              </div>
            </div>
          </div>
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
            currentStep === 4
              ? "bg-gray-300 text-gray-600"
              : "bg-primary text-white"
          }`}
        >
          {currentStep === 4 ? "Submit" : "Next"}
        </button>
      </div>
    </div>
  );
};

export default SignupForm;
