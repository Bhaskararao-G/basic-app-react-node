
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaUsers,
  FaBox,
  FaShoppingCart,
  FaChartBar,
  FaSignOutAlt,
  FaTimes,
} from "react-icons/fa";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <FaHome />,
    },
    {
      name: "Members",
      path: "/dashboard/members",
      icon: <FaUsers />,
    },
    {
      name: "Products",
      path: "/dashboard/products",
      icon: <FaBox />,
    },
    {
      name: "Orders",
      path: "/dashboard/orders",
      icon: <FaShoppingCart />,
    },
    {
      name: "Reports",
      path: "/dashboard/reports",
      icon: <FaChartBar />,
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    navigate("/login");
  };

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-64 flex-col
        bg-slate-900 text-white shadow-xl transition-transform duration-300
        lg:translate-x-0
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b border-slate-700 px-5">
          <h2 className="text-xl font-bold text-white">
            Charity Admin
          </h2>

          <button
            onClick={() => setSidebarOpen(false)}
            className="text-xl text-gray-300 hover:text-white lg:hidden"
          >
            <FaTimes />
          </button>
        </div>

        {/* Menu */}
        <nav className="flex-1 space-y-2 overflow-y-auto px-4 py-6">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === "/dashboard"}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-4 rounded-lg px-4 py-3
                text-sm font-medium transition-all duration-200
                ${
                  isActive
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-gray-300 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="border-t border-slate-700 p-4">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-4 rounded-lg
            px-4 py-3 text-sm font-medium text-red-400
            transition-all hover:bg-red-500 hover:text-white"
          >
            <FaSignOutAlt className="text-lg" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
