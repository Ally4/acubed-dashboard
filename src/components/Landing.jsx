import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
//Images
import logo from '../images/logo-blue.png'
import africanImpact from '../images/african_impact.png';
import jasiri from '../images/jasiri.png';
import ventureMeda from '../images/venture_meda.png';
import africaOxford from '../images/africa_oxford_initiative.png';
import healthHub from '../images/health_hub_innovation.png';
//testimonials
import jackie_inies from '../images/colab_jackie_ines.jpg';
import testimonial_2 from '../images/testimonial-2.jpg'
import testimonial_3 from '../images/testimonial-3.jpg'
import testimonial_4 from '../images/testimonial-4.jpg'
import subscriber from '../images/Subscriber-bro 1.png'

//icons
import landing from '../images/thumbs_up_2.png'
import lab_landing from '../images/Laboratory-bro 1.png'
import googleplay_badge from '../images/googleplay_badge.png'
import appstore_badge from '../images/download_on_appstore.svg'
import university_of_oxford from '../images/university_of_oxford.png'
import africa_tech_festival from '../images/acubed_news_5.jpeg'
import africa_healthtech_summit from '../images/colab_africa_health_tech_summit_2025.png'
import africa_impact_initiative from '../images/africa_impact_initiative.png'
import acubed_regional_finalist from '../images/acubed_regional_finalist.jpeg'
import subscribe_bro from '../images/subscribe_bro.png'

import { useSelector, useDispatch } from 'react-redux';
//ICONS
import { TbUfo } from "react-icons/tb";
import { PiMagicWand } from "react-icons/pi";
import { PiConfetti } from "react-icons/pi";
import { BsChatRightDots } from "react-icons/bs";
import { GrMapLocation } from "react-icons/gr";
import { TbTargetArrow } from "react-icons/tb";
import { PiFlowerLotus } from "react-icons/pi";
import { BiSolidQuoteLeft } from "react-icons/bi";
import { BiSolidQuoteRight } from "react-icons/bi";


//Modal
import NewsModal from './NewsModal';

//Chatbot
import ChatBot from './customer/chat/ChatBot'

//css
import '../style/LandingPage.css';



