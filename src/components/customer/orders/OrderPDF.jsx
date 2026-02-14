import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {fetchOrderFromID} from '../../../services/orderService'
import { RiFileUnknowLine } from "react-icons/ri";
import PdfDocument from './PdfDocument'
import { useSelector } from 'react-redux'
const OrderPDFComponent = () => {
    const user = useSelector((state) => state.login.data)
    const navigate = useNavigate()
    const token = user ? user.token : null
    const { orderId } = useParams();
    const [pdfUrl, setPdfUrl] = useState(null)
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState({})

    const download = (url,filename) => {
        try {
            console.log('download PDF')
            const downloadUrl = url.replace('/upload/', '/upload/fl_attachment/');
            var link = document.createElement('a')
            link.href = downloadUrl
            link.download = filename
            document.body.appendChild(link)
            link.click()

            document.body.removeChild(link)
        } catch (e) {
            console.error('Error downloading results: ',e)
            //alert
        }
        
    }

    const getPdf = async () => {
        setLoading(true)
        try {
            const result = await fetchOrderFromID(orderId,token)
            console.log('pdf result: ',result)
            setPdfUrl(result?.resultFileUrl)
        } catch (err) {
            setErrors({...errors, pdfError: "Failed to retrieve PDF"})
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if(!orderId || !token) return
        getPdf()
    },[orderId])

    return (
        <section className='w-full h-full min-h-screen flex flex-col bg-gradient-to-b from-white to-[#cddfef] items-center justify-flex-start px-2 py-1 m-0'>
            <div className='w-10/12 my-4'>
                <h3 className='text-2xl md:text-4xl font-semibold w-full text-wrap m-0'>Order ID:{orderId}</h3>
                <p className='text-base text-gray-500'>Access your diagnostic results</p>
                <div className="btn-container mt-3">
                    <button onClick={()=>navigate(-1)} className="back-btn text-white bg-[#0d5d73] hover:bg-opacity-80 border">Back</button>
                </div>
            </div>
            <div className='w-full md:w-9/12 xl:w-1/2 flex flex-col items-center justify-center gap-6 mb-10'>
                <div className='w-auto max-w-[90dvw] mb-4 h-[600px] border border-[var(--light-border-color)] rounded-md bg-gray-100 flex items-center justify-center'>
                    {loading && <img src='/gray_spinner.svg' className="w-1/2 h-1/2" />}
                    {!loading && pdfUrl ? (
                        <PdfDocument url={pdfUrl} />
                    ) 
                    :
                     (<RiFileUnknowLine className="text-gray-400 w-1/2 h-1/2" />)}
                </div>

                <button onClick={()=>download(pdfUrl,`colab_order_${orderId}_results.pdf`)} disabled={!pdfUrl} className='text-white bg-[#136a82] text-xl xl:text-2xl font-semibold hover:bg-opacity-80 border rounded-lg px-4 py-3'>Download</button>
            </div>
            
        </section>
    )
}

export default OrderPDFComponent