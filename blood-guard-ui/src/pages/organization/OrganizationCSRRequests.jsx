import React, { useEffect, useState } from "react";
import Modal from "../../components/DonateQuestions";
import { getCorporateRequests, updateCorprateRequest } from "../../context/apis";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import { EditOutlined } from '@ant-design/icons';
import { Select } from "antd";


const OraganizationCSRRequests = ({ type }) => {
  const users = [
    {
      name: "John Doe",
      email: "john.doe@example.com",
      contact: "1234567890",
      place: "New York",
      blood_group: "A+",
    },

  ];
  const { profileDate } = useAuth();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [donorsList, setDonorsList] = useState([]);
  const [activeUser, setActiveUser] = useState(null);
    const [remarks,setRemarks]=useState("");
      const [selectedOption, setSelectedOption] = useState(null);
      const handleChangeEdit = (selectedOption) => {
          setSelectedOption(selectedOption);
          console.log("Selected option:", selectedOption);
        };

  // Filtered Users
  const filteredUsers = donorsList?.length
    ? donorsList.filter((user) => {
        const matchesSearch =
          user?.corporate_company_name?.toLowerCase().includes(search.toLowerCase()) ||
          user?.corporate_email?.toLowerCase().includes(search.toLowerCase());
        const matchesFilter = filter ? user.place === filter : true;

        return matchesSearch && matchesFilter;
      })
    : [];

  // Unique places for filtering
  const uniquePlaces = Array.from(new Set(users.map((user) => user.place)));

  const getDonorsList = async () => {
    try {
      const response = await getCorporateRequests();
      setDonorsList(response?.records);
    } catch (e) {
      console.log(e);
    }
  };



  const updateSupport = async (id) => {
      try {
  
        const response = await updateCorprateRequest(activeUser?.corporate_id, {   
        //   support_email : activeUser?.support_email, 
          support_status:  selectedOption, 
          support_remarks: remarks
      });
        toast.success(response?.message);
        setRemarks("");
        setSelectedOption();
        setActiveUser(null)
        getDonorsList();
        setDeleteModal(false)
        //   setBloodCamps(response);
      } catch (e) {
        console.log(e);
      }
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
  useEffect(() => {
    getDonorsList();
  }, []);

  return (
    <div className="p-4 w-full">
      <h1 className="text-2xl font-bold text-red-600 mb-4">Corporate Requests</h1>

      {/* Search Input */}
      <div className="mb-4 flex items-center justify-end space-x-4">
        <input
          type="text"
          placeholder="Search by Comapany name, email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border rounded-lg w-full max-w-md focus:ring-2 focus:ring-red-600 focus:outline-none"
        />

  
      </div>

    
      {/* User Table */}
      <div className="overflow-x-auto shadow-md">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead className="bg-[#FFCCCB] font-semibold text-gray-700 uppercase text-sm">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left">
                S.No
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Company Name
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
              Company Branch
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Camp Name
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Name
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Designation
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Email
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Phone Number
              </th>

              <th className="border border-gray-300 px-4 py-2 text-left">
                Address
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Message
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Remarks
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Status
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Organization Name
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Organization Email
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Action
              </th>
          
            </tr>
          </thead>
          {filteredUsers?.length ? (
            <tbody>
              {filteredUsers?.map((user, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-red-100`}
                >
                  <td className="border border-gray-300 px-4 py-2">
                    {index + 1}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {user?.corporate_company_name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {user?.corporate_company_branch || "-"}
                  </td>
              
                  <td className="border border-gray-300 px-4 py-2">
                    {user?.corporate_camp_name || "-"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {user?.corporate_spoc_name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {user?.corporate_spoc_designation}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {user?.corporate_email}
                  </td>

                  <td className="border border-gray-300 px-4 py-2">
                    {user?.corporate_phone_number || "-"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {user?.corporate_address_line_one}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {user?.corporate_message}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {user?.support_remarks}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {user?.support_status}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {user?.Organization?.organization_name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                  {user?.Organization?.organization_email}

                  </td>
                 <td className="border border-gray-300 px-4 py-2">
           
                             <button
                       className="px-4 py-2  text-white bg-red-600 rounded-lg hover:bg-red-700"
                       onClick={() => {setDeleteModal(true);setActiveUser(user)}}
                     >
                      <EditOutlined/> Edit
                     </button></td>
               
                </tr>
              ))}
            </tbody>
          ) : (
            <>
              <tr>
                <td colSpan={"7"}>
                <div className="text-center p-4">No data found</div>
                </td>
              </tr>
            </>
          )}
        </table>
      </div>

      {deleteModal && (
        <Modal
          isOpen={deleteModal}
          onClose={() => setDeleteModal(false)}
          width="40%"
        >
          <div className="flex justify-between min-w-[40%]">
            <h2 className="text-2xl font-bold text-primary">
             Update status
            </h2>
            <button
              className=" text-gray-600 hover:text-gray-900"
              onClick={() => {
                setActiveUser(null);
                setDeleteModal(false);
              }}
            >
              ✕
            </button>
          </div>
          <div className="  p-6 bg-gray-50 rounded-lg shadow-lg mt-10 ">
          <div className="bg-white p-6 rounded-md shadow-md input-wrapper">
            <div>
             
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
                <div className="w-full">
                  <label className="font-medium text-sm">Status</label>
                  <Select
                    options={['Pending', 'Approved', 'Rejected']?.map((item) => ({
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
                setDeleteModal(false);
              }}
              className={`px-6 py-2 rounded-lg ${"bg-gray-300 text-gray-600"}`}
            >
              Close
            </button>
            <button
              onClick={updateSupport}
              className={`px-6 py-2 ml-2 rounded-lg ${"bg-primary text-white"}`}
            >
              Save
            </button>
          </div>
        </div>
        </Modal>
      )}

   
    </div>
  );
};
export default OraganizationCSRRequests;
