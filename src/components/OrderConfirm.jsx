import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from 'react-redux'
import { iconAssigner } from '../utils/imageUtils';
import { FaPaypal } from "react-icons/fa";
import { BsCreditCard2BackFill } from "react-icons/bs";


const OrderConfirm = (props) => {
    const navigate = useNavigate()
    const [cartItems, setCartItems] = useState([])
    const [loading, setLoading] = useState(false)
    const [totalObj, setTotalObj] = useState({})
    const [subTotal, setSubTotal] = useState(null)
    const [currency, setCurrency] = useState('')
    const [allSelected, setAllSelected] = useState(true)
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null)
    const [paymentInfo, setPaymentInfo] = useState(null)
    const [paymentStatus, setPaymentStatus] = useState(null)
    // const [userId, setUserId] = useState(null)
    const user = useSelector((state) => state.login.data);
    const userId = user ? user.data?.id : null;
    const country = user ? user.data?.country : null;

    useEffect(() => {
            if (!country) return;
            setCurrency(country === 'Ethiopia' ? 'EBT' : 'RWF');
        }, [country]);
    
    console.log('user id from params: ', userId)
    const fetchCartItems = async (id) => {
            // if (!id) return
            setLoading(true)
            const items = await props.getCartItems(id)
            console.log('cart items fetched: ', items)
            const sorted_items = items ? items.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)) : []
            setCartItems(sorted_items)
            const t = initTotal(sorted_items)
            console.log('total obj after init: ', t)
            setTotalObj(t)
            setSubTotal(calculateTotalPrice(t))
            setLoading(false)
    }

    const handleSelectAll = (e) => {
        setAllSelected(e.target.checked)
        if (e.target.checked) {
            const newTotal = { ...totalObj };
            for (let key in newTotal) {
                newTotal[key].checked = true;
            }
            setTotalObj(newTotal);
            setSubTotal(calculateTotalPrice(newTotal));
        }
    }

    const handleCheckBoxChange = (id) => {
        if(allSelected) return;
        const newTotal = { ...totalObj };
        newTotal[id].checked = !newTotal[id].checked;
        setTotalObj(newTotal);
        setSubTotal(calculateTotalPrice(newTotal));
    }

    const attemptPayment = async () => {
        if (!selectedPaymentMethod) {
            alert('Please select a payment method before proceeding to checkout.')
            return;
        }
        setLoading(true)
        try {
            const paymentSuccess = await props.checkout(Object.keys(totalObj).filter(k => totalObj[k].checked),userId, selectedPaymentMethod, paymentInfo)
            if (paymentSuccess.success) {
                await props.emptyCart(Object.keys(totalObj).filter(k => totalObj[k].checked))
            }
            setPaymentStatus(paymentSuccess.success)
        } catch (err) {
            console.log('Error during checkout: ', err)
            setPaymentStatus(false)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (!userId) return;
        fetchCartItems(userId);
    }, [userId]);

    const initTotal = (items) => {
    let total = {}
        for (let i=0; i<items.length; i++) {
            total[items[i].id] = {
                qty: items[i].qty, 
                price_per_pc: parseFloat(items[i].price_per_pc.trim().replace(/[^\d.-]/g, '')),
                currency: items[i].price_per_pc.trim().replace(/[\d.,\s]/g,''),
                checked: true,
                delivery_fee: items[i].delivery ? (items[i].info?.delivery_fee ? parseFloat(items[i].info?.delivery_fee) : 0) : 0
            }

        }
        return total
    }

    const calculateTotalPrice = (totalObj) => {
        let totalPrice = 0
        for (let key in totalObj) {
            if (!allSelected && !totalObj[key].checked) continue;
            totalPrice += totalObj[key].qty * totalObj[key].price_per_pc + totalObj[key].delivery_fee
        }
        return totalPrice
    }

    return(
        <div className='flex flex-col xl:flex-row items-center justify-between w-11/12 xl:w-10/12 gap-12 mt-10 mb-6'>
                    
            <div className='flex flex-col gap-6 items-center justify-start w-100 w-full'>
                <div className='w-full flex items-center justify-between bg-white rounded-2xl px-4 py-2 shadow-md border-2 border-[var(--light-border-color)]'>
                    <div className='flex items-center justify-center gap-6'>
                        <h3 className='text-lg md:text-lg xl:text-xl font-medium mb-4 mt-3'>Select All</h3>
                        <input type='checkbox' defaultChecked={allSelected} onChange={handleSelectAll} className='w-8 h-8 accent-[#187089] mt-2' />
                    </div>
                </div>


                <div className='bg-white flex flex-col items-center justify-start border-2 border-[var(--light-border-color)] rounded-2xl shadow-md gap-4 w-full h-auto p-3'>
                    {loading ? (<img className='h-10 w-10' src='/spinner-200px-200px.svg' alt="Loading..." />)
                    : (
                        <>
                            {cartItems && cartItems.length > 0 && cartItems.map((item,index) => {
                                return (
                                    <div key={index} className='flex items-center justify-between gap-3 lg:gap-6 w-full h-40 py-2 px-3 border-b bg-white border-[var(--light-border-color)]'>
                                        <div className='flex items-center justify-center gap-2 md:gap-4 xl:gap-10 h-full w-auto'>  
                                            <div className='rounded-md lg:w-24 md:w-20 lg:h-24 md:h-20 w-16 h-16 bg-[#0d5d73] bg-opacity-15 flex items-center justify-center'>
                                                {iconAssigner(item.icon_id, 60,"test")}
                                            </div> 
                                            <div className='flex flex-col h-full items-start justify-evenly'>
                                                <span className='font-medium text-lg xl:text-xl cursor-pointer'>{item.name}</span>
                                                <p className='text-gray-800 text-sm md:text-base xl:text-lg'><span className='font-medium'>Facility: </span>{`${item.facility_name}`} <span className='font-medium'><br />Collection: </span>{`${item.address}`}</p>
                                                <p className='text-base md:text-lg xl:text-xl'><span className='sm md:text-base xl:text-lg text-gray-400'>{`${totalObj[item.id]?.qty || 1} x (${parseFloat(item.price_per_pc.trim().replace(/[^\d.-]/g, ''))} ${item.price_per_pc.trim().replace(/[^a-zA-Z]/g, "", '')})`}</span> {totalObj[item.id]?.qty * parseFloat(item.price_per_pc.trim().replace(/[^\d.-]/g, ''))} {currency}</p>
                                                {item.delivery && (<p className='sm md:text-base xl:text-lg'>Delivery Fee: {item.info?.delivery_fee ? item.info?.delivery_fee : 0} {currency}</p>)}
                                            </div>
                                            
                                            
                                        </div>
                                        <div className='flex flex-col items-center justify-between gap-4 w-auto h-full'>
                                            {/* <label className='text-red-500 font-medium  text-base md:text-lg xl:text-xl cursor-pointer hover:text-red-800' onClick={() => handleRemoveItem(item.id)}>Remove</label> */}
                                            <input type='checkbox' defaultChecked={allSelected} checked={allSelected ? true : null} onChange={() => handleCheckBoxChange(item.id)} className='w-6 h-6 accent-[#187089]' />
                                        </div>
                                    </div>
                                )
                            })}

                            {cartItems.length === 0 && <p className='text-lg md:text-xl xl:text-2xl mt-32 mb-32 font-medium'>Your cart is empty</p>}
                        </>
                    )}
                </div>
            </div>

            <div className='border-2 border-[var(--light-border-color)] rounded-xl w-full md:w-3/4 lg:w-3/5 xl:w-1/2  h-auto flex flex-col items-center justify-start bg-white p-4'>
                <h3 className='text-lg md:text-xl xl:text-2xl font-semibold mb-4 mt-3'>Cart Summary</h3>

                <div className='w-10/12 flex flex-col items-center justify-center gap-2 mb-4'>
                    {subTotal == null ? <img className='h-10 w-10' src='/spinner-200px-200px.svg' alt="Loading..." /> :
                    (
                        <>
                            <div className='flex justify-between w-full py-2'>
                                <span className='font-medium text-sm xl:text-base 2xl:text-lg'>Subtotal:</span>
                                <span className='text-gray-500 text-sm xl:text-base 2xl:text-lg'>${subTotal.toFixed(2)} {currency}</span>
                            </div>
                            <br></br>
                            <div className='flex justify-between w-full py-2'>
                                <span className='font-medium text-sm xl:text-base 2xl:text-lg'>Total Price <span className='text-gray-500 font-normal'>(15% Tax):</span></span>
                                <span className='text-gray-500 text-sm xl:text-base 2xl:text-lg'>${(subTotal.toFixed(2)*1.15).toFixed(2)} {currency}</span>
                            </div>
                            {paymentStatus != true && (<button onClick={()=>attemptPayment()} className='bg-[#0d5d73] mt-8 rounded-md text-white font-semibold text-lg text-center w-10/12 shadow-md py-2 md:text-xl'>{loading ? <img className='h-6 w-6 mx-auto' src='/spinner-200px-200px.svg' alt="Loading..." /> : "Checkout"}</button>)}
                        </>
                    )}
                    
                </div>
                {paymentStatus && (<p className="text-green-500 text-base font-medium mt-3">Payment Successful</p>)}
                {paymentStatus === false && (<p className="text-red-500 text-base font-medium mt-3">Payment Failed. Please try again.</p>)}
                <br />

                <div className="w-10/12 flex flex-col items-center justify-start gap-1">
                    <h3 className="w-full text-base lg:text-lg xl:text-xl font-medium">Payment Details</h3>
                    <div className="w-full flex-col items-center justify-center mb-4 gap-6 p-2 h-auto">
                        <div onClick={()=>setSelectedPaymentMethod('card')} className={`flex w-full items-center justify-start border-[#0d5d73] border-2 bg-[#0d5d73] bg-opacity-20 hover:bg-opacity-15 rounded-md h-auto px-2 py-1 cursor-pointer mb-3 ${selectedPaymentMethod === 'card' ? 'ring-2 ring-[#0d5d73]' : ''}`}>
                            {/* <BsCreditCard2BackFill size={35} color="white" /> */}
                            <h3 className="font-semibold text-lg xl:text-xl m-1">Card</h3>
                        </div>
                        <div onClick={()=>setSelectedPaymentMethod('cash')} className={`flex w-full items-center justify-start border-[#0d5d73] border-2 bg-[#0d5d73] bg-opacity-20 hover:bg-opacity-15 rounded-md h-auto px-2 py-1 cursor-pointer ${selectedPaymentMethod === 'cash' ? 'ring-2 ring-[#0d5d73]' : ''}`}>
                            {/* <FaPaypal size={35} color="white"/> */}
                            <h3 className="font-semibold text-lg xl:text-xl m-1">Cash</h3>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default OrderConfirm