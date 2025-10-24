import { useState } from "react";
import {
  FaUsers,
  FaClock,
  FaHandHolding,
  FaFileAlt,
  FaUser,
  FaShoppingBag,
  FaTrash,
  FaRocket,
  FaPhone,
  FaChevronRight,
  FaSignOutAlt,
} from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export const SideBar = () => {
  const [openDropdowns, setOpenDropdowns] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const toggleDropdown = (item) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [item]: !prev[item],
    }));
  };

  const navigationItems = [
    {
      id: "new-consultation",
      label: "New consultation",
      icon: "/assets/sidebar/consult.svg",
      hasDropdown: false,
      path: "/new-consultation",
    },
    {
      id: "history",
      label: "History",
      icon: "/assets/sidebar/history.svg",
      hasDropdown: false,
      path: "/history",
    },
    {
      id: "recommendations",
      label: "My recommendations",
      icon: "/assets/sidebar/recommend.svg",
      hasDropdown: false,
      path: "/my-recommendations",
    },
    {
      id: "my-data",
      label: "My data",
      icon: "/assets/sidebar/data.svg",
      hasDropdown: true,
      path: null,
      subItems: [
        {
          id: "profile",
          label: "Profile",
          icon: "/assets/sidebar/profile.svg",
          path: "/profile",
        },
        {
          id: "purchases",
          label: "Purchases Made",
          icon: "/assets/sidebar/purchase.svg",
          path: "/purchases",
        },
        {
          id: "always-connected",
          label: "Always Connected",
          icon: "/assets/sidebar/connect.svg",
          path: "/always-connected",
        },
        {
          id: "delete-account",
          label: "Delete Account",
          icon: "/assets/sidebar/delete.svg",
          path: "/delete-account",
        },
      ],
    },
    {
      id: "blogs",
      label: "Blogs",
      icon: "/assets/sidebar/blogs.svg",
      hasDropdown: false,
      path: "/blogs",
    },
    {
      id: "contact",
      label: "Contact",
      icon: "/assets/sidebar/contact.svg",
      hasDropdown: false,
      path: "/contact",
    },
  ];

  const isActive = (path) => {
    return location.pathname.includes(path);
  };

  return (
    <div className="relative">
      <div className="fixed md:relative top-0 left-0 h-full z-50 bg-[#09529C] flex flex-col w-[260px]">
        {/* Header with Logo */}
        <div className="p-6">
          <Link to="/dashboard" className="flex flex-col items-center w-fit">
            <img
              src="/assets/logo.svg"
              alt="logo"
              className="w-[120px] transition-all duration-500 ease-in-out"
            />
          </Link>
        </div>

        {/* Navigation Items */}
        <div className="h-full overflow-y-auto custom-scrollbar">
          <div className="flex-1 space-y-3 px-4">
            {navigationItems.map((item) => (
              <div key={item.id}>
                <div
                  className={`flex items-center gap-3 py-1 px-3 text-white cursor-pointer rounded transition-colors group`}
                  onClick={() => {
                    if (item.hasDropdown) {
                      toggleDropdown(item.id);
                    } else {
                      navigate(item.path);
                    }
                  }}
                >
                  <div className="flex items-center gap-2">
                    <img
                      src={item.icon}
                      alt={item.label}
                      className="w-4 h-4 object-contain"
                    />
                    <span
                      className={`text-[0.95rem] font-medium ${
                        !item.hasDropdown
                          ? "mt-0.5 border-b-2 border-transparent group-hover:border-[#1AABFE] transition-all duration-300"
                          : ""
                      }
                    ${
                      isActive(item.path) ? "!border-b-2 !border-[#1AABFE]" : ""
                    }
                    `}
                    >
                      {item.label}
                    </span>
                  </div>
                  {item.hasDropdown && (
                    <FaChevronRight
                      className={`w-3 h-3  transition-transform ${
                        openDropdowns[item.id]
                          ? "rotate-90"
                          : "group-hover:translate-x-1"
                      }`}
                    />
                  )}
                </div>

                {/* Dropdown items */}
                {item.hasDropdown &&
                  openDropdowns[item.id] &&
                  item.subItems && (
                    <div className="flex-1 space-y-3 ml-6 mt-2">
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.id}
                          to={subItem.path}
                          className={`flex items-center gap-2 py-1 px-3 text-white  cursor-pointer rounded transition-colors group`}
                        >
                          <img
                            src={subItem.icon}
                            alt={subItem.label}
                            className="w-4 h-4 object-contain"
                          />
                          <span
                            className={`mt-0.5 text-[0.95rem] font-medium border-b-2 border-transparent group-hover:border-[#1AABFE] transition-all duration-300 ${
                              isActive(subItem.path)
                                ? "border-b-2 !border-[#1AABFE]"
                                : ""
                            }`}
                          >
                            {subItem.label}
                          </span>
                        </Link>
                      ))}
                    </div>
                  )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 pb-4 pt-1">
          {/* Logout Button */}
          <button
            className="flex items-center gap-2 py-1 px-3 text-white cursor-pointer rounded transition-colors w-full group"
            onClick={() => {
              logout();
              navigate("/login");
            }}
          >
            <img
              src="/assets/sidebar/logout.svg"
              alt="logout"
              className="w-4 h-4"
            />
            <span className="text-[0.95rem] font-medium border-b-2 border-transparent group-hover:border-[#1AABFE] transition-all duration-300">
              Log out
            </span>
          </button>

          {/* Copyright */}
          <div className="text-center flex justify-between ps-4 mt-1">
            <div className="text-white text-[0.35rem] opacity-70">
              Verified Plate. All rights reserved.
            </div>
            <div className="text-white text-[0.35rem] opacity-70 ">
              Security first - protecting your dream
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
