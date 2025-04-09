import React from "react";
import { MdPerson } from "react-icons/md";
import { RiBankLine } from "react-icons/ri";
import { PiStudentBold } from "react-icons/pi";
import Support from "./Support";
import Navbar from "./Navbar";

const Dashboard_home = () => {
  return (
    <div className="relative ">
      <Navbar />
      <h1 className="px-[127.5px] text-[36px] font-semibold pt-10">
        Welcome to your dashboard, Udemy school
      </h1>
      <h3 className="px-[232px] py-6 font-semibold">
        Uyo/school/@teachable.com
      </h3>
      <div className=" w-[758px] ml-[120px] px-[110px] flex flex-col gap-11">
        <div className="flex gap-5">
          <div className="bg-[#EFF3FA] w-9 h-9 flex justify-center items-center rounded-[8px] ">
            <MdPerson />
          </div>
          <div>
            <h4 className="font-semibold text-[#4F4F4F]">Add other admins </h4>
            <p className="text-[#4F4F4F]">
              Create rich course content and coaching products for your
              students. When you give them a pricing plan, they’ll appear on
              your site!
            </p>
          </div>
        </div>
        <div className="flex gap-5">
          <div className="bg-[#EFF3FA] w-9 h-9 flex justify-center items-center rounded-[8px] ">
            <RiBankLine />
          </div>
          <div>
            <h4 className="font-semibold text-[#4F4F4F]">Add classes </h4>
            <p className="text-[#4F4F4F]">
              Create rich course content and coaching products for your
              students. When you give them a pricing plan, they’ll appear on
              your site!
            </p>
          </div>
        </div>
        <div className="flex gap-5">
          <div className="bg-[#EFF3FA] w-9 h-9 flex justify-center items-center rounded-[8px] ">
            <PiStudentBold />
          </div>
          <div>
            <h4 className="font-semibold text-[#4F4F4F]">Add students </h4>
            <p className="text-[#4F4F4F]">
              Create rich course content and coaching products for your
              students. When you give them a pricing plan, they’ll appear on
              your site!
            </p>
          </div>
        </div>
      </div>
      <div className="absolute right-[100px]">
        <Support />
      </div>
    </div>
  );
};

export default Dashboard_home;
