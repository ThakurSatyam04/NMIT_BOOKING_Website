import React from 'react'
import { MdFacebook } from 'react-icons/md';
import { AiFillInstagram } from 'react-icons/ai';
import { AiFillTwitterCircle } from 'react-icons/ai';
import { AiOutlineWhatsApp } from 'react-icons/ai';

const Footer = () => {
  return (
    <div>
      <footer id='contact' className="bg-blue-200 text-black py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <p>
              Address: 6429, NITTE Meenakshi College Rd, BSF Campus, Yelahanka, Bengaluru, Karnataka 560064
              <br />
              Phone:  <a href = "tel: 081510 04455">081510 04455</a>
              <br />
              Landline : 080 2216 7929 | 080 2216 7950
              <br />
              Email: <a href = "mailto: enquiry@nitte.edu.in">enquiry@nitte.edu.in</a>
            </p>
          </div>
          <div className='flex flex-col items-center'>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-900 hover:text-white">Home</a>
              </li>
              <li>
                <a href="#about" className="text-gray-900 hover:text-white">About</a>
              </li>
              <li>
                <a href="#contact" className="text-gray-900 hover:text-white">Contact</a>
              </li>
            </ul>
          </div>
          <div className='flex flex-col items-center'>
            <h3 className="text-lg font-bold mb-4">Social Media</h3>
            <ul className="flex space-x-4">
              <li>
                <a href="https://www.facebook.com/NMITBangalore" className="text-gray-900 hover:text-white text-3xl" target='blank'>
                  <i className="fab fa-facebook-f"><MdFacebook/></i>
                </a>
              </li>
              <li>
                <a href="https://twitter.com/NMITBangalore" className="text-gray-900 hover:text-white text-3xl"  target='blank'>
                  <i className="fab fa-twitter"><AiFillTwitterCircle/></i>
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/nmitbangalore/" className="text-gray-900 hover:text-white text-3xl"  target='blank'>
                  <i className="fab fa-instagram"><AiFillInstagram/></i>
                </a>
              </li>
              <li>
                <a href="https://api.whatsapp.com/send?phone=918147354951&text=To%20know%20more%20about%20any%20course%20offered%20by%20Nitte,%20please%20furnish%20the%20following%20details:%0aName:%0aPhone:%0aEmail%20Id:%0aCourse:%0aCity:%0aState:" className="text-gray-900 hover:text-white text-3xl"  target='blank'>
                  <i className="fab fa-linkedin-in"><AiOutlineWhatsApp/></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <hr className="my-6 border-gray-800" />
        <p className="text-center text-gray-900 text-sm">
          &copy; 2023 Nitte, Bangalore, All rights reserved.
        </p>
      </div>
    </footer>
      </div>
  )
}

export default Footer
