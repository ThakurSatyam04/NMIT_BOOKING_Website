import React from 'react'
import Navbar from "../components/Navbar.js";
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

    <section id="about" className=" h-full flex flex-col md:flex-row justify-evenly space-y-10 md:space-y-0 md:space-x-16 items-center mx-5 md:mx-0 md:my-0 bg-blue-50 pb-10">
      <div className="md:w-[300px] max-w-xl rounded-lg">
        <a href="#about" >
          <img  className=' rounded-lg shadow-md mt-10'
          src={about_img}
          alt="Sample image"/>
        </a>
      </div>
      <div className="md:w-1/3">
        <div className="items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300 scroll-smooth">
        <section className="bg-gray-100 py-12">
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center">
      <h4 className="text-2xl font-extrabold text-gray-800 mb-4">
        Welcome to our Equipment Booking Service
      </h4>
      <p className="text-xl text-gray-600">
        We provide a seamless experience for students and faculty members to book equipment for various academic and extracurricular activities.
      </p>
    </div>
    <div className="mt-10">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        Our Mission
      </h3>
      <p className="text-gray-600">
        Our mission is to empower students and faculty members by providing easy access to high-quality equipment for their educational and creative pursuits.
      </p>
    </div>
    <div className="mt-8">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        How It Works
      </h3>
      <p className="text-gray-600">
        Our platform allows users to browse available equipment, check availability, and make reservations online. Simply create an account, search for the equipment you need, select a time slot, and book it with ease.
      </p>
    </div>
  </div>
</section>

        </div>
      </div>
    </section><hr />

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
