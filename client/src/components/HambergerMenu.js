import React, { useState } from 'react';

const HambergerMenu = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
      };
  return (
    <div className="flex items-center">
    <button
      className="text-gray-600 focus:outline-none focus:text-gray-900 md:hidden"
      onClick={toggleMenu}
    >
      <div className={`w-6 h-0.5 bg-gray-600 ${isOpen ? 'transform rotate-45 translate-y-1.5' : ''}`}></div>
      <div className={`w-6 h-0.5 bg-gray-600 mt-1.5 ${isOpen ? 'opacity-0' : ''}`}></div>
      <div className={`w-6 h-0.5 bg-gray-600 mt-1.5 ${isOpen ? 'transform -rotate-45 -translate-y-1.5' : ''}`}></div>
    </button>
  
    <nav className={`${isOpen ? 'block' : 'hidden'} absolute z-10 top-10 left-center md:relative md:top-auto md:left-auto lg:block bg-slate-100`}>
      {/* Your menu items go here */}
      <ul className="w-full md:w-auto flex flex-col md:flex-row justify-between md:gap-12">
        <li className="text-gray-600 hover:text-gray-900 hover:scale-110 flex-shrink-0">
          <a href="/#">Home</a>
        </li>
        <li className="text-gray-600 hover:text-gray-900 hover:scale-110 flex-shrink-0">
          <a href="/#about">About</a>
        </li>
        <li className="text-gray-600 hover:text-gray-900 hover:scale-110 flex-shrink-0">
          <a href="/#labs">Book Now</a>
        </li>
        <li className="text-gray-600 hover:text-gray-900 hover:scale-110 flex-shrink-0">
          <a href="#contact">Contact</a>
        </li>
      </ul>
    </nav>
  </div>
  
  )
}

export default HambergerMenu;
