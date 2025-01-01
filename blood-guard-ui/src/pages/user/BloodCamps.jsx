import React, { useEffect, useState } from "react";
import Location from "../../assests/Frame.png";
import { getBloodCamps } from "../../context/apis";
import BloodDonationQuestions from "../../components/BloodDonationQuestions";
import { formatAddress, formatCardRangeDates } from "../../utilities/utility";

const BloodCamps = ({ type }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [donateQuestion, setDonateQuestions] = useState(false);
  const [bloodCamps, setBloodCamps] = useState([]);
  const [filters, setFilters] = useState({});
  const [activeFilters, setActiveFilters] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const getBloodCampsList = async () => {
    try {
      console.log("filters->", filters);
      const params = { ...activeFilters };
      const response = await getBloodCamps(params);
      setBloodCamps(response);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getBloodCampsList();
  }, [activeFilters]);
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
                <label className="font-semibold text-sm">Camp Id</label>
                <input
                  type="text"
                  name="camp_id"
                  placeholder="Center Id"
                  onChange={handleChange}
                  value={filters?.camp_id || ""}
                  className="input-field px-3 py-2  bg-[#f2f3ff] rounded w-full"
                />
              </div>
              <div className="flex flex-col mt-1">
                <label className="font-semibold text-sm">Camp Type</label>
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
                    setActiveFilters(filters);
                  }}
                  className="border px-4 py-2 rounded-lg text-sm font-semibold shadow bg-red-600 hover:bg-red-700 text-white"
                >
                  Search
                </button>
                <button
                  onClick={() => {
                    setActiveFilters({});
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
        {bloodCamps?.camps?.length ? (
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
                <div className=" bg-red-500  text-center p-3 ">
                  <p className="text-sm font-semibold text-white">
                    {formatCardRangeDates(item?.start_date, item?.end_date)} •
                    {item?.open_timings}
                  </p>
                </div>

                <div className="p-4">
                  <h3 className="text-lg font-bold text-red-600 mb-3">
                  {item?.name}
                  </h3>
                  <div className="flex justify-between mb-3">
                    <span className="font-semibold text-xs  text-black bg-[#AEDFF7] px-3 py-1 rounded-lg">
                     {item?.type}
                    </span>
                    <span className="font-semibold text-xs  text-black bg-[#FFC5B9] px-3 py-1 rounded-lg">
                      {item?.camp_type}
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
                </div>
              </div>
            ))}
          </div>
        ) : (
          <h1 className="text-primary w-full text-center">No Data Found</h1>
        )}
      </div>

      {donateQuestion && (
        <BloodDonationQuestions
          isModalOpen={donateQuestion}
          setIsModalOpen={setDonateQuestions}
        />
      )}
    </>
  );
};

export default BloodCamps;
