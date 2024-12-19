import React, { useState } from 'react';

const ProductFormCard = () => {
  const [discountEnabled, setDiscountEnabled] = useState(false);
  const [expiryDateEnabled, setExpiryDateEnabled] = useState(false);

  return (
    <div className="max-w-sm mx-auto bg-white p-6 rounded-lg shadow-md">
      <div className="space-y-4">
        {/* Product Name */}
        <input
          type="text"
          placeholder="Nama Produk"
          className="w-full px-4 py-2 bg-gray-100 rounded-lg focus:outline-none"
        />

        {/* Store Name */}
        <input
          type="text"
          placeholder="Nama Toko"
          className="w-full px-4 py-2 bg-gray-100 rounded-lg focus:outline-none"
        />

        {/* Category */}
        <select
          className="w-full px-4 py-2 bg-gray-100 rounded-lg focus:outline-none"
        >
          <option value="">Pilih Kategori</option>
          <option value="kategori1">Kategori 1</option>
          <option value="kategori2">Kategori 2</option>
          <option value="kategori3">Kategori 3</option>
        </select>

        {/* Price */}
        <div className="flex items-center">
          <input
            type="number"
            placeholder="Harga"
            className="w-full px-4 py-2 bg-gray-100 rounded-lg focus:outline-none"
          />
        </div>

        {/* Stock */}
        <div className="flex items-center">
          <input
            type="number"
            placeholder="Stok"
            className="w-full px-4 py-2 bg-gray-100 rounded-lg focus:outline-none"
          />
        </div>

        {/* Discount */}
        <div className="flex items-center justify-between">
          <label className="text-gray-700">Discount</label>
          <div className="flex items-center space-x-2">
            <span className="text-gray-400">Add Discount</span>
            <input
              type="checkbox"
              checked={discountEnabled}
              onChange={() => setDiscountEnabled(!discountEnabled)}
              className="toggle-checkbox"
            />
          </div>
        </div>

        {/* Discount Form (Visible when checkbox is checked) */}
        {discountEnabled && (
          <div className="space-y-4 mt-4">
            <input
              type="number"
              placeholder="Discount Percentage"
              className="w-full px-4 py-2 bg-gray-100 rounded-lg focus:outline-none"
            />
            <input
              type="text"
              placeholder="Discount Description"
              className="w-full px-4 py-2 bg-gray-100 rounded-lg focus:outline-none"
            />
          </div>
        )}

        {/* Expiry Date */}
        <div className="flex items-center justify-between">
          <label className="text-gray-700">Expiry Date</label>
          <div className="flex items-center space-x-2">
            <span className="text-gray-400">Add Expiry Date</span>
            <input
              type="checkbox"
              checked={expiryDateEnabled}
              onChange={() => setExpiryDateEnabled(!expiryDateEnabled)}
              className="toggle-checkbox"
            />
          </div>
        </div>

        {/* Expiry Date Form (Visible when checkbox is checked) */}
        {expiryDateEnabled && (
          <div className="space-y-4 mt-4">
            <input
              type="date"
              className="w-full px-4 py-2 bg-gray-100 rounded-lg focus:outline-none"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductFormCard;
