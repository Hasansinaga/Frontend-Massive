import React, { useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";

import "./css/style.css";
import "./charts/ChartjsConfig";

// Import halaman
import Login from "./pages/Login";
import DashboardAdmin from "./pages/admin/Dashboard";
import Registration from "./pages/seller/Registration";
import Kategori from "./pages/admin/Kategori Pupuk/Categori";
import AddKategori from "./pages/admin/Kategori Pupuk/AddCategori";
import KategoriDetail from "./pages/admin/Kategori Pupuk/DetailCategori";
import ProductPageAdmin from "./pages/admin/Product/Product";
import DetailProdukPageAdmin from "./pages/admin/Product/ProductDetail";
import CustomerPageAdmin from "./pages/admin/Customer/Customer";
import CustomerOrderAdmin from "./pages/admin/Customer/CustomerDetail";
import SellerPage from "./pages/admin/Seller/Seller";
import SellerDetail from "./pages/admin/Seller/SellerDetail";
import ReportAdmin from "./pages/admin/Report/Report";
import ReportDetailAdmin from "./pages/admin/Report/ReportDetail";
import ProfileAdmin from "./pages/admin/profile/Profile";

import DashboardSeller from "./pages/seller/Dashboard";
import ProductPageSeller from "./pages/seller/Product/Product";
import AddProductSeller from "./pages/seller/Product/AddProduct";
import DetailProdukPageSeller from "./pages/seller/Product/ProductDetail";
import CustomerPageSeller from "./pages/seller/Customer/Customer";
import CustomerOrderSeller from "./pages/seller/Customer/CustomerDetail";
import ReportSeller from "./pages/seller/Report/Report";
import OrderSeller from "./pages/seller/Order/Order";
import OrderDetailSeller from "./pages/seller/Order/OrderDetail";
import Profile from "./pages/seller/profile/Profile";
import Stock from "./pages/seller/Product/AddStock";

// Helper function to get the user's role
const getRole = () => {
  const user = JSON.parse(localStorage.getItem("userData"));
  return user?.role || "guest";
};

function App() {
  const location = useLocation();
  const role = getRole();

  useEffect(() => {
    // Scroll to top on page change
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scrollTo({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]);

  return (
    <Routes>

      {/* Login Page */}
      <Route path="/login" element={<Login />} />

      {/* Admin Routes */}
      {role === "admin" && (
        <>
          <Route path="/dashboard-admin" element={<DashboardAdmin />} />
          <Route path="/kategori-admin" element={<Kategori />} />
          <Route path="/tambah-kategori" element={<AddKategori />} />
          <Route path="/kategori/:id" element={<KategoriDetail />} />
          <Route path="/produk-admin" element={<ProductPageAdmin />} />
          <Route path="/produk-admin/detail/:id" element={<DetailProdukPageAdmin />} />
          <Route path="/customer-admin" element={<CustomerPageAdmin />} />
          <Route path="/customer-admin/detail" element={<CustomerOrderAdmin />} />
          <Route path="/seller-admin" element={<SellerPage />} />
          <Route path="/seller-admin/detail/:id" element={<SellerDetail />} />
          <Route path="/laporan-admin" element={<ReportAdmin />} />
          <Route path="/laporan-admin/detail" element={<ReportDetailAdmin />} />
          <Route path="/profile-admin" element={<ProfileAdmin />} />
        </>
      )}

      {/* Seller Routes */}
      {role === "seller" && (
        <>
          <Route path="/dashboard-seller" element={<DashboardSeller />} />
          <Route path="/registrasi" element={<Registration />} />
          <Route path="/produk-seller" element={<ProductPageSeller />} />
          <Route path="/produk-seller/tambah" element={<AddProductSeller />} />
          <Route path="/produk-seller/detail/:id" element={<DetailProdukPageSeller />} />
          <Route path="/customer-seller" element={<CustomerPageSeller />} />
          <Route path="/customer-seller/detail" element={<CustomerOrderSeller />} />
          <Route path="/laporan-seller" element={<ReportSeller />} />
          <Route path="/order-seller" element={<OrderSeller />} />
          <Route path="/order-seller/detail/:id" element={<OrderDetailSeller />} />
          <Route path="/profile-seller" element={<Profile />} />
          <Route path="/seller/tambah-stok/:id" element={<Stock />} />
        </>
      )}

      {/* Fallback Route */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
