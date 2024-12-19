// SellerPage.js
import React, { useState } from "react";
import Sidebar from "../../../partials/SidebarAdmin"; 
import Header from "../../../partials/Header";   
import SellerCard from "../../../partials/seller/SellerCard"; 
import SellerTable from "../../../partials/seller/SellerTable"; 
import SellerChart from "../../../partials/seller/SellerChart";

const SellerDetail = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden dark:bg-gray-900 dark:text-gray-100">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/* Header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Main Content */}
        <main className="grow px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
          <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold mb-6">
            Seller Details
          </h1>
          <SellerCard />
          <SellerChart/>
        </main>
      </div>
    </div>
  );
};

export default SellerDetail;
