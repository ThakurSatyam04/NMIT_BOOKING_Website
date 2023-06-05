import React from 'react'
import Logo from "../assets/Logo.png"
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='w-full flex items-center justify-center bg-blue-50'>
    <div className='w-11/12 flex justify-between items-center'>
      <div>
        <img className='h-[50px]' src={Logo} alt="Logo" />
      </div>

      <div className='mt-2'>
        <ul className='w-[400px] flex justify-between'>
            <Link to="/">
                <li>Home</li>
            </Link>
            <li>About</li>
            <Link to="/labs">
                <li>Book Now</li>
            </Link>
            <li>Contact Us</li>
        </ul>
      </div>
      <div>
        <button className='bg-blue-700 hover:bg-blue-900 text-white p-1 rounded-md '>
            Logout
        </button>
      </div>
    </div>
    </div>
  )
}

export default Navbar
