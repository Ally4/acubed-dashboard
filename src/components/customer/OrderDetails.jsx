import React, { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { fetchOrderFromID } from '../../services/orderService'
import Sidebar from './Sidebar'


const OrderDetialComponenet = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [orderId, setOrderId] = useState(searchParams.get('orderId'))
    const [orderData, setOrderData] = useState({})
    const [loading, setLoading] = useState(false)

    const getOrderFromId = async () => {
        setLoading(true)
        const result = await fetchOrderFromID(orderId)
        console.log('fetched order data: ', result)
        if (result) {
            // set the data
            setOrderData(result)
        }
        setLoading(false)
    }

    useEffect(() => {
        getOrderFromId(orderId)
    },[orderId])

    const statusColor = (status) => {
        switch (status) {
            case 'Pending':
                return {text: '#FE9900', bg: '#F9C476'};
            case 'Complete':
                return {text: '#39BC05', bg: '#E9FCD2'};
            case 'Cancelled':
                return {text: '#C51F1F', bg: '#F68989'};
            case 'Confirmed':
                return {text: '#2196F3', bg: '#BBDEFB'};
            default:
                return {text: '#FE9900', bg: '#F9C476'};
        }
    }


    return(
        <section className='w-full h-full min-h-screen flex flex-col overflow-y-auto bg-[#f4fdfd] items-center justify-flex-start px-2 py-1'>
            <div className='w-10/12 mt-16 mb-12'>
                <h3 className='text-3xl md:text-4xl font-semibold'>Order ID:{orderId}</h3>
                <p className='text-base text-gray-500'>View details of your order</p>
            </div>
            <div className='w-10/12 flex flex-col items-center justify-center h-auto'>
                {loading || !orderData ? (<><img src='/spinner-200px-200px.svg' alt="Loading..." /></>) 
                :
                (<>
                    <div className='w-full flex flex-col items-center justify-center rounded-lg border border-gray-300 pyb-8 bg-white mb-10 shadow-md'>
                        <div className='top-0 mb-6 border-b-gray-300 border-b bg-[#f4fdfd] w-full rounded-tl-lg rounded-tr-lg'>
                            <h3 className=' text-xl md:text-2xl font-semibold ml-3'>Order Items</h3>
                        </div>

                        <div className='w-full h-auto py-1 px-3 md:px-6 flex items-center justify-between mb-6'>
                            <div className='h-full w-auto flex items-end gap-8'>
                                <div className='rounded-md h-24 w-24 border border-gray-600'>

                                </div>
                                <p className='text-lg md:text-xl font-semibold text-gray-600'>{orderData?.diagnosis}</p>

                            </div>
                            <p className='text-lg font-semibold md:text-xl bg-white border border-[#ccc] px-3 py-1 rounded-lg shadow-sm'>RWF 7</p>
                        </div>

                    </div>

                    <div className='w-full flex flex-col items-center justify-center rounded-lg border border-gray-300 pyb-8 bg-white mb-10 shadow-md'>
                        <div className='top-0 mb-6 border-b-gray-300 border-b bg-[#f4fdfd] w-full rounded-tl-lg rounded-tr-lg'>
                            <h3 className='text-xl md:text-2xl font-semibold ml-3'>Order Summary</h3>
                        </div>

                        <div className='w-full h-auto py-1 px-3 md:px-6 flex items-center mb-2'>
                            <h3 className='text-lg md:text-xl border rounded-xl py-1 px-2 font-semibold' style={{
                                borderColor: statusColor(orderData?.status).text,
                                backgroundColor: statusColor(orderData?.status).bg,
                                color: statusColor(orderData?.status).text
                            }}>{orderData?.status}</h3>
                        </div>
                        <div className='w-full h-auto py-1 px-3 md:px-6 flex flex-col mb-6'>
                            <h3 className='text-base md:text-lg'>Ordered from: Facility 1</h3>
                            <p className='text-base md:text-lg'>On: September 10th 2025</p>
                        </div>

                    </div>
                </>
                )}

            </div>
        </section>
    )
}


const OrderDetails = () => (
    <div style={{width: '100%', height: '100%',minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Sidebar />
        <OrderDetialComponenet />
    </div>
)

export default OrderDetails
