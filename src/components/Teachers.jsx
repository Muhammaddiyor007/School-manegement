import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import Logout from "./Logout";
import notfound from "../assets/kuala.svg";
import AddTeachers from "./AddTeachers";
import { useNavigate } from "react-router-dom";
import axios from "axios";  
const Teachers = () => {
  const [showForm, setShowForm] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 
  const navigate = useNavigate();

  const handleSaveTeacher = (newTeacher) => {
    setTeachers(prev => [...prev, newTeacher]);
  };

  const handleRowClick = (teacherId) => {
    navigate(`/dashboard/teacher/${teacherId}`);
  };

  useEffect(() => {

    axios
      .get("https://api.ashyo.fullstackdev.uz/users")
      .then((response) => {
        const apiTeachers = response.data.map((user) => ({
          id: user.id,
          fullName: `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim(),
          subject: user.subject || "Mathematics",
          class: user.class || "10-A",
          email: user.email || "unknown@example.com",
          gender: user.gender || "Unknown",
          avatar: user.avatar || `https://i.pravatar.cc/150?u=${user.id}`,
        }));
        setTeachers(apiTeachers);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message); 
        setLoading(false);
      });
  }, []);

  const filtered = teachers.filter(
    (t) =>
      t.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative px-[100px] pr-[99px]">
      <div className="flex justify-end pb-5">
        <Logout />
      </div>

      <div className="flex justify-between items-center pb-5">
        <h4
          className="text-[#4F4F4F] text-[20px] font-semibold"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Add Teachers" : "Teachers"}
        </h4>
        <button
          className="bg-[#152259] rounded-[4px] text-white p-[14px]"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Cancel" : "Add Teachers"}
        </button>
      </div>

      {!showForm ? (
        <>
          <div className="relative w-full mb-4">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              className="w-full py-4 pl-12 pr-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="search"
              placeholder="Search for a teacher by name or email"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className="flex flex-col justify-center items-center pt-4">
              <h1 className="text-[#4F4F4F] text-[28px] font-bold">Error: {error}</h1>
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col justify-center items-center pt-4">
              <img src={notfound} alt="No Teachers" />
              <h1 className="text-[#4F4F4F] text-[28px] font-bold">
                No Teachers Found
              </h1>
              <p className="text-[#4F4F4F]">
                Try searching with a different name or email.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto bg-white shadow-md rounded-lg mb-5">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100 border-b">
                    <th className="p-3 text-left">Profile</th>
                    <th className="p-3 text-left">Name</th>
                    <th className="p-3 text-left">Subject</th>
                    <th className="p-3 text-left">Class</th>
                    <th className="p-3 text-left">Email Address</th>
                    <th className="p-3 text-left">Gender</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((teacher, i) => (
                    <tr
                      key={teacher.id || i}
                      onClick={() => handleRowClick(teacher.id)}
                      className={`${i % 2 === 0 ? "bg-[#EBF6FF]" : "bg-white"} border-b cursor-pointer`}
                    >
                      <td className="p-3">
                        <img
                          src={teacher.avatar}
                          alt={teacher.fullName}
                          className="w-12 h-12 rounded-full"
                        />
                      </td>
                      <td className="p-3">{teacher.fullName}</td>
                      <td className="p-3">{teacher.subject}</td>
                      <td className="p-3">{teacher.class}</td>
                      <td className="p-3 text-gray-500">{teacher.email}</td>
                      <td className="p-3">{teacher.gender}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      ) : (
        <AddTeachers
          onSave={handleSaveTeacher}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
};

export default Teachers;
