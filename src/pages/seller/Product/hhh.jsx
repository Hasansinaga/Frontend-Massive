import React from "react";
import { NavLink } from 'react-router-dom';
import Sidebar from "../../../partials/SidebarSeller";
import Header from "../../../partials/Header";
import ProductFormCard from "../../../partials/product/FormAdd";
import Description from "../../../partials/product/FormDescription";
import Image from "../../../partials/product/ImageUpload";

const AddProductPage = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        {/* Header */}
        <Header />

        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* Page title */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
              <div className="mb-4 sm:mb-0">
                <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">
                  Tambah Produk
                </h1>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="col-span-1">
                <ProductFormCard />
              </div>
              <div className="col-span-1">
                <Description />
              </div>
              <div className="col-span-1">
                <Image />
              </div>
            </div>

            {/* Save and Publish Button */}
            <div className="flex justify-end">
              <NavLink
                to="/produk"
                className="bg-[#7AB434] text-white py-2 px-6 rounded-md font-semibold hover:bg-[#6A9A2D]"
              >
                Save and Publish
              </NavLink>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AddProductPage;
