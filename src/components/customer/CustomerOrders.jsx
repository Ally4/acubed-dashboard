import React, { useState, useEffect, useMemo } from "react";
import '../../style/CustomerOrders.css'
import Sidebar from "./Sidebar";
import { useSelector } from 'react-redux';
import { DataGrid } from "@mui/x-data-grid";
import { fetchOrders } from '../../services/orderService'
import { IoSearch } from "react-icons/io5";

const CustomerOrders = () => {
    const user = useSelector((state) => state.login.data);
    const [loading, setLoading] = useState(false)
    const [OrderData, setOrderData] = useState([])
    const [rows, setRows] = useState([])
    const [columns, setColumns] = useState([])
    const [userId, setUserId] = useState(null)

    useEffect(() => {
            const id = user ? user.data?.id : null;
            setUserId(id);
            setOrders(id)
        }, [user]);

    

    const Button = ({params}) => {
        return(
            <div className="text-semibold text-base text-center cursor-pointer h-full flex flex-col" onClick={()=>console.log('clicked')}>
                <p className="text-base text-semibold my-auto">{params}</p>
            </div>
        )
    }
    
    const c = useMemo(()=>[
                {
                    field:'id',
                    headerName: 'Order ID', 
                    flex: 1, 
                    headerClassName: 'font-semibold text-base', 
                    disableClickEventBubbling: true,
                },
                {
                    field: 'testType', 
                    headerName: 'Diagnosis', 
                    flex: 1, 
                    headerClassName: 'font-semibold text-base', 
                    disableClickEventBubbling: true,

                },
                {
                    field: 'facilityName', 
                    headerName: 'Facility', 
                    filterable: true, 
                    flex: 1, 
                    headerClassName: 'font-semibold text-base',
                    disableClickEventBubbling: true,
                },
                {
                    field: 'facilityAddress',
                    headerName: 'Address',
                    flex: 1,
                    headerClassName: 'font-semibold text-base', 
                    disableClickEventBubbling: true,
                },
                {
                    field: 'status', 
                    headerName: 'Status', 
                    flex: 1, 
                    filterable: true, 
                    headerClassName: 'font-semibold text-base', 
                    disableClickEventBubbling: true, 
                    renderCell: (params) => {
                        const getStatusStyle = (status) => {
                            switch (status) {
                            case 'Complete': return { backgroundColor: '#e8f5e8', color: '#2e7d2e', border: '1px solid #4caf50' };
                            case 'Cancelled': return { backgroundColor: '#ffeaea', color: '#c62828', border: '1px solid #f44336' };
                            case 'Pending': return { backgroundColor: '#fff3e0', color: '#ef6c00', border: '1px solid #ff9800' };
                            default: return { backgroundColor: '#f5f5f5', color: '#666', border: '1px solid #ccc' };
                            }
                        }
                        return (
                            <span style={{
                            ...getStatusStyle(params.value)
                            }} className="rounded-xl px-2 py-1 text-base">
                            {params.value}
                            </span>
                        );},
                },
                {
                    field: 'inspect',
                    headerName: 'Inspect', 
                    flex: 0.5, 
                    filterable: false, 
                    sortable: false, 
                    disableClickEventBubbling: true, 
                    headerClassName: 'font-semibold text-base',
                    renderCell: (params) => {
                        console.log('inspect params: ',params.value)
                        return <Button params={params.value}/>
                    },
                    headerAlign: 'center'
                }
            ])

    const setOrders = async (id) => {
        setLoading(true)
        try {
            const orders = await fetchOrders(id)
            console.log('orders:', orders)
            setOrderData(orders)
            
            const r = orders.map((item) => {
                return {
                    id: item.orderId,
                    testType: item.testType,
                    facilityName: item.facilityName,
                    facilityAddress: item.facilityAddress, 
                    status: item.status,
                    inspect: item.status === "Complete" ? "results" : "view"
                }
            })
            setRows(r)
            setColumns(c)
        } catch (error) {
            console.error('Error: ',error)
        } finally {
            setLoading(false)
        }
        
    }


    const cancelOrder = async () => {
        console.log('cancel order')
    }

    const viewResults = () => {
        console.log('view order results')
    }
    console.log('rows: ',rows)
    console.log('columns: ', columns)
    return (
        <section id="orders">
            
            <div className="mt-16 mb-12 w-11/12">
                <h2 className='text-4xl font-semibold'>Orders</h2>
                <p className='text-base text-gray-500'>View or print your order history</p>
            </div>
            <div className="w-11/12 h-auto flex flex-col items-center justify-center rounded-lg border border-gray-300 py-6 px-4 bg-white mb-10">

            {loading ? (<><img src='/spinner-200px-200px.svg' alt="Loading..." /></>) :

            (<>
                <div className="w-full flex items-center justify-between px-3 py-2 mb-6">
                    <h3 className="text-gray-500 text-sm md:text-2xl">3 Orders this month</h3>
                    <button className="rounded-lg px-3 py-2 text-base md:text-xl font-semibold text-white bg-[#00c2cb]">Export Order History</button>
                </div>

                <div className='w-10/12 flex items-center rounded-2xl px-5 py-2 bg-white border border-[#ccc] mb-10 m-w-4xl'>
                    <input className='w-full text-gray-400 text-base md:text-xl p-0 m-0 focus:outline-none' type='text' placeholder='Search...'/>
                    <div className='icon'>
                        <IoSearch size={28} color="gray"/>
                    </div>
                    <p className="text-base md:text-xl ml-3 text-gray-400 cursor-pointer">Clear</p>
                    
                </div>
                {OrderData.length != 0 && rows.length != 0 && columns.length != 0 ? (
                <div className='data-container mt-5'>
                    <DataGrid rows={rows} columns={columns} getRowId={row => row.id} pageSize={8} pageSizeOptions={[5,10,20]} className="w-full rounded-sm shadow-sm"/>
                </div>)
            :
            
            (
                <div className='data-container'>
                    <p className="text-base mt-5">No order history</p>
                </div>
            )}
            </>)}
            </div>
        </section>
    );
};


const OrdersExport = () => (
    <div style={{width: '100%', height: '100%',minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Sidebar />
        <CustomerOrders />
    </div>
)

export default OrdersExport;
