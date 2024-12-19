import React, { useState } from "react";
import Sidebar from "../../../partials/SidebarAdmin";
import Header from "../../../partials/Header";
import { FiDownload } from "react-icons/fi";

const ITEMS_PER_PAGE = 10;

const ReportDetail = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState("Tahun");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [isMonthSelected, setIsMonthSelected] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const products = [
    { id: 1, name: "UREA", sold: "20 kg", pricePerUnit: "Rp 15.000,00", total: "300.000" },
    { id: 2, name: "ZA", sold: "10 kg", pricePerUnit: "Rp 20.000,00", total: "200.000" },
    { id: 3, name: "SS", sold: "36 kg", pricePerUnit: "Rp 120.000,00", total: "450.000" },
    { id: 4, name: "NPK", sold: "121 kg", pricePerUnit: "Rp 75.000,00", total: "780.000" },
    { id: 5, name: "SP-36", sold: "67 kg", pricePerUnit: "Rp 43.000,00", total: "685.000" },
  ];

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const paginatedProducts = products.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
    setSelectedMonth("");
    setIsMonthSelected(false);
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
    setIsMonthSelected(true);
  };

  return (
    <div className="flex h-screen overflow-hidden dark:bg-gray-900 dark:text-gray-100">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <div className="sm:flex sm:justify-between sm:items-center mb-4">
              <div className="mb-4 sm:mb-0">
                <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">
                  Detail Laporan
                </h1>
              </div>
              <button
                className="bg-[#7AB434] text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition-colors flex items-center"
                onClick={() => alert("Export Laporan Penjualan")}
              >
                <FiDownload className="mr-2" />
                Export Laporan Penjualan
              </button>
            </div>

            <div className="mb-8">
              <p className="text-lg font-semibold">Johannes Sibarani</p>
              <p className="text-sm text-gray-500">Jln no 4 Laguboti</p>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 mb-2">Pilih Tahun</label>
              <select
                className="w-40 px-3 py-2 border rounded-md focus:outline-none"
                value={selectedYear}
                onChange={handleYearChange}
              >
                <option value="">-- Pilih Tahun --</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
              </select>
            </div>

            {selectedYear && (
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300 mb-2">Pilih Bulan (Opsional)</label>
                <select
                  className="w-40 px-3 py-2 border rounded-md focus:outline-none"
                  value={selectedMonth}
                  onChange={handleMonthChange}
                >
                  <option value="">-- Pilih Bulan --</option>
                  <option value="Januari">Januari</option>
                  <option value="Februari">Februari</option>
                  <option value="Maret">Maret</option>
                </select>
              </div>
            )}

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
              <table className="min-w-full">
                <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr>
                    <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300 font-semibold">Nama Produk</th>
                    <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300 font-semibold">Jumlah Terjual</th>
                    <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300 font-semibold">Harga Persatuan</th>
                    <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300 font-semibold">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedProducts.map((product) => (
                    <tr key={product.id} className="border-b dark:border-gray-700">
                      <td className="px-4 py-2 flex items-center">
                        <img src='/images/pupuk1.png' alt={product.name} className="w-10 h-15 rounded-full mr-2" />
                        {product.name}
                      </td>
                      <td className="px-4 py-2">{product.sold}</td>
                      <td className="px-4 py-2">{product.pricePerUnit}</td>
                      <td className="px-4 py-2">{product.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-between items-center mt-4">
              <div>Items per page: {ITEMS_PER_PAGE}</div>
              <div className="flex items-center">
                <button
                  className="px-3 py-1 border rounded-l-md"
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                >
                  {"<"}
                </button>
                <span className="px-4">Page {currentPage} of {totalPages}</span>
                <button
                  className="px-3 py-1 border rounded-r-md"
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                >
                  {">"}
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ReportDetail;
