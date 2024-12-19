import React, { useState } from 'react';
import axios from 'axios';
import Sidebar from '../../../partials/SidebarSeller';
import Header from '../../../partials/Header';

const AddStockPage = () => {
  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!productId || !quantity || isNaN(quantity) || quantity <= 0) {
      setMessage('Please provide valid inputs.');
      return;
    }

    try {
      const response = await axios.patch(`/api/products/${productId}/add-stock`, {
        quantity: parseInt(quantity, 10),
      });

      setMessage(response.data.message || 'Stock added successfully!');
      setProductId('');
      setQuantity('');
    } catch (error) {
      console.error('Error adding stock:', error);
      setMessage(
        error.response?.data?.message || 'Failed to add stock. Please try again.'
      );
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header />
        <div className="px-6 py-8 w-full max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Add Stock</h1>
          {message && <p className="text-red-500 mb-4">{message}</p>}
          <form
            onSubmit={handleSubmit}
            className="space-y-6 bg-white p-6 rounded-lg shadow-md"
          >
            <div>
              <label htmlFor="productId" className="block text-sm font-medium text-gray-700 mb-1">
                Product ID
              </label>
              <input
                type="text"
                id="productId"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                placeholder="Enter product ID"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                required
              />
            </div>

            <div>
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                Quantity to Add
              </label>
              <input
                type="number"
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="Enter quantity"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                required
              />
            </div>

            <div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
              >
                Add Stock
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddStockPage;
