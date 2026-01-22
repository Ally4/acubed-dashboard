import { useState, useEffect } from "react";
import name from '../images/colab_green_logo.png'
import '../style/newOrder.css';
const PrivacyPolicyModal = (props) => {

    const handleOverlayClick = (e) => {
        // Only close if the clicked element is the overlay itself
        if (e.target === e.currentTarget) {
            props.onClose();
        }
    };

    return(
        <>
            <div className='overlay' onClick={handleOverlayClick}></div>
            <div className='border border-[var(--light-border-color)] relative rounded-lg bg-gradient-to-b from-white to-[#cddfef] flex flex-col gap-6 font-inter items-center justify-center h-auto w-11/12 md:w-3/4 lg:w-3/5 xl:w-7/12 2xl:w-1/2 px-10 py-8' id='new-order' onClick={(e) => e.stopPropagation()}>
                <p className='h-9 w-9 flex items-center justify-center rounded-md bg-[#a3b1c0] hover:bg-opacity-80 font-inter text-white cursor-pointer absolute top-4 right-4' onClick={props.onClose}>✖</p>
                <div className='w-full flex items-center justify-start gap-4 mb-8'>
                    <div className='h-5 md:h-6'><img className='logo' src={name} alt="logo" /></div>
                    <p className='text-xs md:text-sm xl:text-base text-gray-800 font-medium w-1/2'>Order diagnostic tests
                        anywhere, anytime</p>
                </div>
                <div className="w-full overflow-y-auto h-64 md:h-72 lg:h-80 xl:h-[500px] max-h-screen flex flex-col items-start justify-start mb-14 text-left text-gray-600 text-xs md:text-sm lg:text-base xl:text-lg">
                    <>
                    <span className='font-bold'>To Whom It May Concern,</span><br />
                    <p className="w-full">
                        I am delighted to recommend Asnake Amelo, with whom I have had the privilege of working for more than a year as co-founders of ACUBED, a health tech startup we built together. I first met Asnake in Kigali, Rwanda, in early 2023 during the Jasiri Talent Investor Program, where we formed a team that has since grown into a thriving partnership. From the beginning, Asnake’s brilliance, discipline, and visionary leadership have stood out.
                    </p><br />
                    <p className='w-full'>
                        Asnake serves as the CEO of ACUBED, and his dedication to healthcare innovation is extraordinary. He combines strategic insight with a deep sense of purpose, driving our mission to transform healthcare delivery in Africa. When we faced complex regulatory hurdles while registering our company in Ethiopia, Asnake turned the challenge into an opportunity. He initiated a collaboration with the Ministry of Health to co-develop a new national standard for medical sample transportation—an effort that led to two national workshops and an ongoing regulatory framework. His systems thinking and persistence in solving real-world problems are exemplary.
                    </p><br />
                    <p className='w-full'>
                        Under his leadership, ACUBED has achieved remarkable milestones. We are regional finalists for the Global Startup Awards Africa, competing in the TotalEnergies Startupper of the Year Challenge, and active participants in the Africa Impact Challenge hosted by the University of Toronto. Recently, we also won the pitch competition at the AfOx Health Innovation Bootcamp at the University of Oxford. 
                    </p>
                    </>
                </div>
            </div>
        </>
    )
}

export default PrivacyPolicyModal;