import React, { useEffect, useState } from "react";
import Location from "../../assests/Frame.png";
import Modal from "../../components/DonateQuestions";
import { acceptOrRejectOrg, getAdminOrgs } from "../../context/apis";
import { toast } from "react-toastify";
import { Select } from "antd";

const AdminOrganizationList = ({ type }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeOrg, setActiveOrg] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [bloodCamps, setBloodCamps] = useState([]);
  const [remarks,setRemarks]=useState("");
  const [filters, setFilters] = useState({});
    const [selectedOption, setSelectedOption] = useState(null);
  
    const handleChangeEdit = (selectedOption) => {
      setSelectedOption(selectedOption);
      console.log("Selected option:", selectedOption);
    };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      padding: "3px", // Add padding to the dropdown container
      borderRadius: "8px",
      borderColor: "#e2e8f0",
      "&:hover": { borderColor: "#cbd5e0" },
    }),
    input: (provided) => ({
      ...provided,
      padding: "5px", // Padding inside the input field
    }),
    menu: (provided) => ({
      ...provided,
      padding: "5px", // Padding inside the dropdown menu
    }),
    option: (provided, state) => ({
      ...provided,
      padding: "10px", // Padding for each option
      backgroundColor: state.isFocused ? "#edf2f7" : "#fff",
      color: "#000",
    }),
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const getOrgList = async () => {
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
        organization_account_remarks:remarks
      });
      toast.success(response?.message);
      setRemarks("");
      setActiveOrg(null);
      setDeleteModal(false);
      setIsModalOpen(false);
      getOrgList()
      //   setBloodCamps(response);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getOrgList();
  }, []);

  return (
    <>
      <div className="px-6 py-3">
        <div>
          <div className="">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-bold text-red-600">Oraganization Requests</h2>
           
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-5 py-8 pt-4 border rounded-lg shadow-sm">
              <div className="w-full">
                <label className="font-semibold text-sm">
                  Organisation Name
                </label>
                <input
                  type="text"
                  placeholder="Organisation Name"
                  name="name"
                  onChange={handleChange}
                  value={filters?.name || ""}
                  className="input-field px-3 py-2 w-full bg-[#f2f3ff] rounded"
                />
              </div>
          
              <div className="flex flex-col mt-1">
                <label className="font-semibold text-sm">
                  Status
                </label>
                <select
                  className="input-field px-3 py-2 bg-[#f2f3ff] rounded"
                  name="organization_account_status"
                  onChange={handleChange}
                  value={filters?.organization_account_status || ""}
                >
                  <option value="" disabled>
                    Status
                  </option>

                  <option value="ACTIVE">ACTIVE</option>
                  <option value="PENDING">PENDING</option>
                  <option value="INACTIVE">IN ACTIVE</option>


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

              <div className="flex items-end">
                <button
                  onClick={() => getOrgList()}
                  className="border px-4 py-2 rounded-lg text-sm font-semibold shadow bg-red-600 hover:bg-red-700 text-white"
                >
                  Search
                </button>
                <button
                  onClick={() => {

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
        <div className="w-full grid grid-cols-2 lg:grid-cols-3 p-4 gap-3 mt-10 ">
          {bloodCamps?.organizations?.map((item, index) => (
            <div
              key={index}
              className="relative bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200"
            >
                   <div
                className={`absolute w-16 text-center top-1 -right-3 transform rotate-45 text-xs font-medium px-2  py-1 rounded ${item?.organization_account_status==='ACTIVE'?"bg-green-600 text-white":"bg-red-600 text-white"}`}
              >
                {item?.organization_account_status}
              </div>
              <div className="bg-red-100 text-center p-3 flex justify-between">
                <p className="text-sm font-semibold text-red-600">
                  {item?.organization_code}
                </p>


              </div>

              <div className="p-4">
                <h3 className="text-lg font-bold text-red-600 mb-3">
                  {item?.organization_name}
                </h3>
                <div className=" text-gray-500 text-sm mb-4">
                  <p>License Number: {item?.organization_license_number}</p>
                  <p>Branch: {item?.organization_branch_name}</p>
                </div>

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
                    

 <span className="font-semibold text-xs text-black bg-[#AEDFF7] px-3 py-1 rounded-lg">
 {item?.organization_type}
                    </span>
                  </div>

                  <>
                    <div>
                      <button
                        onClick={() => {setIsModalOpen(true);setActiveOrg(item);}}
                        className="border px-4 py-2 rounded-lg text-sm font-semibold shadow hover:bg-red-400 bg-red-500 text-white"
                      >
                        Verify
                      </button>
               
                    </div>
                  </>
                </div>
              </div>
            </div>
          ))}
          {/* </div> */}
        </div>
        {/* {bloodCamps?.total && (
          <Pagination
            totalItems={bloodCamps?.total || 0}
            itemsPerPage={5}
            onPageChange={() => {}}
          />
        )} */}
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

{isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          width="40%"
        >
          <div className="flex justify-between min-w-[40%]">
            <h2 className="text-2xl font-bold text-primary">Edit Status</h2>
            <button
              className=" text-gray-600 hover:text-gray-900"
              onClick={() => setIsModalOpen(false)}
            >
              ✕
            </button>
          </div>
          <div>
          <div className="  p-6 bg-gray-50 rounded-lg shadow-lg mt-10 ">
          <div className="bg-white p-6 rounded-md shadow-md input-wrapper">
            <div>
             
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
                <div className="w-full">
                  <label className="font-medium text-sm">Status</label>
                  <Select
                    options={['ACTIVE',
                      'PENDING',
                      'INACTIVE']?.map((item) => ({
                      label: item,
                      value: item,
                    }))}
                    value={selectedOption}
                    onChange={handleChangeEdit}
                    isSearchable
                    placeholder="Select a status"
                    className="w-full h-10 max-w-md"
                    styles={customStyles}
                  />
                </div>
                <div className="w-full">   
                  <label>Remarks</label> 
                   <input
                      type="text"
                      placeholder="Remarks"
                      name="remarks"
                      onChange={(e)=>{setRemarks(e.target.value)}}
                      value={remarks||''}

                      className="input-field p-3 h-10 w-full"
                    /></div>
            
           
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-8">
            <button
              onClick={() => {
                setIsModalOpen(false);
              }}
              className={`px-6 py-2 rounded-lg ${"bg-gray-300 text-gray-600"}`}
            >
              Close
            </button>
            <button
              onClick={()=>callacceptOrRejectOrg(activeOrg?.id)}
              className={`px-6 py-2 ml-2 rounded-lg ${"bg-primary text-white"}`}
            >
              Save
            </button>
          </div>
        </div>
          </div>
     
        </Modal>
      )}
    </>
  );
};

export default AdminOrganizationList;
