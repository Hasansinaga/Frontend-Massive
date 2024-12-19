import React from "react";

const CardProduk = () => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-4 w-full max-w-full">
      <h3 className="text-lg font-semibold mb-4">Produk yang dipesan</h3>
      <div className="grid grid-cols-2 gap-4 text-sm text-gray-700 dark:text-gray-300">
        <div>
          <p>Produk</p>
          <p className="font-semibold">NPK</p>
        </div>
        <div>
          <p>Jumlah</p>
          <p className="font-semibold">10 kg</p>
        </div>
        <div>
          <p>Harga per satuan</p>
          <p className="font-semibold">Rp 40.000</p>
        </div>
        <div>
          <p>Total Harga</p>
          <p className="font-semibold">Rp 400.000</p>
        </div>
        <div>
          <p>Status Pembayaran</p>
          <p className="font-semibold text-green-600">Sukses</p>
        </div>
        <div>
          <p>Pembayaran</p>
          <p className="font-semibold">MANDIRI</p>
        </div>
      </div>
    </div>
  );
};

export default CardProduk;