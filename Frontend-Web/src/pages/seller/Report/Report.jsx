import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import Sidebar from "../../../partials/SidebarSeller";
import Header from "../../../partials/Header";
import ReportTable from "../../../partials/report/ReportTableSeller";
import SalesPieChartCard from "../../../partials/report/ReportChart"; // Import the pie chart card

// Mock data for the logged-in seller
const loggedInSeller = { sellerName: "John Doe", sellerCode: "S002" };

// Data for products sold by sellers
const productSalesData = [
  {
    productName: "Product A",
    productImage: "/path/to/imageA.jpg",
    quantitySold: 100,
    unitPrice: 50000,
    total: 5000000,
  },
  {
    productName: "Product B",
    productImage: "/path/to/imageB.jpg",
    quantitySold: 50,
    unitPrice: 75000,
    total: 3750000,
  },
  {
    productName: "Product C",
    productImage: "/path/to/imageC.jpg",
    quantitySold: 200,
    unitPrice: 30000,
    total: 6000000,
  },
  // Add more products as needed
];

const ITEMS_PER_PAGE = 10;

const Report = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Filter data berdasarkan pencarian dan hanya tampilkan data seller yang sedang login
  const filteredSalesData = productSalesData.filter((product) =>
    // Assuming the logged-in seller's product data is included (this filter can be adjusted based on actual seller data structure)
    product.productName.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredSalesData.length / ITEMS_PER_PAGE);
  const paginatedSalesData = filteredSalesData.slice(
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
                onClick={() => alert("Export Laporan")}
              >
                Export Laporan
              </button>
            </div>
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12">
                <ReportTable salesData={paginatedSalesData} />
              </div>
            </div>
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
            <div className="col-span-12">
              <SalesPieChartCard salesData={paginatedSalesData} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Report;
