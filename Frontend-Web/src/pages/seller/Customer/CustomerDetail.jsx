import React, { useState } from "react";
import Sidebar from "../../../partials/SidebarSeller";
import Header from "../../../partials/Header";
import CustomerCard from "../../../partials/customers/CustomerCard"
import CustomerOrder from "../../../partials/customers/CustomerOrder"

const CustomerDetail = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
                  Detail Pengguna
                </h1>
              </div>
            </div>
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12">
                <CustomerCard />
              </div>
            </div>
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12">
                <CustomerOrder />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CustomerDetail;
