import React from 'react';
import { Icon } from '@iconify/react';

function ProductCountCard({ count }) {
  const productAmount = count ? count : "240"; // default jumlah produk jika `count` tidak ada

  return (
    <div className="flex flex-col w-[1465px] h-[150px] bg-[#7AB434] shadow-sm rounded-xl"> {/* Lebar dan Tinggi diatur di sini */}
      <div className="px-5 pt-4 pb-4">
        <header className="flex items-center mb-2">
          <Icon
            icon="mdi:cart-outline"
            className="w-12 h-12 text-gray-800 dark:text-gray-100 mr-2"
          />
          <div className="text-xs font-semibold text-gray-800 dark:text-gray-100 uppercase">
            Jumlah Produk
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


export default ProductCountCard;
