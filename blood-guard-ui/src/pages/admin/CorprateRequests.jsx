import React, { useEffect, useState } from "react";
import { getCorporateRequests } from "../../context/apis";

const CorprorateRequests = ({ type }) => {

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [donorsList, setDonorsList] = useState([]);

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

  const getDonorsList = async () => {
    try {
      const response = await getCorporateRequests();
      setDonorsList(response?.records);
    } catch (e) {
      console.log(e);
    }
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
    </div>
  );
};
export default CorprorateRequests;
