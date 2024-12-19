import React, { useState } from 'react';
import BarChart from '../../charts/BarChart01';

// Import utilities
import { tailwindConfig } from '../../utils/Utils';

function DashboardCard04() {
  // State untuk memilih tahun dan bulan
  const [selectedYear, setSelectedYear] = useState('2023');
  const [selectedMonth, setSelectedMonth] = useState('01');

  // Data chart untuk tahun dan bulan yang dipilih
  const chartData = {
    labels: [
      '12-01-2022', '01-01-2023', '02-01-2023',
      '03-01-2023', '04-01-2023', '05-01-2023',
    ],
    datasets: [
      {
        label: 'Penjualan',
        data: [
          800, 1600, 900, 1300, 1950, 1700,
        ],
        backgroundColor: '#7AB434', // Warna hijau sesuai permintaan
        hoverBackgroundColor: '#6E9C2E', // Warna lebih gelap saat hover
        barPercentage: 0.7,
        categoryPercentage: 0.7,
        borderRadius: 4,
      },
    ],
  };

  // Fungsi untuk menangani perubahan tahun
  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  // Fungsi untuk menangani perubahan bulan
  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">Penjualan</h2>
        {/* Dropdown untuk memilih tahun */}
        <div className="mt-4">
          <label htmlFor="year" className="text-sm font-medium text-gray-700 dark:text-gray-300">Select Year</label>
          <select
            id="year"
            value={selectedYear}
            onChange={handleYearChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
          >
            <option value="2023">2023</option>
            <option value="2024">2024</option>
          </select>
        </div>

        {/* Dropdown untuk memilih bulan */}
        <div className="mt-4">
          <label htmlFor="month" className="text-sm font-medium text-gray-700 dark:text-gray-300">Select Month</label>
          <select
            id="month"
            value={selectedMonth}
            onChange={handleMonthChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
          >
            <option value="01">January</option>
            <option value="02">February</option>
            <option value="03">March</option>
            <option value="04">April</option>
            <option value="05">May</option>
          </select>
        </div>
      </header>
      
      {/* Chart built with Chart.js 3 */}
      {/* Ganti atribut height untuk mengatur tinggi chart */}
      <BarChart data={chartData} width={595} height={248} />
    </div>
  );
}

export default DashboardCard04;
