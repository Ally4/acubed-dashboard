import React, { useState, useEffect, useMemo } from "react";
import '../../style/CustomerOrders.css'
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { DataGrid } from "@mui/x-data-grid";
import { fetchOrders, SearchOrder } from '../../services/orderService'
import { IoSearch } from "react-icons/io5";
import { rgbToHex } from "@mui/material/styles";

const CustomerOrders = () => {
    const navigate = useNavigate()
    const user = useSelector((state) => state.login.data);
    const [loading, setLoading] = useState(false)
    const [OrderData, setOrderData] = useState([])
    const [rows, setRows] = useState([])
    const [totalRows, setTotalRows] = useState([])
    const [columns, setColumns] = useState([])
    const [searchTerm, setSearchTerm] = useState('');
    // const [filterIds, setFilterIds] = useState([])
    const token = user ? user.token : null
    const userId = user ? user.id : null
    const handleSearch = (e) => {
        setSearchTerm(e.target.value)
    }

    const handleSearchInputPress = async (e) => {
        if(e.key == 'Enter') {
           await Search(searchTerm)
        }
    }

    const Search = async (term) => {
            const res = await SearchOrder(term, userId, token)
            // console.log('res from order search: ',res)
            if (res != null) {
                //we got some that match, show filter the table for those rows
                // setFilterIds(res)
                // console.log('total rows: ', totalRows)
                const filtered = totalRows.filter(k => res.includes(k.inspect.orderId))
                // console.log('filtered rows; ',filtered)
                setRows(filtered)
            } else {
                // show no rows, because none match
                setRows([])
            }
    }

    useEffect(() => {
        if (!token) return  
        setOrders(token)
        }, [token]);

    const goToDetails = (id) => {
        console.log('goToDetails pressed')
        navigate(`/order-details/${id}`);
    }

    

    const Button = ({params}) => {
        return(
            <div className="text-semibold text-base text-center cursor-pointer h-full flex flex-col" onClick={()=>goToDetails(params.orderId)}>
                <p className="text-base text-semibold my-auto">{params.label}</p>
            </div>
        )
    }
    
    const c = useMemo(()=>[
                {
                    field:'id',
                    headerName: 'ORDER NUMBER', 
                    flex: 1, 
                    filterable: false,
                    sortable: false,
                    headerClassName: 'font-semibold text-base tracking-wide text-gray-500', 
                    disableClickEventBubbling: true,
                },
                {
                    field: 'testType', 
                    headerName: 'TEST', 
                    flex: 1, 
                    filterable: false,
                    sortable: false,
                    headerClassName: 'font-semibold text-base tracking-wide text-gray-500', 
                    disableClickEventBubbling: true,

                },
                {
                    field: 'facilityName', 
                    headerName: 'FACILITY', 
                    filterable: false, 
                    sortable: false,
                    flex: 1, 
                    headerClassName: 'font-semibold text-base tracking-wide text-gray-500',
                    disableClickEventBubbling: true,
                },
                {
                    field: 'facilityAddress',
                    headerName: 'COLLECTION ADDRESS',
                    flex: 1,
                    filterable: false,
                    sortable: false,
                    headerClassName: 'font-semibold text-base tracking-wide text-gray-500', 
                    disableClickEventBubbling: true,
                },
                {
                    field: 'status', 
                    headerName: 'STATUS', 
                    flex: 1, 
                    filterable: true, 
                    sortable: false,
                    headerClassName: 'font-semibold text-base tracking-wide text-gray-500', 
                    disableClickEventBubbling: true, 
                    renderCell: (params) => {
                        const getStatusStyle = (status) => {
                            switch (status) {
                            case 'COMPLETED': return { backgroundColor: '#e8f5e8', color: '#2e7d2e', border: '1px solid #4caf50' };
                            case 'CANCELLED': return { backgroundColor: '#ffeaea', color: '#c62828', border: '1px solid #f44336' };
                            case 'PENDING': return { backgroundColor: '#fff3e0', color: '#ef6c00', border: '1px solid #ff9800' };
                            default: return { backgroundColor: '#f5f5f5', color: '#666', border: '1px solid var(--light-border-color)' };
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
                    headerName: 'INSPECT', 
                    flex: 0.5, 
                    filterable: false, 
                    sortable: false, 
                    disableClickEventBubbling: true, 
                    headerClassName: 'font-semibold text-base tracking-wide text-gray-500',
                    renderCell: (params) => {
                        // console.log('inspect params: ',params.value)
                        return <Button params={params.value}/>
                    },
                    headerAlign: 'center'
                }
            ])

    const setOrders = async (token) => {
        setLoading(true)
        try {
            const orders = await fetchOrders(token)
            console.log('orders:', orders)
            setOrderData(orders)
            
            const r = orders?.map((item) => {
                return {
                    id: item.orderNumber,
                    testType: item.testInfo?.testName,
                    facilityName: item.testInfo?.facility?.name,
                    facilityAddress: item.collectionAddress, 
                    status: item.status,
                    inspect: {orderId: item.id, label: item.status === "Complete" ? "results" : "view"}
                }
            })
            // setFilterIds(orders.map((item) => {
            //     return item.orderId
            // }))
            setRows(r)
            setTotalRows(r)
            setColumns(c)
        } catch (error) {
            console.error('Error: ',error)
        } finally {
            setLoading(false)
        }
        
    }

    return (
        <section id="orders">
            
            <div className="mt-16 mb-12 w-11/12 md:w-10/12">
                <h2 className='text-3xl md:text-4xl font-semibold'>Order Results</h2>
                <p className='text-base text-gray-500'>View or print your order history</p>
            </div>
            <div className="w-11/12 md:w-10/12 h-auto flex flex-col items-center justify-center mb-10">

            <div className="w-full flex items-center justify-between gap-4 px-3 py-4 mb-6 bg-white border border-[#e5e7eb] shadow-md rounded-[12px]">
                    {/* <h3 className="text-[#0d5d73] text-sm md:text-2xl">3 Orders this month</h3> */}
                

                    <div className='w-11/12 md:w-10/12 flex items-center rounded-2xl px-5 py-2 bg-[#ebeff3] border border-[#0d5d73] m-w-4xl shadow-sm'>
                        <input className='w-full text-[#0d5d73] bg-[#ebeff3] text-base md:text-lg p-0 m-0 focus:outline-none placeholder:text-[#0d5d73]' value={searchTerm} type='text' placeholder='Search...' onChange={handleSearch} onKeyDown={handleSearchInputPress}/>
                        <div className='icon'>
                            <IoSearch size={28} color="#0d5d73" onClick={()=>Search(searchTerm)}/>
                        </div>
                        <p onClick={()=>{
                            setSearchTerm('')
                            setOrders(token)
                        }} className="text-base md:text-lg ml-3 text-[#0d5d73] cursor-pointer">Clear</p>
                        
                    </div>

                    <button className="rounded-lg px-3 py-2 text-base md:text-xl font-medium text-white bg-[#0d5d73] hover:bg-[#094f62]">Export History</button>


                </div>

            {loading ? (<><img src='/secondary_color_spinner.svg' alt="Loading..." /></>) :

            (<>


                {OrderData?.length != 0 && rows?.length != 0 && columns?.length != 0 ? (
                <div className='w-full overflow-x-auto mt-5 shadow-md rounded-[12px]'>
                    <div className="min-w-[1200px]">
                    <DataGrid 
                        rows={rows} 
                        columns={columns} 
                        getRowId={row => row.id} 
                        initialState={{
                            pagination: {
                                paginationModel: { pageSize: 10, page: 0 }
                            }
                        }} 
                        pageSizeOptions={[10]} 
                        className="w-full"
                        sx={{
                            borderRadius: "12px",
                            overflow: "hidden",   // ensures the header rounding works
                            border: "1px solid #e5e7eb",

                            // HEADER STYLING
                            "& .MuiDataGrid-columnHeaders": {
                                backgroundColor: "#f3f4f6",   // light gray
                                fontWeight: 500,              // semibold
                                color: "#374151",             // gray-700
                                borderBottom: "1px solid #e5e7eb",
                            },
                            "& .MuiDataGrid-columnHeaderTitle": {
                                fontWeight: 600,
                                fontSize: "1rem",
                            },

                            // ROW TEXT STYLING
                            "& .MuiDataGrid-cell": {
                                color: "#6b7280", // gray-500 text for all cells
                                fontSize: "0.95rem",
                            },

                            // Remove focus outline on cells
                            "& .MuiDataGrid-cell:focus": {
                                outline: "none",
                            },
                            "& .MuiDataGrid-columnHeader:focus": {
                                outline: "none",
                            },

                            // ROW HOVER COLOR (optional)
                            "& .MuiDataGrid-row:hover": {
                                backgroundColor: "#f9fafb",
                            },
                        }}
                        disableColumnResize={true}
                        />
                        </div>
                </div>)
            :
            
            (
                <div className='data-container'>
                    <p className="text-base md:text-xl mt-5">No order history</p>
                </div>
            )}
            </>)}
            </div>
        </section>
    );
};


const OrdersExport = () => (
    <div style={{width: '100%', height: '100%',minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'flex-start'}}>
        <Sidebar />
        <CustomerOrders />
    </div>
)

export default OrdersExport;
