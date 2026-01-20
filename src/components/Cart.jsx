import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { iconAssigner } from '../utils/imageUtils'

const Cart = (props) => {
    const [cartItems, setCartItems] = useState([])
    const [id, setCartId] = useState('')
    const [loading, setLoading] = useState(false)
    const [totalObj, setTotalObj] = useState({})
    const [subTotal, setSubTotal] = useState(null)
    const [currency, setCurrency] = useState('')
    const navigate = useNavigate()
    const user = useSelector((state) => state.login.data);
    const userId = user ? user.id : null;
    const country = user ? user.country : null;
    const token = user ? user.token : null

    useEffect(() => {
            if (!country) return;
            setCurrency(country === 'Ethiopia' ? 'EBT' : 'RWF');
        }, [country]);

    const setCart = (items) => {
        console.log('cart items fetched: ', items)
        const sorted_items = items ? items.sort((a,b) => (a.testInfo.testName > b.testInfo.testName) ? 1 : ((b.testInfo.testName > a.testInfo.testName) ? -1 : 0)) : []
        setCartItems(sorted_items)
        const t = initTotal(sorted_items)
        console.log('total obj after init: ', t)
        setTotalObj(t)
        setSubTotal(calculateTotalPrice(t))
    }

    const fetchCartItems = async (token) => {
        // if (!id) return
        setLoading(true)
        const items = await props.getCartItems(token)
        setCart(items)
        setLoading(false)
    }

    const handleRemoveItem = async (id) => {
        if (!id) return
        console.log('removing item with id: ', id)
        console.log('cart items before removal: ', cartItems)
        const result = await props.removeItemFromCart(id,token)
        if (result.success) {
            setTotalObj((prevTotal) => {
                const newTotal = { ...prevTotal };
                const itemToRemove = cartItems.find(item => item.id === id);
                if (itemToRemove) {
                    delete newTotal[itemToRemove.id];
                }
                return newTotal;
            });
            setSubTotal((prevSubTotal) => {
                const itemToRemove = cartItems.find(item => item.id === id);
                if (itemToRemove) {
                    console.log('Removing item: ', itemToRemove);
                    return prevSubTotal - (parseFloat(itemToRemove.testInfo.price.trim().replace(/[^\d.-]/g, '')) * itemToRemove.qty);
                }
                return prevSubTotal;
            });
            setCartItems((prevItems) => prevItems.filter((item) => item.id !== id))
            if (cartItems.length == 0) {
                setSubTotal(0)
            }

        }
    }

    const handleEmptyCart = async () => {
        if (!userId) return
        const result = await props.emptyCart(token)
        console.log('empty cart result: ', result)
        if (result.success) {
            setCartItems([])
            setSubTotal(0)
            setTotalObj({})
        }
    }

    const initTotal = (items) => {
        let total = {}
        for (let i=0; i<items.length; i++) {
            total[items[i].id] = {
                qty: items[i].qty, 
                price_per_pc: parseFloat(items[i].testInfo.price.trim().replace(/[^\d.-]/g, '')),
                currency: items[i].testInfo.currency,
                deliveryFee: items[i].delivery ? (items[i].deliveryFee ? parseFloat(items[i].deliveryFee) : 0) : 0
            }

        }
        return total
    }

    const calculateTotalPrice = (totalObj) => {
        let totalPrice = 0
        for (let key in totalObj) {
            totalPrice += totalObj[key].qty * totalObj[key].price_per_pc + totalObj[key].deliveryFee
        }
        return totalPrice
    }

    const increaseQty = (id) => {
        let newTotal = {...totalObj}
        newTotal[id].qty += 1
        setTotalObj(newTotal)
        setSubTotal(calculateTotalPrice(newTotal))
        props.updateCartItemQty(token,cartItems.find(item => item.id === id).id,newTotal[id].qty)
    }

    const decreaseQty = (id) => {
        let newTotal = {...totalObj}
        if (newTotal[id].qty <= 1) return
        newTotal[id].qty -= 1
        setTotalObj(newTotal)
        setSubTotal(calculateTotalPrice(newTotal))
        props.updateCartItemQty(token,cartItems.find(item => item.id === id).id,newTotal[id].qty)
    }

    useEffect(() => {
        if (!token || !country) return
        fetchCartItems(token)
    }, [token])

    return(
        <div className='flex flex-col xl:flex-row items-center justify-between w-11/12 xl:w-10/12 gap-12 mt-10 mb-6'>
        
                        <div className='flex flex-col gap-6 items-center justify-start w-100 w-full'>
                            <div className='w-full flex items-center justify-between bg-white rounded-2xl px-4 py-3 shadow-md border-2 border-[var(--light-border-color)]'>
                                <button className='text-base md:text-lg lg:text-xl font-medium text-white bg-[#0d5d73] rounded-full px-4 py-2' onClick={()=>handleEmptyCart(userId)}>Empty Cart</button>
                            </div>
        
        
                            <div className='bg-white flex flex-col items-center justify-start border-2 border-[var(--light-border-color)] rounded-2xl shadow-md gap-4 w-full h-auto min-h-44 relative p-3'>
                                {loading ? (<img className='h-40 w-40 absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2' src='/secondary_color_spinner.svg' alt="Loading..." />)
                                : (
                                    <>
                                        {cartItems && cartItems.length > 0 && cartItems.map((item,index) => {
                                            return (
                                                <div key={index} className='flex items-center justify-between gap-3 lg:gap-6 w-full h-40 py-2 px-3 border-b bg-white border-[var(--light-border-color)]'>
                                                    <div className='flex items-center justify-center gap-2 md:gap-4 xl:gap-10 h-full w-auto'>  
                                                        <div className='rounded-md lg:w-24 md:w-20 lg:h-24 md:h-20 w-16 h-16 bg-[#0d5d73] bg-opacity-15 flex items-center justify-center'>
                                                            {iconAssigner(item.testInfo.sampleType, 60,props.cartType)}
                                                        </div> 
                                                        <div className='flex flex-col h-full items-start justify-evenly'>
                                                            <span className='font-medium text-lg xl:text-xl cursor-pointer'>{item.testInfo.testName}</span>
                                                            <p className='text-gray-800 text-sm md:text-base xl:text-lg'><span className='font-medium'>Facility: </span>{`${item.testInfo.facility.name}`} <span className='font-medium'><br />Collection: </span>{`${item.collectionAddress}`}</p>
                                                            <p className='text-base md:text-lg xl:text-xl'><span className='sm md:text-base xl:text-lg text-gray-400'>{`${totalObj[item.id]?.qty || 1} x (${totalObj[item.id].price_per_pc} ${totalObj[item.id].currency})`}</span> {totalObj[item.id]?.qty * totalObj[item.id].price_per_pc} {totalObj[item.id].currency}</p>
                                                            {item.delivery && <p className='sm md:text-base xl:text-lg'>Delivery Fee: {item.deliveryFee ? item.deliveryFee : 0} {currency}</p>}
                                                        </div>
                                                        
                                                        
                                                    </div>
                                                    <div className='flex flex-col items-center justify-between gap-4 w-auto h-full'>
                                                        <label className='text-red-500 font-medium  text-base md:text-lg xl:text-xl cursor-pointer hover:text-red-800' onClick={() => handleRemoveItem(item.id)}>Remove</label>
                                                        <div className='flex items-center justify-center gap-2 md:gap-3 w-auto h-8 bg-gray-200 rounded-xl px-2 py-1'>
                                                            <p className='font-extrabold text-base lg:text-lg xl:text-2xl mb-1 cursor-pointer' onClick={()=>decreaseQty(item.id)}>&#45;</p>
                                                            <p className='font-semibold text-sm lg:text-base xl:text-lg'>{totalObj[item.id]?.qty || 1}</p>
                                                            <p className='font-extrabold text-base lg:text-lg xl:text-2xl mb-1 cursor-pointer' onClick={()=>increaseQty(item.id)}>&#43;</p>
                                                        </div>
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
                                {subTotal == null ? <img className='h-10 w-10' src='/secondary_color_spinner.svg' alt="Loading..." /> :
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
                                        {cartItems.length > 0 && <button onClick={()=>{ navigate(props.confirmCartUrl)}} className='bg-[#0d5d73] mt-8 rounded-md text-white font-semibold text-lg text-center w-10/12 shadow-md py-2 md:text-xl'>Confirm Order</button>}
                                        {cartItems.length === 0 && <p disabled className='mt-8 text-[#0d5d73] font-semibold text-lg text-center w-10/12 py-2 md:text-xl'>No Items to Confirm</p>}
                                    </>
                                )}
                                
                            </div>
                        </div>
                    </div>
    )
}

export default Cart