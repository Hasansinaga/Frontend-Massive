import React, { useState } from "react";
import Sidebar from "../../../partials/SidebarAdmin";
import Header from "../../../partials/Header";
import CustomerTable from "../../../partials/customers/CustomerTable";

const Customer = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Contoh data pengguna untuk tabel
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: "Janet Adebayo",
      email: "janet@gmail.com",
      phone: "+6248085650633",
      status: "Active",
    },
    {
      id: 2,
      name: "Alex Johnson",
      email: "alex.j@gmail.com",
      phone: "+6248085650644",
      status: "Inactive",
    },
    // Tambahkan data pengguna lainnya sesuai kebutuhan
  ]);

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
                  Pengguna
                </h1>
              </div>
            </div>
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12">
                <CustomerTable customers={customers} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Customer;
