// Required libraries
import React, { useEffect, useState } from "react";
import AddDonorInCamp from "./AddDonarInCamp";
import { useLocation } from "react-router-dom";
import AddCampsModal from "./AddCampsModal";
import { prepareCampInit } from "../../utilities/utility";
import { getBloodCenters, getDonation } from "../../context/apis";
import AddCentersModal from "./AddCentersModal";

const CampDetails = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [data, setData] = useState({});

  const location = useLocation();
  const { campDetails } = location.state || {};
  console.log("campDetails->", campDetails);
  const [editCamp, setEditCamp] = useState(null);
  const [donationList, setDonationList] = useState([]);

  const getBloodCentersList = async () => {
    try {
      const response = await getBloodCenters({
        organization_id: campDetails?.organization_id,
        center_id: campDetails?.id,
      });
      setData(response?.center?.[0]);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    setData(campDetails);
  }, [campDetails]);

  const donorsList = async () => {
    try {
      const response = await getDonation({
        organization_id: campDetails?.organization_id,
      });
      setDonationList(response.users);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    donorsList();
  }, []);

  const eligibleDonors = [
    { id: 1, name: "John Doe", age: "28/12/2024", bloodGroup: "A+" },
    { id: 2, name: "Jane Smith", age: "12/12/2024", bloodGroup: "O-" },
    { id: 3, name: "Alice Johnson", age: "14/12/2024", bloodGroup: "B+" },
  ];

  const cards = [
    { title: "A+", count: 3, bgColor: "bg-[#FFDFDF]", icon: "🩸" },
    { title: "A-", count: 12, bgColor: "bg-[#FFC5B9]", icon: "🤝" },
    { title: "B+", count: 8, bgColor: "bg-[#C6F7E2]", icon: "📅" },
    { title: "B-", count: 4, bgColor: "bg-[#E2CFFC]", icon: "🔔" },
    { title: "AB+", count: 25, bgColor: "bg-[#FAD6A5]", icon: "🩸" },
    { title: "AB-", count: 12, bgColor: "bg-[#FFF6A5]", icon: "🤝" },
    { title: "O+", count: 8, bgColor: "bg-[#AEDFF7]", icon: "📅" },
    { title: "O-", count: 4, bgColor: "bg-[#CFE4FC]", icon: "🔔" },
  ];

  console.log("edit cmp->", isEditOpen, campDetails);
  return (
    <>
      <div className="container mx-auto  px-5 py-5 mb-10">
        {/* Camp Details Section */}
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-xl font-bold text-red-600 ">
            {campDetails?.type === "BLOOD BANK"
              ? "Center Details"
              : "Camp Details"}
          </h1>

          <button
            className="px-4 py-2  text-white bg-red-600 rounded-lg hover:bg-red-700"
            onClick={() => {
              if (campDetails?.type === "BLOOD BANK") {
                console.log("test->", campDetails?.type);
                setEditCamp(campDetails);
                setIsEditOpen(true);
              } else {
                const data = prepareCampInit(campDetails);
                setEditCamp(data);
                setIsEditOpen(true);
              }
            }}
          >
            {campDetails?.type === "BLOOD BANK" ? "Edit Center" : "Edit Camp"}
          </button>
        </div>
        <div className="bg-white shadow-md border-4 border-transparent bg-gradient-to-r from-[#C6F7E2] via-[#FFDFDF] to-[#FFC5B9] rounded-lg p-6 mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {Object.entries(campDetails).map(([key, value]) => (
              <div key={key}>
                <h2 className="text-sm font-semibold text-gray-500">
                  {key.replace(/_/g, " ").toUpperCase()}
                </h2>
                <p className="text-gray-800">{value || "N/A"}</p>
              </div>
            ))}
          </div>
        </div>

        <h1 className="text-md font-bold ">Avialable Blood counts</h1>
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-8 gap-4 p-4 mb-5">
          {cards.map((card, index) => (
            <div
              key={index}
              className={`p-6 rounded-lg shadow-md flex flex-col items-center justify-center ${card.bgColor}`}
            >
              <h3 className="text-lg font-semibold text-gray-800">
                {card.title}
              </h3>
              <p className="text-2xl font-bold text-gray-900 mt-2">
                {card.count}
              </p>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-md font-bold ">Donated Donors</h1>
          <button
            className="px-4 py-2  text-white bg-red-600 rounded-lg hover:bg-red-700"
            onClick={() => setIsModalOpen(true)}
          >
            + Add Donor
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-[#FFCCCB] text-gray-700 uppercase text-sm">
                <th className="py-3 px-6 text-left">ID</th>
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Date</th>
                <th className="py-3 px-6 text-left">Blood Group</th>
              </tr>
            </thead>
            <tbody>
              {eligibleDonors.map((donor) => (
                <tr key={donor.id} className="border-b hover:bg-gray-100">
                  <td className="py-3 px-6">{donor.id}</td>
                  <td className="py-3 px-6">{donor.name}</td>
                  <td className="py-3 px-6">{donor.age}</td>
                  <td className="py-3 px-6">{donor.bloodGroup}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {isModalOpen && (
        <AddDonorInCamp
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          campDetails={campDetails}
        />
      )}
      {isEditOpen && campDetails?.type !== "BLOOD BANK" && (
        <AddCampsModal
          isModalOpen={isEditOpen}
          setIsModalOpen={setIsEditOpen}
          editCamp={editCamp}
          mode="edit"
          //   getBloodCampsList={getBloodCampsList}
          setEditCamp={setEditCamp}
        />
      )}
      {isEditOpen && campDetails?.type === "BLOOD BANK" && (
        <AddCentersModal
          isModalOpen={isEditOpen}
          setIsModalOpen={setIsEditOpen}
          //   getBloodCentersList={getBloodCentersList}
          editCenterData={editCamp}
          mode="edit"
          //   getBloodCampsList={getBloodCampsList}
          setEditCenter={setEditCamp}
          getBloodCentersList={getBloodCentersList}
        />
      )}
    </>
  );
};

export default CampDetails;
