import React, { useState,useRef,useEffect } from 'react'
import Logo from "../assets/Logo.png"
import { Link, useNavigate } from 'react-router-dom'
import Button from '../components/Button_comp'
import profile from "../assets/profile-icon-login-img.jpg"
import classNames from 'classnames';

const Navbar = ({user}) => {
  const navigate = useNavigate();
  const [visibleProfile, setVisibleProfile] = useState(false);
  const divRef = useRef(null);
  // console.log(user)

  const handleClick=()=>{
    navigate("/login")
    setVisibleProfile(false);
  }

  const handleScreenClick  = (event)=>{
    if(divRef.current && !divRef.current.contains(event.target)){
      setVisibleProfile(false);
    }
  };
  
  const handleProfile = ()=>{
    setVisibleProfile(!visibleProfile)
  }

  useEffect(()=>{
    document.addEventListener('click',handleScreenClick );
    return ()=>{
      document.removeEventListener('click',handleScreenClick );
    };
  },[]);

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
                <a href="/#about">About</a>
              </li>
              <li>
                <a href="/#labs">Book Now</a>
              </li>
            
              <li>
                <a href="/#footer">Contact Us</a>
              </li>
        </ul>
      </div>
      <div ref={divRef} className=''>
        <img className='h-[30px]' src={profile} alt="" onClick={handleProfile} />
          <div className={classNames("absolute right-6 top-12 h-[300px] w-[300px] bg-gray-200 flex flex-col transition-opacity duration-500 ease-in-out opacity-100 z-10 rounded-xl p-4",{"hidden": !visibleProfile,
            "opacity-100": visibleProfile,})}>
            <p>{user.name}</p>
            <p>{user.email}</p>

            <div onClick={handleClick} className='w-full flex items-center justify-center'> 
              <Button btn="Logout" />
            </div>
          </div>
      </div>
      </div>
    </div>
  )
}

export default Navbar
