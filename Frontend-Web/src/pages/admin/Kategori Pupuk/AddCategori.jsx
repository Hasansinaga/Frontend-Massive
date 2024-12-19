import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../../partials/SidebarAdmin";
import Header from "../../../partials/Header";
import axios from "axios";

const AddCategoryPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [categoryImage, setCategoryImage] = useState(null); // Tambahkan state untuk gambar
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleCategoryChange = (e) => {
    setCategoryName(e.target.value);
  };

  const handleImageChange = (e) => {
    setCategoryImage(e.target.files[0]); // Simpan file gambar yang diunggah
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!categoryName) {
      setError("Nama kategori harus diisi");
      return;
    }

    if (!categoryImage) {
      setError("Gambar kategori harus diunggah");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      // Buat FormData untuk mengirim nama kategori dan gambar
      const formData = new FormData();
      formData.append("name", categoryName);
      formData.append("image", categoryImage);

      const response = await axios.post(
        "http://localhost:3000/api/kategori/tambah",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data", // Pastikan menggunakan header ini
          },
        }
      );

      navigate("/kategori-admin");
    } catch (err) {
      console.error("Error adding category:", err);
      setLoading(false);
      if (err.response) {
        setError(err.response.data.message || "Gagal menambahkan kategori");
      } else {
        setError("Terjadi kesalahan saat menghubungi server.");
      }
    }
  };

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
                  Tambah Kategori
                </h1>
              </div>
            </div>

            {/* Form Tambah Kategori */}
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="categoryName"
                    className="block text-gray-700 dark:text-gray-200 font-semibold"
                  >
                    Nama Kategori
                  </label>
                  <input
                    type="text"
                    id="categoryName"
                    value={categoryName}
                    onChange={handleCategoryChange}
                    className="mt-2 px-4 py-2 w-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Masukkan nama kategori"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="categoryImage"
                    className="block text-gray-700 dark:text-gray-200 font-semibold"
                  >
                    Gambar Kategori
                  </label>
                  <input
                    type="file"
                    id="categoryImage"
                    onChange={handleImageChange}
                    className="mt-2 px-4 py-2 w-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Error Message */}
                {error && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                    <strong className="font-bold">Error: </strong>
                    <span className="block sm:inline">{error}</span>
                  </div>
                )}

                {/* Submit Button */}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-[#7AB434] text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-600 transition-colors"
                    disabled={loading}
                  >
                    {loading ? "Menambahkan..." : "Tambah Kategori"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AddCategoryPage;
