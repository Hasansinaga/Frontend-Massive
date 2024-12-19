import React, { useState } from "react";
import { FiFilter, FiSearch } from "react-icons/fi";
import { NavLink } from "react-router-dom";

// Data contoh pengguna dengan 15 entri
const users = [
  { name: "Janet Adebayo", email: "janet@gmail.com", phone: "+6284085650633", status: "Active" },
  { name: "John Doe", email: "john@gmail.com", phone: "+6284012345678", status: "Inactive" },
  { name: "Jane Smith", email: "jane@gmail.com", phone: "+6284067890123", status: "Active" },
  { name: "Alice Johnson", email: "alice@gmail.com", phone: "+6284089123456", status: "Inactive" },
  { name: "Bob Brown", email: "bob@gmail.com", phone: "+6284056789012", status: "Active" },
  { name: "Charlie White", email: "charlie@gmail.com", phone: "+6284045678901", status: "Active" },
  { name: "David Green", email: "david@gmail.com", phone: "+6284034567890", status: "Inactive" },
  { name: "Eve Black", email: "eve@gmail.com", phone: "+6284023456789", status: "Active" },
  { name: "Frank Blue", email: "frank@gmail.com", phone: "+6284012345678", status: "Inactive" },
  { name: "Grace Orange", email: "grace@gmail.com", phone: "+6284098765432", status: "Active" },
  { name: "Henry Purple", email: "henry@gmail.com", phone: "+6284087654321", status: "Inactive" },
  { name: "Isabel Yellow", email: "isabel@gmail.com", phone: "+6284076543210", status: "Active" },
  { name: "Jack Cyan", email: "jack@gmail.com", phone: "+6284065432109", status: "Active" },
  { name: "Kimberly Magenta", email: "kimberly@gmail.com", phone: "+6284054321098", status: "Inactive" },
  { name: "Liam Lime", email: "liam@gmail.com", phone: "+6284043210987", status: "Active" },
];

const ITEMS_PER_PAGE = 10;

const CustomerTable = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Filter data berdasarkan pencarian
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="p-4">
      {/* Search Bar */}
      <div className="mb-4 flex justify-end items-center">
        <div className="relative w-full max-w-xs">
          <input
            type="text"
            className="w-full px-4 py-2 pl-10 border rounded-md focus:outline-none"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <FiSearch className="absolute top-3 left-3 text-gray-400" />
        </div>
      </div>

      {/* Tabel */}
      <table className="w-full bg-white dark:bg-gray-900 border rounded-lg shadow-sm">
        <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400">
          <tr>
            <th className="p-3 text-left">
              Nama Pelanggan <FiFilter className="inline ml-1 text-gray-500" />
            </th>
            <th className="p-3 text-left">
              Email <FiFilter className="inline ml-1 text-gray-500" />
            </th>
            <th className="p-3 text-left">
              Telepon <FiFilter className="inline ml-1 text-gray-500" />
            </th>
            <th className="p-3 text-left">
              Status <FiFilter className="inline ml-1 text-gray-500" />
            </th>
          </tr>
        </thead>
        <tbody>
          {paginatedUsers.map((user, index) => (
            <tr
              key={index}
              className="border-b dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
            >
              <NavLink to={`/customer-admin/detail`} className="contents">
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">{user.phone}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    user.status === "Active"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}>
                    {user.status}
                  </span>
                </td>
              </NavLink>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <div>
          Items per page: {ITEMS_PER_PAGE}
        </div>
        <div>
          <button
            className="px-3 py-1 border rounded-l-md"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <span className="px-4">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="px-3 py-1 border rounded-r-md"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerTable;