import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
//Images
import logo from '../images/logo-blue.png'
import africanImpact from '../images/african_impact.png';
import jasiri from '../images/jasiri.png';
import ventureMeda from '../images/venture_meda.png';
import africaOxford from '../images/africa_oxford_initiative.png';
import healthHub from '../images/health_hub_innovation.png';
import jackie_inies from '../images/colab_jackie_ines.jpg';
import subscriber from '../images/Subscriber-bro 1.png'
import landing from '../images/thumbs_up.png'
import lab_landing from '../images/Laboratory-bro 1.png'
import googleplay_badge from '../images/googleplay_badge.png'
import appstore_badge from '../images/download_on_appstore.svg'
import university_of_oxford from '../images/university_of_oxford.png'
import africa_healthtech_summit from '../images/colab_africa_health_tech_summit_2025.png'
import africa_impact_initiative from '../images/africa_impact_initiative.png'
import acubed_regional_finalist from '../images/acubed_regional_finalist.jpeg'
import subscribe_bro from '../images/subscribe_bro.png'

import { useSelector, useDispatch } from 'react-redux';
import { TbUfo } from "react-icons/tb";
import { PiMagicWand } from "react-icons/pi";
import { PiConfetti } from "react-icons/pi";
import { BsChatRightDots } from "react-icons/bs";
import { GrMapLocation } from "react-icons/gr";
import { TbTargetArrow } from "react-icons/tb";
import { PiFlowerLotus } from "react-icons/pi";

//Modal
import NewsModal from './NewsModal';

//css
import '../style/LandingPage.css';



