import { useState, useEffect } from "react";

import '../style/newOrder.css';
const NewsModal = (props) => {

    const handleOverlayClick = (e) => {
        // Only close if the clicked element is the overlay itself
        if (e.target === e.currentTarget) {
            props.onClose();
        }
    };

    return(
        <>
            <div className='overlay' onClick={handleOverlayClick}></div>
            <div className='border border-[var(--light-border-color)] relative rounded-lg bg-white flex flex-col gap-6 font-inter items-center justify-center h-auto w-11/12 md:w-3/4 lg:w-3/5 xl:w-7/12 2xl:w-1/2 px-3 py-2' id='new-order' onClick={(e) => e.stopPropagation()}>
                <img className="h-44 lg:h-64 xl:h-80 w-44 lg:w-64 xl:md:w-80 object-cover flex items-center justify-center mt-8 rounded-xl font-inter" src={props.data.image}/>
                <p className='h-9 w-9 flex items-center justify-center rounded-md bg-[#a3b1c0] hover:bg-opacity-80 font-inter text-white cursor-pointer absolute top-4 right-4' onClick={props.onClose}>✖</p>
                <div className="w-full overflow-y-auto h-64 md:h-72 lg:h-80 xl:h-96 flex items-start justify-center mb-4">
                    <p className="w-10/12 text-left text-gray-600 text-xs md:text-sm lg:text-base xl:text-lg 2xl:text-xl mb-10 font-inter">{props.data.body}</p>
                </div>
            </div>
        </>
    )
}

export default NewsModal;