import React from "react";

const ReportTable = ({ salesData }) => {
  return (
    <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md">
      <thead>
        <tr className="text-left text-gray-600 dark:text-gray-100">
          <th className="px-4 py-2">Product Photo</th>
          <th className="px-4 py-2">Product Name</th>
          <th className="px-4 py-2">Quantity Sold</th>
          <th className="px-4 py-2">Unit Price</th>
          <th className="px-4 py-2">Total</th>
        </tr>
      </thead>
      <tbody>
        {salesData.map((product, index) => (
          <tr key={index} className="border-b border-gray-200 dark:border-gray-700">
            <td className="px-4 py-2">
              <img src={product.productImage} alt={product.productName} className="w-12 h-12 object-cover rounded-full" />
            </td>
            <td className="px-4 py-2 text-gray-800 dark:text-gray-100">{product.productName}</td>
            <td className="px-4 py-2 text-gray-800 dark:text-gray-100">{product.quantitySold}</td>
            <td className="px-4 py-2 text-gray-800 dark:text-gray-100">
              {product.unitPrice.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
            </td>
            <td className="px-4 py-2 text-gray-800 dark:text-gray-100">
              {product.total.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ReportTable;
