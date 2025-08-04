import React, { useState, useEffect } from "react";
import '../../style/CustomerOrders.css'
import Sidebar from "./Sidebar";

const CustomerOrders = () => {
    const [activeOrders, setActiveOrders] = useState(true)
    const [loading, setLoading] = useState(false)
    const [activeOrderData, setActiveOrderData] = useState([])
    const [completedOrderData, setCompletedOrderData] = useState([])
    const [page,setPage] = useState(0)

    const [activeOrderSplitData, setActiveOrderSplitData] = useState([]);
    const [completedOrderSplitData, setCompletedOrderSplitData] = useState([]);

    const fetchOrders = async () => {
        setLoading(true)
        const response = await fetch('http://localhost:4000'+'/getOrders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: {userId: ''}
        })

        if (response.ok) {
            const result = await response.json();
            const activeOrdersList = []
            const completedOrdersList = []

            result.data.forEach((item) => {
                if(item.status == 'active') {
                    activeOrdersList.push(item)
                } else {
                    completedOrdersList.push(item)
                }
            })

            setActiveOrderData(activeOrdersList)
            setCompletedOrderData(completedOrdersList)
        }

        setLoading(false)
    }

    useEffect(() => {
        fetchOrders()
    },[])

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

            {!loading && activeOrders ? (
                <div className='data-container'>
                    <div className='pagination'>
                        <button onClick={() => setPage(page - 1)} disabled={page === 0}>Previous</button>
                        <button onClick={() => setPage(page + 1)} disabled={page === activeOrderSplitData.length - 1}>Next</button>
                    </div>

                    <div className='viewable-data'>
                        {activeOrderSplitData[page]?.map((item) => (               
                                    <div className="card">
                                        <div className="card-container">
                                            <p>{item['testType']}</p>
                                            <p>{item['facility']}</p>
                                            <p>{item['status']}</p>
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
                        <button onClick={() => setPage(page - 1)} disabled={page === 0}>Previous</button>
                        <button onClick={() => setPage(page + 1)} disabled={page === completedOrderSplitData.length - 1}>Next</button>
                    </div>
                    
                    <div className='viewable-data'>
                        {completedOrderSplitData[page]?.map((item) => (               
                                    <div className="card">
                                        <div className="card-container">
                                        <p>{item['testType']}</p>
                                        <p>{item['facility']}</p>
                                        </div>

                                        <button className="btn">
                                            View Results
                                        </button>
                                    </div>                       
                                ))}
                    </div>
                </div>
            )}
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
