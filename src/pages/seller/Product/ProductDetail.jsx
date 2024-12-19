import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../../../partials/SidebarSeller";
import Header from "../../../partials/Header";
import OrderTablePage from "../../../partials/detailProduk/OrderTabelPage";

const DetailProdukPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditable, setIsEditable] = useState(false);
  const [productData, setProductData] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category_id: "",
    price: "",
    stock: "",
    seller_id: "",
    image_path: "",
    created_at: "",
  });
  const [showAddStockForm, setShowAddStockForm] = useState(false);
  const [addedStock, setAddedStock] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState("success");

  
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
              "Content-Type": "application/json",
            },
          }
        );

        setProductData(response.data);
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

  // Handle input changes for editable fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Toggle edit mode
  const toggleEditMode = async () => {
    if (isEditable) {
      try {
        const token = localStorage.getItem("token");
        await axios.put(
          `http://localhost:3000/api/pupuk/edit/${id}`,
          {
            name: formData.name,
            description: formData.description,
            price: parseFloat(formData.price.replace(/[^0-9.-]+/g, "")),
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        alert("Produk berhasil diperbarui");
      } catch (err) {
        console.error("Error updating product:", err);
        alert("Gagal memperbarui produk");
      }
    }
    setIsEditable(!isEditable);
  };

  // Handle image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    try {
      const uploadFormData = new FormData();
      uploadFormData.append("image_path", file);
  
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:3000/api/pupuk/edit/${id}`, 
        uploadFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      // Check if the response contains the new image path
      const newImagePath = response.data.image_path 
        ? `http://localhost:3000${response.data.image_path}`
        : URL.createObjectURL(file);
  
      // Update both form data and local state
      setFormData(prev => ({
        ...prev,
        image_path: newImagePath
      }));
  
      // Show success popup
      setPopupMessage("Gambar berhasil diperbarui");
      setPopupType("success");
      setShowPopup(true);
  
    } catch (error) {
      console.error("Error saat mengunggah gambar:", error.response || error.message);
      
      // Show error popup
      setPopupMessage("Gagal mengunggah gambar");
      setPopupType("error");
      setShowPopup(true);
    }
  };
  
  
  

  // Handle adding stock
  const handleAddStock = async () => {
    if (!addedStock || isNaN(addedStock) || parseFloat(addedStock) <= 0) {
      setPopupMessage("Harap masukkan jumlah stok yang valid");
      setPopupType("error");
      setShowPopup(true);
      return;
    }
  
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:3000/api/pupuk/add-stock/${id}`, // Uses the existing 'id' from useParams
        { addedStock: parseFloat(addedStock) },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      // Update local state with new stock
      setFormData(prev => ({
        ...prev,
        stock: (parseFloat(prev.stock) + parseFloat(addedStock)).toString()
      }));
  
      setPopupMessage(`Berhasil menambahkan ${addedStock} stok`);
      setPopupType("success");
      setShowPopup(true);
      setAddedStock("");
      setShowAddStockForm(false);
    } catch (err) {
      console.error("Error adding stock:", err);
      setPopupMessage(err.response?.data?.message || "Gagal menambahkan stok");
      setPopupType("error");
      setShowPopup(true);

      setShowConfirmModal(true);
    }
  };
  

  // Handle product deletion
  const handleDeleteProduct = async () => {
    if (window.confirm("Apakah Anda yakin ingin menghapus produk ini?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(
          `http://localhost:3000/api/pupuk/hapus/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        alert("Produk berhasil dihapus");
        navigate("/produk-seller");
      } catch (err) {
        console.error("Error deleting product:", err);
        alert("Gagal menghapus produk");
      }
    }
  };

  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Popup Component
  const Popup = ({ message, type, onClose }) => {
    useEffect(() => {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }, [onClose]);

    return (
      <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg ${
        type === 'success' 
          ? 'bg-green-500 text-white' 
          : 'bg-red-500 text-white'
      }`}>
        {message}
      </div>
    );
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="flex h-screen overflow-hidden dark:bg-gray-900 dark:text-gray-100">
      {showPopup && (
        <Popup 
          message={popupMessage} 
          type={popupType} 
          onClose={() => setShowPopup(false)} 
        />
      )}
      
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
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleEditMode}
                  className="px-4 py-2 bg-[#7AB434] hover:bg-[#6AA22F] text-white rounded-lg"
                >
                  {isEditable ? "Simpan" : "Edit"}
                </button>
                <button
                  onClick={handleDeleteProduct}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
                >
                  Hapus
                </button>
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
                        onChange={handleInputChange}
                        readOnly={!isEditable}
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
                        value={formData.description}
                        onChange={handleInputChange}
                        readOnly={!isEditable}
                        className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-2 mt-1"
                        rows="5"
                      ></textarea>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                          Kategori
                        </label>
                        <input
                          type="text"
                          name="category_name"
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
                      <div>
                        <button
                          type="button"
                          onClick={() => setShowAddStockForm(!showAddStockForm)}
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg mt-4"
                        >
                          {showAddStockForm ? "Batal" : "Tambah Stok"}
                        </button>
                      </div>
                    </div>

                    {showAddStockForm && (
                      <div className="mt-4">
                        <input
                          type="number"
                          value={addedStock}
                          onChange={(e) => setAddedStock(e.target.value)}
                          className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-2 mt-1"
                          placeholder="Masukkan jumlah stok"
                        />
                        <button
                          type="button"
                          onClick={handleAddStock}
                          className="px-4 py-2 bg-[#7AB434] hover:bg-[#6AA22F] text-white rounded-lg mt-2"
                        >
                          Tambah Stok
                        </button>
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                          Harga (/kg)
                        </label>
                        <input
                          type="text"
                          name="price"
                          value={formData.price}
                          onChange={handleInputChange}
                          readOnly={!isEditable}
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

                <div className="flex flex-col items-center justify-center">
                  <div className="p-4 border border-gray-300 dark:border-gray-700 rounded-lg w-[400px] mb-4">
                    <img
                      src={formData.image_path}
                      alt={formData.name}
                      className="w-full h-auto object-contain rounded-lg"
                    />
                  </div>
                  {isEditable && (
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="mt-2"
                    />
                  )}
                </div>
              </div>
            </div>
            <OrderTablePage productId={id} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DetailProdukPage;
