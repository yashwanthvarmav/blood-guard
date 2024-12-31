import React, { useEffect, useState } from "react";
import GroupIcon from "../../assests/group_profiles.png";
import Location from "../../assests/Frame.png";
import Pagination from "../../components/Pagination";
import AddCampsModal from "../organization/AddCampsModal";
import Modal from "../../components/DonateQuestions";
import { deleteCamps, getBloodCamps, getBloodCount } from "../../context/apis";
import {
  formatAddress,
  formatCardRangeDates,
  prepareCampInit,
} from "../../utilities/utility";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const OrganizationCamps = ({ type }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { profileDate } = useAuth();
  const navigate = useNavigate();

  const [deleteModal, setDeleteModal] = useState(false);
  const [bloodCamps, setBloodCamps] = useState([]);
  const [filters, setFilters] = useState({});
  const [editCamp, setEditCamp] = useState(null);
  const [selectedfilters, setSelectedFilters] = useState({});
  const [deleteId, setDeleteId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const getBloodCampsList = async () => {
    try {
      const response = await getBloodCamps({
        ...selectedfilters,
        organization_id: profileDate?.user?.id,
      });
      setBloodCamps(response);
    } catch (e) {
      console.log(e);
    }
  };



  const deleteCampList = async (id) => {
    try {
      await deleteCamps(id);
      toast.success("Removed successfully");
      setDeleteId(null);
      setDeleteModal(false);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getBloodCampsList();
  }, [selectedfilters]);
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-5 py-8 pt-4 border rounded-lg shadow-md  border-gray-200">
              <div className="w-full">
                <label className="font-semibold text-sm">Camp Name</label>
                <input
                  type="text"
                  placeholder="Camp Name"
                  name="name"
                  onChange={handleChange}
                  value={filters?.name || ""}
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
                  value={filters?.camp_i || ""}
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
                  value={filters?.camp_type || ""}
                >
                  <option value="" disabled>
                    Organization Type
                  </option>
                  <option value="Government">Government</option>
                  <option value="Private">Private</option>
                  <option value="NGO">NGO</option>
                </select>
              </div>

              <div className="w-full">
                <label className="font-semibold text-sm">City</label>
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  onChange={handleChange}
                  value={filters?.city || ""}
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
                  value={filters?.state || ""}
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
                  value={filters?.zipcode || ""}
                  className="input-field px-3 py-2  bg-[#f2f3ff] rounded w-full"
                />
              </div>
              <div>
                <button
                  onClick={() => {
                    setSelectedFilters(filters);
                  }}
                  className="border px-4 py-2 rounded-lg text-sm font-semibold shadow bg-red-600 hover:bg-red-700 text-white"
                >
                  Search
                </button>
                <button
                  onClick={() => {
                    setSelectedFilters({});
                    setFilters({});
                  }}
                  className="ml-2 border px-4 py-2 rounded-lg text-sm font-semibold shadow hover:bg-red-600 hover:text-white"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-10  position-absolute">
          {bloodCamps?.camps?.map((item, index) => (
            <div
              key={index}
              className="relative bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200"
            >
              <div
                className={`absolute w-16 text-center top-1 -right-3 transform rotate-45 text-xs font-medium px-2  py-1 rounded ${"bg-green-600 text-white"}`}
              >
                {item?.status}
              </div>
              <div className=" bg-red-100 text-center p-3 ">
                <p className="text-sm font-semibold text-red-600">
                  {formatCardRangeDates(item?.start_date, item?.end_date)} •
                  {item?.open_timings}
                </p>
              </div>

              <div className="p-4">
                <h3 className="text-lg font-bold text-red-600 mb-3">
                  {item?.name || "-"}
                </h3>
                <div className="flex justify-between mb-3">
                  <span className="font-semibold text-xs  text-black bg-[#AEDFF7] px-3 py-1 rounded-lg">
                    {item?.type || "-"}
                  </span>
                  <span className="font-semibold text-xs  text-black bg-[#FFC5B9] px-3 py-1 rounded-lg">
                    {item?.collaboration_with}
                  </span>
                </div>

                <div className="flex items-start text-gray-500 text-sm mb-4">
                  <img src={Location} alt="location" className="w-5 h-5" />

                  <p className="ml-2">{formatAddress(item)}</p>
                </div>

                <div className=" text-gray-500 text-sm mb-4">
                  <p>Contact No: {item?.phone_number}</p>
                  <p>Email: {item?.email}</p>
                </div>

                {/* Footer */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-gray-600">
                    <img src={GroupIcon} alt="Group" className="w-10" />

                    <span>+24</span>
                  </div>

                  <div>
                    <button
                      onClick={() => {
                        const link=type==="ADMIN"?'/admin-dashboard/details':'/organization-dashboard/camp-details'
                        navigate(link, {
                          state: { campItem: item },
                        });
                      }}
                      className="border px-4 py-2 rounded-lg text-sm font-semibold shadow hover:bg-red-600 hover:text-white"
                    >
                      View
                    </button>
                    <button
                      onClick={() => {
                        setDeleteId(item?.id);
                        setDeleteModal(true);
                      }}
                      className="border ml-1 px-4 py-2 rounded-lg text-sm font-semibold shadow hover:bg-red-600 hover:text-white"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* {bloodCamps?.total > 10 && (
          <Pagination
            totalItems={bloodCamps?.total}
            itemsPerPage={10}
            onPageChange={(page) => {
              getBloodCamps(page);
            }}
          />
        )} */}
      </div>
      {isModalOpen && (
        <AddCampsModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          editCamp={editCamp}
          mode={editCamp ? "edit" : "new"}
          getBloodCampsList={getBloodCampsList}
          setEditCamp={setEditCamp}
        />
      )}
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
              onClick={async () => {
                await deleteCampList(deleteId);
                getBloodCampsList();
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

export default OrganizationCamps;
