import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import user from "../assets/user.svg";
import { FiPhoneCall } from "react-icons/fi";


const TeacherDetail = () => {
  const { id } = useParams();
  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`https://api.ashyo.fullstackdev.uz/users/${id}`)
      .then((response) => {
        setTeacher(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {teacher && (
        <div className="flex h-screen justify-center items-center gap-[105px]">
          <div className="flex flex-col items-center">
            <img
              src={teacher.image || user}
              alt={teacher.fullname}
              className="w-[280px] h-[280px] rounded-full mb-[50px]"
            />
            <h1 className="font-bold">{teacher.fullname}</h1>
            <p className="font-semibold text-[12px]">{teacher.email}</p>
            <div className="flex gap-[25px] mt-10">
              <div className="bg-[#EFF3FA] rounded-[8px] p-3">
                <FiPhoneCall className="w-[25px] h-[25px] text-[#A7A7A7]" />
              </div>
              <div className="bg-[#EFF3FA] rounded-[8px] p-3">
                <FiPhoneCall className="w-[25px] h-[25px] text-[#A7A7A7]" />
              </div>
              <div className="bg-[#EFF3FA] rounded-[8px] p-3">
                <FiPhoneCall className="w-[25px] h-[25px] text-[#A7A7A7]" />
              </div>
            </div>
          </div>

          <div>
            <div className="flex flex-col gap-[10px] max-w-[335px]">
              <p className="font-semibold">About</p>
              <p className="text-[#A7A7A7]">
                Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis
                ullamco cillum dolor. Voluptate exercitation incididunt aliquip
                deserunt reprehenderit elit laborum. Nulla Lorem mollit
                cupidatat irure. Laborum magna nulla duis ullamco cillum dolor.
                Voluptate exercitation incididunt aliquip deserunt reprehenderit
                elit laborum.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-10 mt-4">
              <div>
                <p className="font-semibold text-[12px]">Role</p>
                <p className="text-[14px] text-[#A7A7A7]"> {teacher.role}</p>
              </div>
              <div>
                <p className="font-semibold text-[12px]">Verified</p>
                <p className="text-[14px] text-[#A7A7A7]">
                  {teacher.is_verified ? "Yes" : "No"}
                </p>
              </div>
              <div>
                <p className="font-semibold text-[12px]">Created At</p>
                <p className="text-[14px] text-[#A7A7A7]">
                  {teacher.createdAt}
                </p>
              </div>
              <div>
                <p className="font-semibold text-[12px]">Updated At</p>
                <p className="text-[14px] text-[#A7A7A7]">
                  {teacher.updatedAt}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherDetail;
