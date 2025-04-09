import React, { useState, useEffect } from "react";
import { Link, NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import Logo from "../assets/Logo-image.svg";
import { BiHome } from "react-icons/bi";
import { GiHamburgerMenu, GiTeacher } from "react-icons/gi";
import { RiGraduationCapLine, RiBankLine } from "react-icons/ri";
import { IoMdSettings } from "react-icons/io";
import { IoStatsChart } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import Navbar from "../components/Navbar"; 

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => setSidebarOpen(window.innerWidth >= 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isTeachersPage = location.pathname.includes("teachers");
  const isStudentsPage = location.pathname.includes("students");

  const menuItems = [
    { to: "dashboard_home", icon: BiHome, label: "Dashboard" },
    { to: "teachers", icon: GiTeacher, label: "Teachers" },
    { to: "students", icon: RiGraduationCapLine, label: "Students" },
    { to: "billing", icon: RiBankLine, label: "Billing" },
    { to: "settings", icon: IoMdSettings, label: "Settings and Profile" },
    { to: "exams", icon: IoStatsChart, label: "Exams" },
  ];

  return (
    <div className="flex">
      <aside
        className={`overflow-auto px-2 h-screen sticky top-0 left-0 bg-[#152259] py-6 text-white flex flex-col transition-all duration-300 ${
          sidebarOpen ? "w-60" : "w-16 items-center"
        }`}
      >
        <div className="w-full flex flex-col">
          <div className={`flex items-center ${sidebarOpen ? "justify-between px-4" : "flex-col gap-8"}`}>
            <Link to={"/signup"} className="flex items-center">
              <img className="mx-auto" src={Logo} alt="Logo" />
            </Link>
            <GiHamburgerMenu
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="cursor-pointer transition-transform duration-300"
              style={{ transform: sidebarOpen ? "rotate(0deg)" : "rotate(90deg)" }}
            />
          </div>
          {sidebarOpen && <h6 className="text-[14px] font-bold pl-2 py-5 border-b-2 border-b-[#BDBDBD]">Udemy Inter. School</h6>}
        </div>

        <ul className="my-6 flex-1 space-y-3">
          {menuItems.map(({ to, icon: Icon, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-4 p-2 rounded ${
                    isActive ? "bg-[#509CDB] text-white" : "hover:bg-[#509CDB]"
                  }`
                }
              >
                <Icon className="w-5 h-5" />
                {sidebarOpen && <span>{label}</span>}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className={`flex items-center gap-4 pb-20 ${sidebarOpen ? "pl-2" : "items-center"}`}>
          <RiBankLine />
          {sidebarOpen && <p>Features</p>}
          {sidebarOpen && <button className="ml-4 rounded-full bg-[#B9D7F1] text-[10px] text-black px-2">NEW</button>}
        </div>

        <div className="flex items-center h-10">
          <Link to={"/signup"} className="w-full"><button
            onClick={() => alert("Logging out...")}
            className="flex w-full justify-center cursor-pointer items-center gap-3 py-2 px-3 rounded bg-red-500 hover:bg-red-600 transition-all"
          >
            <CiLogout className="w-5 h-5" />
            {sidebarOpen && <span>Log Out</span>}
          </button></Link>
        </div>
      </aside>

      <div className="flex-1 flex flex-col">
        {!isTeachersPage && isTeachersPage && (
          <div className="w-full bg-white shadow-md">
            <Navbar />
          </div>
        )}
        
        <div className="p-6 flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
