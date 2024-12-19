import React, { useState, useEffect } from "react";
import Sidebar from "../../../partials/SidebarSeller";
import Header from "../../../partials/Header";
import axios from "axios";
import ProductTable from "../../../partials/product/tabelProductSeller";
import { Link } from "react-router-dom";  

const ProductPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3000/api/pupuk", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProducts(response.data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Gagal memuat produk. Silakan coba lagi.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="flex h-screen overflow-hidden dark:bg-gray-900 dark:text-gray-100">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* Page title */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
              <div className="mb-4 sm:mb-0">
                <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">
                  Pupuk Seller
                </h1>
              </div>

              {/* Tombol Tambah Pupuk */}
              <div className="mb-4 sm:mb-0">
                <Link
                  to="/produk-seller/tambah"
                  className="px-4 py-2 bg-[#7AB434] hover:bg-[#6AA22F] text-white rounded-lg"
                >
                  Tambah Pupuk
                </Link>
              </div>
            </div>

            {/* Product Table */}
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12">
                {loading && <p>Loading...</p>}
                {error && <p className="text-red-500">{error}</p>}
                {!loading && !error && products.length === 0 && (
                  <p>Belum ada produk.</p>
                )}
                {!loading && !error && products.length > 0 && (
                  <ProductTable products={products} />
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProductPage;
