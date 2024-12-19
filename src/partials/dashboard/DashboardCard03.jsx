import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react'; 
import axios from 'axios';

function DashboardCard03() {
  const [productAmount, setProductAmount] = useState(0);
  const [role, setRole] = useState(null); // To store the user's role (admin or seller)
  const [sellerId, setSellerId] = useState(null); // Seller's ID (for seller role)
  
  useEffect(() => {
    // Fetch the role and seller ID from the local storage or token
    const userRole = localStorage.getItem('role'); // Assuming role is stored in localStorage
    const userId = localStorage.getItem('userId'); // Assuming userId is stored in localStorage

    setRole(userRole); // Set role (admin or seller)
    setSellerId(userId); // Set the seller's ID (if applicable)

    fetchProducts(userRole, userId); // Call function to fetch products based on role
  }, []);

  const fetchProducts = async (userRole, userId) => {
    try {
      let response;

      if (userRole === 'admin') {
        // Admin, fetch all products
        response = await axios.get('http://localhost:3000/api/pupuk');
        setProductAmount(response.data.productCount); // Set the count of all products from response
      } else if (userRole === 'seller' && userId) {
        // Seller, fetch products based on the seller's ID
        response = await axios.get(`http://localhost:3000/api/pupuk?sellerId=${userId}`);
        setProductAmount(response.data.productCount); // Set the count of seller's products from response
      } else {
        // Handle cases where no role or seller ID is available
        setProductAmount(20);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      <div className="px-5 pt-4 pb-4">
        <header className="flex items-center mb-2">
          <Icon
            icon="mdi:bag-personal-outline"
            className="w-12 h-12 text-gray-800 dark:text-gray-100 mr-2"
          />
          <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase">
            Produk
          </div>
        </header>
        <div className="flex items-center justify-between pt-8">
          <div className="text-3xl font-bold text-gray-800 dark:text-gray-100">
            {productAmount}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardCard03;
