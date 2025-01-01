import React, { useEffect, useState } from "react";
import {  getHistory } from "../../context/apis";
import { useAuth } from "../../context/AuthContext";
import moment from "moment";

const DonationHistory = ({ type }) => {

  const { profileDate } = useAuth();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

  const [donorsList, setDonorsList] = useState([]);


  // Filtered Users
  const filteredUsers = donorsList?.length
    ? donorsList.filter((user) => {
        const matchesSearch =
          user?.Organization?.organization_name?.toLowerCase().includes(search.toLowerCase()) ||
          user?.blood_donation_status?.toLowerCase().includes(search.toLowerCase()) ||
          user?.blood_group?.toLowerCase().includes(search.toLowerCase()) 

        const matchesFilter = filter ? user.place === filter : true;

        return matchesSearch && matchesFilter;
      })
    : [];

  // Unique places for filtering


  const getDonorsList = async () => {
    try {
      const response = await getHistory(profileDate?.user?.id);
      setDonorsList(response.history);
    } catch (e) {
      console.log(e);
    }
  };

 

  useEffect(() => {
    getDonorsList();
  }, []);

  return (
    <div className="p-4 w-full">
      <h1 className="text-2xl font-bold text-red-600 mb-4">Donation History</h1>

      {/* Search Input */}
      <div className="mb-4 flex items-center justify-end space-x-4">
        <input
          type="text"
          placeholder="Search by Organization Name, Status or Blood Group"
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
                Organization Name
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Donation Center/Camp
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Blood Group
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
               Date
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
{user?.Organization?.organization_name}
                  </td>
               
                  <td className="border border-gray-300 px-4 py-2">
                    {user?.DonationCenter?.name|| user?.DonationCamp?.name || "-"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {user?.blood_group || "-"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {user?.blood_donated_date?moment(user?.blood_donated_date).format("DD/MM/YYYY") : "-"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
{user?.blood_donation_remarks||'-'}
                  </td>

                  <td className="border border-gray-300 px-4 py-2">
{user?.blood_donation_status||'-'}
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
export default DonationHistory;
