import { useState } from 'react';
// import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FaFacebookSquare } from "react-icons/fa";
import { FaTwitterSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import logo from '../images/logo-white.png'
import PrivacyPolicyModal from './PrivacyPolicyModal'

const Footer = () => {
  const [openPrivacyPolicy, setOpenPrivacyPolicy] = useState(false)
  return (
    <footer className="font-inter bg-[#1a7879] text-gray-300 w-full h-auto">
      {openPrivacyPolicy && <PrivacyPolicyModal onClose={()=>setOpenPrivacyPolicy(false)} />}
      
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <img src={logo} alt="CO-LAB Logo" className="h-7 mr-3" />
            </div>
            <p className="font-inter text-sm mb-4">
              Copyright © 2026 Acubed ltd.
            </p>
            <p className='font-inter text-sm '>All Rights Reserved</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-inter text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="mailto:info@acubbed.com" className="font-inter hover:text-blue-500 transition-colors">Email: info@co-labhealth.com</a>
              </li>
              <li>
                <a href="tel:+250795456989" className="font-inter hover:text-blue-500 transition-colors">Phone number: +250795456989</a>
              </li>
              <li>
                <a onClick={()=>setOpenPrivacyPolicy(true)} href="#" className="font-inter hover:text-blue-500 transition-colors">Privacy policy</a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            
            <div className='font-inter grid grid-cols-2 gap-4 w-full'>
              <input type='text' placeholder='First Name' className='font-inter border bg-[#1a7879] border-white px-3 py-1 text-white text-base lg:text-lg placeholder:text-white focus:outline-none' />
              <input type='text' placeholder='Last Name' className='font-inter border bg-[#1a7879] border-white px-3 py-1 text-white text-base lg:text-lg placeholder:text-white focus:outline-none' />
              <input type='text' placeholder='Email' className='font-inter border bg-[#1a7879] border-white px-3 py-1 text-white text-base lg:text-lg placeholder:text-white focus:outline-none' />
              <input type='text' placeholder='Phone Number' className='font-inter border bg-[#1a7879] border-white px-3 py-1 text-white text-base lg:text-lg placeholder:text-white focus:outline-none' />
            </div>

            <input type='text' placeholder='Message' className='font-inter border border-white px-3 py-2 font-normal text-white text-base lg:text-lg mt-4 placeholder:text-white bg-[#1a7879] focus:outline-none' />

            <button type='submit' className='font-inter bg-[#2fc8d8]'>Send</button>
          </div>

          
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="font-inter w-full">
        <div className="font-inter w-full py-8 flex items-center justify-center gap-4">
          <div className="font-inter w-full border-t-2 border-white"></div>
          <div className="font-inter flex items-center justify-center w-auto">
              <ul className="font-inter flex justify-center items-center space-x-6 text-sm">
                <li className="font-inter p-2 rounded-full bg-[#208789] flex items-center justify-center">
                  <Link to={'https://www.instagram.com/acubedlab'}><RiInstagramFill className="font-inter inline-block h-9 w-9 text-white" /></Link>
                </li>
                <li className="font-inter p-2 rounded-full bg-[#208789] flex items-center justify-center">
                  <Link to={'https://www.facebook.com/acubbed/'}><FaFacebookSquare className="font-inter inline-block h-9 w-9 text-white" /></Link>
                </li>
                <li className="font-inter p-2 rounded-full bg-[#208789] flex items-center justify-center">
                  <Link to={'https://x.com/acubedlab'}><FaTwitterSquare className="font-inter inline-block h-9 w-9 text-white" /></Link>
                </li>
                <li className="font-inter p-2 rounded-full bg-[#208789] flex items-center justify-center">
                  <Link to={'https://www.linkedin.com/company/acubbed/'}><FaLinkedin className="font-inter inline-block h-9 w-9 text-white" /></Link>
                </li>
              </ul>
          </div>
          <div className="font-inter w-full border-t-2 border-white"></div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;