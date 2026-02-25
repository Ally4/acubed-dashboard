import { useState } from 'react';
// import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FaFacebookSquare } from "react-icons/fa";
import { FaTwitterSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { useForm } from 'react-hook-form'
import { sendMessageContactForm } from '../services/userService'
import logo from '../images/logo-white.png'
import PrivacyPolicyModal from './PrivacyPolicyModal'
import TermsAndConditions from './TermsAndConditions'

const Footer = () => {

  const [openPrivacyPolicy, setOpenPrivacyPolicy] = useState(false)
  const [openTermsAndConditions, setOpenTermsAndConditions] = useState(false)
  const [messageSentSuccess, setMessageSentSuccess] = useState(null)
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit } = useForm()

  const sendMessage = async (data) => {
    console.log('Sending message')
    setLoading(true)
    try {
      const result = await sendMessageContactForm(data)
      if (result.success) {
        setMessageSentSuccess(true)
      } else {
        setMessageSentSuccess(false)
      }
    } catch (e) {
      console.error('Failed to send contact message ', e)
      setMessageSentSuccess(false)
    } finally {
      setLoading(false)
    }
  }

  return (
    <footer className="font-inter bg-[#1a7879] text-gray-300 w-full h-auto">
      {openPrivacyPolicy && <PrivacyPolicyModal onClose={()=>setOpenPrivacyPolicy(false)} />}
        {openTermsAndConditions && <TermsAndConditions onClose={()=>setOpenTermsAndConditions(false)} />}
      {/* {openTermsAndServices && <PolicyModal onClose={()=>setOpenTermsAndServices(false)} body={termsAndServices} />} */}
      
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
                <a onClick={()=>setOpenPrivacyPolicy(true)} className="font-inter hover:text-blue-500 transition-colors cursor-pointer">Privacy policy</a>
              </li>
              <li>
                <a onClick={()=>setOpenTermsAndConditions(true)} className="font-inter hover:text-blue-500 transition-colors cursor-pointer">Terms & Conditions</a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <form onSubmit={handleSubmit(sendMessage)}>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            
            <div className='font-inter grid grid-cols-2 gap-4 w-full'>
              <input {...register("firstName")} type='text' name='firstName' placeholder='First Name' className='font-inter border bg-[#1a7879] border-white px-3 py-1 text-white text-sm lg:text-base placeholder:text-white focus:outline-none' />
              <input {...register("lastName")} type='text' name='lastName' placeholder='Last Name' className='font-inter border bg-[#1a7879] border-white px-3 py-1 text-white text-sm lg:text-base placeholder:text-white focus:outline-none' />
              <input {...register("email")} type='text' name='email' placeholder='Email' className='font-inter border bg-[#1a7879] border-white px-3 py-1 text-white text-sm lg:text-base placeholder:text-white focus:outline-none' />
              <input {...register("phoneNumber")} type='text' name='phonenumber' placeholder='Phone Number' className='font-inter border bg-[#1a7879] border-white px-3 py-1 text-white text-sm lg:text-base placeholder:text-white focus:outline-none' />
            </div>

            <input {...register("message")} type='text' name='message' placeholder='Message' className='font-inter border border-white px-3 py-2 font-normal text-white text-sm lg:text-base mt-4 placeholder:text-white bg-[#1a7879] focus:outline-none' />

            <button type='submit' className='flex items-center justify-center bg-[#2fc8d8]'>
              {loading ? <img src='/gray_spinner.svg' className='h-6 w-6' /> : 'Send'}
            </button>
            {messageSentSuccess && <p className='text-xs md:text-sm text-white'>Message sent successfully</p>}
            {messageSentSuccess === false && <p className='text-xs md:text-sm text-white'>Message did not send</p>}
          </form>

          
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