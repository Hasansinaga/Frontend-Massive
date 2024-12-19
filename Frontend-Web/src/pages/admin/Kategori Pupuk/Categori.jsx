import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Sidebar from "../../../partials/SidebarAdmin";
import Header from "../../../partials/Header";
import axios from "axios";

const AllCategoriesPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/login");
          return;
        }

        const response = await axios.get("http://localhost:3000/api/kategori", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const categoriesData = response.data.kategori || response.data;
        setCategories(categoriesData);
        setLoading(false);
      } catch (err) {
        console.error("Fetch Categories Error:", err);
        if (err.response) {
          if (err.response.status === 401) {
            localStorage.removeItem("token");
            navigate("/login");
          } else {
            setError(
              err.response.data.message || "Gagal mengambil data kategori"
            );
          }
        } else if (err.request) {
          setError(
            "Tidak dapat terhubung ke server. Periksa koneksi internet."
          );
        } else {
          setError("Terjadi kesalahan dalam memproses permintaan.");
        }
        setLoading(false);
      }
    };

    fetchCategories();
  }, [navigate]);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const response = await axios.delete(
        `http://localhost:3000/api/kategori/hapus/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setCategories((prevCategories) =>
          prevCategories.filter((category) => category.id !== id)
        );
        alert("Kategori berhasil dihapus!");
      } else {
        throw new Error("Penghapusan kategori gagal");
      }
    } catch (err) {
      console.error("Delete Error:", err);
      if (err.response) {
        alert(err.response.data.message || "Gagal menghapus kategori!");
      } else if (err.request) {
        alert("Tidak ada respons dari server");
      } else {
        alert("Terjadi kesalahan: " + err.message);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }

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
                  Semua Kategori
                </h1>
              </div>
              <NavLink
                to="/tambah-kategori"
                className="bg-[#7AB434] text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition-colors"
              >
                Tambah Kategori
              </NavLink>
            </div>

            {categories.length === 0 ? (
              <div className="text-center text-gray-500">
                Tidak ada kategori ditemukan.
              </div>
            ) : (
              <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow-md">
                <table className="min-w-full table-auto">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-100">
                        Nama Kategori
                      </th>
                      <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-100">
                        Gambar
                      </th>
                      <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-100">
                        Aksi
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.map((category) => (
                      <tr
                        key={category.id}
                        className="border-b hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <td className="px-4 py-2 text-gray-800 dark:text-gray-100">
                          {category.name}
                        </td>
                        <td className="px-4 py-2 text-gray-800 dark:text-gray-100">
                          <img
                            src={
                              category.image_path &&
                              category.image_path.startsWith("/")
                                ? `http://localhost:3000${category.image_path}` // Make sure to concatenate the full URL
                                : category.image_path ||
                                  "/images/default-image.jpg"
                            }
                            alt={category.name || "Kategori"}
                            className="w-16 h-16 object-cover rounded-lg"
                            onError={(e) =>
                              (e.target.src = "/images/default-image.jpg")
                            }
                          />
                        </td>
                        <td className="px-4 py-2 text-gray-800 dark:text-gray-100">
                          <NavLink
                            to={`/kategori/${category.id}`}
                            className="bg-[#7AB434] text-white py-1 px-4 rounded-lg hover:bg-green-600 transition-colors"
                          >
                            Detail
                          </NavLink>
                          <button
                            onClick={() => handleDelete(category.id)}
                            className="ml-2 bg-red-500 text-white py-1 px-4 rounded-lg hover:bg-red-600 transition-colors"
                          >
                            Hapus
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AllCategoriesPage;
