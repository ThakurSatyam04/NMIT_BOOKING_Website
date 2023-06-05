import React from 'react'
import Navbar from "../components/Navbar.js";
import bg_img from "../assets/Bg_Img.png"
import about_img from "../assets/About_img.png"

const Home = () => {
  return (
    <>
      <Navbar/>
      
      <div className='relative'>
        <img className='h-[600px] w-screen' src={bg_img} alt="Bg_img" />
        <div className='absolute top-52 left-32 p-2 w-[350px] bg-[#B0D0C4] rounded-md bg-opacity-70'>
          <h1 className='font-bold'>Get Your System Booked</h1>
          <p className='font-serif'>We are providing this platform to book your required system or any equipment you want for your desired time slots.</p>
        </div>
      </div>
    <section className="h-full flex flex-col md:flex-row justify-evenly space-y-10 md:space-y-0 md:space-x-16 items-center mx-5 md:mx-0 md:my-0 bg-blue-50 pb-10">
      <div className="md:w-[300px] max-w-xl rounded-lg">
        <img className=' rounded-lg shadow-md mt-10'
          src={about_img}
          alt="Sample image"/>
      </div>
      <div className="md:w-1/3 max-w-sm">
        <div className="items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
        <h1 className='font-bold'>About Us</h1>
        <p className='font-serif'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis sapiente voluptatem at, molestiae maiores, voluptas rerum eaque quia ab enim assumenda quaerat debitis? Veniam animi, quasi, at cum voluptatum facere iusto vero aliquid omnis voluptate culpa, dignissimos fugiat accusamus placeat. Minima vel qui iusto nihil accusamus rerum magni ipsa esse.</p>
        </div>
      </div>
    </section><hr />

    <div className='w-screen flex justify-center items-center mt-4'>
      <div className='w-11/12 h-[500px] '>
        <h1 className='font-bold text-3xl'>LABS</h1>
        <p >(Equipments)</p>
      </div>
    </div>

    </>
  )
}

export default Home
