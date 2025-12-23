import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../../style/newOrder.css';

const OrderCompleteModal = (props) => {
    const navigate = useNavigate()
    const handleOverlayClick = (e) => {
        // Only close if the clicked element is the overlay itself
        if (e.target === e.currentTarget) {
            props.onClose();
        }
    };
    return (
        <>
            <div className='overlay' onClick={handleOverlayClick}></div>
            <div className='border border-[var(--light-border-color)] relative rounded-lg bg-white flex flex-col gap-6 items-center justify-center h-auto w-11/12 md:w-3/4 lg:w-3/5 xl:w-7/12 2xl:w-1/2 px-3 py-2' id='new-order' onClick={(e) => e.stopPropagation()}>
                <p className='h-9 w-9 flex items-center justify-center rounded-md bg-[#a3b1c0] hover:bg-opacity-80 text-white cursor-pointer absolute top-4 right-4' onClick={props.onClose}>✖</p>

                <div className='rounded-full w-52 h-52 bg-yellow-300 mb-6'>

                </div>
                <p className='text-gray-700 font-medium text-lg lg:text-xl mb-6'>Your order has been successfully placed. We advise you to provide your sample as soon as possible for fastest results.</p>

                <div className='flex items-center justify-center w-full gap-6'>
                    <button onClick={()=>navigate('/dashboard/All')} className='font-medium'>Home</button>
                    <button onClick={()=>navigate('/my-orders')} className='font-medium bg-white text-[var(--secondary-color)]'>Orders</button>
                </div>
            </div>    
        </>
    )
}

export default OrderCompleteModal