import React from 'react'
import Logo from "../assets/Logo.png"
import { Link, useNavigate } from 'react-router-dom'
import Button from '../components/Button_comp'


const Navbar = ({setLoginUser}) => {
  const navigate = useNavigate();

  const handleClick=()=>{
    navigate("/login")
  }
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
              <li>
                <a href="#about">About</a>
              </li>
              <li>
                <a href="#labs">Book Now</a>
              </li>
            
              <li>
                <a href="#footer">Contact Us</a>
              </li>
        </ul>
      </div>
        <div onClick={handleClick}> 
          <Button btn="Logout" setLoginUser={setLoginUser}/>
        </div>
      </div>
    </div>
  )
}

export default Navbar
