import React, { useEffect, useState } from "react";
import { getBloodRequestsList } from "../../context/apis";
import { useAuth } from "../../context/AuthContext";

const BloodRequests = ({ type }) => {
  const users = [
    {
      name: "John Doe",
      email: "john.doe@example.com",
      contact: "1234567890",
      place: "New York",
      blood_group: "A+",
    },
    {
      name: "Jane Smith",
      email: "jane.smith@example.com",
      contact: "2345678901",
      place: "Los Angeles",
      blood_group: "B+",
    },
    {
      name: "Bob Johnson",
      email: "bob.johnson@example.com",
      contact: "3456789012",
      place: "Chicago",
      blood_group: "C+",
    },
    {
      name: "Alice Brown",
      email: "alice.brown@example.com",
      contact: "4567890123",
      place: "Houston",
      blood_group: "D+",
    },
    {
      name: "Charlie Green",
      email: "charlie.green@example.com",
      contact: "5678901234",
      place: "Miami",
      blood_group: "E+",
    },
  ];

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [bloodRequestsLists, setBloodRequestsList] = useState([]);

  const { profileDate } = useAuth();

  const getRequestsList = async () => {
    try {
      const response = await getBloodRequestsList({
        organization_id: profileDate?.user?.id,
      });
      setBloodRequestsList(response);
    } catch (e) {
      console.log(e);
    }
  };

  // Filtered Users
  const filteredUsers = bloodRequestsLists?.length
    ? bloodRequestsLists?.filter((user) => {
        const matchesSearch =
          user.name.toLowerCase().includes(search.toLowerCase()) ||
          user.email.toLowerCase().includes(search.toLowerCase()) ||
          user.blood_group.toLowerCase().includes(search.toLowerCase()) ||
          user.place.toLowerCase().includes(search.toLowerCase());
        const matchesFilter = filter ? user.place === filter : true;

        return matchesSearch && matchesFilter;
      })
    : [];

  useEffect(() => {
    getRequestsList();
  }, []);

  // Unique places for filtering
  const uniquePlaces = Array.from(new Set(users.map((user) => user.place)));

  const cards = [
    { title: "A+", count: 25, bgColor: "bg-[#FFDFDF]", icon: "🩸" },
    { title: "A-", count: 12, bgColor: "bg-[#FFC5B9]", icon: "🤝" },
    { title: "B+", count: 8, bgColor: "bg-[#C6F7E2]", icon: "📅" },
    { title: "B-", count: 4, bgColor: "bg-[#E2CFFC]", icon: "🔔" },
    { title: "AB+", count: 25, bgColor: "bg-[#FAD6A5]", icon: "🩸" },
    { title: "AB-", count: 12, bgColor: "bg-[#FFF6A5]", icon: "🤝" },
    { title: "O+", count: 8, bgColor: "bg-[#AEDFF7]", icon: "📅" },
    { title: "O-", count: 4, bgColor: "bg-[#CFE4FC]", icon: "🔔" },
  ];

  return (
    <div className="p-4 w-full">
      <h1 className="text-2xl font-bold text-red-600 mb-4">Blood Requests</h1>
      {/* <h1 className="text-md font-bold ">Avialable Blood counts</h1>
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
      </div> */}

      {/* Search Input */}
      <div className="mb-4 flex items-center justify-end space-x-4">
        <input
          type="text"
          placeholder="Search by name, email, or place..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border rounded-lg w-full max-w-md focus:ring-2 focus:ring-red-600 focus:outline-none"
        />

        {/* Filter Dropdown */}
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-600 focus:outline-none"
        >
          <option value="">All Places</option>
        </select>
      </div>

      {/* User Table */}
      <div className="overflow-x-auto ">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-[#FFCCCB] text-gray-700 uppercase text-sm">
              <th className="py-3 px-6 text-left">S.No</th>
              <th className="py-3 px-6 text-left">Organization</th>
              <th className="py-3 px-6 text-left">Blood Group</th>
              <th className="py-3 px-6 text-left">Unit's</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Contact</th>
              <th className="py-3 px-6 text-left">Place</th>
              {type === "ORGANIZATION" && (
                <th className="py-3 px-6 text-left">Blood Request</th>
              )}
            </tr>
          </thead>
          <tbody>
            {filteredUsers?.length ? (
              filteredUsers.map((user, index) => (
                <tr
                  key={index}
                  className={`border-b ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-red-100`}
                >
                  <td className="py-3 px-6">{index + 1}</td>
                  <td className="py-3 px-6">{user.name}</td>
                  <td className="py-3 px-6">{user.blood_group}</td>
                  <td className="py-3 px-6">{user?.blood_unit || index + 1}</td>
                  <td className="py-3 px-6">{user.email}</td>
                  <td className="py-3 px-6">{user.contact}</td>
                  <td className="py-3 px-6">{user.place}</td>
                  {type === "ORGANIZATION" && (
                    <td className="py-3 px-6">
                      <button className="px-4 py-2 border rounded-lg hover:bg-red-600 hover:text-white">
                        View
                      </button>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>No data found</tr>
            )}
          </tbody>
        </table>
      </div>

      {/* No Results Message */}
      {filteredUsers.length === 0 && (
        <p className="mt-4 text-center text-gray-500">No users found.</p>
      )}
    </div>
  );
};
export default BloodRequests;
