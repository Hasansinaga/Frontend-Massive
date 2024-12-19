import React, { useState, useEffect } from "react";
import Sidebar from "../../../partials/SidebarSeller";
import Header from "../../../partials/Header";
import { FiFilter, FiSearch } from "react-icons/fi";
import axios from "axios";
import { NavLink } from "react-router-dom";

const ITEMS_PER_PAGE = 5;

const Order = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch orders data
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:3000/api/order/getOrder/seller",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (Array.isArray(response.data)) {
          setOrders(response.data);
          setError(null);
        } else {
          setError("Unexpected data format received.");
          setOrders([]);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
        setError(error.message || "Failed to fetch orders.");
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Filter orders based on search
  const filteredOrders = orders.filter(
    (order) =>
      order.fertilizer_name?.toLowerCase().includes(search.toLowerCase()) ||
      false
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main content */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100">
                Pesanan
              </h1>
            </div>

            {/* Search and Filter */}
            <div className="mb-4 flex justify-between items-center">
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
              <button className="ml-2 px-4 py-2 bg-gray-200 rounded-md text-gray-700 flex items-center hover:bg-gray-300 transition">
                <FiFilter className="mr-2" />
                Filter
              </button>
            </div>

            {/* Loading and Error */}
            {loading && <div className="text-center py-4">Memuat data...</div>}
            {error && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                role="alert"
              >
                {error}
              </div>
            )}

            {/* Orders Table */}
            {!loading && !error && (
              <>
                <table className="w-full bg-white dark:bg-gray-900 border rounded-lg shadow-sm">
                  <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400">
                    <tr>
                      <th className="p-3 text-left">Produk</th>
                      <th className="p-3 text-left">Jumlah</th>
                      <th className="p-3 text-left">Total Harga</th>
                      <th className="p-3 text-left">Status Pembayaran</th>
                      <th className="p-3 text-left">Tanggal Pesanan</th>
                      <th className="p-3 text-left">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedOrders.length > 0 ? (
                      paginatedOrders.map((order, index) => (
                        <tr
                          key={index}
                          className="border-b dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                          <td className="p-3">
                            {order.fertilizer_name || "N/A"}
                          </td>
                          <td className="p-3">{order.quantity || "N/A"}</td>
                          <td className="p-3">{order.total_price || "N/A"}</td>
                          <td className="p-3">{order.status || "N/A"}</td>
                          <td className="p-3">
                            {order.created_at
                              ? new Date(order.created_at).toLocaleDateString()
                              : "N/A"}
                          </td>
                          <td className="p-3">
                            <NavLink
                              to={`/order-seller/detail/${order.order_id}`}
                              className="bg-[#7AB434] text-white px-3 py-1 rounded-lg shadow-md hover:bg-green-600 transition-colors"
                            >
                              Detail
                            </NavLink>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="text-center p-4">
                          Tidak ada pesanan ditemukan.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>

                {/* Pagination */}
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
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Order;
