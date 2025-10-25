import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Sidebar from './Sidebar'

const Checkout = () => {

    return(
        <section id='orders'>
             <div className='w-full md:w-11/12 lg:w-11/12 mt-16 mb-4'>
                <h2 className='text-3xl md:text-4xl font-semibold'>Checkout</h2>
                <p className='text-base text-gray-500'>Review your items and complete your purchase</p>
            </div>

            <div className=''>

            </div>
        </section>
    )
}

const CheckoutExport = () => {
    return (
    <div style={{width: '100%', height: '100%',minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'flex-start'}}>
            <Sidebar />
            <Checkout />
        </div>
    )
}

export default CheckoutExport;