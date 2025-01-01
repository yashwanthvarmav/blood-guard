import React, { useEffect, useState } from "react";
import Modal from "../../components/DonateQuestions";
import { getAdminOrgs, requestBlood } from "../../context/apis";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import moment from "moment";

const OrgList = ({ type }) => {

  const { profileDate } = useAuth();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [donorsList, setDonorsList] = useState([]);
  const [activeUser, setActiveUser] = useState(null);

  // Filtered Users
  const filteredUsers = donorsList?.length
    ? donorsList.filter((user) => {
        const matchesSearch =
          user?.organization_name.toLowerCase().includes(search.toLowerCase()) ||
          user?.organization_email.toLowerCase().includes(search.toLowerCase());
        const matchesFilter = filter ? user.place === filter : true;

        return matchesSearch && matchesFilter;
      })
    : [];

  // Unique places for filtering


  const getDonorsList = async () => {
    try {
      const response = await getAdminOrgs();
      setDonorsList(response?.organizations);
    } catch (e) {
      console.log(e);
    }
  };

  const donorBloodRequest = async (data) => {
    try {
      const response = await requestBlood(data);
      setDeleteModal(false);
      setActiveUser(null);
      toast.success(response?.message || "Successfully requested");

      // setDonorsList(response.users);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getDonorsList();
  }, []);



  return (
    <div className="p-4 w-full">
      <h1 className="text-2xl font-bold text-red-600 mb-4">Organization List</h1>

      {/* Search Input */}
      <div className="mb-4 flex items-center justify-end space-x-4">
        <input
          type="text"
          placeholder="Search by name, email"
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
                Name
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Branch Name
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Email
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Code
              </th>
            
              <th className="border border-gray-300 px-4 py-2 text-left">

              License Number
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
              Date Of Establishment
              </th>
               <th className="border border-gray-300 px-4 py-2 text-left">
               Phone Number
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
               Secondary Phone Number

              </th>

              <th className="border border-gray-300 px-4 py-2 text-left">

Address
</th>
<th className="border border-gray-300 px-4 py-2 text-left">
Organization Type
</th>
<th className="border border-gray-300 px-4 py-2 text-left">
Remarks

</th>
 <th className="border border-gray-300 px-4 py-2 text-left">
Status
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
{user?.organization_name}
                  </td>
               
                  <td className="border border-gray-300 px-4 py-2">
                    {user?.organization_branch_name || "-"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {user?.organization_email || "-"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {user?.organization_code || "-"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
{` ${user?.organization_license_number} `}
                  </td>

                  <td className="border border-gray-300 px-4 py-2">
                    {user?.organization_date_of_establishment ? moment(user?.organization_date_of_establishment).format("DD/MM/YYYY") : "-"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {user?.organization_primary_phone_number || "-"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {user?.organization_secondary_phone_number || "-"}
                  </td>

                  <td className="border border-gray-300 px-4 py-2">
                    {user?.organization_address_line_one},{user?.organization_address_line_two}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {user?.organization_type || "-"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {user?.organization_account_remarks || "-"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {user?.organization_account_status || "-"}
                  </td>
            
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
              Request for blood
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
          <div>
            <h1 className="font-medium mt-5">Are you sure ?</h1>
          </div>
          <div className="w-full flex justify-end ">
            <button
              className="px-4 py-2 mt-4 text-white bg-gray-400 rounded-lg hover:bg-gray-500"
              onClick={() => {
                setActiveUser(null);
                setDeleteModal(false);
              }}
            >
              No
            </button>
            <button
              className="px-4 ml-1 py-2 mt-4 text-white bg-red-600 rounded-lg hover:bg-red-700"
              onClick={() => {
                donorBloodRequest({
                  user_id: activeUser?.id,
                  organization_id: profileDate?.user?.id,
                });
              }}
            >
              Yes
            </button>
          </div>
        </Modal>
      )}

      {/* No Results Message */}
    
    </div>
  );
};
export default OrgList;