const LandingPage = () => {
    const navigate = useNavigate();
    const [testimonialIndex, setTestimonialIndex] = useState(0);
    const [landingIndex, setLandingIndex] = useState(0);
    const [openNewsModal, setOpenNewsModal] = useState(false);
    const [newsModalIndex, setNewsModalIndex] = useState(null);

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



    return (
        <section className='w-full h-full min-h-screen flex flex-col overflow-y-auto bg-[var(--medium-gray)] items-center justify-start'>
            <Header />

            <div>
                <BsChatRightDots className='h-12 md:h-16 w-12 md:w-16 z-40 fixed bottom-8 right-8 cursor-pointer' color='var(--secondary-color)'/>
            </div>
            {openNewsModal && newsModalIndex !== null && <NewsModal onClose={() => {
                setOpenNewsModal(false)
                setNewsModalIndex(null)
                }} data={news[newsModalIndex]} />}
            <div id='home' className='w-full lg:w-11/12 bg-[var(--medium-gray)] h-auto min-h-screen flex items-center justify-center mt-16 py-12 px-4 xl:px-16'>
                <div className='w-full grid md:grid-cols-2 gap-12 place-items-center'>
                    <div className='w-full h-full flex flex-col items-start justify-center gap-4 p-4'>
        
                        
                        <h3 className='font-medium text-gray-600 text-6xl 2xl:text-7xl text-left'>Order Diagnostic tests <br /> anywhere, anytime <br /> and <span className='text-[var(--primary-color)]'>get your results <br /> fast</span></h3>

                        <h4 className='font-normal text-xl xl:text-2xl text-left text-gray-500'>CO-LAB is the health tech platform that brings laboratory-grade <br /> testing to where you are.</h4>

                        <div onClick={()=>navigate('/dashboard/All')} className='bg-[#1c7d7f] hover:bg-opacity-80 text-white text-xl xl:text-2xl rounded-md font-medium cursor-pointer px-4 py-3'>Find a Test near you</div>
                        {/* <div className='flex items-center justify-center gap-10'>
                            <input type='file' onChange={handleFileChange} className='bg-[#1c7d7f] hover:bg-opacity-80 text-white text-lg xl:text-xl rounded-sm cursor-pointer px-4 py-3 w-60' />
                            <button onClick={()=>upload()} className='text-white text-lg px-4 py-3 cursor-pointer'>Upload</button>
                        </div> */}

                    </div>

                    <div className='w-full h-full flex flex-col items-center justify-center gap-3 mr-6'>
                        <div className='w-auto h-96 lg:h-[450px] xl:h-[550px] flex items-center justify-center'>
                            <img className='h-full w-fit object-cover' src={landingPhotos[landingIndex]} alt="landing" />
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
                            <h4 className='text-lg xl:text-xl font-medium tracking-widest'>ABOUT US</h4>
                            <h3 className='text-[var(--secondary-color)] font-bold text-5xl xl:text-6xl'>Why Our Services are <br /> the Best</h3>
                        </div>

                        <div className='h-auto md:mt-12'>
                            <p className='text-gray-500 text-base xl:text-lg text-wrap text-left'>CO-LAB is a health tech platform dedicated to democratizing access to diagnostic tests, allowing patients to get tested anywhere, anytime. We fundamentally believe diagnostic testing shuold be a universal right, free from barriers related to income, age, location, or education. By leveraging digital solutions, we directly address the critical problem of test inaccessibility. in under served communities</p>
                        </div>
                    </div>

                    <div className='grid md:grid-cols-3 w-full gap-6'>
                        <div className='relative flex flex-col items-start justify-center gap-6 bg-[var(--light-gray)] p-4 rounded-md'>
                            <h3 className='text-[var(--secondary-color)] font-bold text-2xl xl:text-3xl'>Our Location</h3>
                            <GrMapLocation className='h-10 w-10 absolute top-4 right-4 text-[var(--secondary-color)]' />
                            <p className='text-gray-500 text-base xl:text-balgse text-wrap text-left'>We currently <br />operate in Ethiopia and Rwanda.</p>

                            <p className='text-[var(--secondary-color)] font-medium text-base xl:text-lg cursor-pointer'>Learn more</p>
                        </div>

                         <div className='relative flex flex-col items-start justify-center gap-6 bg-[var(--light-gray)] p-4 rounded-md'>
                            <h3 className='text-[var(--secondary-color)] font-bold text-2xl xl:text-3xl'>Our Mission</h3>
                            <TbTargetArrow className='h-10 w-10 absolute top-4 right-4 text-[var(--secondary-color)]' />
                            <p className='text-gray-500 text-base xl:text-lg text-wrap text-left'>To ensure high-quality healthcare is accessible and readily available in every community.</p>

                            <p className='text-[var(--secondary-color)] font-medium text-base xl:text-lg cursor-pointer'>Learn more</p>
                        </div>

                         <div className='relative flex flex-col items-start justify-center gap-6 bg-[var(--light-gray)] p-4 rounded-md'>
                            <h3 className='text-[var(--secondary-color)] font-bold text-2xl xl:text-3xl'>Our Vision</h3>
                            <PiFlowerLotus className='h-10 w-10 absolute top-4 right-4 text-[var(--secondary-color)]' />
                            <p className='text-gray-500 text-base xl:text-lg text-wrap text-left'>To fundamentally redefine global health by pioneering the use of technology and innovation against the world's most urgent challenges.</p>

                            <p className='text-[var(--secondary-color)] font-medium text-base xl:text-lg cursor-pointer'>Learn more</p>
                        </div>
                    </div>


                </div>
            </div>

            <div id='features' className='w-full flex flex-col items-center justify-center bg-[var(--medium-gray)] h-auto px-4 xl:px-16 gap-6 py-12'>
                <div className='w-full lg:w-11/12 flex flex-col items-center justify-center gap-6'>
                    <h3 className='text-lg md:text-xl font-semibold tracking-widest'>FEATURES</h3>
                    <p className='text-gray-800 text-sm md:text-lg'>Few good reasons why you should use CO-LAB and make your life easier</p>

                    <div className='grid md:grid-cols-3 w-full gap-6'>
                        <div className='bg-white rounded-xl shadow-md px-8 py-4 flex flex-col items-center justify-start'>
                            <div className='flex items-center justify-center h-12 w-12 rounded-lg mb-3 bg-green-200'>
                                <TbUfo className='h-8 w-8 text-green-600' />
                            </div>

                            <h3 className='font-semibold text-xl lg:text-2xl xl:text-3xl text-center'>The Gold Standard, Right to Where You Are.</h3>

                            <p className='font-base text-gray-500 text-wrap text-center text-base xl:text-lg'>
                                There are no compromises on quality. We connect you with verified, professional collectors and your preferred, accredited lab facilities. You get the highest standards of diagnostic accuracy.
                            </p>

                        </div>

                        <div className='bg-white rounded-xl shadow-md px-8 py-4 flex flex-col items-center justify-start'>
                            <div className='flex items-center justify-center h-12 w-12 rounded-lg mb-3 bg-yellow-100'>
                                <PiConfetti className='h-8 w-8 text-yellow-600' />
                            </div>

                            <h3 className='font-semibold text-xl lg:text-2xl xl:text-3xl text-center'>Instant Access Saves Time and Worry.</h3>

                            <p className='font-base text-gray-500 text-wrap text-center text-base xl:text-lg'>
                                Stop wasting hours on transportation, waiting rooms, and confusing schedules. Our 24/7 digital ordering and mobile collection services mean your diagnosis starts immediately—speeding up treatment and giving you faster peace of mind.                            </p>

                        </div>

                        <div className='bg-white rounded-xl shadow-md px-8 py-4 flex flex-col items-center justify-start'>
                            <div className='flex items-center justify-center h-12 w-12 rounded-lg mb-3 bg-red-200'>
                                <PiMagicWand className='h-8 w-8 text-red-600' />
                            </div>

                            <h3 className='font-semibold text-xl lg:text-2xl xl:text-3xl text-center'>Simplify Your <br /> Health Journey.</h3>

                            <p className='font-base text-gray-500 text-wrap text-center text-base xl:text-lg'>
                                From easy mobile payment to secure, digital result retrieval, we make managing your diagnostics simple. Your
                                entire testing history is secure and accessible in one place, giving you a clear, single source of truth for
                                your health data. </p>
                        </div>
                    </div>
                </div>
                
            </div>

            <div id='testimonials' className='w-full flex flex-col items-center justify-center bg-white h-auto px-4 xl:px-16 py-12'>
                <div className='w-full lg:w-11/12 flex flex-col items-center justify-center'>
                    <h3 className='text-lg md:text-xl font-semibold tracking-widest'>TESTIMONIALS</h3>
                    <p className='text-sm xl:text-base text-center mb-6 md:mb-0'>Hear what our customers say about us</p>

                    <div className='w-full h-auto grid md:grid-cols-2 gap-12 mt-6 place-items-center'>
                        <div className='flex flex-col gap-2 items-center justify-center h-auto mb-6 md:mb-0'>
                            <img className='h-96 object-cover w-64 rounded-md' src={testimonials[testimonialIndex].image} />

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
                <div className='w-full lg:w-11/12 flex flex-col items-center justify-center'>
                        <h3 className='text-lg md:text-xl font-semibold tracking-widest self-start'>HOW IT WORKS</h3>
                        <p className=' text-lg text-gray-500 lg:text-xl text-center self-start'>Getting the tests you need should be effortless. Here is the simple process:</p>
                        <button onClick={()=>navigate('/dashboard/All')} className='text-white bg-[var(--secondary-color)] px-6 py-2 rounded-full mt-4 self-start text-xl lg:text-2xl font-medium'>Get Started</button>
                
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
                <div className='w-full lg:w-11/12 flex flex-col items-center justify-center'>
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

            <div id='latest-news' className='w-full flex flex-col items-center justify-center bg-[var(--medium-gray)] h-auto px-4 xl:px-16 py-12'>
                <div className='w-full lg:w-11/12 flex flex-col items-center justify-center'>
                                    <h3 className='text-lg md:text-xl font-semibold tracking-widest'>LATEST NEWS</h3>
                                    <p className=' text-base text-gray-500 lg:text-lg text-center'>Read more about what's been going on!</p>
                                    
                                    <div className='flex overflow-x-auto w-full h-auto no-scrollbar relative wrapper justify-start items-center'>
                                        {/* <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[var(--medium-gray)] to-transparent pointer-events-none z-10"></div> */}

                                        <div className='flex animate-scroll'>
                                            <div className='h-auto flex items-center justify-center gap-6 mt-12 pr-6 py-10'>
                                                {news?.map((item, index) => {
                                                    return (
                                                        <div key={`${index}.1`} className='flex flex-col items-center justify-start h-96 w-96 relative flex-grow-0 flex-shrink-0'>
                                                            <img src={item.image} className='h-[320px] w-full object-cover rounded-xl' />
                                                            <div className='bg-white rounded-xl absolute top-52 z-10 h-auto w-72 flex flex-col gap-1 py-1 px-1 items-center justify-center shadow-xl'>
                                                                <h3 className='text-center text-sm xl:text-base text-gray-500'>{item.hook}</h3>
                                                                <p className='text-center font-bold cursor-pointer text-base xl:text-lg text-[var(--secondary-color)]' onClick={()=>{
                                                                        setNewsModalIndex(index);
                                                                        setOpenNewsModal(true);
                                                                    }
                                                                }>Read More</p>
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                            </div>

                                            <div className='h-auto flex items-center justify-center gap-6 mt-12 pr-6 py-10'>
                                                {news?.map((item, index) => {
                                                    return (
                                                        <div key={`${index}.2`} className='flex flex-col items-center justify-start h-96 w-96 relative flex-grow-0 flex-shrink-0'>
                                                            <img src={item.image} className='h-[320px] w-full object-cover rounded-xl' />
                                                            <div className='bg-white rounded-xl absolute top-52 z-10 h-auto w-72 flex flex-col gap-1 py-1 px-1 items-center justify-center shadow-xl'>
                                                                <h3 className='text-center text-sm xl:text-base text-gray-500'>{item.hook}</h3>
                                                                <p className='text-center font-bold cursor-pointer text-base xl:text-lg text-[var(--secondary-color)]' onClick={()=>{
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
                        <img className='h-full object-contain' src={subscribe_bro} alt="Subscribe" />
                    </div>
                                    
                </div>
            </div>

        </section>
    )
}


export default LandingPage;