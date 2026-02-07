import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { fetchOrderFromID } from '../../../services/orderService'
import { updateOrderViewedStatus } from '../../../services/dashboardService'
// import Sidebar from '../Sidebar'
import { pdfjs } from 'react-pdf'
import { iconAssigner } from '../../../utils/imageUtils'
import { useSelector } from 'react-redux'
import { verifyUser } from '../../../services/userService'

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

const OrderDetailComponent = () => {
    const { orderId } = useParams();
    const navigate = useNavigate();
    const [orderData, setOrderData] = useState({})
    const [loading, setLoading] = useState(false)
    const [verifying, setVerifying] = useState(false)
    const [currency, setCurrency] = useState('')
    const [authSuccess, setAuthSuccess] = useState(null)
    const [formData, setFormData] = useState({
        orderId: '',
        identifier: '',
        password: ''
    })
    const [errors, setErrors] = useState({})

    const user = useSelector((state) => state.login.data);
    const userId = user ? user.id : null;
    const email = user ? user.email : null
    const country = user ? user.country : null;
    const token = user ? user.token : null

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({...formData,
            [name]: value
        })
    }

    const validatePassword = async () => {
        console.log('Validating password')
        setVerifying(true)
        try {
            const valid = await verifyUser(formData,token);
            if (!valid.success) {
                console.log('failed to verify user: ',valid)
                setAuthSuccess(false);
                return;
            }
            //Check orderId
            const updatedViewStatus = await updateOrderViewedStatus(orderId,token)
            if (updatedViewStatus.success) {
                navigate(`/order-details/${orderId}/results`);
            }
        } catch (err) {
            console.error('Failed to verify user: ',err)
            setErrors({...errors, verificationError: "Invalid Credentials"})
        } finally {
            setVerifying(false)
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
            const d = result.orderItems[0]
            setOrderData({...result, waitTime: d?.testCatalog?.turnaroundTime, qty: d?.quantity })
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
            <div className='w-10/12 my-4'>
                <h3 className='text-3xl md:text-4xl font-semibold'>Order Number:{orderData?.orderNumber}</h3>
                <p className='text-base text-gray-500'>View details of your order</p>
                <div className="btn-container mt-3">
                    {/* <Link to="/my-orders" style={{ textDecoration: 'none' }}> */}
                    <button onClick={()=>navigate(-1)} className="back-btn text-white bg-[#0d5d73] hover:bg-opacity-80 border">Back</button>
                    {/* </Link>   */}
                </div>
            </div>
            <div className='w-11/12 md:w-10/12 flex flex-col lg:flex-row gap-2 items-center justify-center h-auto'>
                {loading || !orderData ? (<><img src='/secondary_color_spinner.svg' alt="Loading..." /></>) 
                :
                (<>
                    <div className='w-full max-w-[500px] flex flex-col items-center justify-start gap-2 rounded-lg border border-[var(--light-border-color)] py-8 px-6 bg-white mb-10 shadow-md'>

                        <div className='w-full py-1 px-3 flex flex-col items-start justify-center m-0'>
                            <div className='h-full w-auto flex items-end gap-8'>
                                <div className='rounded-md h-20 w-20 border border-[var(--light-border-color)] bg-[#0d5d73] bg-opacity-15 flex items-center justify-center'>
                                    {iconAssigner(orderData?.testInfo?.sampleType,60,'test')}
                                </div>
                                <p className='text-xl md:text-2xl font-semibold text-gray-600'>{orderData?.testInfo?.testName}</p>

                            </div>

                            <h3 className='text-base md:text-lg border rounded-xl py-1 px-2 font-semibold my-4' style={{
                                borderColor: statusColor(orderData?.status).text,
                                backgroundColor: statusColor(orderData?.status).bg,
                                color: statusColor(orderData?.status).text
                            }}>{orderData?.status}</h3>
                            
                            <h3 className='text-sm lg:text-base'><span className='font-medium'>Ordered From:</span>: {orderData?.facility?.name}</h3>
                            <p className='text-sm lg:text-base'><span className='font-medium'>On:</span> {orderData?.createdAt?.split('T')[0]}</p>
                        </div>

                        <div className='w-full h-auto py-1 px-3 flex flex-col items-start justify-start'>
                            <p className=' text-sm lg:text-base mb-2 text-gray-700'><span className='font-medium'>Facility Email:</span> {orderData?.facility?.email}</p>
                            <p className=' text-sm lg:text-base mb-2 text-gray-700'><span className='font-medium'>Facility Phone:</span> {orderData?.facility?.phone}</p>
                            <p className=' text-sm lg:text-base mb-2 text-gray-700'><span className='font-medium'>Facility Address:</span> {orderData?.facility?.address}</p>

                            <br />
                            <p className=' text-sm lg:text-base mb-2 text-gray-700'><span className='font-medium'>Amount:</span> {orderData?.totalAmount} {currency}</p>
                            <p className=' text-sm lg:text-base mb-2 text-gray-700'><span className='font-medium'>Wait Time:</span> {orderData?.waitTime}</p>
                            <p className=' text-sm lg:text-base mb-2 text-gray-700'><span className='font-medium'>Qty:</span> {orderData?.qty}</p>
                            <p className=' text-sm lg:text-base mb-2 text-gray-700'><span className='font-medium'>Collection Address:</span> {orderData?.collectionAddress}</p>
                        </div>
                    </div>

                    <form className='w-full max-w-[450px] flex flex-col items-center justify-center gap-2 lg:gap-12 rounded-lg border border-[var(--light-border-color)] py-8 px-12 lg:px-6 bg-white mb-10 shadow-md'>
                        <h3 className='text-lg md:text-xl text-gray-700 xl:text-2xl font-medium'>Results: {orderData?.resultFileUrl ? 'Available' : 'Unavailbale'}</h3>
                                {orderData?.resultFileUrl && <div className='flex flex-col w-full gap-3'>
                                    <div className=''>
                                        <label for='orderId' className='text-sm lg:text-base text-[var(--secondary-color)] mb-1'>Order ID</label>
                                        <input type="text" name='orderId' id="orderId" className='border border-[var(--light-border-color)] px-3 py-2 rounded-md w-full focus:outline-none' onChange={handleChange} />
                                        {authSuccess === false && <div className='text-red-500 text-xs md:text-sm'>Incorrect Order ID. Please try again.</div>}
                                    </div>
                                    <div className=''>
                                        <label for='email_or_phonenumber' className='text-sm lg:text-base text-[var(--secondary-color)] mb-1'>Email or Phonenumber</label>
                                        <input type="text" name='identifier' id="email_or_phonenumber" className='border border-[var(--light-border-color)] px-3 py-2 rounded-md w-full focus:outline-none' onChange={handleChange} />
                                        {authSuccess === false && <div className='text-red-500 text-xs md:text-sm'>Incorrect email or phonenumber. Please try again.</div>}
                                    </div>
                                    <div className=''>
                                        <label for='password' className='text-sm lg:text-base text-[var(--secondary-color)] mb-1'>Password</label>
                                        <input type="password" name='password' id="password" className='border border-[var(--light-border-color)] px-3 py-2 rounded-md w-full focus:outline-none' onChange={handleChange} />
                                        {authSuccess === false && <div className='text-red-500 text-xs md:text-sm'>Incorrect password. Please try again.</div>}
                                    </div>
                                    <div onClick={()=>validatePassword()} className='flex items-center justify-center px-4 py-2 rounded-lg text-lg xl:text-xl border font-medium text-white bg-[#136a82] cursor-pointer hover:bg-opacity-80'>
                                        {!verifying ? <h3 className='m-0 text-centerfont-medium text-white'>View PDF</h3> : <img src='\gray_spinner.svg' className='w-8 h-8' />}
                                    </div>
                                    {errors.verificationError && <p className='text-red-500 text-sm md:text-base' >{errors.verificationError}</p>}
                                    </div>}
                    </form>

                    
                </>
                )}

            </div>
        </section>
    )
}

export default OrderDetailComponent
