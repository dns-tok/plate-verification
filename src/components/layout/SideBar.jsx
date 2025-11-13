import { useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export const SideBar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
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
      label: "Novas consultas",
      icon: "/assets/sidebar/consult.svg",
      hasDropdown: false,
      path: "/new-consultation",
    },
    {
      id: "history",
      label: "Histórico de relatórios",
      icon: "/assets/sidebar/history.svg",
      hasDropdown: false,
      path: "/history",
    },
    {
      id: "recommendations",
      label: "Minhas indicações",
      icon: "/assets/sidebar/recommend.svg",
      hasDropdown: false,
      path: "/my-recommendations",
    },
    {
      id: "my-data",
      label: "Meus dados",
      icon: "/assets/sidebar/data.svg",
      hasDropdown: true,
      path: null,
      subItems: [
        {
          id: "profile",
          label: "Perfil",
          icon: "/assets/sidebar/profile.svg",
          path: "/profile",
        },
        {
          id: "purchases",
          label: "Compras feitas",
          icon: "/assets/sidebar/purchase.svg",
          path: "/purchases",
        },
        {
          id: "always-connected",
          label: "Sempre conectado com o plaquinha",
          icon: "/assets/sidebar/connect.svg",
          path: "/always-connected",
        },
        {
          id: "delete-account",
          label: "Deletar conta",
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
      label: "Fale consoco",
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
      {/* Backdrop for mobile */}
      <div
        className={`fixed inset-0 bg-black/80 z-40 lg:hidden transition-opacity duration-300 ${
          isCollapsed ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
        onClick={() => setIsCollapsed(true)}
      />
      <div
        className={`fixed lg:relative top-0 left-0 h-full z-50 bg-[#09529C] flex flex-col transition-all duration-300 ease-in-out lg:w-[260px]  ${
          isCollapsed ? "w-0" : "w-[300px] "
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`w-fit lg:hidden bg-[#09529C] ${
            isCollapsed ? " right-2 " : "absolute -right-6"
          } top-0 p-2 m-2 text-white hover:bg-[#1AABFE] transition-all duration-200 border rounded-full z-50 cursor-pointer`}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <FaChevronRight
            className={`${
              !isCollapsed && "-rotate-180"
            } size-4 lg:size-3 transition-all duration-500`}
          />
        </button>
        {/* Header with Logo and Toggle Button */}
        <div
          className={`${
            isCollapsed ? "p-4" : "p-6"
          } flex items-center justify-between relative`}
        >
          <Link
            to="/buy-consultation"
            className="flex flex-col items-center w-fit"
          >
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
                      // Close sidebar on mobile when navigating
                      if (window.innerWidth < 1024) {
                        setIsCollapsed(true);
                      }
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
                          onClick={() => {
                            // Close sidebar on mobile when navigating
                            if (window.innerWidth < 1024) {
                              setIsCollapsed(true);
                            }
                          }}
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
        <div className={`px-4  pt-1 mb-4 pb-4 overflow-hidden`}>
          {/* Logout Button */}
          <button
            className="flex items-center gap-2 py-1 px-3 text-white cursor-pointer rounded transition-colors w-full group"
            onClick={() => {
              logout();
              navigate("/");
            }}
          >
            <img
              src="/assets/sidebar/logout.svg"
              alt="logout"
              className="w-4 h-4"
            />
            <span className="text-[0.95rem] font-medium border-b-2 border-transparent group-hover:border-[#1AABFE] transition-all duration-300">
              Sair
            </span>
          </button>

          {/* Copyright */}
          <div className="text-center flex justify-between ps-4 mt-1">
            <div className="text-white text-[0.35rem] opacity-70">
              Placa verificada. Todos os direitos reservados.
            </div>
            <div className="text-white text-[0.35rem] opacity-70 ">
              Segurança em primeiro lugar – protegendo o seu sonho.{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
