import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom"; // Tambahkan useNavigate
import { Icon } from "@iconify/react";
import SidebarLinkGroup from "./SidebarLinkGroup";
import logo from "../images/logo.png";

function Sidebar({ sidebarOpen, setSidebarOpen, variant = "default" }) {
  const location = useLocation();
  const navigate = useNavigate(); // Inisialisasi useNavigate
  const { pathname } = location;

  const trigger = useRef(null);
  const sidebar = useRef(null);

  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  // Authentication check (Add this logic for redirect if not authenticated)
  const isAuthenticated = localStorage.getItem("token");
  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated && !pathname.includes("login")) {
      navigate("/login");
    }
  }, [isAuthenticated, pathname, navigate]);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded);
    if (sidebarExpanded) {
      document.querySelector("body").classList.add("sidebar-expanded");
    } else {
      document.querySelector("body").classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <div className="min-w-fit">
      {/* Sidebar backdrop (mobile only) */}
      <div
        className={`fixed inset-0 bg-gray-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      ></div>

      {/* Sidebar */}
      <div
        id="sidebar"
        ref={sidebar}
        className={`flex lg:!flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-[100dvh] overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-white dark:bg-gray-800 p-4 transition-all duration-200 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-64"
        } ${
          variant === "v2"
            ? "border-r border-gray-200 dark:border-gray-700/60"
            : "rounded-r-2xl shadow-sm"
        }`}
      >
        {/* Sidebar header */}
        <div className="flex justify-between mb-10 pr-3 sm:px-2">
          {/* Close button */}
          <button
            ref={trigger}
            className="lg:hidden text-gray-500 hover:text-gray-400"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
          >
            <span className="sr-only">Close sidebar</span>
            <svg
              className="w-6 h-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
            </svg>
          </button>
          {/* Logo */}
          <img src={logo} alt="Logo" width={280} />
        </div>

        {/* Links */}
        <div className="space-y-8">
          <div>
            <ul className="mt-3">
              {/* Dashboard */}
              <SidebarLinkGroup activecondition={pathname.includes("product")}>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink
                        to="/dashboard-admin"
                        className={`block text-gray-800 dark:text-gray-100 truncate transition duration-150 ${
                          pathname.includes("product")
                            ? ""
                            : "hover:text-gray-900 dark:hover:text-white"
                        }`}
                        onClick={handleClick}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Icon
                              icon="mdi:home-outline"
                              className={`shrink-0 ${
                                pathname === "/product"
                                  ? "text-violet-500"
                                  : "text-gray-400 dark:text-gray-500"
                              }`}
                              width="30"
                              height="30"
                              style={{
                                color:
                                  pathname === "/product" ? "#7AB434" : "green",
                              }}
                            />
                            <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                              Home
                            </span>
                          </div>
                          <div className="flex shrink-0 ml-2">
                            <svg
                              className={`w-3 h-3 shrink-0 ml-1 fill-current text-gray-400 dark:text-gray-500 ${
                                open && "rotate-180"
                              }`}
                              viewBox="0 0 12 12"
                            >
                              <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                            </svg>
                          </div>
                        </div>
                      </NavLink>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* Pengguna */}
              <SidebarLinkGroup activecondition={pathname.includes("product")}>
                {(handleClick, open) => (
                  <React.Fragment>
                    {/* Parent Menu */}
                    <button
                      className={`block w-full text-left text-gray-800 dark:text-gray-100 truncate transition duration-150 ${
                        pathname.includes("product")
                          ? ""
                          : "hover:text-gray-900 dark:hover:text-white"
                      }`}
                      onClick={handleClick}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Icon
                            icon="mdi:sprout-outline"
                            className={`shrink-0 ${
                              pathname.includes("product")
                                ? "text-violet-500"
                                : "text-gray-400 dark:text-gray-500"
                            }`}
                            width="30"
                            height="30"
                            style={{
                              color: pathname.includes("product")
                                ? "#7AB434"
                                : "green",
                            }}
                          />
                          <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                            Pupuk
                          </span>
                        </div>
                        <div className="flex shrink-0 ml-2">
                          <svg
                            className={`w-3 h-3 shrink-0 ml-1 fill-current text-gray-400 dark:text-gray-500 ${
                              open ? "rotate-180" : ""
                            }`}
                            viewBox="0 0 12 12"
                          >
                            <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                          </svg>
                        </div>
                      </div>
                    </button>

                    {/* Dropdown Menu */}
                    <div
                      className={`pl-9 mt-1 ${!open ? "hidden" : ""}`}
                      style={{ transition: "all 0.2s ease-in-out" }}
                    >
                      <NavLink
                        to="/produk-admin"
                        className="block text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white truncate transition duration-150 py-1"
                      >
                        <div className="flex items-center">
                          <Icon
                            icon="mdi:view-list-outline"
                            className="shrink-0"
                            width="24"
                            height="24"
                            style={{
                              color: "#7AB434",
                            }}
                          />
                          <span className="text-sm font-medium ml-3">
                            Daftar Produk
                          </span>
                        </div>
                      </NavLink>
                    </div>
                  </React.Fragment>
                )}
              </SidebarLinkGroup>

              <SidebarLinkGroup activecondition={pathname.includes("product")}>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink
                        to="/kategori-admin"
                        className={`block text-gray-800 dark:text-gray-100 truncate transition duration-150 ${
                          pathname.includes("product")
                            ? ""
                            : "hover:text-gray-900 dark:hover:text-white"
                        }`}
                        onClick={handleClick}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Icon
                              icon="mdi:view-dashboard-outline"
                              className={`shrink-0 ${
                                pathname === "/kategori-admin"
                                  ? "text-violet-500"
                                  : "text-gray-400 dark:text-gray-500"
                              }`}
                              width="30"
                              height="30"
                              style={{
                                color:
                                  pathname === "/kategori-admin"
                                    ? "#7AB434"
                                    : "green",
                              }}
                            />
                            <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                              Kategori Pupuk
                            </span>
                          </div>
                          <div className="flex shrink-0 ml-2">
                            <svg
                              className={`w-3 h-3 shrink-0 ml-1 fill-current text-gray-400 dark:text-gray-500 ${
                                open && "rotate-180"
                              }`}
                              viewBox="0 0 12 12"
                            >
                              <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                            </svg>
                          </div>
                        </div>
                      </NavLink>

                      {/* Dropdown Menu */}
                      <div
                        className={`pl-9 mt-1 ${!open ? "hidden" : ""}`}
                        style={{ transition: "all 0.2s ease-in-out" }}
                      >
                        <NavLink
                          to="/tambah-kategori"
                          className="block text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white truncate transition duration-150 py-1"
                        >
                          <div className="flex items-center">
                            <Icon
                              icon="mdi:plus-circle-outline"
                              className="shrink-0"
                              width="24"
                              height="24"
                              style={{
                                color: "#7AB434",
                              }}
                            />
                            <span className="text-sm font-medium ml-3">
                              Tambah Kategori
                            </span>
                          </div>
                        </NavLink>

                        <NavLink
                          to="/kategori-admin"
                          className="block text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white truncate transition duration-150 py-1"
                        >
                          <div className="flex items-center">
                            <Icon
                              icon="mdi:view-list-outline"
                              className="shrink-0"
                              width="24"
                              height="24"
                              style={{
                                color: "#7AB434",
                              }}
                            />
                            <span className="text-sm font-medium ml-3">
                              Daftar Kategori
                            </span>
                          </div>
                        </NavLink>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>

              <SidebarLinkGroup activecondition={pathname.includes("pengguna")}>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink
                        to="/customer-admin"
                        className={`block text-gray-800 dark:text-gray-100 truncate transition duration-150 ${
                          pathname.includes("product")
                            ? ""
                            : "hover:text-gray-900 dark:hover:text-white"
                        }`}
                        onClick={handleClick}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Icon
                              icon="mdi:user-outline"
                              className={`shrink-0 ${
                                pathname === "/product"
                                  ? "text-violet-500"
                                  : "text-gray-400 dark:text-gray-500"
                              }`}
                              width="30"
                              height="30"
                              style={{
                                color:
                                  pathname === "/product" ? "#7AB434" : "green",
                              }}
                            />
                            <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                              Pengguna
                            </span>
                          </div>
                          <div className="flex shrink-0 ml-2">
                            <svg
                              className={`w-3 h-3 shrink-0 ml-1 fill-current text-gray-400 dark:text-gray-500 ${
                                open && "rotate-180"
                              }`}
                              viewBox="0 0 12 12"
                            >
                              <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                            </svg>
                          </div>
                        </div>
                      </NavLink>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* Seller */}
              <SidebarLinkGroup activecondition={pathname.includes("seller")}>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink
                        to="/seller-admin"
                        className={`block text-gray-800 dark:text-gray-100 truncate transition duration-150 ${
                          pathname.includes("seller")
                            ? ""
                            : "hover:text-gray-900 dark:hover:text-white"
                        }`}
                        onClick={handleClick}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Icon
                              icon="mdi:account-cash-outline"
                              className={`shrink-0 ${
                                pathname === "/product"
                                  ? "text-violet-500"
                                  : "text-gray-400 dark:text-gray-500"
                              }`}
                              width="30"
                              height="30"
                              style={{
                                color:
                                  pathname === "/seller" ? "#7AB434" : "green",
                              }}
                            />
                            <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                              Seller
                            </span>
                          </div>
                          <div className="flex shrink-0 ml-2">
                            <svg
                              className={`w-3 h-3 shrink-0 ml-1 fill-current text-gray-400 dark:text-gray-500 ${
                                open && "rotate-180"
                              }`}
                              viewBox="0 0 12 12"
                            >
                              <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                            </svg>
                          </div>
                        </div>
                      </NavLink>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* Job Board */}
              <SidebarLinkGroup activecondition={pathname.includes("laporan")}>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink
                        to="/laporan-admin"
                        className={`block text-gray-800 dark:text-gray-100 truncate transition duration-150 ${
                          pathname.includes("product")
                            ? ""
                            : "hover:text-gray-900 dark:hover:text-white"
                        }`}
                        onClick={handleClick}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Icon
                              icon="mdi:file-document-outline"
                              className={`shrink-0 ${
                                pathname === "/product"
                                  ? "text-violet-500"
                                  : "text-gray-400 dark:text-gray-500"
                              }`}
                              width="30"
                              height="30"
                              style={{
                                color:
                                  pathname === "/laporan" ? "#7AB434" : "green",
                              }}
                            />
                            <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                              Laporan
                            </span>
                          </div>
                          <div className="flex shrink-0 ml-2">
                            <svg
                              className={`w-3 h-3 shrink-0 ml-1 fill-current text-gray-400 dark:text-gray-500 ${
                                open && "rotate-180"
                              }`}
                              viewBox="0 0 12 12"
                            >
                              <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                            </svg>
                          </div>
                        </div>
                      </NavLink>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
