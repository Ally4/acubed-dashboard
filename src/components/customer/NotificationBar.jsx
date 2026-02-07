import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { getNotifications } from '../../services/dashboardService'
import { CgFileDocument } from "react-icons/cg";

const NotificationBar = (props) => {
    const navigate = useNavigate()
    const user = useSelector((state) => state.login.data);
    const userId = user ? user.id : null;
    const token = user ? user.token : null
    const [newOrders, setNewOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchNewOrders = async () => {
        setLoading(true);
        try {
            const orders = await getNotifications(token);
            console.log('notifications: ',orders)
            setNewOrders(orders);
        } catch (err) {
            console.error('Error fetching new orders:', err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if(!token) return
        fetchNewOrders();
    }, [token]);

    return(
        <div className='h-full w-full md:w-96 flex flex-col items-center jusitfy-start border-l backdrop-blur-md bg-white/60 border-[var(--light-border-color)] right-0 top-[56px] z-20 fixed px-2'>
            <h3 className='font-bold text-gray-700 text-3xl md:text-2xl xl:text-3xl mt-16 mb-12'>Notifications</h3>
            <p className='h-9 w-9 flex items-center justify-center rounded-md bg-[#a3b1c0] hover:bg-opacity-80 text-white cursor-pointer absolute top-4 right-4' onClick={props.onClose}>✖</p>
            {loading ? (<img src="/secondary_color_spinner.svg" className="w-20 h-20"/>)
                : newOrders.length == 0 ? (
                    <div className='w-full h-auto flex flex-col items-center justify-center'>
                        <p className='text-gray-500 text-xl md:text-lg'>No new notifications</p>
                    </div>
                ) :
                    newOrders?.map((item) => (
                    <div className='bg-[#1c7d7f] bg-opacity-15 w-full rounded-lg px-3 pt-8 md:pt-4 pb-3 flex items-center justify-start gap-2 border border-[#58bbbc] mb-2 mt-2 relative'>
                        <div className="bg-[var(--secondary-color)] rounded-full flex items-center justify-center h-14 w-14">
                            <CgFileDocument className="text-white" size={35} />
                        </div>
                        <div className="flex flex-col justify-start">
                            <h3 className='text-xl md:text-lg font-bold text-[var(--secondary-color)] text-left m-0'>{item.status == "COMPLETED" ? "Your results are ready!" : "Your results are pending."}</h3>
                            <h3 className='font-medium text-xl md:text-base text-gray-700 text-left m-0'>{item?.testInfo?.testName}</h3>
                            <p className='font-medium text-lg md:text-sm text-gray-600 text-left my-0 mx-0'>{item?.facility?.name}</p>
                        </div>
                        <button onClick={()=>navigate(`/order-details/${item.id}`)} className="absolute right-3 bottom-2 py-1 px-2 text-base ">View</button>
                        <p className="absolute top-1 right-2 text-sm text-gray-500">{item.createdAt.split('T')[0]}</p>
                        <p className="absolute top-1 left-2 text-sm text-gray-500">Order ID: {item?.id}</p>
                    </div>))
            }

            {/* {newOrders.length === 0 && (
                <div className='w-full h-auto flex flex-col items-center justify-center'>
                    <p className='text-gray-500 text-2xl md:text-lg'>No new notifications</p>
                </div>
            )}

            {newOrders.length > 0 && newOrders?.map((item) => (
                <div className='bg-white w-full rounded-lg px-3 py-2 flex flex-col items-start justify-center border border-[var(--light-border-color)] mb-2 mt-2 cursor-pointer hover:bg-gray-50'>
                    <h3 className='text-2xl md:text-lg font-semibold text-green-600 m-0'>Order Complete</h3>

                    <h3 className='font-medium text-3xl md:text-xl text-gray-800'>{item?.test_name}</h3>
                    <p className='text-2xl md:text-lg text-gray-500'>{item?.facility_name}</p>
                </div>
        ))} */}   
        </div>

        
    )




}

export default NotificationBar