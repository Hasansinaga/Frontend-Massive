import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../../partials/SidebarSeller";
import Header from "../../../partials/Header";

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [profilePic, setProfilePic] = useState(null);
  const [profilePicFile, setProfilePicFile] = useState(null);
  const [showModal, setShowModal] = useState(false); // state for modal
  const [isProfileSaved, setIsProfileSaved] = useState(false); // state for success notification

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Unauthorized");

        const response = await axios.get("http://localhost:3000/api/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUserData(response.data);
        setProfilePic(response.data.profilePic);
        setFormData(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch profile data");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleEditClick = () => {
    if (isEditing) {
      // Display custom modal
      setShowModal(true);
    } else {
      setIsEditing(true);
    }
  };

  const handleSaveChanges = async () => {
    try {
      const token = localStorage.getItem("token");
      const updatedFormData = new FormData();

      // Menambahkan semua data form ke FormData
      for (let key in formData) {
        if (key !== "profile_pic") {
          updatedFormData.append(key, formData[key]);
        }
      }

      // Menambahkan gambar profil baru jika ada
      if (profilePicFile) {
        updatedFormData.append("profile_pic", profilePicFile);
      }

      // Gunakan PUT untuk mengupdate data profil
      const response = await axios.put(
        "http://localhost:3000/api/seller/edit-profile",
        updatedFormData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data", // Content-Type untuk mengirim FormData
          },
        }
      );

      // Update profile picture path dari respons server
      const newProfilePicPath = response.data.profilePic
        ? `http://localhost:3000${response.data.profilePic}`
        : null;

      setUserData(response.data);
      setProfilePic(newProfilePicPath);
      setProfilePicFile(null);
      setIsEditing(false); // Keluar dari mode edit
      setIsProfileSaved(true); // Set success state
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save profile data");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    setProfilePicFile(file);
    setFormData({ ...formData, profile_pic: file.name });
  };

  const closeModal = (confirmed) => {
    if (confirmed) {
      handleSaveChanges();
    }
    setShowModal(false);
  };

  const handleCloseNotification = () => {
    setIsProfileSaved(false); // Hide notification after a few seconds
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-700 mb-6">Pengguna</h1>
          <div
            className="bg-[#7AB434] rounded-lg shadow-md p-6 flex justify-between"
            style={{ minHeight: "300px", margin: "0 100px" }}
          >
            <div className="w-3/5 space-y-4">
              {/* Form Inputs */}
              <div>
                <label className="block text-white font-semibold">Nama</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name || ""}
                  readOnly={!isEditing}
                  onChange={handleInputChange}
                  className="w-full mt-1 p-2 border rounded-md bg-white"
                />
              </div>
              <div>
                <label className="block text-white font-semibold">
                  Nama Pengguna
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username || ""}
                  readOnly={!isEditing}
                  onChange={handleInputChange}
                  className="w-full mt-1 p-2 border rounded-md bg-white"
                />
              </div>
              <div>
                <label className="block text-white font-semibold">Nama Toko</label>
                <input
                  type="text"
                  name="store_name"
                  value={formData.store_name || ""}
                  readOnly={!isEditing}
                  onChange={handleInputChange}
                  className="w-full mt-1 p-2 border rounded-md bg-white"
                />
              </div>
              <div>
                <label className="block text-white font-semibold">Telepon</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone || ""}
                  readOnly={!isEditing}
                  onChange={handleInputChange}
                  className="w-full mt-1 p-2 border rounded-md bg-white"
                />
              </div>
              <div>
                <label className="block text-white font-semibold">Alamat</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address || ""}
                  readOnly={!isEditing}
                  onChange={handleInputChange}
                  className="w-full mt-1 p-2 border rounded-md bg-white"
                />
              </div>
              <div>
                <label className="block text-white font-semibold">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email || ""}
                  readOnly={!isEditing}
                  onChange={handleInputChange}
                  className="w-full mt-1 p-2 border rounded-md bg-white"
                />
              </div>
              <div className="flex space-x-4">
                <div className="w-1/2">
                  <label className="block text-white font-semibold">Umur</label>
                  <input
                    type="text"
                    value={formData.age || ""}
                    readOnly={!isEditing}
                    onChange={handleInputChange}
                    name="birth_date"
                    className="w-full mt-1 p-2 border rounded-md bg-white"
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-white font-semibold">
                    Jenis Kelamin
                  </label>
                  <input
                    type="text"
                    name="gender"
                    value={formData.gender || ""}
                    readOnly={!isEditing}
                    onChange={handleInputChange}
                    className="w-full mt-1 p-2 border rounded-md bg-white"
                  />
                </div>
              </div>
            </div>
            <div className="w-1/3 flex flex-col items-center">
              {/* Profile Picture */}
              {profilePic ? (
                <img
                  src={profilePic}
                  alt="Profile"
                  className="w-52 h-52 object-cover rounded-lg border-4 border-gray-300"
                />
              ) : (
                <div className="w-52 h-52 flex flex-col justify-center items-center bg-gray-200 rounded-lg border-4 border-gray-300">
                  <i className="fas fa-user text-6xl text-gray-500"></i>
                  <p className="text-gray-500 mt-2">Belum ada foto profil</p>
                </div>
              )}
              {isEditing && (
                <div className="mt-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePicChange}
                    className="hidden"
                    id="profilePicInput"
                  />
                  <label
                    htmlFor="profilePicInput"
                    className="bg-white text-[#7AB434] py-2 px-4 rounded-lg border cursor-pointer hover:bg-gray-100"
                  >
                    Pilih Foto Baru
                  </label>
                </div>
              )}
            </div>
          </div>
          <div className="text-center mt-4">
            <button
              onClick={handleEditClick}
              className={`py-2 px-6 rounded-lg ${isEditing ? "bg-blue-500 text-white" : "bg-green-500 text-white"}`}
            >
              {isEditing ? "Simpan" : "Edit Profil"}
            </button>
          </div>
        </div>
      </div>

      {/* Modal Confirmation */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm">
            <h3 className="text-lg font-semibold mb-4">Konfirmasi Perubahan</h3>
            <p>Apakah Anda yakin ingin menyimpan perubahan?</p>
            <div className="mt-4 flex justify-between">
              <button
                onClick={() => closeModal(false)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Batal
              </button>
              <button
                onClick={() => closeModal(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              >
                Ya
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Notification */}
      {isProfileSaved && (
        <div className="fixed top-5 right-5 bg-green-500 text-white p-4 rounded-lg shadow-lg">
          Profil berhasil disimpan!
          <button
            onClick={handleCloseNotification}
            className="ml-2 text-white font-semibold"
          >
            X
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;

