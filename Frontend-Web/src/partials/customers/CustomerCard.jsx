// CustomerCard.js
import React from "react";

const CustomerCard = () => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6 mb-6">
      <div className="flex flex-col items-center md:items-start mb-6">
        <div className="w-20 h-20 rounded-full bg-gray-200 mb-4">
          <img
            src="/images/user-36-05.jpg"
            alt="Profile"
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
          Janet Adebayo
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-gray-600 dark:text-gray-400">Telepon</p>
          <p className="text-gray-800 dark:text-gray-100">+628065650633</p>
          <p className="text-gray-600 dark:text-gray-400 mt-4">Alamat</p>
          <p className="text-gray-800 dark:text-gray-100">
            Jalan Sitoluama, Laguboti, Sumatera Utara
          </p>
          <p className="text-gray-600 dark:text-gray-400 mt-4">Umur</p>
          <p className="text-gray-800 dark:text-gray-100">24 tahun</p>
        </div>

        <div>
          <p className="text-gray-600 dark:text-gray-400">Email</p>
          <p className="text-gray-800 dark:text-gray-100">janet@gmail.com</p>
          <p className="text-gray-600 dark:text-gray-400 mt-4">Jenis Kelamin</p>
          <p className="text-gray-800 dark:text-gray-100">Laki-laki</p>
          <p className="text-gray-600 dark:text-gray-400 mt-4">Tanggal Lahir</p>
          <p className="text-gray-800 dark:text-gray-100">12 Oktober 2000</p>
        </div>
      </div>
    </div>
  );
};

export default CustomerCard;
