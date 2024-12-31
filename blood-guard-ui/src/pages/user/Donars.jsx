import React, { useEffect, useState } from "react";
import Modal from "../../components/DonateQuestions";
import { getDonors, requestBlood } from "../../context/apis";
import { getFullName } from "../../utilities/utility";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";

const Donars = ({ type }) => {
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
          user.first_name.toLowerCase().includes(search.toLowerCase()) ||
          user.email.toLowerCase().includes(search.toLowerCase()) ||
          user.blood_group.toLowerCase().includes(search.toLowerCase()) ||
          user.home_city.toLowerCase().includes(search.toLowerCase());
        const matchesFilter = filter ? user.place === filter : true;

        return matchesSearch && matchesFilter;
      })
    : [];

  // Unique places for filtering
  const uniquePlaces = Array.from(new Set(users.map((user) => user.place)));

  const getDonorsList = async () => {
    try {
      const response = await getDonors();
      setDonorsList(response.users);
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
      <h1 className="text-2xl font-bold text-red-600 mb-4">Donors</h1>

      {/* Search Input */}
      <div className="mb-4 flex items-center justify-end space-x-4">
        <input
          type="text"
          placeholder="Search by name, email"
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
                Blood Group
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Email
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Contact
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Place
              </th>
              {type === "ORGANIZATION" && (
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Blood Request
                </th>
              )}
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
                    {getFullName(user)}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {user?.blood_group || "-"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {user?.email || "-"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {user?.primary_phone_number || "-"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {`${user?.home_city}, ${user?.home_state} `}
                  </td>
                  {type === "ORGANIZATION" && (
                    <td className="border border-gray-300 px-4 py-2">
                      <button
                        onClick={() => {
                          setActiveUser(user);
                          setDeleteModal(true);
                        }}
                        className="px-4 py-2 border rounded-lg hover:bg-red-600 hover:text-white"
                      >
                        Request
                      </button>
                    </td>
                  )}
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
export default Donars;
