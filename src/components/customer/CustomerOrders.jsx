import React, { useState, useEffect } from "react";
import '../../style/CustomerOrders.css'
import Sidebar from "./Sidebar";
import { useSelector } from 'react-redux';
import axios from "axios";

const CustomerOrders = () => {
    const user = useSelector((state) => state.login.data);
    const [activeOrders, setActiveOrders] = useState(true)
    const [loading, setLoading] = useState(false)
    const [activeOrderData, setActiveOrderData] = useState([])
    const [completedOrderData, setCompletedOrderData] = useState([])
    const [activePageIndex,setActivePageIndex] = useState(0)
    const [completedPageIndex,setCompletedPageIndex] = useState(0)
    const [userId, setUserId] = useState(null)

    const [activeOrderSplitData, setActiveOrderSplitData] = useState([]);
    const [completedOrderSplitData, setCompletedOrderSplitData] = useState([]);

    useEffect(() => {
            const id = user ? user.data?.id : null;
            setUserId(id);
            fetchOrders(id)
        }, [user]);

    const fetchOrders = async (id) => {
        setLoading(true)
        const response = await axios.post('http://localhost:4000/getOrders', {userId: id})

        if (response.status >= 200 && response.status < 300) {
            const orders = response.data.data;
            console.log('orders: ', orders)
            const activeOrdersList = []
            const completedOrdersList = []

            orders.forEach((item) => {
                if(item.status == 'Complete') {
                    completedOrdersList.push(item)
                } else {
                    activeOrdersList.push(item)
                }
            })

            setActiveOrderData(activeOrdersList)
            setCompletedOrderData(completedOrdersList)
        }

        setLoading(false)
    }

    const SplitData = (data) => {
        const pages = Math.ceil(data.length / 16)
        // console.log(`pages: ${pages}`)
        const split = []
        for (let i=0;i<pages;i++){
            let c = data.slice(i*16,(i+1)*16)
            split[i] = c
        }
        return split
    }

    useEffect(() => {
            setActiveOrderSplitData(SplitData(activeOrderData))
            setCompletedOrderSplitData(SplitData(completedOrderData))
        }, [activeOrderData, completedOrderData])

    const cancelOrder = async () => {
        console.log('cancel order')
    }

    const viewResults = () => {
        console.log('view order results')
    }

    return (
        <section id="orders">
            <div className="header-container">
                <p className={`${activeOrders ? `selected` : ``}`} onClick={() => {setActiveOrders(true)}}>Active</p>
                <p className={`${!activeOrders ? `selected` : ``}`} onClick={() => {setActiveOrders(false)}}>Completed</p>
            </div>

            {loading ? (<><img src='/spinner-200px-200px.svg' alt="Loading..." /></>) :

            (<>
                {activeOrders ? (
                <div className='data-container'>
                    <div className='pagination'>
                        <button onClick={() => setActivePageIndex(activePageIndex - 1)} disabled={activePageIndex === 0}>Previous</button>
                        <button onClick={() => setActivePageIndex(activePageIndex + 1)} disabled={activePageIndex === activeOrderSplitData.length - 1}>Next</button>
                    </div>

                    <div className='order-viewable-data'>
                        {activeOrderSplitData[activePageIndex]?.map((item) => (               
                                    <div className="card">
                                        <div className="text">
                                            <p><span>Test: </span>{item['testType']}</p>
                                            <p><span>Facility: </span>{item['facility']}</p>
                                            <p><span>Status: </span>{item['status']}</p>
                                        </div>
                                        <button className="btn">
                                            Cancel
                                        </button>
                                    </div>                       
                                ))}
                    </div>
                </div>)
            :
            
            (
                <div className='data-container'>
                    <div className='pagination'>
                        <button onClick={() => setCompletedPageIndex(completedPageIndex - 1)} disabled={completedPageIndex === 0}>Previous</button>
                        <button onClick={() => setCompletedPageIndex(completedPageIndex + 1)} disabled={completedPageIndex === completedOrderSplitData.length - 1}>Next</button>
                    </div>
                    
                    <div className='order-viewable-data'>
                        {completedOrderSplitData[completedPageIndex]?.map((item) => (               
                                    <div className="card">
                                        <div className="text">
                                        <p><span>Test: </span>{item['testType']}</p>
                                        <p><span>Facility: </span>{item['facility']}</p>
                                        </div>

                                        <button className="btn">
                                            View Results
                                        </button>
                                    </div>                       
                                ))}
                    </div>
                </div>
            )}
            </>)}
        </section>
    );
};


const OrdersExport = () => (
    <div style={{width: '100%', height: '100vh',minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Sidebar />
        <CustomerOrders />
    </div>
)

export default OrdersExport;
