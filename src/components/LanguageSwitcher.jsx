import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";

const LanguageSwitcher = () => {
  const { language, changeLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className="fixed top-4 right-[70px]">
      <div className="relative">
        {/* Dropdown button */}
        <button
          onClick={toggleDropdown}
          className="px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          {language.toUpperCase()} ▼
        </button>

        {/* Dropdown menu */}
        {isOpen && (
          <div className="absolute right-0 mt-2 w-32  border rounded-md shadow-lg overflow-hidden">
            {["uz", "ru", "en"].map((lang) => (
              <button
                key={lang}
                onClick={() => {
                  changeLanguage(lang);
                  setIsOpen(false); // Close dropdown
                }}
                className={`block w-full px-4 py-2 text-left ${
                  language === lang ? "bg-blue-100" : "hover:bg-gray-100"
                }`}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LanguageSwitcher;
