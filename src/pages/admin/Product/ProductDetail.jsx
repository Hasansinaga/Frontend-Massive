import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Sidebar from "../../../partials/SidebarAdmin";
import Header from "../../../partials/Header";
import OrderTablePage from "../../../partials/detailProduk/OrderTabelPage";

const DetailProdukPage = () => {
  const { id } = useParams(); 
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [productData, setProductData] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category_id: "",
    price: "",
    stock: "",
    seller_id: "",
    image_path: "",
    created_at: ""
  });

  // Fetch data produk berdasarkan ID
  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        setLoading(true);
        setError(null);

        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:3000/api/pupuk/${id}`,
          {
            headers: { 
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
          }
        );

        // Save full product data for reference
        setProductData(response.data);

        // Prepare form data directly from response
        setFormData({
          name: response.data.name || "Nama Produk Tidak Ada",
          stock: response.data.stock || "Stock Produk Tidak Ada",
          description: response.data.description || "Deskripsi Tidak Ada",
          category_id: response.data.category_id 
            ? `Kategori ${response.data.category_id}` 
            : "Kategori Tidak Ada",
          price: response.data.price 
            ? `Rp ${parseFloat(response.data.price).toLocaleString("id-ID")}` 
            : "0",
          seller_id: response.data.seller_id 
            ? `Penjual ${response.data.seller_id}` 
            : "Penjual Tidak Diketahui",
          image_path: response.data.image_path 
            ? `http://localhost:3000${response.data.image_path}` 
            : "/images/default.png",
          created_at: response.data.created_at 
            ? new Date(response.data.created_at).toLocaleDateString('id-ID') 
            : "Tanggal Tidak Tersedia"
        });

      } catch (err) {
        console.error("Detailed Error:", err);
        setError(err.response?.data?.message || "Gagal memuat detail produk");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProductDetail();
    }
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="flex h-screen overflow-hidden dark:bg-gray-900 dark:text-gray-100">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
           

            <div className="sm:flex sm:justify-between sm:items-center mb-8">
              <div className="mb-4 sm:mb-0">
                <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">
                  Detail Produk
                </h1>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <form className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                        Nama Produk
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        readOnly
                        className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-2 mt-1"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                        Penjual
                      </label>
                      <input
                        type="text"
                        name="seller_id"
                        value={formData.seller_id}
                        readOnly
                        className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-2 mt-1"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                        Deskripsi
                      </label>
                      <textarea
                        name="description"
                        readOnly
                        className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-2 mt-1"
                        rows="5"
                        value={formData.description}
                      ></textarea>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                        Kategori
                      </label>
                      <input
                        type="text"
                        name="category_id"
                        value={formData.category_id}
                        readOnly
                        className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-2 mt-1"
                      />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                          Stok
                        </label>
                        <input
                          type="text"
                          name="stock"
                          value={formData.stock}
                          readOnly
                          className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-2 mt-1"
                        />
                      </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                          Harga (/kg)
                        </label>
                        <input
                          type="text"
                          name="price"
                          value={formData.price}
                          readOnly
                          className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-2 mt-1"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                          Tanggal Dibuat
                        </label>
                        <input
                          type="text"
                          name="created_at"
                          value={formData.created_at}
                          readOnly
                          className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-2 mt-1"
                        />
                      </div>
                    </div>
                  </form>
                </div>

                <div className="flex items-center justify-center">
                  <div className="p-4 border border-gray-300 dark:border-gray-700 rounded-lg w-[400px]">
                    <img
                      src={formData.image_path}
                      alt={formData.name}
                      className="w-full h-auto object-contain rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </div>
            <OrderTablePage />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DetailProdukPage;