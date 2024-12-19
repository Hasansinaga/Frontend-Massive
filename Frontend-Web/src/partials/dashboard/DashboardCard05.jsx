import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function DashboardCard05() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/pupuk');
        const data = await response.json();

        // Sort by created_at descending and filter unique names
        const sortedProducts = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        const uniqueProducts = Array.from(new Map(sortedProducts.map(item => [item.name, item])).values());

        // Limit to the first 6 products
        setProducts(uniqueProducts.slice(0, 6));
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="col-span-full xl:col-span-6 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">Top Products</h2>
      </header>
      <div className="p-3">
        {/* Product List */}
        <div className="overflow-x-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(product => (
              <div
                key={product.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 cursor-pointer hover:shadow-xl transition-shadow"
                onClick={() => navigate(`/produk-admin/detail/${product.id}`)}
              >
                <img
                  className="w-full h-48 object-cover rounded-t-xl"
                  src={`http://localhost:3000${product.image_path}`}
                  alt={product.name}
                />
                <div className="mt-4">
                  <div className="font-medium text-gray-800 dark:text-gray-100">{product.name}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{product.price}</div>
                  <div className="flex items-center mt-2">
                    {[...Array(5)].map((_, index) => (
                      <svg
                        key={index}
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill={index < product.rating ? 'yellow' : 'gray'}
                        className="bi bi-star-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M3.612 15.443c-.32 0-.63-.128-.854-.354l-3.25-3.25a1.208 1.208 0 0 1 0-1.708l3.25-3.25a1.208 1.208 0 0 1 1.708 0l3.25 3.25a1.208 1.208 0 0 1 0 1.708l-3.25 3.25a1.208 1.208 0 0 1-.854.354z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardCard05;
