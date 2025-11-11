import React from 'react';
// import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FaFacebookSquare } from "react-icons/fa";
import { FaTwitterSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import logo from '../images/logo-white.png'

const Footer = () => {
  return (
    <footer className="bg-[var(--secondary-color)] text-gray-300">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <img src={logo} alt="CO-LAB Logo" className="h-7 mr-3" />
            </div>
            <p className="text-sm mb-4">
              Copyright © 2020 Nexcent ltd.
            </p>
            <p className='text-sm '>All Rights Reserved</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="mailto:info@acubbed.com" className="hover:text-blue-500 transition-colors">Email: info@acubbed.com</a>
              </li>
              <li>
                <a href="tel:+250795456989" className="hover:text-blue-500 transition-colors">Phone number: +250795456989</a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500 transition-colors">Privacy policy</a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            
            <div className='grid grid-cols-2 gap-4 w-full'>
              <input type='text' placeholder='First Name' className='border-2 border-white px-3 py-1 font-medium text-white text-base lg:text-lg' />
              <input type='text' placeholder='Last Name' className='border-2 border-white px-3 py-1 font-medium text-white text-base lg:text-lg' />
              <input type='text' placeholder='Email' className='border-2 border-white px-3 py-1 font-medium text-white text-base lg:text-lg' />
              <input type='text' placeholder='Phone Number' className='border-2 border-white px-3 py-1 font-medium text-white text-base lg:text-lg' />
            </div>

            <input type='text' placeholder='Message' className='border-2 border-white px-3 py-1 font-medium text-white text-base lg:text-lg mt-4' />

            <button type='submit' className=''>Send</button>
          </div>

          {/* Contact Info */}
          {/* <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <Phone className="h-9 w-5 mr-2 mt-0.5 flex-shrink-0" />
                <span>1-800-HEALTH-NOW<br />Mon-Sat: 8AM - 8PM</span>
              </li>
              <li className="flex items-start">
                <Mail className="h-9 w-5 mr-2 mt-0.5 flex-shrink-0" />
                <a href="mailto:support@healthhub.com" className="hover:text-blue-500 transition-colors">
                  support@acubed.com
                </a>
              </li>
              <li className="flex items-start">
                <MapPin className="h-9 w-5 mr-2 mt-0.5 flex-shrink-0" />
                <span>123 Health Street<br />Medical District, NY 10001</span>
              </li>
            </ul>
          </div> */}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center">
              <ul className="flex flex-wrap justify-center md:justify-end space-x-6 text-sm">
                <li>
                  <Link to={''}><RiInstagramFill className="inline-block h-9 w-9 text-white" /></Link>
                </li>
                <li>
                  <Link to={''}><FaFacebookSquare className="inline-block h-9 w-9 text-white" /></Link>
                </li>
                <li>
                  <Link to={''}><FaTwitterSquare className="inline-block h-9 w-9 text-white" /></Link>
                </li>
                <li>
                  <Link to={''}><FaLinkedin className="inline-block h-9 w-9 text-white" /></Link>
                </li>
              </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;