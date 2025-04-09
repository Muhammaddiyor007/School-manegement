import React from 'react'
import { FaRegBell } from "react-icons/fa";
import { Link } from 'react-router-dom';
const Logout = () => {
  return (
    <div className='flex items-center gap-[50px]'>
        <FaRegBell />
      <Link to={"/signup"} ><button className="bg-[#509CDB] text-white px-4 py-2 rounded-[8px]">
        Log out
      </button></Link>
        </div>
  )
}

export default Logout