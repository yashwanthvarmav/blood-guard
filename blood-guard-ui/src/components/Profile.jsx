import React, { useState } from "react";
import { MdAccountCircle } from "react-icons/md";
import { useAuth } from "../context/AuthContext";
import { formatDate } from "../utilities/utility";
import { updateUserProfile } from "../context/apis";

const UserProfile = () => {
  const { profileDate } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState(profileDate);


  const [formData, setFormData] = useState({ ...profileData });

  const handleEdit = () => setIsEditing(true);

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({ ...profileData });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    console.log(formData, "formData");
    const payload = {
      userId: formData.id,
      first_name: formData.first_name,
      last_name: formData.last_name,
      primary_phone_number: formData.primary_phone_number,
      home_address_line_one: formData.home_address_line_one,
      home_address_line_two: formData.home_address_line_two,
      work_address_line_one: formData.work_address_line_one,
      work_address_line_two: formData.work_address_line_two,
    };
    await updateUserProfile(payload);
    setProfileData({ ...formData });
    const user = { ...formData, ...payload };
    localStorage.setItem("user", JSON.stringify(user));
    setIsEditing(false);
  };


  return (
    <div className=" p-6 w-1/2">
      {/* <h1 className="text-2xl font-semibold text-gray-800 mb-4">
        User Profile
      </h1> */}
      <div className="mb-10">
        <div className="w-52 h-52 flex justify-center items-center bg-red-100 rounded-lg">
          <MdAccountCircle size={140} color="" className="text-red-200" />
        </div>
      </div>
      {isEditing ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">
              First Name
            </label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Last Name
            </label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              name="email"
              disabled
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Phone
            </label>
            <input
              type="tel"
              name="primary_phone_number"
              value={formData.primary_phone_number}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Home Address Line 1
            </label>
            <input
              name="home_address_line_one"
              value={formData.home_address_line_one}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Home Address Line 2
            </label>
            <input
              name="home_address_line_two"
              value={formData.home_address_line_two}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Work Address Line 1
            </label>
            <input
              name="work_address_line_two"
              value={formData.work_address_line_two}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Work Address Line 2
            </label>
            <input
              name="work_address_line_two"
              value={formData.work_address_line_two}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div className="flex flex-col">
            <label className="block text-sm font-medium text-gray-600">
              Blood Group
            </label>
            <select
              onChange={handleChange}
              className="input-field p-3 border rounded-lg"
              name="blood_group"
              value={formData?.blood_group}
              disabled
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

          <div className="flex justify-end space-x-2">
            <button
              onClick={handleCancel}
              className={`px-6 py-2 rounded-lg bg-gray-300 text-gray-600`}
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className={`px-6 py-2 rounded-lg 
             
                 bg-primary text-white
              `}
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4"   >
          <p className="text-2xl">Blood Guard</p>
          <hr />

          <p className="uppercase text-gray-500 underline">
            contact information
          </p>
          <div className="space-y-4">
            <div className="flex items-center">
              <p className="font-sm w-1/5 text-gray-700">Name:</p>
              <p className="text-gray-500">
                {profileData.first_name + " " + profileData.last_name}
              </p>
            </div>
            <div className="flex items-center">
              <p className="font-sm w-1/5 text-gray-700">Email Id:</p>
              <p className="text-gray-500">{profileData.email}</p>
            </div>
            <div className="flex items-center">
              <p className="font-sm w-1/5 text-gray-700">Phone:</p>
              <p className="text-gray-500">
                {profileData.primary_phone_number}
              </p>
            </div>
            <div className="flex items-center">
              <p className="font-sm w-1/5 text-gray-700">Home Address:</p>
              <p className="text-gray-500">
                {profileData.home_address_line_one},{" "}
                {profileData.home_address_line_two}
              </p>
            </div>
            <div className="flex items-center">
              <p className="font-sm w-1/5 text-gray-700">Work Address:</p>
              <p className="text-gray-500">
                {profileData.work_address_line_one},{" "}
                {profileData.work_address_line_one}
              </p>
            </div>
          </div>


          <p className="uppercase text-gray-500 underline mt-10">
            basic information
          </p>
          <div className="space-y-4">
            <div className="flex items-center">
              <p className="font-sm w-1/5 text-gray-700">Gender:</p>
              <p className="text-gray-500">{profileData.gender}</p>
            </div>
            <div className="flex items-center">
              <p className="font-sm w-1/5 text-gray-700">Birthday:</p>
              <p className="text-gray-500">
                {formatDate(profileData.date_of_birth)}
              </p>
            </div>
            <div className="flex items-center">
              <p className="font-sm w-1/5 text-gray-700">Blood Group:</p>
              <p className="text-gray-500">B+</p>
            </div>
          </div>
 

          <div className="flex justify-center">
            <button
              onClick={handleEdit}
              className={`px-6 py-2 rounded-lg 
                 bg-primary text-white
              `}
            >
              Edit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
