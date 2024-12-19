import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Konfigurasi default axios
axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/json';

const UserLogin = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Reset error

    try {
      console.log('Sending data:', formData);

      const response = await axios.post('/api/auth/login', formData);

      // Debug: Lihat struktur response
      console.log('Response:', response.data);

      if (response.data) {
        // Simpan token dan data user ke localStorage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userData', JSON.stringify(response.data));

        // Periksa role dari response.data langsung
        const role = response.data.role || response.data.user_role; // Sesuaikan dengan struktur API Anda

        if (role) {
          // Pengalihan berdasarkan role
          switch(role.toLowerCase()) {
            case 'admin':
              navigate("/dashboard-admin");
              break;
            case 'seller':
              navigate("/dashboard-seller");
              break;
            default:
              console.log('Unknown role:', role);
              setError("Role tidak valid");
              break;
          }
        } else {
          console.log('Role not found in response:', response.data);
          setError("Role tidak ditemukan dalam response");
        }
      }
    } catch (error) {
      console.error('Error full detail:', error);

      let errorMessage = "Terjadi kesalahan saat login";

      if (error.response) {
        console.log('Error response:', error.response);
        errorMessage = error.response.data?.message || 
                      error.response.data?.error || 
                      errorMessage;
        
        switch (error.response.status) {
          case 401:
            errorMessage = "Username atau password salah";
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
        console.log('Error request:', error.request);
        errorMessage = "Tidak dapat terhubung ke server. Pastikan server berjalan.";
      } else {
        console.log('Error:', error.message);
        errorMessage = `Error: ${error.message}`;
      }

      setError(errorMessage);
    } finally {
      setLoading(false); // Hentikan loading
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-sm p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src="/images/logo.png" alt="Logo" className="h-30 w-60" />
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
              placeholder="Masukkan username"
              value={formData.username}
              onChange={handleInputChange}
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
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
              placeholder="Masukkan password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full ${loading ? "bg-gray-400" : "bg-[#7AB434] hover:bg-[#6ca02c]"} text-white font-bold py-2 px-4 rounded-md transition duration-200`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <a href="/forgot-password" className="text-sm text-blue-500 hover:underline">
            Lupa password?
          </a>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
