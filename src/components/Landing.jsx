import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import logo from '../images/logo-blue.png'
import africanImpact from '../images/african_impact.png';
import jasiri from '../images/jasiri.png';
import ventureMeda from '../images/venture_meda.png';
import africaOxford from '../images/africa_oxford_initiative.png';
import healthHub from '../images/health_hub_innovation.png';
import jackie_inies from '../images/colab_jackie_ines.jpg';
import subscriber from '../images/Subscriber-bro 1.png'
import landing from '../images/landing_stock.png'
import lab_landing from '../images/Laboratory-bro 1.png'
import googleplay_badge from '../images/googleplay_badge.png'
import appstore_badge from '../images/download_on_appstore.svg'
import muhima_hospital from '../images/muhima_hospital.png'

import { useSelector, useDispatch } from 'react-redux';
import { TbUfo } from "react-icons/tb";
import { PiMagicWand } from "react-icons/pi";
import { PiConfetti } from "react-icons/pi";
import { BsChatRightDots } from "react-icons/bs";



const LandingPage = () => {
    const navigate = useNavigate();
    const [testimonialIndex, setTestimonialIndex] = useState(0);
    const [landingIndex, setLandingIndex] = useState(0);

    const landingPhotos = [
        landing,
        lab_landing
    ]
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

    useEffect(() => {
        setTimeout(() => {
            if (landingIndex == landingPhotos.length - 1) {
                setLandingIndex(0);
            } else {
                setLandingIndex(landingIndex + 1);
            }
        }, 5000);
    },[landingIndex]);



    return (
        <section className='w-full h-full min-h-screen flex flex-col overflow-y-auto bg-[var(--medium-gray)] items-center justify-start'>
            <Header />

            <div>
                <BsChatRightDots className='h-12 md:h-16 w-12 md:w-16 z-40 fixed bottom-8 right-8 cursor-pointer' color='var(--secondary-color)'/>
            </div>

            <div className='w-full lg:w-11/12 xl:w-10/12 bg-[var(--medium-gray)] h-auto flex items-center justify-center mt-16 py-12 px-4 xl:px-16'>
                <div className='w-full grid md:grid-cols-2 gap-24 place-items-center'>
                    <div className='w-full h-full flex flex-col items-start justify-center gap-8 p-4'>
        
                        
                        <h3 className='font-medium text-gray-500 text-4xl 2xl:text-5xl text-left'>Order Diagnostic tests <br /> anywhere, anytime <br /> and <span className='text-[var(--primary-color)]'>get your results <br /> fast</span></h3>

                        <h4 className='font-normal text-lg xl:text-xl text-left text-gray-500'>CO-LAB is the health tech platform that brings laboratory-grade <br /> testing to where you are.</h4>

                        <div onClick={()=>navigate('/dashboard/All')} className='bg-[#136a82] hover:bg-opacity-80 text-white text-lg xl:text-xl rounded-sm cursor-pointer px-4 py-3'>Find a Test near you</div>
                    </div>

                    <div className='w-full h-full flex flex-col items-center justify-center gap-3'>
                        <div className='w-auto h-96 lg:h-[400px] xl:h-[500px] flex items-center justify-center'>
                            <img className='h-full w-auto object-contain rounded-full' src={landingPhotos[landingIndex]} alt="landing" />
                        </div>


                        <div className='flex w-full items-center justify-center gap-4'>
                            {landingPhotos.map((photo, index) => (
                                <div className={`rounded-full border h-3 w-3 ${index == landingIndex ? 'bg-[var(--secondary-color)]' : 'bg-[var(--secondary-light)]'}`}
                                    key={index}>
                                </div>
                           ))}
                        </div>

                    </div>
                </div>
                
            </div>

            <div id='about' className='w-full flex items-center justify-center bg-white h-auto px-4 xl:px-16 py-12'>
                <div className='w-full lg:w-11/12 xl:w-10/12 flex flex-col items-center justify-center gap-6'>
                    <div className='grid md:grid-cols-2 w-full gap-6'>
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

            <div id='features' className='w-full flex flex-col items-center justify-center bg-[var(--medium-gray)] h-auto px-4 xl:px-16 gap-6 py-12'>
                <div className='w-full lg:w-11/12 xl:w-10/12 flex flex-col items-center justify-center gap-6'>
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

            <div id='testimonials' className='w-full flex flex-col items-center justify-center bg-white h-auto px-4 xl:px-16 py-12'>
                <div className='w-full lg:w-11/12 xl:w-10/12 flex flex-col items-center justify-center'>
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

            <div id='how-it-works' className='w-full flex flex-col items-center justify-center bg-[var(--medium-gray)] h-auto px-4 xl:px-16 py-12'>
                <div className='w-full lg:w-11/12 xl:w-10/12 flex flex-col items-center justify-center'>
                        <h3 className='text-lg md:text-xl font-semibold tracking-widest self-start'>HOW IT WORKS</h3>
                        <p className=' text-base text-gray-500 lg:text-lg text-center self-start'>Getting the tests you need should be effortless. Here is the simple process:</p>
                        <button onClick={()=>navigate('/dashboard/All')} className='text-white bg-[var(--secondary-color)] px-6 py-2 rounded-full mt-4 self-start'>Get Started</button>
                
                        <div className='w-full grid md:grid-cols-3 gap-6 place-items-start mt-6'>
                                <div className='flex flex-col items-start justify-center gap-1 h-auto p-2'>
                                    <h3 className='font-bold text-base md:text-lg xl:text-xl'><span className='text-[var(--secondary-color)] text-xl md:text-2xl xl:text-3xl'>1.</span> 💻 Order & Select</h3>

                                    <p className='text-gray-500 text-base xl:text-lg text-left'>
                                        You have control. Easily access our platform 24/7 to browse, select, and order your diagnostic tests from
                                        the facility of your choice. Book online or on-call from your location—wherever and whenever is convenient
                                        for you.
                                    </p>
                                </div>

                                <div className='flex flex-col items-start justify-center gap-1 h-auto p-2'>
                                    <h3 className='font-bold text-base md:text-lg xl:text-xl'><span className='text-[var(--secondary-color)] text-xl md:text-2xl xl:text-3xl'>2.</span> 🚚 Collect & Transport</h3>

                                    <p className='text-gray-500 text-base xl:text-lg text-left'>
                                        We come to you. A qualified, certified professional will collect your sample at your preferred location
                                        (health facility, home, office, etc.) at the scheduled time and ensure its secure and prompt transport to the lab.
                                    </p>
                                </div>

                                <div className='flex flex-col items-start justify-center gap-1 h-auto p-2'>
                                    <h3 className='font-bold text-base md:text-lg xl:text-xl'><span className='text-[var(--secondary-color)] text-xl md:text-2xl xl:text-3xl'>3.</span> 📱 Receive Results</h3>

                                    <p className='text-gray-500 text-base xl:text-lg text-left'>
                                        Results, fast. Receive your lab results quickly and securely through the CO-LAB platforms on your device.
                                        You'll get instant notification the moment they are available.
                                    </p>
                                </div>
                        </div>  
                
                
                </div>

                

            </div>

            <div id='partners' className='w-full flex flex-col items-center justify-center bg-white h-auto px-4 xl:px-16 py-12'>
                <div className='w-full lg:w-11/12 xl:w-10/12 flex flex-col items-center justify-center'>
                                <h3 className='text-lg md:text-xl font-semibold tracking-widest'>OUR PARTNERS</h3>
                                <p className=' text-base text-gray-500 lg:text-lg text-center'>See below a list of our trusted partners.</p>

                                <div className='w-full h-auto flex flex-col md:flex-row items-center justify-evenly gap-4 mt-16 flex-wrap'>
                                    {partners.map((partner, index) => (
                                        <div key={index} className='w-44 lg:w-48 h-auto flex items-center justify-center'>
                                            <img className='h-full object-contain' src={partner} alt={`Partner ${index + 1}`} />
                                        </div>
                                    ))}
                                </div>
                </div>

            </div>

            <div id='news' className='w-full flex flex-col items-center justify-center bg-[var(--medium-gray)] h-auto px-4 xl:px-16 py-12'>
                <div className='w-full lg:w-11/12 xl:w-10/12 flex flex-col items-center justify-center'>
                                    <h3 className='text-lg md:text-xl font-semibold tracking-widest'>LATEST NEWS</h3>
                                    <p className=' text-base text-gray-500 lg:text-lg text-center'>Read more about what's been going on!</p>
                                    
                                    <div className='flex overflow-x-auto w-full no-scrollbar relative'>
                                        <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[var(--medium-gray)] to-transparent pointer-events-none z-10"></div>

                                        <div className='flex animate-scroll'>
                                        <div className='h-auto flex items-center justify-center gap-6 mt-12 pr-6'>
                                            <div className='flex flex-col items-center justify-start h-96 w-96 relative flex-grow-0 flex-shrink-0'>
                                                <img src={muhima_hospital} className='h-80 w-auto object-cover rounded-xl' />
                                                <div className='bg-white rounded-xl absolute bottom-2 z-10 h-auto w-72 flex flex-col gap-1 py-1 items-center justify-center shadow-xl'>
                                                    <h3 className='text-center font-semibold text-base xl:text-lg text-gray-500'>20% Increase Profit with Muhima Hospital</h3>
                                                    <p className='text-center font-bold cursor-pointer text-base xl:text-lg text-[var(--secondary-color)]'>Read More</p>
                                                </div>
                                            </div>

                                            <div className='flex flex-col items-center justify-start h-96 w-96 relative flex-grow-0 flex-shrink-0'>
                                                <img src={muhima_hospital} className='h-80 w-auto object-cover rounded-xl' />
                                                <div className='bg-white rounded-xl absolute bottom-2 z-10 h-auto w-72 flex flex-col gap-1 py-1 items-center justify-center shadow-xl'>
                                                    <h3 className='text-center font-semibold text-base xl:text-lg text-gray-500'>20% Increase Profit with Muhima Hospital</h3>
                                                    <p className='text-center font-bold cursor-pointer text-base xl:text-lg text-[var(--secondary-color)]'>Read More</p>
                                                </div>
                                            </div>

                                            <div className='flex flex-col items-center justify-start h-96 w-96 relative flex-grow-0 flex-shrink-0'>
                                                <img src={muhima_hospital} className='h-80 w-auto object-cover rounded-xl' />
                                                <div className='bg-white rounded-xl absolute bottom-2 z-10 h-auto w-72 flex flex-col gap-1 py-1 items-center justify-center shadow-xl'>
                                                    <h3 className='text-center font-semibold text-base xl:text-lg text-gray-500'>20% Increase Profit with Muhima Hospital</h3>
                                                    <p className='text-center font-bold cursor-pointer text-base xl:text-lg text-[var(--secondary-color)]'>Read More</p>
                                                </div>
                                            </div>
                                            
                                        </div>

                                        <div aria-hidden className='h-auto flex items-center justify-center gap-6 mt-12 pr-6'>
                                            <div className='flex flex-col items-center justify-start h-96 w-96 relative flex-grow-0 flex-shrink-0'>
                                                <img src={muhima_hospital} className='h-80 w-auto object-cover rounded-xl' />
                                                <div className='bg-white rounded-xl absolute bottom-2 z-10 h-auto w-72 flex flex-col gap-1 py-1 items-center justify-center shadow-xl'>
                                                    <h3 className='text-center font-semibold text-base xl:text-lg text-gray-500'>20% Increase Profit with Muhima Hospital</h3>
                                                    <p className='text-center font-bold cursor-pointer text-base xl:text-lg text-[var(--secondary-color)]'>Read More</p>
                                                </div>
                                            </div>

                                            <div className='flex flex-col items-center justify-start h-96 w-96 relative flex-grow-0 flex-shrink-0'>
                                                <img src={muhima_hospital} className='h-80 w-auto object-cover rounded-xl' />
                                                <div className='bg-white rounded-xl absolute bottom-2 z-10 h-auto w-72 flex flex-col gap-1 py-1 items-center justify-center shadow-xl'>
                                                    <h3 className='text-center font-semibold text-base xl:text-lg text-gray-500'>20% Increase Profit with Muhima Hospital</h3>
                                                    <p className='text-center font-bold cursor-pointer text-base xl:text-lg text-[var(--secondary-color)]'>Read More</p>
                                                </div>
                                            </div>

                                            <div className='flex flex-col items-center justify-start h-96 w-96 relative flex-grow-0 flex-shrink-0'>
                                                <img src={muhima_hospital} className='h-80 w-auto object-cover rounded-xl' />
                                                <div className='bg-white rounded-xl absolute bottom-2 z-10 h-auto w-72 flex flex-col gap-1 py-1 items-center justify-center shadow-xl'>
                                                    <h3 className='text-center font-semibold text-base xl:text-lg text-gray-500'>20% Increase Profit with Muhima Hospital</h3>
                                                    <p className='text-center font-bold cursor-pointer text-base xl:text-lg text-[var(--secondary-color)]'>Read More</p>
                                                </div>
                                            </div>
                                            
                                        </div>
                                        </div>
                                        <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[var(--medium-gray)] to-transparent pointer-events-none z-10"></div>

                                    </div>

                </div>

            </div>

            <div id='contact' className='w-full flex flex-col items-center justify-center bg-white h-auto px-4 xl:px-16 pt-12'>
                <div className='w-full lg:w-11/12 xl:w-10/12 grid md:grid-cols-2 gap-8'>
                    <div className='flex flex-col items-start justify-center gap-4'>
                        <h3 className='text-lg md:text-xl font-semibold tracking-widest'>GET THE APP</h3>
                        <h3 className='text-[var(--secondary-color)] font-bold text-3xl xl:text-4xl 2xl:text-5xl'>ACCESS CO-LAB ANYWHERE</h3>

                        <div className='w-auto flex items-center justify-center gap-4 mt-4'>
                            <a target='_blank' href="https://play.google.com/store/apps/details?id=acubbed.colab.app-link">
                                <img src={googleplay_badge} 
                                    alt="Get it on Google Play"
                                    style={{height: 60}} />
                            </a>

                            <a target='_blank' href="https://apps.apple.com/us/app/co-lab-health/id6747808897">
                                <img src={appstore_badge} 
                                    alt="Download on the App Store"
                                    style={{height: 60}} />
                            </a>
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