import React, { useState, useEffect } from "react";
import Sidebar from "../../../partials/SidebarAdmin";
import Header from "../../../partials/Header";
import { FiFilter, FiSearch } from "react-icons/fi";
import { NavLink } from "react-router-dom";

const Report = () => {
  const [sellers, setSellers] = useState([]); // State to store the seller data
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Fetch seller data from API when the component mounts
  useEffect(() => {
    fetch("http://localhost:3000/api/admin/earnings")
      .then((response) => response.json())
      .then((data) => setSellers(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []); // Empty dependency array ensures it runs once when the component mounts

  // Filter data based on the search input
  const filteredSellers = sellers.filter((seller) =>
    seller.seller_name.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredSellers.length / ITEMS_PER_PAGE);
  const paginatedSellers = filteredSellers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="flex h-screen overflow-hidden dark:bg-gray-900 dark:text-gray-100">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
              <div className="mb-4 sm:mb-0">
                <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">
                  Laporan Penjualan
                </h1>
              </div>
              <button
                className="bg-[#7AB434] text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition-colors"
                onClick={() => alert('Export Laporan')}
              >
                Export Laporan
              </button>
            </div>
            <div className="sm:flex sm:justify-end sm:items-center mb-8">
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

            <table className="w-full bg-white dark:bg-gray-900 border rounded-lg shadow-sm">
              <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400">
                <tr>
                  <th className="p-3 text-left">
                    Nama Seller <FiFilter className="inline ml-1 text-gray-500" />
                  </th>
                  <th className="p-3 text-left">
                    Kode Seller <FiFilter className="inline ml-1 text-gray-500" />
                  </th>
                  <th className="p-3 text-left">
                    Total Penjualan <FiFilter className="inline ml-1 text-gray-500" />
                  </th>
                  <th className="p-3 text-left">
                    Nama Toko <FiFilter className="inline ml-1 text-gray-500" />
                  </th>
                  <th className="p-3 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {paginatedSellers.map((seller, index) => (
                  <tr
                    key={index}
                    className="border-b dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
                  >
                    <td className="p-3">{seller.seller_name}</td>
                    <td className="p-3">{seller.seller_id}</td>
                    <td className="p-3">Rp {parseFloat(seller.total_earnings).toLocaleString("id-ID")}</td>
                    <td className="p-3">{seller.store_name}</td>
                    <td className="p-3">
                      <NavLink to="/laporan-admin/detail" className="text-blue-500 hover:underline">
                        Detail
                      </NavLink>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-between items-center mt-4">
              <div>Items per page: {ITEMS_PER_PAGE}</div>
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
        </main>
      </div>
    </div>
  );
};

export default Report;
