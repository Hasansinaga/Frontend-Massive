// OrderTable.js
import React from "react";
import { FiCopy, FiSearch } from "react-icons/fi";

const OrderTable = () => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Janet’s Orders</h3>

      {/* Search bar */}
      <div className="flex justify-end mb-4">
        <div className="relative">
          <input
            type="text"
            className="w-full max-w-xs px-4 py-2 pl-10 border rounded-md focus:outline-none"
            placeholder="Search"
          />
          <FiSearch className="absolute top-3 left-3 text-gray-400" />
        </div>
      </div>

      {/* Tabel Pesanan */}
      <table className="w-full bg-white dark:bg-gray-900 border rounded-lg shadow-sm">
        <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400">
          <tr>
            <th className="p-3 text-left">Order Date</th>
            <th className="p-3 text-left">Order Type</th>
            <th className="p-3 text-left">Tracking ID</th>
            <th className="p-3 text-left">Order Total</th>
            <th className="p-3 text-left">Action</th>
            <th className="p-3 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b dark:border-gray-700">
            <td className="p-3">12 Aug 2022 - 12:25 am</td>
            <td className="p-3">Home Delivery</td>
            <td className="p-3 flex items-center space-x-2">9348fj73</td>
            <td className="p-3">25,000.00</td>
            <td className="p-3">
              <select
                className="px-2 py-1 pr-6 rounded-md"
                style={{
                  paddingRight: "1.5rem",
                  appearance: "none",
                  border: "none",
                }}
              >
                <option>Completed</option>
                <option>In-Progress</option>
                <option>Pending</option>
              </select>
            </td>
            <td className="p-3">
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
                Completed
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
