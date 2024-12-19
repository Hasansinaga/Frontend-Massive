import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../../../partials/SidebarAdmin";
import Header from "../../../partials/Header";

const CategoryDetailPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [category, setCategory] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [editedImage, setEditedImage] = useState(null); // Store the new image
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();

  const baseUrl = "http://localhost:3000"; // URL dasar server Anda

  // Fetch Category Details
  useEffect(() => {
    const fetchCategoryDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        setLoading(true);
        setError(null);

        const response = await axios.get(`http://localhost:3000/api/kategori/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.data || !response.data.kategori) {
          throw new Error("Data kategori tidak ditemukan");
        }

        setCategory(response.data.kategori);
        setEditedName(response.data.kategori.name);
      } catch (err) {
        console.error("Fetch Category Details Error:", err);
        setCategory(null);
        setEditedName("");

        if (err.response) {
          switch (err.response.status) {
            case 401:
              localStorage.removeItem("token");
              navigate("/login");
              break;
            case 404:
              setError("Kategori tidak ditemukan");
              break;
            default:
              setError(err.response.data.message || "Gagal mengambil detail kategori");
          }
        } else if (err.request) {
          setError("Tidak dapat terhubung ke server. Periksa koneksi internet.");
        } else {
          setError("Terjadi kesalahan dalam memproses permintaan.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryDetails();
  }, [id, navigate]);

  // Handle Edit Category
  const handleEditCategory = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      if (!editedName.trim()) {
        alert("Nama kategori tidak boleh kosong!");
        return;
      }

      const formData = new FormData();
      formData.append("name", editedName);
      if (editedImage) {
        formData.append("image", editedImage); // Append the new image if it exists
      }

      const response = await axios.put(
        `http://localhost:3000/api/kategori/edit/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data", // Set content type for file upload
          },
        }
      );

      setCategory((prevCategory) => ({
        ...prevCategory,
        name: editedName,
        image_path: response.data.kategori.image_path, // Update the image path from the response
      }));

      setEditMode(false);
      alert("Kategori berhasil diperbarui!");
    } catch (err) {
      console.error("Edit Category Error:", err);
      alert(err.response?.data?.message || "Gagal memperbarui kategori");
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

        <main className="grow p-6">
          <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
            <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">
              Detail Kategori
            </h1>

            {/* Display Category Image */}
            {category?.image_path && !editMode && (
              <div className="mb-4">
                <img
                  src={`${baseUrl}${category.image_path}`} // Display the image using the base URL and image path
                  alt={category.name}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
            )}

            {editMode ? (
              <div>
                {category?.image_path && (
                  <div className="mb-4">
                    <img
                      src={`${baseUrl}${category.image_path}`} // Show current image while editing
                      alt={category.name}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  </div>
                )}

                <div className="mb-4">
                  <label
                    htmlFor="categoryName"
                    className="block text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Nama Kategori
                  </label>
                  <input
                    type="text"
                    id="categoryName"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-gray-200"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="categoryImage"
                    className="block text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Gambar Kategori
                  </label>
                  <input
                    type="file"
                    id="categoryImage"
                    accept="image/*"
                    onChange={(e) => setEditedImage(e.target.files[0])}
                    className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-gray-200"
                  />
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={handleEditCategory}
                    className="bg-[#7AB434] text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                  >
                    Simpan
                  </button>
                  <button
                    onClick={() => {
                      setEditMode(false);
                      setEditedName(category.name);
                      setEditedImage(null); // Reset image selection
                    }}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    Batal
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="mb-4">
                  <label className="block text-gray-600 dark:text-gray-300 mb-2">
                    Nama Kategori
                  </label>
                  <div className="px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-gray-200">
                    {category?.name || "Nama Kategori Tidak Tersedia"}
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => setEditMode(true)}
                    className="bg-[#7AB434] text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => navigate("/kategori-admin")}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    Kembali
                  </button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default CategoryDetailPage;
