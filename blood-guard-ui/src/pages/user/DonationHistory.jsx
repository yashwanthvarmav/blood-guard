import React, { useState } from "react";

const DonationHistory = () => {
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

  // Filtered Users
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.blood_group.toLowerCase().includes(search.toLowerCase()) ||
      user.place.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter ? user.place === filter : true;

    return matchesSearch && matchesFilter;
  });

  // Unique places for filtering
  const uniquePlaces = Array.from(new Set(users.map((user) => user.place)));

  return (
    <div className="p-4 w-full">
      <h1 className="text-2xl font-bold text-red-600 mb-4">Donors</h1>

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
      <div className="overflow-x-auto shadow-md">
        <table className="min-w-full border-collapse border border-gray-200">
          <thead className="bg-[#FFCCCB] font-semibold text-gray-700">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left">
                S.No
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Orgainization Name
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Organization Type
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Date
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Blood Group
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Units
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-red-100 `}
              >
                <td className="border border-gray-300 px-4 py-2">
                  {index + 1}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.name}
                </td>
                <td className="border border-gray-300 px-4 py-2">Government</td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.blood_group}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.email}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.contact}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.place}
                </td>
              </tr>
            ))}
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
export default DonationHistory;
