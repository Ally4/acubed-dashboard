import React, { useState, useEffect } from 'react'
import Sidebar from './Sidebar'






const OrderDetialComponenet = (props) => {

    return(
        <section className='"w-full h-full flex flex-col overflow-y-auto bg-[#f4fdfd] items-center justify-center"'>
            <div className='w-10/12 mt-10 mb-8'>
                <h3 className='md:text-4xl font-semibold'>Order ID:{}</h3>
                <p className='text-base text-gray-500'>View details of your order</p>
            </div>
            <div className='w-10/12 flex flex-col items-center justify-center h-auto rounded-lg border border-gray-300 pyb-8 bg-white mb-10 shadow-md'>

            </div>
        </section>
    )
}


const OrderDetails = () => (
    <div style={{width: '100%', height: '100%',minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'flex-start'}}>
        <Sidebar />
        <OrderDetialComponenet />
    </div>
)

export default OrderDetails
