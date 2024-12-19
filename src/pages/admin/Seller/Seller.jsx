import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../../partials/SidebarAdmin";
import Header from "../../../partials/Header";

const SellerTable = () => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  // Fetch Sellers
  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await axios.get(
          "http://localhost:3000/api/admin/sellers",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setSellers(response.data.sellers || response.data);
        setLoading(false);
      } catch (err) {
        console.error("Fetch Sellers Error:", err);

        if (err.response) {
          if (err.response.status === 401) {
            localStorage.removeItem("token");
            navigate("/login");
          } else {
            setError(
              err.response.data.message || "Gagal mengambil data seller"
            );
          }
        } else if (err.request) {
          setError(
            "Tidak dapat terhubung ke server. Periksa koneksi internet."
          );
        } else {
          setError("Terjadi kesalahan dalam memproses permintaan.");
        }
        setLoading(false);
      }
    };

    fetchSellers();
  }, [navigate]);

  // Handle Approve Seller
  const handleApproveSeller = async (sellerId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      // Konfirmasi sebelum approve
      const confirmApprove = window.confirm(
        "Apakah Anda yakin ingin menyetujui seller ini?"
      );
      if (!confirmApprove) return;

      const response = await axios.put(
        `http://localhost:3000/api/admin/approve/seller/${sellerId}`,
        { approved: true }, // Kirim data ke backend
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Update state sellers setelah approve
      setSellers((prevSellers) =>
        prevSellers.map((seller) =>
          seller.id === sellerId ? { ...seller, approved: true } : seller
        )
      );

      alert(response.data.message || "Seller berhasil disetujui!");
    } catch (err) {
      console.error("Approve Seller Error:", err);

      if (err.response) {
        alert(err.response.data.message || "Gagal menyetujui seller");
      } else {
        alert("Terjadi kesalahan dalam menyetujui seller");
      }
    }
  };

  // Loading State
  if (loading) {
    return (
      <div className="flex h-screen">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
          </div>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="flex h-screen">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative m-4"
            role="alert"
          >
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        </div>
      </div>
    );
  }

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
                  Seller Management
                </h1>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Nama
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Nama Toko
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {sellers.length === 0 ? (
                    <tr>
                      <td
                        colSpan="5"
                        className="text-center py-4 text-gray-500 dark:text-gray-400"
                      >
                        Tidak ada data seller
                      </td>
                    </tr>
                  ) : (
                    sellers.map((seller) => (
                      <tr
                        key={seller.id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        <td
                          className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-200 cursor-pointer"
                          onClick={() =>
                            navigate(`/seller-admin/detail/${seller.id}`)
                          }
                        >
                          {seller.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                          {seller.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                          {seller.store_name || "-"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${
                              seller.approved
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {seller.approved ? "Disetujui" : "Belum Disetujui"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          {!seller.approved && (
                            <button
                              onClick={() => handleApproveSeller(seller.id)}
                              className="text-white bg-green-500 hover:bg-green-600 px-3 py-1 rounded-lg transition-colors"
                            >
                              Approve
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SellerTable;
