import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { FiEye, FiHeart, FiChevronLeft, FiChevronRight } from "react-icons/fi";

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3000/api/pupuk", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("API Response:", response.data); // Debugging log
        setProducts(response.data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Gagal memuat produk. Silakan coba lagi.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = products.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (products.length === 0) return <p>Belum ada produk.</p>;

  return (
    <div className="container">
      <div className="search-bar">
        <h2>Daftar Produk</h2>
        <input type="text" className="search-input" placeholder="Cari Produk" />
      </div>

      <div className="product-grid">
        {currentProducts.map((product) => (
          <NavLink
            to={`/produk-admin/detail/${product.id}`}
            key={product.id}
            className="product-card"
          >
            <img
              src={`http://localhost:3000${product.image_path}`}
              alt={product.name || "Product Image"}
              className="product-image"
            />
            <div className="p-4">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-price">
                Rp{product.price?.toLocaleString("id-ID") || "0"}
              </p>
              <p className="product-stock">Stok: {product.stock || 0}</p>
              <div className="product-stats">
                <div className="stat">
                  <FiEye /> {product.views || 0}
                </div>
                <div className="stat">
                  <FiHeart /> {product.likes || 0}
                </div>
                <div className="stat">{product.sales || 0} Penjualan</div>
              </div>
            </div>
          </NavLink>
        ))}
      </div>

      <div className="pagination">
        <button
          onClick={goToPrevPage}
          disabled={currentPage === 1}
          className="pagination-btn"
        >
          <FiChevronLeft />
        </button>
        <span>
          Halaman {currentPage} dari {totalPages}
        </span>
        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className="pagination-btn"
        >
          <FiChevronRight />
        </button>
      </div>

      <style jsx>{`
        .container {
          padding: 2rem;
          background-color: #f9fafb;
          min-height: 100vh;
        }

        .search-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .search-input {
          padding: 0.5rem 1rem;
          font-size: 1rem;
          border-radius: 0.375rem;
          border: 1px solid #d1d5db;
          width: 300px;
        }

        .product-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 1rem;
        }

        .product-card {
          background-color: white;
          border-radius: 0.375rem;
          padding: 1rem;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          text-decoration: none;
          color: inherit;
        }

        .product-image {
          width: 100%;
          height: 200px;
          object-fit: cover;
          border-radius: 0.375rem;
        }

        .pagination {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 2rem;
        }

        .pagination-btn {
          padding: 0.5rem 1rem;
          background-color: #4caf50;
          border: none;
          color: white;
          font-size: 1rem;
          border-radius: 0.375rem;
        }

        .pagination-btn:disabled {
          background-color: #d1d5db;
        }

        .product-stats {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 0.5rem;
        }

        .stat {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.875rem;
          color: #6b7280;
        }

        .stat svg {
          width: 1rem;
          height: 1rem;
        }

        .product-card {
          background-color: white;
          border-radius: 0.375rem;
          padding: 1rem;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          text-decoration: none;
          color: inherit;
          transition: transform 0.2s;
        }

        .product-card:hover {
          transform: scale(1.02);
        }

        .product-image {
          width: 100%;
          height: 200px;
          object-fit: cover;
          border-radius: 0.375rem;
          margin-bottom: 0.5rem;
        }
      `}</style>
    </div>
  );
};

export default ProductTable;
