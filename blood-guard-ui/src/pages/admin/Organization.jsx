import React, { useEffect, useState } from "react";
import { ServiceData } from "../../utilities/constants";
import GroupIcon from "../../assests/group_profiles.png";
import Location from "../../assests/Frame.png";
import Pagination from "../../components/Pagination";
import AddCampsModal from "../organization/AddCampsModal";
import Modal from "../../components/DonateQuestions";
import { acceptOrRejectOrg, getAdminOrgs } from "../../context/apis";
import { toast } from "react-toastify";

const AdminOrganizationList = ({ type }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [donateQuestion, setDonateQuestions] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [bloodCamps, setBloodCamps] = useState([]);
  const [filters, setFilters] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const getBloodCampsList = async () => {
    try {
      console.log("filters->", filters);

      const response = await getAdminOrgs(filters);
      setBloodCamps(response);
    } catch (e) {
      console.log(e);
    }
  };

  const callacceptOrRejectOrg = async (id) => {
    try {
      console.log("filters->", filters);

      const response = await acceptOrRejectOrg(id, {
        organization_account_status: "ACTIVE",
        organization_account_remarks:
          "Verification Successful . Account is set to Active",
      });
      toast.success("Accepted successfully");
      //   setBloodCamps(response);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getBloodCampsList();
  }, []);

  return (
    <>
      <div className="px-6 py-3">
        <div>
          <div className="">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-bold text-red-600">Camps Filters</h2>
              {type === "ORGANIZATION" && (
                <button
                  className="px-4 py-2  text-white bg-red-600 rounded-lg hover:bg-red-700"
                  onClick={() => setIsModalOpen(true)}
                >
                  + Add Camps
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-5 py-8 pt-4 border rounded-lg shadow-sm">
              <div className="w-full">
                <label className="font-semibold text-sm">
                  Organisation Name
                </label>
                <input
                  type="text"
                  placeholder="Organisation Name"
                  name="organization_id"
                  onChange={handleChange}
                  value={filters?.organization_id}
                  className="input-field px-3 py-2 w-full bg-[#f2f3ff] rounded"
                />
              </div>
              <div className="w-full">
                <label className="font-semibold text-sm">Center Id</label>
                <input
                  type="text"
                  name="camp_i"
                  placeholder="Center Id"
                  onChange={handleChange}
                  value={filters?.camp_i}
                  className="input-field px-3 py-2  bg-[#f2f3ff] rounded w-full"
                />
              </div>
              <div className="flex flex-col mt-1">
                <label className="font-semibold text-sm">
                  Organisation Type
                </label>
                <select
                  className="input-field px-3 py-2 bg-[#f2f3ff] rounded"
                  name="camp_type"
                  onChange={handleChange}
                  value={filters?.camp_type}
                >
                  <option value="" disabled>
                    Organization Type
                  </option>

                  <option value="Female">Government</option>
                  <option value="Other">Private</option>
                </select>
              </div>

              <div className="w-full">
                <label className="font-semibold text-sm">City</label>
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  onChange={handleChange}
                  value={filters?.city}
                  className="input-field px-3 py-2  bg-[#f2f3ff] rounded w-full"
                />
              </div>
              <div className="w-full">
                <label className="font-semibold text-sm">State</label>
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  onChange={handleChange}
                  value={filters?.state}
                  className="input-field px-3 py-2  bg-[#f2f3ff] rounded w-full"
                />
              </div>
              <div className="w-full">
                <label className="font-semibold text-sm">Zipcode</label>
                <input
                  type="text"
                  name="zipcode"
                  placeholder="Zip code"
                  onChange={handleChange}
                  value={filters?.zipcode}
                  className="input-field px-3 py-2  bg-[#f2f3ff] rounded w-full"
                />
              </div>
              <div>
                <button
                  onClick={() => getBloodCampsList()}
                  className="border px-4 py-2 rounded-lg text-sm font-semibold shadow bg-red-600 hover:bg-red-700 text-white"
                >
                  Search
                </button>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="ml-2 border px-4 py-2 rounded-lg text-sm font-semibold shadow hover:bg-red-600 hover:text-white"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full grid grid-cols-2 lg:grid-cols-3 p-4 gap-3 mt-10 ">
          {bloodCamps?.organizations?.map((item, index) => (
            <div
              key={index}
              className=" bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200"
            >
              <div className="bg-red-100 text-center p-3">
                <p className="text-sm font-semibold text-red-600">
                  {item?.organization_code}
                </p>
              </div>

              <div className="p-4">
                <h3 className="text-lg font-bold text-red-600 mb-3">
                  {item?.organization_name}
                </h3>

                <div className="flex items-start text-gray-500 text-sm mb-4">
                  <img src={Location} alt="location" className="w-5 h-5" />

                  <p className="ml-2">
                    {item?.organization_address_line_one},
                    {item?.organization_address_line_two}
                  </p>
                </div>

                <div className=" text-gray-500 text-sm mb-4">
                  <p>Contact No: {item?.organization_primary_phone_number}</p>
                  <p>Email: {item?.organization_email}</p>
                </div>

                {/* Footer */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-gray-600">
                    <img src={GroupIcon} alt="Group" className="w-10" />

                    <span>+24</span>
                  </div>

                  <>
                    <div>
                      <button
                        onClick={() => callacceptOrRejectOrg(item?.id)}
                        className="border px-4 py-2 rounded-lg text-sm font-semibold shadow hover:bg-red-600 hover:text-white"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => setDeleteModal(true)}
                        className="border ml-1 px-4 py-2 rounded-lg text-sm font-semibold shadow hover:bg-red-600 hover:text-white"
                      >
                        Reject
                      </button>
                    </div>
                  </>
                </div>
              </div>
            </div>
          ))}
          {/* </div> */}
        </div>
        {bloodCamps?.total && (
          <Pagination
            totalItems={bloodCamps?.total || 0}
            itemsPerPage={5}
            onPageChange={() => {}}
          />
        )}
      </div>

      {deleteModal && (
        <Modal
          isOpen={deleteModal}
          onClose={() => setDeleteModal(false)}
          width="40%"
        >
          <div className="flex justify-between min-w-[40%]">
            <h2 className="text-2xl font-bold text-primary">Donate</h2>
            <button
              className=" text-gray-600 hover:text-gray-900"
              onClick={() => setDeleteModal(false)}
            >
              ✕
            </button>
          </div>
          <div>
            <h1 className="font-medium mt-5">
              Are you sure you want to delete?
            </h1>
          </div>
          <div className="w-full flex justify-end ">
            <button
              className="px-4 py-2 mt-4 text-white bg-gray-400 rounded-lg hover:bg-gray-500"
              onClick={() => setDeleteModal(false)}
            >
              No
            </button>
            <button
              className="px-4 ml-1 py-2 mt-4 text-white bg-red-600 rounded-lg hover:bg-red-700"
              onClick={() => setDeleteModal(false)}
            >
              Yes
            </button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default AdminOrganizationList;
