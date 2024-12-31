// Required libraries
import React, { useEffect, useState } from "react";
import AddDonorInCamp from "./AddDonarInCamp";
import { useLocation } from "react-router-dom";
import AddCampsModal from "./AddCampsModal";
import { getFullName, prepareCampInit } from "../../utilities/utility";
import { deleteDonation, getBloodCenters, getBloodCount, getDonation, requestBlood } from "../../context/apis";
import AddCentersModal from "./AddCentersModal";
import moment from "moment";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import EditDonorInCamp from "./EditDonations";
import Modal from "../../components/DonateQuestions";
import { toast } from "react-toastify";

const CampDetails = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
  const [userId,setUserId]=useState(null);
  const [deleteModal, setDeleteModal] = useState(false);

  const [isEditOpen, setIsEditOpen] = useState(false);
const [bloodCount,setBloodCount]=useState({});
  const location = useLocation();
  const { campItem } = location.state || {};
  const [campDetails, setcampDetails] = useState(campItem||{});

  console.log("campDetails->", campItem);
  const [editCamp, setEditCamp] = useState(null);
  const [donationList, setDonationList] = useState([]);

  const getBloodCentersList = async () => {
    try {
      const response = await getBloodCenters({
        organization_id: campDetails?.organization_id,
        center_id: campDetails?.id,
      });
      setcampDetails(response?.center?.[0]);
    } catch (e) {
      console.log(e);
    }
  };


  useEffect(() => {
    setcampDetails(campItem);
  }, [campItem]);

  const donorsList = async () => {
    try {
    getBloodCountList();
      const payload={}
      if(campDetails?.type === "BLOOD BANK"){
        payload.donation_center_id=campDetails?.id
        }else{
          payload.donation_camp_id=campDetails?.id
        }
      const response = await getDonation({
        organization_id: campDetails?.organization_id,...payload
      });
      setDonationList(response?.donations);
    } catch (e) {
      console.log(e);
    }
  };

    const getBloodCountList = async () => {
      try {
        const payload={}
        if(campDetails?.type === "BLOOD BANK"){
          payload.donation_center_id=campDetails?.id
          }else{
            payload.donation_camp_id=campDetails?.id
          }
        const response = await getBloodCount(payload);
        // setBloodCamps(response);
         const datas={}
         const bloods = response?.data?.length
         ? response.data.map((item) => {
             datas[item.blood_group] = item?.count; // Corrected assignment syntax
             return item;
           })
         : [];
        setBloodCount(datas);
      } catch (e) {
        console.log(e);
      }
    };


    const handleDeletDonor = async () => {
      try {
        const response = await deleteDonation(userId?.id);
        setDeleteModal(false);
        setUserId(null);
        donorsList()
        toast.success(response?.message || "Successfully requested");
  
        // setDonorsList(response.users);
      } catch (e) {
        console.log(e);
      }
    };

  useEffect(() => {
    donorsList();
  }, []);



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
            {Object.entries(campDetails)?.map(([key, value]) => (
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
                {bloodCount?.[card.title]||0}
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

                <th className="py-3 px-6 text-left">Phone Number</th>

                <th className="py-3 px-6 text-left">Donated Date</th>
                <th className="py-3 px-6 text-left">Blood Group</th>
                <th className="py-3 px-6 text-left">Status</th>
                <th className="py-3 px-6 text-left">Actions</th>

              </tr>
            </thead>
            <tbody>
              {donationList?.length?donationList.map((donor) => (
                <tr key={donor.id} className="border-b hover:bg-gray-100">
                  <td className="py-3 px-6">{donor.id}</td>
                  <td className="py-3 px-6">{getFullName(donor?.User)}</td>

                  <td className="py-3 px-6">{donor?.User?.primary_phone_number||'-'}</td>

                  <td className="py-3 px-6">{donor?.blood_donated_date?moment(donor?.blood_donated_date).format("DD/MM/YYYY"):'-'}</td>
                  <td className="py-3 px-6">{donor?.blood_group}</td>
                  <td className="py-3 px-6">{donor?.blood_donation_status}</td>
                  <td className="py-3 px-6">
                  <button
            className="px-4 py-2  text-white bg-red-600 rounded-lg hover:bg-red-700"
            onClick={() => {setIsModalOpenEdit(true);setUserId(donor)}}
          >
           <EditOutlined/> Edit
          </button>
          <button
            className="px-4 py-2  text-white bg-gray-400 ml-2 rounded-lg hover:bg-red-700"
            onClick={() => {setDeleteModal(true);setUserId(donor)}}
          >
            <DeleteOutlined/> Delete
          </button>
                  </td>


                </tr>
              )):<p>No data found</p>}
            </tbody>
          </table>
        </div>
      </div>
      {isModalOpen && (
        <AddDonorInCamp
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          campDetails={campDetails}
          handleDonorsList={donorsList}
        />
      )}
         {isModalOpenEdit && (
        <EditDonorInCamp
          isModalOpen={isModalOpenEdit}
          setIsModalOpen={setIsModalOpenEdit}
          userId={userId}
          handleDonorsList={donorsList}
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
          setcampDetails={setcampDetails}

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
          // getBloodCentersList={getBloodCentersList}
          setcampDetails={setcampDetails}

        />
      )}
       {deleteModal && (
        <Modal
          isOpen={deleteModal}
          onClose={() => setDeleteModal(false)}
          width="40%"
        >
          <div className="flex justify-between min-w-[40%]">
            <h2 className="text-2xl font-bold text-primary">
              Alert
            </h2>
            <button
              className=" text-gray-600 hover:text-gray-900"
              onClick={() => {
                setUserId(null);
                setDeleteModal(false);
              }}
            >
              ✕
            </button>
          </div>
          <div>
            <h1 className="font-medium mt-5">Are you sure ?</h1>
          </div>
          <div className="w-full flex justify-end ">
            <button
              className="px-4 py-2 mt-4 text-white bg-gray-400 rounded-lg hover:bg-gray-500"
              onClick={() => {
                setUserId(null);
                setDeleteModal(false);
              }}
            >
              No
            </button>
            <button
              className="px-4 ml-1 py-2 mt-4 text-white bg-red-600 rounded-lg hover:bg-red-700"
              onClick={() => {
                handleDeletDonor()
              }}
            >
              Yes
            </button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default CampDetails;
