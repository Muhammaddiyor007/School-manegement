import React from 'react'
import { PiHeadsetFill } from "react-icons/pi";
import { FaChevronUp } from "react-icons/fa";

const Support = () => {
  return (
    <button className='flex bg-[#152259] rounded-[30px] text-white p-5 items-center gap-2'>
        <PiHeadsetFill />
        <p>Support</p>
        <FaChevronUp />
    </button>
  )
}

export default Support