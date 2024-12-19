import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../../partials/SidebarAdmin";
import Header from "../../../partials/Header";

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Unauthorized");

        const response = await axios.get("http://localhost:3000/api/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUserData(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch profile data");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 bg-gray-100 min-h-screen p-4">
        <Header />
        <div className="bg-white rounded-lg shadow-md p-8 mt-4 mx-4 relative">
          <div className="flex justify-center mb-6">
            <img
              src="images/user-36-06.jpg"
              alt="Profile"
              className="w-24 h-24 object-cover"
            />
          </div>
          <div className="flex flex-col md:flex-row md:justify-between md:space-x-8">
            {/* Left Section */}
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-700 mb-2 text-center md:text-left">
                {userData.username}
              </h2>
              <p className="text-gray-500">Telepon</p>
              <p className="text-gray-700 mb-4">{userData.phone || "N/A"}</p>

              <p className="text-gray-500">Alamat</p>
              <p className="text-gray-700 mb-4">{userData.address || "N/A"}</p>

              <p className="text-gray-500">Umur</p>
              <p className="text-gray-700 mb-4">{userData.age || "N/A"} tahun</p>
            </div>

            {/* Right Section */}
            <div className="flex-1">
              <p className="text-gray-500">Email</p>
              <p className="text-gray-700 mb-4">{userData.email}</p>

              <p className="text-gray-500">Jenis Kelamin</p>
              <p className="text-gray-700 mb-4">{userData.gender || "N/A"}</p>

              <p className="text-gray-500">Tanggal Bergabung</p>
              <p className="text-gray-700 mb-4">{userData.joinedDate || "N/A"}</p>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button className="bg-[#7AB434] text-white py-2 px-6 rounded-lg hover:bg-green-600 transition-colors">
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
