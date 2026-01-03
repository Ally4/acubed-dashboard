import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { fetchOrderFromID } from '../../services/orderService'
import { updateOrderViewedStatus } from '../../services/dashboardService'
import Sidebar from './Sidebar'
import { pdfjs } from 'react-pdf'
import { iconAssigner } from '../../utils/imageUtils'
import { useSelector } from 'react-redux'
import { authenticateUser } from '../../services/userService'

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

const OrderDetailComponent = () => {
    const { orderId } = useParams();
    const navigate = useNavigate();
    const [orderData, setOrderData] = useState({})
    const [loading, setLoading] = useState(false)
    const [currency, setCurrency] = useState('')
    const [enteredPassword, setEnteredPassword] = useState('')
    const [authSuccess, setAuthSuccess] = useState(null)

    const user = useSelector((state) => state.login.data);
    const userId = user ? user.id : null;
    const email = user ? user.email : null
    const country = user ? user.country : null;
    const token = user ? user.token : null

    const handlePasswordChange = (e) => {
        setEnteredPassword(e.target.value);
    }

    const validatePassword = async () => {
        console.log('Validating password')
        const valid = await authenticateUser({ email: email, password: enteredPassword });
        if (!valid) {
            setAuthSuccess(false);
            return;
        }
        const updatedViewStatus = await updateOrderViewedStatus(orderId,token)
        if (updatedViewStatus.success) {
            navigate(`/order-details/${orderId}/results`);
        }
        // navigate(`/order-details/${orderId}/results`);
        
    }

    useEffect(() => {
            if (!country) return;
            setCurrency(country === 'Ethiopia' ? 'EBT' : 'RWF');
        }, [country]);
    

    const getOrderFromId = async (id,token) => {
        setLoading(true)
        const result = await fetchOrderFromID(id,token)
        console.log('fetched order data: ', result)
        if (result) {
            // set the data
            setOrderData(result)
        }
        setLoading(false)
    }

    useEffect(() => {
        if(!token) return
        getOrderFromId(orderId,token)
    },[orderId,token])

    const statusColor = (status) => {
        switch (status) {
            case 'PENDING':
                return {text: '#FE9900', bg: '#fff3e0'};
            case 'COMPLETED':
                return {text: '#39BC05', bg: '#E9FCD2'};
            case 'CANCELLED':
                return {text: '#C51F1F', bg: '#F68989'};
            default:
                return {text: '#666', bg: '#f5f5f5'};
            // default:
            //     return {text: '#FE9900', bg: '#F9C476'};
        }
    }


    return(
        <section className='w-full h-full min-h-screen flex flex-col overflow-y-auto bg-gradient-to-b from-white to-[#cddfef] items-center justify-flex-start px-2 py-1'>
            <div className='w-10/12 mt-16 mb-12'>
                <h3 className='text-3xl md:text-4xl font-semibold'>Order Number:{orderData?.orderNumber}</h3>
                <p className='text-base text-gray-500'>View details of your order</p>
                <div className="btn-container mt-3">
                    <Link to="/my-orders" style={{ textDecoration: 'none' }}>
                    <button className="back-btn text-white bg-[#0d5d73] hover:bg-opacity-80 border">Back</button>
                    </Link>  
                </div>
            </div>
            <div className='w-11/12 md:w-10/12 flex flex-col items-center justify-center h-auto'>
                {loading || !orderData ? (<><img src='/secondary_color_spinner.svg' alt="Loading..." /></>) 
                :
                (<>
                    <div className='w-full grid lg:grid-cols-2 place-items-start rounded-lg border border-[var(--light-border-color)] py-8 px-12 lg:px-6 bg-white mb-10 shadow-md'>

                        <div className='w-full h-auto py-1 px-3 flex flex-col items-start justify-center mb-6'>
                            <div className='h-full w-auto flex items-end gap-8'>
                                <div className='rounded-md h-24 w-24 border border-[var(--light-border-color)] bg-[#0d5d73] bg-opacity-15 flex items-center justify-center'>
                                    {iconAssigner(orderData?.testInfo?.sampleType,70,'test')}
                                </div>
                                <p className='text-xl md:text-2xl font-semibold text-gray-600'>{orderData?.testInfo?.testName}</p>

                            </div>

                            <h3 className='text-lg md:text-xl border rounded-xl py-1 px-2 font-semibold mb-2 mt-4' style={{
                                borderColor: statusColor(orderData?.status).text,
                                backgroundColor: statusColor(orderData?.status).bg,
                                color: statusColor(orderData?.status).text
                            }}>{orderData?.status}</h3>
                            
                            <h3 className='text-base md:text-lg'>Ordered from: {orderData?.facility?.name}</h3>
                            <p className='text-base md:text-lg'>On: {orderData?.createdAt?.split('T')[0]}</p>

                            <div className='w-full flex flex-col items-start justify-center'>
                                <h3 className='text-xl text-gray-700 md:text-2xl font-medium'>Results: {orderData?.pdf ? 'Available' : 'Unavailbale'}</h3>
                                {orderData?.resultFileUrl && <div className='flex flex-col w-auto gap-3'>
                                    <div>
                                    <h3 className='text-lg xl:text-xl text-[var(--secondary-color)] mb-1'>Enter Password To View PDF</h3>
                                    <input type="password" className='border border-[var(--light-border-color)] px-3 py-2 rounded-md w-80 focus:outline-none' onChange={handlePasswordChange} />
                                    {authSuccess === false && <div className='text-red-500 mt-1'>Incorrect password. Please try again.</div>}
                                    </div>

                                    <h3 onClick={()=>validatePassword()} className=' text-center px-4 py-2 rounded-lg text-lg xl:text-xl border font-medium text-white bg-[#136a82] cursor-pointer hover:bg-opacity-80'>View PDF</h3>
                                    </div>}
                            </div>
                        </div>

                        <div className='w-full h-auto py-1 px-3 flex flex-col items-start justify-start mb-6'>
                            <h3 className='text-[var(--secondary-color)] font-medium text-xl md:text-2xl'>Summary</h3>
                            <p className='font-medium text-lg xl:text-xl mb-2 text-gray-700'>Facility Email: {orderData?.facility?.email}</p>
                            <p className='font-medium text-lg xl:text-xl mb-2 text-gray-700'>Facility Phone: {orderData?.facility?.phone}</p>
                            <p className='font-medium text-lg xl:text-xl mb-2 text-gray-700'>Facility Address: {orderData?.facility?.address}</p>

                            <br />
                            <p className='font-medium text-lg xl:text-xl mb-2 text-gray-700'>Amount: {orderData?.totalAmount} {currency}</p>
                            <p className='font-medium text-lg xl:text-xl mb-2 text-gray-700'>Wait Time: {orderData?.testInfo?.ap}</p>
                            <p className='font-medium text-lg xl:text-xl mb-2 text-gray-700'>Qty: {orderData?.formData?.qty}</p>
                            <p className='font-medium text-lg xl:text-xl mb-2 text-gray-700'>Sample Collection Location: {orderData?.collectionAddress}</p>
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
        <OrderDetailComponent />
    </div>
)

export default OrderDetails
