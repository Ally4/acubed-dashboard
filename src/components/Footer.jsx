import React from 'react';
// import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import { FaFacebookSquare } from "react-icons/fa";
import { FaTwitterSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import logo from '../images/logo-white.png'

const Footer = () => {
  return (
    <footer className="bg-[#012934] text-gray-300">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <img src={logo} alt="CO-LAB Logo" className="h-7 mr-3" />
            </div>
            <p className="text-sm mb-4">
              Making diagnostic testing accessible and convenient. Book your health tests online and visit trusted facilities near you.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-500 transition-colors">
                <FaFacebookSquare className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-blue-500 transition-colors">
                <FaTwitterSquare className="h-5 w-5" />
              </a>
              <a href="https://www.linkedin.com/company/acubbed/" className="hover:text-blue-500 transition-colors">
                <FaLinkedin className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-blue-500 transition-colors">
                <RiInstagramFill className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/dashboard/Tests" className="hover:text-blue-500 transition-colors">Browse Tests</a>
              </li>
              <li>
                <a href="/dashboard/Facilities" className="hover:text-blue-500 transition-colors">Find Facilities</a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500 transition-colors">How It Works</a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500 transition-colors">About Us</a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-blue-500 transition-colors">Blood Tests</a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500 transition-colors">Urine Tests</a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500 transition-colors">Health Checkups</a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          {/* <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <Phone className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                <span>1-800-HEALTH-NOW<br />Mon-Sat: 8AM - 8PM</span>
              </li>
              <li className="flex items-start">
                <Mail className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                <a href="mailto:support@healthhub.com" className="hover:text-blue-500 transition-colors">
                  support@acubed.com
                </a>
              </li>
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                <span>123 Health Street<br />Medical District, NY 10001</span>
              </li>
            </ul>
          </div> */}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="md:flex md:items-center md:justify-between">
            <div className="text-sm text-center md:text-left">
              © 2025 CO-LAB. All rights reserved.
            </div>
            <div className="mt-4 md:mt-0">
              <ul className="flex flex-wrap justify-center md:justify-end space-x-6 text-sm">
                <li>
                  <a href="#" className="hover:text-blue-500 transition-colors">Privacy Policy</a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-500 transition-colors">Terms of Service</a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-500 transition-colors">Cookie Policy</a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-500 transition-colors">Accessibility</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;