import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getNewOrders } from '../../services/orderService';
import { useSelector } from 'react-redux';

const NotificationBar = (props) => {
    const user = useSelector((state) => state.login.data);
    const userId = user ? user.data?.id : null;
    const [newOrders, setNewOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchNewOrders = async (id) => {
        setLoading(true);
        try {
            const orders = await getNewOrders(id);
            setNewOrders(orders);
        } catch (err) {
            console.error('Error fetching new orders:', err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchNewOrders(userId);
    }, [userId]);

    return(
        <div className='h-full w-full md:w-96 flex flex-col items-center jusitfy-start border-l backdrop-blur-md bg-white/60 border-[#ccc] right-0 top-0 z-20 fixed px-2'>
            <h3 className='font-semibold text-[var(--secondary-color)] text-4xl md:text-2xl xl:text-3xl mt-16 mb-12'>Notifications</h3>
            <p className='h-9 w-9 flex items-center justify-center rounded-md bg-[#a3b1c0] text-white cursor-pointer absolute top-4 right-4' onClick={props.onClose}>✖</p>

            {newOrders.length === 0 && (
                <div className='w-full h-auto flex flex-col items-center justify-center'>
                    <p className='text-gray-500 text-2xl md:text-lg'>No new notifications</p>
                </div>
            )}

            {newOrders.length > 0 && newOrders?.map((item) => (
                <div className='bg-white w-full rounded-lg px-3 py-2 flex flex-col items-start justify-center border border-[#ccc] mb-2 mt-2 cursor-pointer hover:bg-gray-50'>
                    <h3 className='text-2xl md:text-lg font-semibold text-green-600 m-0'>Order Complete</h3>

                    <h3 className='font-medium text-3xl md:text-xl text-gray-800'>{item?.test_name}</h3>
                    <p className='text-2xl md:text-lg text-gray-500'>{item?.facility_name}</p>
                </div>
        ))}


           
            
        </div>

        
    )




}

export default NotificationBar