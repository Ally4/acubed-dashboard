import React, { useState, useEffect } from 'react'
import Sidebar from '../Sidebar'
import { Link, useParams } from 'react-router-dom'
import {fetchOrderFromID} from '../../../services/orderService'
import { RiFileUnknowLine } from "react-icons/ri";

const OrderPDFComponent = () => {
    const { orderId } = useParams();
    const [pdfUrl, setPdfUrl] = useState(null)
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState({})

    const download = () => {
        console.log('download PDF')
    }

    const getPdf = async () => {
        setLoading(true)
        try {
            const result = await fetchOrderFromID(orderId)
            setPdfUrl(result?.resultFileUrl)
        } catch (err) {
            setErrors({...errors, pdfError: "Failed to retrieve PDF"})
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if(!orderId) return
        getPdf()
    },[orderId])

    return (
        <section className='w-full h-full min-h-screen flex flex-col bg-gradient-to-b from-white to-[#cddfef] items-center justify-flex-start px-2 py-1 m-0'>
            <div className='w-10/12 mt-16 mb-12'>
                <h3 className='text-3xl md:text-4xl font-semibold'>Order ID:{orderId}</h3>
                <p className='text-base text-gray-500'>Access your diagnostic results</p>
                <div className="btn-container mt-3">
                    <Link to={`/order-details/${orderId}`} style={{ textDecoration: 'none' }}>
                    <button className="back-btn text-white bg-[#0d5d73] hover:bg-opacity-80 border">Back</button>
                    </Link>  
                </div>
            </div>
            <div className='w-full md:w-9/12 xl:w-1/2 flex flex-col items-center justify-center gap-6 p-4 mb-10'>
                <div className='w-full mb-4 h-96 xl:h-[600px] border border-[var(--light-border-color)] rounded-md bg-gray-100 flex items-center justify-center'>
                    {loading && <img src='/gray_spinner.svg' className="w-1/2 h-1/2" />}
                    {!loading && pdfUrl ? (<></>) 
                    :
                     (<RiFileUnknowLine className="text-gray-400 w-1/2 h-1/2" />)}
                </div>

                <button onClick={download} className='text-white bg-[#136a82] text-xl xl:text-2xl font-semibold hover:bg-opacity-80 border rounded-lg px-4 py-3 w-full'>Download</button>
            </div>
            
        </section>
    )
}

export default OrderPDFComponent