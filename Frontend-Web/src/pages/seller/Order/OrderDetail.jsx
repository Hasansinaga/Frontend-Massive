import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Sidebar from "../../../partials/SidebarSeller";
import Header from "../../../partials/Header";

const DetailPesanan = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [orderDetail, setOrderDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams(); 

  useEffect(() => {
    const fetchOrderDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/order/order-detail/${id}`);
        setOrderDetail(response.data[0]); // Ambil elemen pertama dari array
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchOrderDetail();
  }, [id]);

  if (loading) return <div>Memuat...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!orderDetail) return <div>Tidak ada data pesanan</div>;

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      {/* Main content */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/* Header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Content */}
        <main className="grow px-4 sm:px-6 lg:px-8 py-8 w-full">
          <h1 className="text-2xl font-bold mb-6">Detail Pesanan</h1>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Informasi Pembeli */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Informasi Pembeli</h2>
              <div className="space-y-2">
                <p><strong>Nama:</strong> {orderDetail.buyer_name}</p>
                <p><strong>Email:</strong> {orderDetail.buyer_email}</p>
                <p><strong>Telepon:</strong> {orderDetail.buyer_phone}</p>
                <p><strong>Alamat:</strong> {orderDetail.buyer_address}</p>
              </div>
            </div>

            {/* Informasi Produk */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Detail Produk</h2>
              <div className="flex items-center space-x-4">
                <img 
                  src={`http://localhost:3000${orderDetail.fertilizer_image}`} 
                  alt={orderDetail.fertilizer_name}
                  className="w-24 h-24 object-cover rounded-md"
                />
                <div>
                  <p><strong>Nama Produk:</strong> {orderDetail.fertilizer_name}</p>
                  <p><strong>Jumlah:</strong> {orderDetail.quantity} unit</p>
                  <p><strong>Harga Satuan:</strong> Rp {orderDetail.price}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Ringkasan Pesanan */}
          <div className="bg-white p-6 rounded-lg shadow-md mt-6">
            <h2 className="text-xl font-semibold mb-4">Ringkasan Pesanan</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p><strong>Status Pesanan:</strong> 
                  <span className={`ml-2 px-2 py-1 rounded ${
                    orderDetail.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                    orderDetail.status === 'completed' ? 'bg-green-100 text-green-800' : 
                    'bg-red-100 text-red-800'
                  }`}>
                    {orderDetail.status}
                  </span>
                </p>
                <p><strong>Tanggal Pesanan:</strong> {new Date(orderDetail.created_at).toLocaleString()}</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold">Total Harga: Rp {orderDetail.total_price}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 mt-6">
            <button className="bg-red-500 text-white py-2 px-6 rounded-md font-semibold hover:bg-red-600">
              Tolak Pesanan
            </button>
            <button className="bg-[#7AB434] text-white py-2 px-6 rounded-md font-semibold hover:bg-[#6A9A2D]">
              Proses Pesanan
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DetailPesanan;