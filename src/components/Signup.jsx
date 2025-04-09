import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useLanguage } from "../context/LanguageContext";
import translations from "../constants/translations";
import { useTheme } from "../context/ThemeContext";

const Signup = () => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "https://api.ashyo.fullstackdev.uz/auth/register",
        {
          fullname,
          email,
          password,
        }
      );
      toast.success("Ro'yxatdan muvaffaqiyatli o'tdingiz!", {
        position: "top-right",
        autoClose: 3000,
      });
      console.log(data);
      setTimeout(() => navigate("/dashboard/dashboard_home"), 3000);
    } catch (error) {
      toast.error("Xatolik yuz berdi! Iltimos, qaytadan urinib ko'ring.", {
        position: "top-right",
        autoClose: 3000,
      });
      console.error(error);
    }
  };

  return (
    <div className="text-center">
      <h1
        className={`text-center font-medium pt-[98px] text-[45px] ${
          theme === "light" ? "text-[#4F4F4F]" : "text-white "
        }`}
      >
        {translations[language].singUptitle}
      </h1>
      <div className="mx-auto w-[512px] h-[494px]  px-[142px] flex flex-col gap-[34px]">
        <p className="text-center text-[#667085] pt-[72px] font-inter">
          {translations[language].singUpDescription}
        </p>
        <form className="flex flex-col gap-[14px]" onSubmit={register}>
          <input
            required
            className="p-2 w-full border border-[#A7A7A7] bg-transparent"
            placeholder={translations[language].enterEmail}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            required
            className="p-2 w-full border border-[#A7A7A7] bg-transparent"
            placeholder={translations[language].createLogin}
            type="text"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
          />
          <div className="relative w-full">
            <input
              required
              className="p-2 w-full border border-[#A7A7A7] pr-10 bg-transparent"
              placeholder={translations[language].createPassword}
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-3 flex items-center text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <button
            type="submit"
            className="bg-[#2D88D4] w-full py-3 rounded text-white border border-[#2D88D4] transition-all duration-300 hover:bg-white hover:text-[#2D88D4]"
          >
            {translations[language].singUp}
          </button>
        </form>
        <Link className="w-full" to={"/login"}>
          <button className="w-full py-3 rounded text-[#2D88D4] border border-[#2D88D4] hover:bg-[#2D88D4] hover:text-white transition-all duration-300">
            {translations[language].logIn}
          </button>
        </Link>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;
