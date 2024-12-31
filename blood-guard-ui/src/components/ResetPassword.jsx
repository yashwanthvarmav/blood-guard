import React, { useState } from "react";
import Modal from "./DonateQuestions";
import { updateUserProfile } from "../context/apis";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const ResetPassword = ({ isModalOpen, setIsModalOpen }) => {
  const { profileDate } = useAuth();
  const [formData, setFormData] = useState({
    new_password: "",
    confirm_password: "",
  });

  const [errors, setErrors] = useState({
    new_password: "",
    confirm_password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const { new_password, confirm_password } = formData;
    const newErrors = {};

    if (!new_password) {
      newErrors.new_password = "New password is required.";
    } else if (new_password.length < 8) {
      newErrors.new_password = "Password must be at least 8 characters.";
    }

    if (!confirm_password) {
      newErrors.confirm_password = "Confirm password is required.";
    } else if (new_password !== confirm_password) {
      newErrors.confirm_password = "Passwords do not match.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    try {
      await updateUserProfile({
        userId: profileDate?.id,
        password: new_password,
      });
      toast.success("Password updated successfully!");
    } catch (e) {
      console.log(e);
      toast.error("Failed to update password");
    }

    setIsModalOpen(false);
  };

  return (
    <>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="relative">
          <h2 className="text-2xl font-bold text-primary">Reset Password</h2>
          <button
            className="text-gray-600 hover:text-gray-900 absolute top-0 right-0"
            onClick={() => setIsModalOpen(false)}
          >
            ✕
          </button>

          <div>
            <div className="mt-3">
              <label htmlFor="new_password">New Password</label>
              <input
                type="password"
                name="new_password"
                value={formData.new_password}
                onChange={handleChange}
                className={`w-full mt-1 px-4 py-2 border rounded-lg ${
                  errors.new_password ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.new_password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.new_password}
                </p>
              )}
            </div>
            <div className="mt-3">
              <label htmlFor="confirm_password">Confirm Password</label>
              <input
                type="password"
                name="confirm_password"
                value={formData.confirm_password}
                onChange={handleChange}
                className={`w-full mt-1 px-4 py-2 border rounded-lg ${
                  errors.confirm_password ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.confirm_password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirm_password}
                </p>
              )}
            </div>
            <div className="flex justify-center space-x-2 mt-5">
              <button
                onClick={handleSubmit}
                className={`px-6 py-2 rounded-lg bg-primary text-white `}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ResetPassword;
