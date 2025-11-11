import React, { useState, useEffect } from 'react';
import Header from './Header';
import Sidebar from './customer/Sidebar';
import logo from '../images/logo-blue.png'
import africanImpact from '../images/african_impact.png';
import jasiri from '../images/jasiri.png';
import ventureMeda from '../images/venture_meda.png';
import africaOxford from '../images/africa_oxford_initiative.png';
import healthHub from '../images/health_hub_innovation.png';
import jackie_inies from '../images/colab_jackie_ines.jpg';
import subscriber from '../images/Subscriber-bro 1.png'

import { useSelector, useDispatch } from 'react-redux';
import { TbUfo } from "react-icons/tb";
import { PiMagicWand } from "react-icons/pi";
import { PiConfetti } from "react-icons/pi";
import { SiGoogleplay } from "react-icons/si";
import { FaApple } from "react-icons/fa";
import { FaA } from 'react-icons/fa6';




const LandingPage = () => {
    const [testimonialIndex, setTestimonialIndex] = useState(0);
    const testimonials = [
        {
            name: "Jackie Ines",
            country: "Rwandan",
            header: "Absolutely wonderful!",
            content: "Error voluptate adipisci. Quas a delectus optio ut. Non consequatur voluptatem quia rerum cum similique enim.",
            image: jackie_inies
        }
    ];

    const partners = [
        africanImpact,
        jasiri,
        ventureMeda,
        africaOxford,
        healthHub
    ]


    return (
        <section className='w-full h-full min-h-screen flex flex-col overflow-y-auto bg-[var(--medium-gray)] items-center justify-start'>
            <Header />

            <div className='w-full bg-[var(--medium-gray)] h-auto flex items-center justify-center mt-16 py-12 px-16'>
                <div className='w-full lg:w-11/12 xl:w-9/12 grid md:grid-cols-2 gap-8'>
                    <div className=' border w-full h-full flex flex-col items-center justify-center gap-8 lg:gap-4 p-4'>
        
                        
                        <h3 className='font-medium text-gray-500 text-xl xl:text-2xl 2xl:text-3xl text-left'>Order Diagnostic tests anywhere, anytime and <span className='text-[var(--primary-color)]'>get your results fast</span></h3>

                        <h4 className='font-normal text-sm xl:text-base text-left text-gray-500'>CO-LAB is the health tech platform that brings laboratory-grade testing to where you are.</h4>

                        <div className='bg-[var(--secondary-color)] text-white text-base xl:text-lg rounded-sm cursor-pointer px-3 py-2'>Find a Test near you</div>
                    </div>

                    <div className='w-full h-full flex flex-col items-center justify-center gap-3'>
                        <div className='rounded-xl border w-72 h-96'>

                        </div>


                        <div className='flex w-full items-center justify-center gap-8'>

                        </div>

                    </div>
                </div>
                
            </div>

            <div className='w-full flex items-center justify-center bg-white h-auto px-16 py-12'>
                <div className='w-full lg:w-11/12 xl:w-9/12 flex flex-col items-center justify-center gap-6'>
                    <div className='grid md:grid-cols-2 w-full border gap-6'>
                        <div className='h-auto flex flex-col items-start justify-center gap-2'>
                            <h4 className='text-base xl:text-lg font-medium tracking-widest'>ABOUT US</h4>
                            <h3 className='text-[var(--secondary-color)] font-semibold text-2xl xl:text-4xl'>Why Our Services are the Best</h3>
                        </div>

                        <div className='h-auto'>
                            <p className='text-gray-500 text-sm xl:text-base text-wrap text-left'>CO-LAB is a health tech platform dedicated to democratizing access to diagnostic tests, allowing patients to get tested anywhere, anytime. We fundamentally believe diagnostic testing shuold be a universal right, free from barriers related to income, age, location, or education. By leveraging digital solutions, we directly address the critical problem of test inaccessibility. in under served communities</p>
                        </div>
                    </div>

                    <div className='grid md:grid-cols-3 w-full gap-6'>
                        <div className='relative flex flex-col items-start justify-center gap-6 bg-[var(--light-gray)] p-4 rounded-md'>
                            <h3 className='text-[var(--secondary-color)] font-medium text-base md:text-lg xl:text-xl'>Our Location</h3>
                            <p className='text-gray-500 text-sm xl:text-base text-wrap text-left'>We currently <br />operate in Ethiopia and Rwanda.</p>

                            <p className='text-[var(--secondary-color)] font-medium text-sm xl:text-base cursor-pointer'>Learn more</p>
                        </div>

                         <div className='relative flex flex-col items-start justify-center gap-6 bg-[var(--light-gray)] p-4 rounded-md'>
                            <h3 className='text-[var(--secondary-color)] font-medium text-base md:text-lg xl:text-xl'>Our Mission</h3>
                            <p className='text-gray-500 text-sm xl:text-base text-wrap text-left'>To ensure high-quality healthcare is accessible and readily available in every community.</p>

                            <p className='text-[var(--secondary-color)] font-medium text-sm xl:text-base cursor-pointer'>Learn more</p>
                        </div>

                         <div className='relative flex flex-col items-start justify-center gap-6 bg-[var(--light-gray)] p-4 rounded-md'>
                            <h3 className='text-[var(--secondary-color)] font-medium text-base md:text-lg xl:text-xl'>Our Vision</h3>
                            <p className='text-gray-500 text-sm xl:text-base text-wrap text-left'>To fundamentally redefine global health by pioneering the use of technology and innovation against the world's most urgent challenges.</p>

                            <p className='text-[var(--secondary-color)] font-medium text-sm xl:text-base cursor-pointer'>Learn more</p>
                        </div>
                    </div>


                </div>
            </div>

            <div className='w-full flex flex-col items-center justify-center bg-[var(--medium-gray)] h-auto px-16 gap-6 py-12'>
                <div className='w-full lg:w-11/12 xl:w-9/12 flex flex-col items-center justify-center gap-6'>
                    <h3 className='text-lg md:text-xl font-semibold tracking-widest'>FEATURES</h3>
                    <p className='text-gray-800 text-sm md:text-lg'>Few good reasons why you should use CO-LAB and make your life easier</p>

                    <div className='grid md:grid-cols-3 w-full gap-6'>
                        <div className='bg-white rounded-xl shadow-md px-8 py-4 flex flex-col items-center justify-start'>
                            <div className='flex items-center justify-center h-12 w-12 rounded-lg mb-3 bg-green-200'>
                                <TbUfo className='h-8 w-8 text-green-600' />
                            </div>

                            <h3 className='font-semibold text-lg lg:text-xl xl:text-2xl text-center'>The Gold Standard, Right to Where You Are.</h3>

                            <p className='font-base text-gray-500 text-wrap text-center text-sm xl:text-base'>
                                There are no compromises on quality. We connect you with verified, professional collectors and your preferred, accredited lab facilities. You get the highest standards of diagnostic accuracy.
                            </p>

                        </div>

                        <div className='bg-white rounded-xl shadow-md px-8 py-4 flex flex-col items-center justify-start'>
                            <div className='flex items-center justify-center h-12 w-12 rounded-lg mb-3 bg-yellow-100'>
                                <PiConfetti className='h-8 w-8 text-yellow-600' />
                            </div>

                            <h3 className='font-semibold text-lg lg:text-xl xl:text-2xl text-center'>Instant Access Saves Time and Worry.</h3>

                            <p className='font-base text-gray-500 text-wrap text-center text-sm xl:text-base'>
                                Stop wasting hours on transportation, waiting rooms, and confusing schedules. Our 24/7 digital ordering and mobile collection services mean your diagnosis starts immediately—speeding up treatment and giving you faster peace of mind.                            </p>

                        </div>

                        <div className='bg-white rounded-xl shadow-md px-8 py-4 flex flex-col items-center justify-start'>
                            <div className='flex items-center justify-center h-12 w-12 rounded-lg mb-3 bg-red-200'>
                                <PiMagicWand className='h-8 w-8 text-red-600' />
                            </div>

                            <h3 className='font-semibold text-lg lg:text-xl xl:text-2xl text-center'>Instant Access Saves Time and Worry.</h3>

                            <p className='font-base text-gray-500 text-wrap text-center text-sm xl:text-base'>
                                Stop wasting hours on transportation, waiting rooms, and confusing schedules. Our 24/7 digital ordering and mobile collection services mean your diagnosis starts immediately—speeding up treatment and giving you faster peace of mind.                            </p>

                        </div>
                    </div>
                </div>
                
            </div>

            <div className='w-full flex flex-col items-center justify-center bg-white h-auto px-16 py-12'>
                <div className='w-full lg:w-11/12 xl:w-9/12 flex flex-col items-center justify-center'>
                    <h3 className='text-lg md:text-xl font-semibold tracking-widest'>TESTIMONIALS</h3>
                    <p className='text-sm xl:text-base text-center mb-16 md:mb-0'>Hear what our customers say about us</p>

                    <div className='w-full h-auto grid md:grid-cols-2 gap-12 mt-12 place-items-center'>
                        <div className='flex flex-col gap-2 items-center justify-center h-24'>
                            <img className='h-max-full object-contain rounded-md' src={testimonials[testimonialIndex].image} />

                            <p className='text-[var(--secondary-color)] font-medium text-lg md:text-xl xl:text-2xl'>{testimonials
                                [testimonialIndex].name}</p>
                        </div>

                        <div className='flex flex-col gap-4 items-center justify-center p-4'>
                            <div className='w-full flex flex-col items-center justify-center'>
                                <h3 className='text-[var(--secondary-color)] font-semibold text-7xl self-start'>"</h3>
                                <br />
                                <h3 className='text-[var(--secondary-color)] font-semibold text-4xl md:text-5xl'>{testimonials[testimonialIndex].header}</h3>
                                <br />
                                <h3 className='text-[var(--secondary-color)] font-semibold text-7xl self-end'>"</h3>
                            </div>
                            
                            <h4 className='text-gray-500 font-medium text-base md:text-lg xl:text-xl text-left'>{testimonials[testimonialIndex].content}</h4>
                        </div>
                    </div>


                </div>
            </div>

            <div className='w-full flex flex-col items-center justify-center bg-[var(--medium-gray)] h-auto px-16 py-12'>
                <div className='w-full lg:w-11/12 xl:w-9/12 flex flex-col items-center justify-center'>
                
                </div>

            </div>

            <div className='w-full flex flex-col items-center justify-center bg-white h-auto px-16 py-12'>
                <div className='w-full lg:w-11/12 xl:w-9/12 flex flex-col items-center justify-center'>
                                <h3 className='text-lg md:text-xl font-semibold tracking-widest'>OUR PARTNERS</h3>
                                <p className=' text-base text-gray-500 lg:text-lg text-center'>See below a list of our trusted partners.</p>

                                <div className='w-full h-auto flex items-center justify-evenly gap-4 mt-16 flex-wrap'>
                                    {partners.map((partner, index) => (
                                        <div key={index} className='h-16 md:h-20 lg:h-24 w-auto flex items-center justify-center'>
                                            <img className='h-full object-contain' src={partner} alt={`Partner ${index + 1}`} />
                                        </div>
                                    ))}
                                </div>
                </div>

            </div>

            <div className='w-full flex flex-col items-center justify-center bg-[var(--medium-gray)] h-auto px-16 py-12'>
                <div className='w-full lg:w-11/12 xl:w-9/12 flex flex-col items-center justify-center'>
                                    <h3 className='text-lg md:text-xl font-semibold tracking-widest'>LATEST NEWS</h3>
                                    <p className=' text-base text-gray-500 lg:text-lg text-center'>Read more about what's been going on!</p>

                                    <div className='w-full h-auto grid md:grid-cols-3 gap-12 mt-12 place-items-center'>
                                        <div className='flex flex-col items-center justify-center p-4'>

                                        </div>
                                    </div>

                </div>

            </div>

            <div className='w-full flex flex-col items-center justify-center bg-white h-auto px-16 pt-12'>
                <div className='w-full lg:w-11/12 xl:w-9/12 grid md:grid-cols-2 gap-8'>
                    <div className='flex flex-col items-start justify-center gap-4'>
                        <h3 className='text-lg md:text-xl font-semibold tracking-widest'>GET THE APP</h3>
                        <h3 className='text-[var(--secondary-color)] font-bold text-xl lg:text-2xl xl:text-4xl'>ACCESS CO-LAB ANYWHERE</h3>

                        <div className='w-auto flex items-center justify-center gap-4 mt-4'>
                            <div className='bg-black hover:bg-opacity-75 shadow-lg rounded-xl px-3 py-1 flex gap-4 items-center justify-center border-2 border-[#ccc] cursor-pointer'>
                                <SiGoogleplay className='h-10 w-10 text-white mr-2' />
                                <h3 className='text-white font-medium text-lg lg:text-xl mt-4'>Google Play</h3>
                            </div>

                            <div className='bg-black hover:bg-opacity-75 shadow-lg rounded-xl px-3 py-1 flex gap-4 items-center justify-center border-2 border-[#ccc] cursor-pointer'>
                                <FaApple className='h-10 w-10 text-white mr-2' />
                                <h3 className='text-white font-medium text-lg lg:text-xl mt-4'>App Store</h3>
                            </div>
                        </div>  
                    </div>

                    <div className='flex items-center justify-center h-96 w-auto'>
                        <img className='h-full object-contain' src={subscriber} alt="Subscribe" />
                    </div>
                                    
                </div>
            </div>

        </section>
    )
}


export default LandingPage;