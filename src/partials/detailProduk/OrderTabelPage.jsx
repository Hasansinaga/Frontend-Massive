import React from "react";
import { FaFilter } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io"; 

const OrderTable = () => {
  return (
    <div className="p-8">
      {/* Search bar */}
      <div className="flex justify-end mb-4">
        <div className="relative w-1/3">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
          <IoIosSearch className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {/* Table */}
      <table className="w-full border border-gray-300">
        <thead>
          <tr>
            <th style={{ backgroundColor: '#7AB434' }} className="text-white p-4 border border-gray-300 text-left">
              Order Date <FaFilter className="inline ml-2" />
            </th>
            <th style={{ backgroundColor: '#7AB434' }} className="text-white p-4 border border-gray-300 text-left">
              Order Type <FaFilter className="inline ml-2" />
            </th>
            <th style={{ backgroundColor: '#7AB434' }} className="text-white p-4 border border-gray-300 text-left">
              Quantity <FaFilter className="inline ml-2" />
            </th>
            <th style={{ backgroundColor: '#7AB434' }} className="text-white p-4 border border-gray-300 text-left">
              Total <FaFilter className="inline ml-2" />
            </th>
            <th style={{ backgroundColor: '#7AB434' }} className="text-white p-4 border border-gray-300 text-left">
              Nama Pemesan <FaFilter className="inline ml-2" />
            </th>
          </tr>
        </thead>
        <tbody>
          {/* Example rows */}
          <tr className="border border-gray-300">
            <td className="p-4 text-left">01/11/2024</td>
            <td className="p-4 text-left">Online</td>
            <td className="p-4 text-left">5</td>
            <td className="p-4 text-left">Rp500,000</td>
            <td className="p-4 text-left">Hasan Sinaga</td>
          </tr>
          <tr className="border border-gray-300">
            <td className="p-4 text-left">02/11/2024</td>
            <td className="p-4 text-left">Offline</td>
            <td className="p-4 text-left">3</td>
            <td className="p-4 text-left">Rp300,000</td>
            <td className="p-4 text-left">Budi Santoso</td>
          </tr>
          {/* More rows can be added here */}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
