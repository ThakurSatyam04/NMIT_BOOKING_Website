import React from 'react'
import bg_img from "../assets/Bg_Img.png"
import about_img from "../assets/About_img.png"
import FeaturedPage from './FeaturedPage.js';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer.js';
import TypeWriterEffect from '../components/TypeWriterEffect.js';

const Home = ({loggedIn}) => {
  // console.log(user)
  const lines = [
    '    Welcome!',
    '    Get Your System Booked',
    '    NMIT Booking Website',
  ];
  const typingSpeed = 100; // Time between each character typing
  const repeatDelay = 2000; // Delay before repeating the typewriter effect (in milliseconds)
  return (
    <div>
      {/* <Navbar setLoginUser={setLoginUser}/> */}
      <div className="relative overflow-hidden">
  <img className="h-auto w-full" src={bg_img} alt="Bg_img" />
  <div className="hidden md:block absolute top-32 left-4 md:left-32 p-2 w-full md:w-[350px] h-auto bg-gray-300 bg-opacity-70 rounded-md">
    <TypeWriterEffect lines={lines} typingSpeed={typingSpeed} repeatDelay={repeatDelay} />
    <p className="font-style text-base md:text-lg mt-4">
      We are providing this platform to book your required system or any equipment you want for your desired time slots.
    </p>
  </div>
</div>

<section id="about" className="w-full h-full flex flex-col md:flex-row justify-center items-center md:mx-0 md:my-0 bg-blue-50 pb-10">
  <div className='flex items-center justify-center flex-col'>
    <div className="w-full md:w-8/12 flex flex-col md:flex-row p-6 rounded-lg mt-10 gap-10 items-center">
      <div className='w-1/2'>
        <a href="#about">
          <img className='rounded-lg shadow-md h-1/2' src={about_img} alt="Sample image"/>
        </a>
      </div>
      <div className="w-full md:w-11/12">
        <h4 className="text-center md:text-left text-2xl font-extrabold text-gray-800 mb-4">
          Welcome to our Equipment Booking Service
        </h4>
        <span className="text-gray-600">
          We provide a seamless experience for students and faculty members to book equipment for various academic and extracurricular activities.
          <ul>
            <li>
              Unlock the potential of your academic journey with our state-of-the-art equipment booking service!
            </li>
            <li>
              Empowering students and faculty alike, our user-friendly platform ensures hassle-free equipment reservations.
            </li>
            <li>
              Focus on your passions, and leave the equipment logistics to us, as we streamline the booking process for your convenience.
            </li>
          </ul>
        </span>
      </div>
    </div>

    <div className="w-full md:w-8/12">
      <div className="w-full items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300 scroll-smooth"> 
        <div className="w-full flex flex-col md:flex-row max-w-6xl mx-auto mt-10 mb-6 justify-between gap-10 ">
          <div className="w-full md:w-11/12 bg-[#fff] p-6 rounded-md shadow-xl border-white cursor-pointer hover:scale-110 transition smooth duration-500">
            <h3 className="text-xl font-semibold text-gray-800 mb-2 underline">
              Our Mission
            </h3>
            <p className="text-gray-600">
              Our mission is to empower students and faculty members by providing easy access to high-quality equipment for their educational and creative pursuits.
            </p>
          </div>
          <div className="w-full md:w-11/12 bg-[#fff] p-6 rounded-md shadow-xl border-white cursor-pointer hover:scale-110 transition smooth duration-500">
            <h3 className="text-xl font-semibold text-gray-800 mb-2 underline">
              How It Works
            </h3>
            <p className="text-gray-600">
              Our platform allows users to browse available equipment, check availability, and make reservations online. Simply create an account, search for the equipment you need, select a time slot, and book it with ease.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
<hr />

    <div className="ml-4 sm:ml-24 mt-6">
  <a href="#labs">
    <h1 id="labs" className="font-bold text-2xl sm:text-3xl">LABS</h1>
  </a>
  <p className="text-xl">(Equipments)</p>
</div>
      <div className='w-full flex items-center justify-center'>
        <div className="w-11/12 flex justify-center items-center">
            <FeaturedPage loggedIn={loggedIn} />
        </div> 
      </div>

      <div className='w-11/12 flex justify-end items-center'>
        <Link to="/labs">
          <button className='bg-[#DDEFF9] mr-10 rounded-md p-1 hover:brightness-75'>{`More Labs ->`}</button>
        </Link> 
      </div>


      <div id="footer" className='mt-4'>
        <Footer/>
      </div>

    </div>
  )
}

export default Home
