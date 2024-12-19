import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Konfigurasi default axios
axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/json';

const UserRegister = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    name: "",
    store_name: "",
    phone: "",
    address: "",
    birth_date: "",
    email: "",
    gender: "",
    username: "",
    password: "",
    confirm_password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validasi password
    if (formData.password !== formData.confirm_password) {
      setErrors({ confirm_password: "Password tidak cocok" });
      setLoading(false);
      return;
    }

    // Data yang akan dikirim
    const dataToSend = {
      name: formData.name,
      store_name: formData.store_name,
      phone: formData.phone,
      address: formData.address,
      birth_date: formData.birth_date,
      email: formData.email,
      gender: formData.gender,
      username: formData.username,
      password: formData.password,
    };

    try {
      // Debug: Log data sebelum dikirim
      console.log('Sending data:', dataToSend);

      const response = await axios({
        method: 'post',
        url: '/api/seller/register',
        data: dataToSend,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      // Debug: Log response
      console.log('Response:', response);

      if (response.data) {
        alert("Registrasi berhasil!");
        navigate("/login");
      }
    } catch (error) {
      // Debug: Log error detail
      console.error('Error full detail:', error);
      
      let errorMessage = "Terjadi kesalahan saat mendaftar";
      
      if (error.response) {
        // Error dari response server
        console.log('Error response:', error.response);
        errorMessage = error.response.data?.message || 
                      error.response.data?.error || 
                      errorMessage;
        
        // Handle specific error codes
        switch (error.response.status) {
          case 409:
            errorMessage = "Email atau username sudah terdaftar";
            break;
          case 400:
            errorMessage = "Data yang dimasukkan tidak valid";
            break;
          case 500:
            errorMessage = "Terjadi kesalahan pada server";
            break;
          default:
            break;
        }
      } else if (error.request) {
        // Error karena tidak ada response
        console.log('Error request:', error.request);
        errorMessage = "Tidak dapat terhubung ke server. Pastikan server berjalan.";
      } else {
        // Error lainnya
        console.log('Error:', error.message);
        errorMessage = `Error: ${error.message}`;
      }
      
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 py-8">
      <div className="w-full max-w-4xl p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <div className="flex justify-center mb-6">
          <img src="/images/logo.png" alt="Logo" className="h-30 w-60" />
        </div>
        
        <form onSubmit={handleRegister}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Section */}
            <div>
              <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">
                Informasi tentang Seller
              </h1>
              
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="store_name" className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                  Nama Toko
                </label>
                <input
                  type="text"
                  id="store_name"
                  name="store_name"
                  value={formData.store_name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="phone" className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                  Nomor Telepon
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="address" className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                  Alamat
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="birth_date" className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                  Tanggal Lahir
                </label>
                <input
                  type="date"
                  id="birth_date"
                  name="birth_date"
                  value={formData.birth_date}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="gender" className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                  Jenis Kelamin
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  required
                >
                  <option value="">Pilih Jenis Kelamin</option>
                  <option value="male">Laki-laki</option>
                  <option value="female">Perempuan</option>
                </select>
              </div>
            </div>

            {/* Right Section */}
            <div>
              <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">
                Akun Seller
              </h1>
              
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="username" className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="confirm_password" className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                  Konfirmasi Password
                </label>
                <input
                  type="password"
                  id="confirm_password"
                  name="confirm_password"
                  value={formData.confirm_password}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 ${
                    errors.confirm_password ? "border-red-500" : "border-gray-300"
                  }`}
                  required
                />
                {errors.confirm_password && (
                  <p className="text-red-500 text-xs mt-1">{errors.confirm_password}</p>
                )}
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full ${
              loading ? "bg-gray-400" : "bg-[#7AB434] hover:bg-[#6ca02c]"
            } text-white font-bold py-2 px-4 rounded-md transition duration-200 mt-6`}
          >
            {loading ? "Mendaftar..." : "Daftar"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <a href="/login" className="text-sm text-blue-500 hover:underline">
            Sudah punya akun? Masuk
          </a>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;
