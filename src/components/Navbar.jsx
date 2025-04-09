import React from 'react'
import ThemeSwitcher from './ThemeSwitcher'
import LanguageSwitcher from './LanguageSwitcher'
import Logout from './Logout'

const Navbar = () => {
  return (
    <div className="fixed bg-[#FCFAFA] shadow p-4 px-[150px] pr-[120px] flex justify-between items-center">
        <div>
      <p className="text-[#424242]">Learn  how to launch faster</p>
      <p className="text-[#424242]">watch our webinar for tips from our experts and get a limited time offer.</p>
        </div>
        <div>
          <LanguageSwitcher/>
          <ThemeSwitcher/>
          <Logout/>
        </div>
        
    </div>
  )
}

export default Navbar