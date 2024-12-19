// SellerCard.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const SellerCard = () => {
  const { id } = useParams(); // Ambil ID seller dari URL
  const [seller, setSeller] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSellerData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/admin/seller/${id}`);
        setSeller(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching seller data:", err);
        setError("Failed to load seller data");
        setLoading(false);
      }
    };

    fetchSellerData();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6 mb-6">
      {/* Profile Section */}
      <div className="flex items-center mb-6">
        {/* Photo */}
        <div className="w-16 h-16 rounded-full bg-gray-200 mr-4">
          <img
            src={`http://localhost:3000/uploads/${seller.profile_pic}`} // Pastikan path sesuai
            alt="Profile"
            className="w-full h-full object-cover rounded-full"
          />
        </div>

        {/* Name and Shop Name */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
            {seller.name}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">{seller.store_name}</p>
        </div>
      </div>

      {/* Details Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left Column (Telepon, Alamat, Umur) */}
        <div>
          <p className="text-gray-600 dark:text-gray-400">Telepon</p>
          <p className="text-gray-800 dark:text-gray-100">{seller.phone}</p>
          <p className="text-gray-600 dark:text-gray-400 mt-4">Alamat</p>
          <p className="text-gray-800 dark:text-gray-100">{seller.address}</p>
          <p className="text-gray-600 dark:text-gray-400 mt-4">Umur</p>
          <p className="text-gray-800 dark:text-gray-100">
            {new Date().getFullYear() - new Date(seller.birth_date).getFullYear()} tahun
          </p>
        </div>

        {/* Right Column (Email, Jenis Kelamin, Tanggal Lahir) */}
        <div>
          <p className="text-gray-600 dark:text-gray-400">Email</p>
          <p className="text-gray-800 dark:text-gray-100">{seller.email}</p>
          <p className="text-gray-600 dark:text-gray-400 mt-4">Jenis Kelamin</p>
          <p className="text-gray-800 dark:text-gray-100">
            {seller.gender === "female" ? "Perempuan" : "Laki-laki"}
          </p>
          <p className="text-gray-600 dark:text-gray-400 mt-4">Tanggal Lahir</p>
          <p className="text-gray-800 dark:text-gray-100">
            {new Date(seller.birth_date).toLocaleDateString("id-ID", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SellerCard;
