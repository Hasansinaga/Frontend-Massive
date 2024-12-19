import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale } from "chart.js";

// Registering chart.js components
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale);

const SalesPieChartCard = ({ salesData }) => {
  // Prepare the data for the pie chart
  const data = {
    labels: salesData.map((product) => product.productName), // Labels for each product
    datasets: [
      {
        data: salesData.map((product) => product.total), // Data (total sales) for each product
        backgroundColor: [
          "#FF6384", "#36A2EB", "#FFCE56", "#7AB434", "#FF5733", "#C70039"
        ], // Colors for each slice
        hoverBackgroundColor: [
          "#FF6384", "#36A2EB", "#FFCE56", "#7AB434", "#FF5733", "#C70039"
        ],
      },
    ],
  };

  // Chart options (optional customizations)
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            return `${tooltipItem.label}: ${tooltipItem.raw.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}`;
          },
        },
      },
    },
  };

  // Function to print the chart
  const printChart = () => {
    const chartElement = document.getElementById("sales-pie-chart");
    html2canvas(chartElement).then((canvas) => {
      const dataUrl = canvas.toDataURL();
      const newWindow = window.open();
      newWindow.document.write("<img src='" + dataUrl + "'/>");
      newWindow.document.close();
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Penjualan Produk</h2>

      {/* Pie Chart */}
      <div className="flex justify-center items-center" id="sales-pie-chart">
        <div className="w-64 h-64">
          <Pie data={data} options={options} />
        </div>
      </div>

      {/* Print Button */}
      <div className="mt-4 flex justify-center">
        <button
          onClick={printChart}
          className="bg-[#7AB434] text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition-colors"
        >
          Print Chart
        </button>
      </div>
    </div>
  );
};

export default SalesPieChartCard;