const LandingPage = () => {
    const navigate = useNavigate();
    const [testimonialIndex, setTestimonialIndex] = useState(0);
    const [landingIndex, setLandingIndex] = useState(0);
    const [openNewsModal, setOpenNewsModal] = useState(false);
    const [newsModalIndex, setNewsModalIndex] = useState(null);
    const [chatBotOpen, setChatBotOpen] = useState(false)
    const [chatBotVisible, setChatBotVisible] = useState(false)

    // get elements to animate
    useEffect(() => {
        const features = document.querySelector("#feature_elements");
        const about = document.querySelectorAll("#about_elements div")
        
        if (!features || !about) return; // Safety check
        
        const singleObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                    } else {
                        entry.target.classList.remove('show');
                    }
                })
            },
            {
                threshold: 0.4
            }
        );
        const groupObserver = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    entries[0].target.classList.add('show')
                } else {
                    entries[0].target.classList.remove('show')
                }
            },
            {
                threshold: 0.4
            }
        )
        groupObserver.observe(features)
        about.forEach(element => singleObserver.observe(element))
        // observer.observe(features);
        // observer.observe(about)
        
        // Cleanup function
        // return () => {
        //     observer.disconnect();
        // };
    }, []);

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
        },
        {
            name: "Rumera",
            country: "Rwandan",
            header: "Une expérience incroyable !",
            content: "Une solution simple et efficace. J’ai été agréablement surpris par la facilité d’utilisation et la qualité du service offert.",
            image: testimonial_2
        },
        {
            name: "Amara",
            country: "Ethiopian",
            header: "It truly made a difference.",
            content: "The experience was smooth and reliable. Everything worked exactly as expected, making daily tasks easier and stress-free.",
            image: testimonial_3
        },
        {
            name: "Fabien Ines",
            country: "Rwandan",
            header: "Reliable and easy to use.",
            content: "The process was straightforward and efficient. It saved me time and gave me confidence knowing I could rely on it.",
            image: testimonial_4
        }
    ];


    const partners = [
        africanImpact,
        jasiri,
        ventureMeda,
        africaOxford,
        healthHub
    ]

    const news = [
        {
            image:university_of_oxford,
            hook: "🚀 ACUBED at the University of Oxford! 🧠🌍 We’re thrilled to share that ACUBED recently participated in the AfOx Healthcare Innovation and Entrepreneurship Bootcamp at the University of Oxford.",
            body:"🚀 ACUBED at the University of Oxford! 🧠🌍\n\nWe’re thrilled to share that ACUBED recently participated in the AfOx Healthcare Innovation and Entrepreneurship Bootcamp at the University of Oxford, an intensive program bringing together some of the most promising health innovators from across the globe.\n\nThroughout the bootcamp, we dove deep into critical and future-shaping topics such as:\n🧬 Ethics in Global Health\n🔐 IP Rights Protection\n💡 Need-Led Innovation\n🧠 Signal Processing & Machine Learning\n🧪 Biosynthetic Innovation\n🧭 Unexplored Pathways to Innovationn\n…and much more!\n\nIt was an incredible opportunity to exchange insights and best practices with a vibrant ecosystem of health-tech startups, researchers, and entrepreneurs at Oxford—fostering collaboration, cross-cultural learning, and innovation at the frontier of healthcare.\n\n🎤 We’re also proud to announce that ACUBED secured 2nd place in the pitch competition, showcasing our commitment to transformative health solutions combining innovation, technolog"
        },
        {
            image:africa_healthtech_summit,
            hook: "🌍 A Week of Impact and Innovation for CO-LAB! 🚀 Last week, we had the incredible opportunity to participate in the Africa HealthTech Summit - #AHTS25, where we explored the evolving health tech landscape across the continent.",
            body:"🌍 A Week of Impact and Innovation for CO-LAB! 🚀\n\nLast week, we had the incredible opportunity to participate in the Africa HealthTech Summit - #AHTS25, where we explored the evolving health tech landscape across the continent — diving deep into the opportunities, challenges, and future potential of digital health in Africa. 💡\n\nWe also joined the Inspire Africa Conference, focusing on product development and refinement, and pitched our solution at the Annual Health Convening organized by the Africa Health Collaborative. 🎤\n\nA huge thank you to the African Impact Initiative for making these transformative experiences possible. Your support continues to empower startups like ours to build a healthier, more connected Africa. 💙"
        },
        {
            image:africa_impact_initiative,
            hook: "We’re excited to be part of the Africa Impact Initiative Bootcamp, joining 11 innovative health tech startups in the Africa Impact Challenge Program, proudly organized by the University of Toronto, Canada.",
            body:"We’re excited to be part of the Africa Impact Initiative Bootcamp, joining 11 innovative health tech startups in the Africa Impact Challenge Program, proudly organized by the University of Toronto, Canada.\n\nThis milestone is not just a recognition of our efforts, but also an incredible opportunity to gain knowledge, mentorship, and collaboration with some of the brightest innovators across Africa.\n\nBeing part of this prestigious program strengthens our commitment to building impactful solutions that address critical challenges in healthcare and improve lives across the continent."
        },
        {
            image:acubed_regional_finalist,
            hook: "ACUBED has been selected as a Regional Finalist for East Africa in the prestigious Global Startup Awards Africa, competing in two major categories: Best Newcomer and Health Tech Startup of the Year.",
            body:"ACUBED has been selected as a Regional Finalist for East Africa in the prestigious Global Startup Awards Africa, competing in two major categories: Best Newcomer and Health Tech Startup of the Year. This recognition highlights our innovative work in transforming diagnostic access through technology, community-centered design, and last-mile healthcare logistics. Being chosen among top startups across the continent is a powerful validation of our mission to make diagnostic services accessible, reliable, and affordable for underserved populations. We are honored by this achievement and remain committed to scaling our impact across Africa."
        },
        {
            image: africa_tech_festival,
            hook: "Last week, ACUBED had the exciting opportunity to participate in the Africa Tech Festival in Cape Town, where we showcased our digital diagnostics platform CO-LAB and engaged with leaders shaping the future of Africa’s tech ecosystem.",
            body: "ACUBED at Africa Tech Festival 2025 – Cape Town Highlights 🚀\n\nLast week, ACUBED had the exciting opportunity to participate in the Africa Tech Festival in Cape Town, where we showcased our digital diagnostics platform CO-LAB and engaged with leaders shaping the future of Africa’s tech ecosystem.\n\nThroughout the event, we connected with investors, innovators, and industry experts across the continent — exploring new perspectives and collaboration opportunities to strengthen digital health infrastructure in Africa. 🤝✨\n\nWe also took part in the African Impact Initiative Alumni Event, where we shared more about ACUBED’s mission: democratizing access to diagnostics and improving health outcomes through technology and smart logistics.\n\nThis experience reaffirmed the importance of innovation, strategic partnerships, and community in driving impactful health solutions across Africa. 🌱💡\n\nA huge thank you to the African Impact Initiative for their continued support and for making this journey possible. 🙌\n\nWe’re energized, inspired, and ready for what’s next! 🚀💉📲\n\nStay tuned — the best is yet to come."
        }
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

    //Testimonial Logic
    useEffect(() => {
        setTimeout(() => {
            if (testimonialIndex == testimonials.length - 1) {
                setTestimonialIndex(0)
            } else {
                setTestimonialIndex(testimonialIndex + 1)
            }
        }, 3000)
    }, [testimonialIndex])

    function TestimonialPagination({ testimonialIndex, totalSlides = 4, onIndexChange }) {
        return (
            <div className='flex items-center justify-end w-full gap-1 mt-4 lg:mt-24 mr-8'>
            {[...Array(totalSlides)].map((_, index) => {
                const isActive = testimonialIndex === index
                const isPast = testimonialIndex > index
                const isLast = index === totalSlides - 1

                return (
                <div key={index} className='flex items-center justify-center gap-1'>
                    <button
                    onClick={() => onIndexChange?.(index)}
                    className={`font-bold text-2xl transition-all bg-transparent py-0 px-1 ${
                        isActive 
                        ? 'text-[var(--secondary-color)] scale-110' 
                        : isPast 
                            ? 'text-[#6bbbbd]' 
                            : 'text-gray-300'
                    }`}
                    >
                    {String(index + 1).padStart(2, '0')}
                    </button>
                    
                    {!isLast && (
                    <div className={`${isActive ? 'w-16' : 'w-1'} h-1 bg-gray-300 rounded-lg overflow-hidden transition-all duration-500 ease-in-out`}>
                        <div className={`w-full h-full rounded-lg transition-colors duration-500 ease-in-out ${
                        isActive 
                            ? 'bg-[var(--secondary-color)]' 
                            : isPast 
                            ? 'bg-[#6bbbbd]' 
                            : 'w-0'
                        }`} />
                    </div>
                    )}
                </div>
                )
            })}
            </div>
        )
    }

// Usage




    return (
        <section className='w-full h-full min-h-screen flex flex-col overflow-y-auto bg-[var(--medium-gray)] items-center justify-start'>
            <Header />
            {chatBotVisible && (<div className={`h-auto w-auto fixed bottom-28 right-8 z-50 ${chatBotOpen ? 'slide-in' : 'slide-out'}`}><ChatBot onClose={()=>{
                setChatBotOpen(false)
                setTimeout(() => setChatBotVisible(false), 300);
                }} /></div>)}
            <div className='w-auto h-auto' onClick={()=>{
                setChatBotVisible(true);
                setTimeout(() => setChatBotOpen(true), 10)
                }}>
                <BsChatRightDots className='h-12 md:h-16 w-12 md:w-16 z-40 fixed bottom-8 right-8 cursor-pointer text-[#135b5c]'/>
            </div>
            {openNewsModal && newsModalIndex !== null && <NewsModal onClose={() => {
                setOpenNewsModal(false)
                setNewsModalIndex(null)
                }} data={news[newsModalIndex]} />}
            <div id='home' className='w-full lg:w-11/12 bg-[var(--medium-gray)] h-auto min-h-screen flex items-center justify-center mt-16 py-12 px-4 xl:px-16'>
                <div className='w-full grid md:grid-cols-2 gap-12 place-items-center'>
                    <div className='w-full h-full flex flex-col items-start justify-center gap-4 p-4'>
        
                        
                        <h3 className='font-inter font-semibold text-gray-600 text-5xl mb-20 sm:mb-0 md:text-4xl lg:text-5xl 2xl:text-7xl text-left max-h-[200px] md:max-h-[300px]  xl:max-h-full'>Order Diagnostic tests anywhere, anytime and <span className='text-[var(--primary-color)]'>get your results fast</span></h3>

                        <h4 className='font-inter font-normal text-xl xl:text-2xl text-left text-gray-500'>CO-LAB is the health tech platform that brings laboratory-grade testing to where you are.</h4>

                        <div onClick={()=>navigate('/dashboard/All')} className='font-inter bg-[#1c7d7f] hover:bg-opacity-80 text-white text-xl xl:text-2xl rounded-md font-medium cursor-pointer px-4 py-3'>Find a Test near you</div>
                        {/* <div className='flex items-center justify-center gap-10'>
                            <input type='file' onChange={handleFileChange} className='bg-[#1c7d7f] hover:bg-opacity-80 text-white text-lg xl:text-xl rounded-sm cursor-pointer px-4 py-3 w-60' />
                            <button onClick={()=>upload()} className='text-white text-lg px-4 py-3 cursor-pointer'>Upload</button>
                        </div> */}

                    </div>

                    <div className='w-full h-full flex flex-col items-center justify-center gap-3 mr-6'>
                        <div className='w-auto h-96 lg:h-[450px] xl:h-[550px] flex items-center justify-center'>
                            <img className='h-full w-fit object-contain' src={landingPhotos[landingIndex]} alt="landing" />
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
                <div className='w-full lg:w-11/12 flex flex-col items-center justify-center gap-6'>
                    <div className='grid md:grid-cols-2 w-full gap-6'>
                        <div className='h-auto flex flex-col items-start justify-center gap-2'>
                            <h4 className='text-lg xl:text-xl font-medium tracking-widest font-inter'>ABOUT US</h4>
                            <h3 className='text-[var(--secondary-color)] font-bold text-5xl xl:text-6xl font-inter'>Why Our Services are <br /> the Best</h3>
                        </div>

                        <div className='h-auto md:mt-12'>
                            <p className='text-gray-500 text-base xl:text-lg text-wrap text-left font-inter'>CO-LAB is a health tech platform dedicated to democratizing access to diagnostic tests, allowing patients to get tested anywhere, anytime. We fundamentally believe diagnostic testing shuold be a universal right, free from barriers related to income, age, location, or education. By leveraging digital solutions, we directly address the critical problem of test inaccessibility. in under served communities</p>
                        </div>
                    </div>

                    <div id='about_elements' className='grid md:grid-cols-3 w-full gap-6'>
                        <div className='relative flex flex-col items-start justify-center gap-6 bg-[var(--light-gray)] p-4 rounded-md'>
                            <h3 className='font-inter text-[var(--secondary-color)] font-bold text-2xl xl:text-3xl'>Our Location</h3>
                            <GrMapLocation className='font-inter h-10 w-10 absolute top-4 right-4 text-[var(--secondary-color)]' />
                            <p className='font-inter text-gray-500 text-lg xl:text-xl text-wrap text-left'>We currently <br />operate in Ethiopia and Rwanda.</p>

                            {/* <p className='text-[var(--secondary-color)] font-medium text-base xl:text-lg cursor-pointer'>Learn more</p> */}
                        </div>

                         <div className='relative flex flex-col items-start justify-center gap-6 bg-[var(--light-gray)] p-4 rounded-md'>
                            <h3 className='font-inter text-[var(--secondary-color)] font-bold text-2xl xl:text-3xl'>Our Mission</h3>
                            <TbTargetArrow className='h-10 w-10 absolute top-4 right-4 text-[var(--secondary-color)]' />
                            <p className='font-inter text-gray-500 text-lg xl:text-xl text-wrap text-left'>To ensure high-quality healthcare is accessible and readily available in every community.</p>

                            {/* <p className='text-[var(--secondary-color)] font-medium text-base xl:text-lg cursor-pointer'>Learn more</p> */}
                        </div>

                         <div className='relative flex flex-col items-start justify-center gap-6 bg-[var(--light-gray)] p-4 rounded-md z-10'>
                            <h3 className='font-inter text-[var(--secondary-color)] font-bold text-2xl xl:text-3xl'>Our Vision</h3>
                            <PiFlowerLotus className='h-10 w-10 absolute top-4 right-4 text-[var(--secondary-color)]' />
                            <p className='font-inter text-gray-500 text-lg xl:text-xl text-wrap text-left'>To fundamentally redefine global health by pioneering the use of technology and innovation against the world's most urgent challenges.</p>

                            {/* <p className='text-[var(--secondary-color)] font-medium text-base xl:text-lg cursor-pointer'>Learn more</p> */}
                        </div>
                    </div>


                </div>
            </div>

            <div id='features' className='w-full flex flex-col items-center justify-center bg-[var(--medium-gray)] h-auto px-4 xl:px-16 gap-6 py-12'>
                <div className='font-inter w-full lg:w-11/12 flex flex-col items-center justify-center gap-6'>
                    <h3 className='font-inter text-lg md:text-xl font-semibold tracking-widest'>FEATURES</h3>
                    <p className='font-inter text-gray-800 text-sm md:text-lg mb-8'>Few good reasons why you should use CO-LAB and make your life easier</p>

                    <div id='feature_elements' className='grid md:grid-cols-3 w-full gap-6 xl:gap-12'>
                        
                        <div className='font-inter bg-white rounded-xl shadow-md px-8 pt-4 pb-8 flex flex-col items-center justify-start hover:translate-y-[-20px] transition-transform hover:shadow-lg'>
                            <div className='font-inter flex items-center justify-center h-12 w-12 rounded-lg mb-3 bg-green-200'>
                                <TbUfo className='font-inter h-8 w-8 text-green-600' />
                            </div>

                            <h3 className='font-inter font-semibold text-xl lg:text-2xl xl:text-3xl text-center'>The Gold Standard, Right to Where You Are.</h3>

                            <p className='font-inter font-medium text-gray-600 text-wrap text-center text-lg xl:text-xl'>
                                There are no compromises on quality. We connect you with verified, professional collectors and your preferred, accredited lab facilities. You get the highest standards of diagnostic accuracy.
                            </p>

                        </div>

                        <div className='font-inter bg-white rounded-xl shadow-md px-8 py-4 flex flex-col items-center justify-start hover:translate-y-[-20px] transition-transform hover:shadow-lg'>
                            <div className='font-inter flex items-center justify-center h-12 w-12 rounded-lg mb-3 bg-yellow-100'>
                                <PiConfetti className='font-inter h-8 w-8 text-yellow-600' />
                            </div>

                            <h3 className='font-inter font-semibold text-xl lg:text-2xl xl:text-3xl text-center'>Instant Access Saves Time and Worry.</h3>

                            <p className='font-inter font-medium text-gray-600 text-wrap text-center text-lg xl:text-xl'>
                                Stop wasting hours on transportation, waiting rooms, and confusing schedules. Our 24/7 digital ordering and mobile collection services mean your diagnosis starts immediately—speeding up treatment and giving you faster peace of mind.                            </p>

                        </div>

                        <div className='font-inter bg-white rounded-xl shadow-md px-8 py-4 flex flex-col items-center justify-start hover:translate-y-[-20px] transition-transform hover:shadow-lg'>
                            <div className='font-inter flex items-center justify-center h-12 w-12 rounded-lg mb-3 bg-red-200'>
                                <PiMagicWand className='font-inter h-8 w-8 text-red-600' />
                            </div>

                            <h3 className='font-inter font-semibold text-xl lg:text-2xl xl:text-3xl text-center'>Simplify Your <br /> Health Journey.</h3>

                            <p className='font-inter font-medium text-gray-600 text-wrap text-center text-lg xl:text-xl'>
                                From easy mobile payment to secure, digital result retrieval, we make managing your diagnostics simple. Your
                                entire testing history is secure and accessible in one place, giving you a clear, single source of truth for
                                your health data. </p>
                        </div>
                    </div>
                </div>
                
            </div>
            
            <div id='testimonials' className='font-inter w-full flex flex-col items-center justify-center bg-white h-auto py-12'>
                
                    <div className='font-inter w-full h-auto flex flex-col lg:flex-row gap-12 md:gap-2 items-center justify-start relative'>
                        <div className='flex flex-col items-center justify-center lg:absolute lg:left-[50%] lg:-translate-x-1/2 lg:top-1 '>
                            <h3 className='font-inter text-lg md:text-xl font-semibold tracking-widest mb-1'>TESTIMONIALS</h3>
                            <p className='font-inter text-sm xl:text-base text-center mb-6 md:mb-0'>Hear what our customers say about us</p>
                        </div>

                        <div className='font-inter flex flex-col gap-2 items-center justify-center h-auto w-full lg:w-2/5 mb-6 md:mb-0 relative'>
                            <div className='font-inter flex flex-col items-start justify-center h-auto mb-8'>
                                <img className='font-inter h-96 md:h-[410px] lg:h-[400px] xl:h-[420px] object-cover w-80 md:w-[410px] lg:w-80 2xl:w-96 z-10 mt-16 mb-1' src={testimonials[testimonialIndex].image} />

                                <p className='font-inter text-white font-medium text-2xl md:text-xl xl:text-2xl z-10'>{testimonials
                                    [testimonialIndex].name}</p>

                                <p className='font-inter text-white text-lg z-10'>{testimonials
                                    [testimonialIndex]?.country}</p>
                            </div>
                            

                            <div className='font-inter h-full w-7/12 lg:w-2/3 self-start bg-gradient-to-b absolute top-0 from-[#1a7071] to-[#32E1E5] min-h-[550px]'>

                            </div>
                        </div>

                        <div className='w-10/12 lg:w-1/2 xl:w-2/5 h-auto flex flex-col items-center justify-center mb-1 relative md:mt-8'>
                            <div className='w-full flex flex-col items-center justify-center relative h-auto py-10'>
                                <BiSolidQuoteLeft className="text-[var(--secondary-color)] h-16 w-16 absolute top-2 left-2" />
                                <h3 className='font-inter text-[var(--secondary-color)] font-bold text-4xl md:text-5xl mt-8 text-center'>{testimonials[testimonialIndex].header}</h3>
                                <h4 className='font-inter text-gray-500 font-medium text-base md:text-lg xl:text-xl mb-8 text-center'>{testimonials[testimonialIndex].content}</h4>
                                <BiSolidQuoteRight className="text-[var(--secondary-color)] h-16 w-16 absolute right-2 bottom-2" />
                            </div>
                            <TestimonialPagination 
                                testimonialIndex={testimonialIndex}
                                onIndexChange={setTestimonialIndex}
                                />
                        </div>      
                    </div>
            </div>

            <div id='how-it-works' className='font-inter w-full h-auto lg:h-screen flex flex-col items-center bg-[var(--medium-gray)] px-4 xl:px-16 py-12'>
                <div className="font-inter w-full h-auto lg:w-11/12 flex flex-col items-center justify-start">    
                        <h3 className='font-inter text-lg md:text-xl font-semibold tracking-widest self-start'>HOW IT WORKS</h3>
                        <p className='font-inter  text-lg text-gray-500 lg:text-xl text-center self-start'>Getting the tests you need should be effortless. Here is the simple process:</p>
                        <button onClick={()=>navigate('/dashboard/All')} className='font-inter text-white bg-[var(--secondary-color)] px-6 py-2 rounded-full mt-4 mb-8 self-start text-xl lg:text-2xl font-medium'>Get Started</button>
                </div>                  
                <div className='w-full h-full lg:w-11/12 flex flex-col lg:flex-row lg:justify-between gap-1 lg:gap-12 relative'>

                                    <svg
                                    className="hidden 2xl:block absolute top-[-100px] left-0 w-full h-full pointer-events-none"
                                    viewBox="0 0 800 500"
                                    preserveAspectRatio="none"
                                    >
                                        <defs>
                                            <filter id="shadow-2xl" x="-50%" y="-50%" width="200%" height="200%">
                                            <feDropShadow dx="2" dy="2" stdDeviation="3" flood-color="#000000" flood-opacity="0.3"/>
                                            </filter>
                                        </defs>
                                    <path
                                        className="stroke-cyan-500"
                                        d="M 0 350 Q 150 350 200 300 Q 300 200 450 250 Q 550 300 650 50 "
                                        strokeWidth="4"
                                        fill="none"
                                        filter="url(#shadow-2xl)"
                                        strokeLinecap="round"
                                    />
                                    </svg>

                                    <svg
                                    className="hidden lg:block 2xl:hidden absolute top-[-100px] left-0 w-full h-full pointer-events-none"
                                    viewBox="0 0 800 500"
                                    preserveAspectRatio="none"
                                    >
                                        <defs>
                                            <filter id="shadow-lg" x="-50%" y="-50%" width="200%" height="200%">
                                            <feDropShadow dx="2" dy="2" stdDeviation="3" flood-color="#000000" flood-opacity="0.3"/>
                                            </filter>
                                        </defs>
                                    <path
                                        stroke="#06b6d4"
                                        d="M 0 300 Q 150 350 200 300 Q 300 200 450 250 Q 550 300 650 50"
                                        strokeWidth="4"
                                        fill="none"
                                        filter="url(#shadow-lg)"
                                        strokeLinecap="round"
                                    />
                                    </svg>


                                <svg 
                                    className="lg:hidden absolute top-0 left-3 h-full pointer-events-none"
                                    style={{ zIndex: 0 }}
                                    preserveAspectRatio="none"
                                    viewBox="0 0 100 600"
                                >
                                    <defs>
                                        <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                                        <feDropShadow dx="2" dy="2" stdDeviation="3" flood-color="#000000" flood-opacity="0.3"/>
                                        </filter>
                                    </defs>
                                    <path
                                    d="M 25 40 Q 40 150, 25 280 T 25 450"
                                    stroke="#06b6d4"
                                    strokeWidth="4"
                                    fill="none"
                                    strokeLinecap="round"
                                    filter="url(#shadow)"
                                    />
                                </svg>
                        
                        <div className='w-auto lg:w-1/4 lg:self-end flex flex-col items-start justify-center md:gap-4 h-auto p-4 relative'>
                            <h4 className='absolute text-gray-200 font-extrabold text-[130px] lg:text-[150px] xl:text-[180px] top-[-10px] lg:top-[-70px] xl:top-[-50px] right-2 lg:right-12 xl:right-20 z-0'>1</h4>
                            <div className='bg-white rounded-xl w-12 lg:w-16 h-12 lg:h-16 flex items-center justify-center z-0 shadow-lg'><div className='bg-gray-300 rounded-full w-6 lg:w-8 h-6 lg:h-8 z-10'></div></div>
                            <h3 className='font-inter font-bold text-lg md:text-xl xl:text-2xl mb-1 z-10'>Order & Select</h3>

                            <p className='font-inter text-gray-500 text-base xl:text-lg text-left z-10'>
                                You have control. Easily access our platform 24/7 to browse, select, and order your diagnostic tests from
                                the facility of your choice. Book online or on-call from your location—wherever and whenever is convenient
                                for you.
                            </p>
                        </div>

                        <div className='w-auto lg:w-1/4 lg:self-center flex flex-col items-start justify-center gap-1 h-auto p-4 relative'>
                            <h4 className='absolute text-gray-200 font-extrabold text-[130px] lg:text-[150px] xl:text-[180px] top-[-15px] lg:top-[-100px] xl:top-[-70px] right-2 lg:right-6 xl:right-8 2xl:right-4 z-0'>2</h4>
                            <div className='bg-white rounded-xl w-12 lg:w-16 h-12 lg:h-16 flex items-center justify-center z-0 shadow-lg'><div className='bg-gray-300 rounded-full w-6 lg:w-8 h-6 lg:h-8 z-10'></div></div>
                            <h3 className='font-inter font-bold text-lg md:text-xl xl:text-2xl mb-1 z-10'>Collect & Transport</h3>
                            <p className='font-inter text-gray-500 text-base xl:text-lg text-left z-10'>
                                We come to you. A qualified, certified professional will collect your sample at your preferred location
                                (health facility, home, office, etc.) at the scheduled time and ensure its secure and prompt transport to the lab.
                            </p>
                        </div>

                        <div className='w-auto lg:w-1/4 lg:self-start flex flex-col items-start justify-center gap-1 h-auto p-4 relative'>
                            <h4 className='absolute text-gray-200 font-extrabold text-[130px] lg:text-[150px] xl:text-[180px] top-[-15px] lg:top-[-110px] xl:top-[-70px] right-2 z-0'>3</h4>
                            <div className='bg-white rounded-xl w-12 lg:w-16 h-12 lg:h-16 flex items-center justify-center z-0 shadow-lg'><div className='bg-gray-300 rounded-full w-6 lg:w-8 h-6 lg:h-8 z-10'></div></div>
                            <h3 className='font-inter font-bold text-lg md:text-xl xl:text-2xl mb-1 z-10'>Receive Results</h3>

                            <p className='font-inter text-gray-500 text-base xl:text-lg text-left z-10'>
                                Results, fast. Receive your lab results quickly and securely through the CO-LAB platforms on your device.
                                You'll get instant notification the moment they are available.
                            </p>
                        </div>
                
                </div>

                

            </div>

            <div id='partners' className='font-inter w-full flex flex-col items-center justify-center bg-white h-auto px-4 xl:px-16 py-12'>
                <div className='font-inter w-full lg:w-11/12 flex flex-col items-center justify-center'>
                                <h3 className='font-inter text-lg md:text-xl font-semibold tracking-widest'>OUR PARTNERS</h3>
                                <p className='font-inter  text-base text-gray-500 lg:text-lg text-center'>See below a list of our trusted partners.</p>

                                <div className='font-inter w-full h-auto flex flex-col md:flex-row items-center justify-evenly gap-4 mt-16 flex-wrap'>
                                    {partners.map((partner, index) => (
                                        <div key={index} className='font-inter w-48 lg:w-52 h-auto flex items-center justify-center'>
                                            <img className='font-inter h-full object-contain' src={partner} alt={`Partner ${index + 1}`} />
                                        </div>
                                    ))}
                                </div>
                </div>

            </div>

            <div id='latest-news' className='font-inter w-full flex flex-col items-center justify-center bg-[var(--medium-gray)] h-auto px-4 xl:px-16 py-12'>
                <div className='font-inter w-full lg:w-11/12 flex flex-col items-center justify-center'>
                                    <h3 className='font-inter text-lg md:text-xl font-semibold tracking-widest'>LATEST NEWS</h3>
                                    <p className='font-inter  text-base text-gray-500 lg:text-lg text-center'>Read more about what's been going on!</p>
                                    
                                    <div className='font-inter flex overflow-x-auto w-full h-auto no-scrollbar relative wrapper justify-start items-center'>
                                        {/* <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[var(--medium-gray)] to-transparent pointer-events-none z-10"></div> */}

                                        <div className='font-inter flex animate-scroll'>
                                            <div className='font-inter h-auto flex items-center justify-center gap-6 mt-12 pr-6 py-10'>
                                                {news?.map((item, index) => {
                                                    return (
                                                        <div key={`${index}.1`} className='font-inter flex flex-col items-center justify-start h-52 w-52 lg:h-96 lg:w-96 relative flex-grow-0 flex-shrink-0'>
                                                            <img src={item.image} className='font-inter h-44 lg:h-[320px] w-full object-cover rounded-xl' />
                                                            <div className='font-inter bg-white rounded-xl absolute top-32 lg:top-52 z-10 h-auto w-48 lg:w-72 flex flex-col gap-1 py-1 px-1 items-center justify-center shadow-xl'>
                                                                <h3 className='font-inter text-center text-xs md:text-sm xl:text-base text-gray-500'>{item.hook}</h3>
                                                                <p className='font-inter text-center font-bold cursor-pointer text-base xl:text-lg text-[var(--secondary-color)]' onClick={()=>{
                                                                        setNewsModalIndex(index);
                                                                        setOpenNewsModal(true);
                                                                    }
                                                                }>Read More</p>
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                            </div>

                                            <div className='font-inter h-auto flex items-center justify-center gap-6 mt-12 pr-6 py-10'>
                                                {news?.map((item, index) => {
                                                    return (
                                                        <div key={`${index}.2`} className='font-inter flex flex-col items-center justify-start h-52 w-52 lg:h-96 lg:w-96 relative flex-grow-0 flex-shrink-0'>
                                                            <img src={item.image} className='font-inter h-44 lg:h-[320px] w-full object-cover rounded-xl' />
                                                            <div className='font-inter bg-white rounded-xl absolute top-32 lg:top-52 z-10 h-auto w-48 lg:w-72 flex flex-col gap-1 py-1 px-1 items-center justify-center shadow-xl'>
                                                                <h3 className='font-inter text-center text-xs md:text-sm xl:text-base text-gray-500'>{item.hook}</h3>
                                                                <p className='font-inter text-center font-bold cursor-pointer text-base xl:text-lg text-[var(--secondary-color)]' onClick={()=>{
                                                                    setNewsModalIndex(index);
                                                                    setOpenNewsModal(true)
                                                                    }}>Read More</p>
                                                            </div>
                                                        </div>
                                                    )
                                                })}              
                                            </div>

                                        
                                        </div>
                                        {/* <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[var(--medium-gray)] to-transparent pointer-events-none z-10"></div> */}

                                    </div>

                </div>

            </div>

            <div id='contact' className='font-inter w-full flex flex-col items-center justify-center bg-white h-auto px-4 xl:px-16 pt-12'>
                <div className='font-inter w-full lg:w-11/12 xl:w-10/12 grid md:grid-cols-2 gap-8'>
                    <div className='font-inter flex flex-col items-start justify-center gap-4'>
                        <h3 className='font-inter text-lg md:text-xl font-semibold tracking-widest'>GET THE APP</h3>
                        <h3 className='font-inter text-[var(--secondary-color)] font-bold text-3xl xl:text-4xl 2xl:text-5xl'>ACCESS CO-LAB ANYWHERE</h3>

                        <div className='font-inter w-auto flex items-center justify-center gap-4 mt-4'>
                            <a target='_blank' href="https://play.google.com/store/apps/details?id=acubbed.colab.app">
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

                    <div className='font-inter flex items-center justify-center h-96 w-auto'>
                        <img className='font-inter h-full object-contain' src={subscribe_bro} alt="Subscribe" />
                    </div>
                                    
                </div>
            </div>

        </section>
    )
}


export default LandingPage;