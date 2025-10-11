import React, { useState, useEffect } from 'react'
import Sidebar from './Sidebar'
import { getCartItems, removeItemFromCart, emptyCart, incrementCartItemQuantity, decrementCartItemQuantity } from '../../services/orderService'
import { useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import { set } from 'react-hook-form'

const Cart = () => {
    const [cartItems, setCartItems] = useState([])
    const [loading, setLoading] = useState(false)
    const [totalObj, setTotalObj] = useState({})
    const [subTotal, setSubTotal] = useState(null)
    // const [userId, setUserId] = useState(null)
    const user = useSelector((state) => state.login.data);
    const userId = user ? user.data?.id : null;

    console.log('user id from params: ', userId)
    const fetchCartItems = async (id) => {
            // if (!id) return
            setLoading(true)
            const items = await getCartItems(id)
            console.log('cart items fetched: ', items)
            const sorted_items = items ? items.sort((a,b) => (a.test_type > b.test_type) ? 1 : ((b.test_type > a.test_type) ? -1 : 0)) : []
            setCartItems(sorted_items)
            const t = initTotal(sorted_items)
            console.log('total obj after init: ', t)
            setTotalObj(t)
            setSubTotal(calculateTotalPrice(t))
            setLoading(false)
    }

    const handleRemoveItem = async (id) => {
        if (!id) return
        const result = await removeItemFromCart(id)
        if (result.success) {
            setCartItems((prevItems) => prevItems.filter((item) => item.id !== id))
            setTotalObj((prevTotal) => {
                const newTotal = { ...prevTotal };
                const itemToRemove = cartItems.find(item => item.id === id);
                if (itemToRemove) {
                    delete newTotal[itemToRemove.test_type];
                }
                return newTotal;
            });
            setSubTotal((prevSubTotal) => {
                const itemToRemove = cartItems.find(item => item.id === id);
                if (itemToRemove) {
                    return prevSubTotal - (itemToRemove.price_per_pc * itemToRemove.qty);
                }
                return prevSubTotal;
            });
        }
    }

    const handleEmptyCart = async () => {
        if (!userId) return
        const result = await emptyCart(userId)
        if (result.success) {
            setCartItems([])
        }
    }

    const initTotal = (items) => {
        let total = {}
        for (let i=0; i<items.length; i++) {
            total[items[i].test_type] = {
                qty: items[i].qty, 
                price_per_pc: parseFloat(items[i].price_per_pc.trim().replace(/[^\d.-]/g, '')),
                currency: items[i].price_per_pc.trim().replace(/[\d.,\s]/g,'')
            }

        }
        return total
    }

    const calculateTotalPrice = (totalObj) => {
        let totalPrice = 0
        for (let key in totalObj) {
            totalPrice += totalObj[key].qty * totalObj[key].price_per_pc
        }
        return totalPrice
    }

    const increaseQty = (type) => {
        let newTotal = {...totalObj}
        newTotal[type].qty += 1
        setTotalObj(newTotal)
        setSubTotal(calculateTotalPrice(newTotal))
        incrementCartItemQuantity(cartItems.find(item => item.test_type === type).id)
    }

    const decreaseQty = (type) => {
        let newTotal = {...totalObj}
        if (newTotal[type].qty <= 1) return
        newTotal[type].qty -= 1
        setTotalObj(newTotal)
        setSubTotal(calculateTotalPrice(newTotal))
        decrementCartItemQuantity(cartItems.find(item => item.test_type === type).id)
    }

    useEffect(() => {
        if (!userId) return
        fetchCartItems(userId)
    }, [userId])

    useEffect(() => {
        if (!userId) return
        fetchCartItems(userId)
    }, [])

    return(
        <section id='orders'>
            <div className="mt-16 mb-12 w-11/12 md:w-10/12">
                <h2 className='text-3xl md:text-4xl font-semibold'>Your Cart</h2>
                <p className='text-base text-gray-500'>Manage current items in your cart</p>
            </div>

            <div className='flex flex-col xl:flex-row items-center justify-between w-11/12 md:w-10/12 gap-12 mt-10'>

                <div className='flex flex-col gap-6 items-center justify-start w-100 xl:w-full'>
                    <div className='w-full flex items-center justify-between bg-white rounded-2xl px-4 py-2 shadow-md border-2 border-[#ccc]'>
                        <div className='flex items-center justify-center gap-6'>
                            <h3 className='text-lg md:text-lg xl:text-xl font-medium mb-4 mt-3'>Select All</h3>
                            <input type='checkbox' className='w-8 h-8 accent-[#187089] mt-2' />
                        </div>

                        <button className='text-xl font-medium text-white bg-[#0d5d73] rounded-full px-4 py-2' onClick={()=>handleEmptyCart(userId)}>Empty Cart</button>
                    </div>


                    <div className='bg-white flex flex-col items-center justify-start border-2 border-[#ccc] rounded-2xl shadow-md gap-4 w-full h-auto p-3'>
                        {loading ? (<img className='h-10 w-10' src='/spinner-200px-200px.svg' alt="Loading..." />)
                        : (
                            <>
                                {cartItems && cartItems.length > 0 && cartItems.map((item,index) => {
                                    return (
                                        <div key={index} className='flex items-center justify-between gap-6 w-full py-6 px-3 border-b bg-white border-[#ccc]'>
                                            <div className='flex items-center justify-center gap-10'>  
                                                <div className='rounded-md lg:w-18 w-16 lg:h-18 h-16 bg-gray-100'>
                                                    </div> 
                                                <Link to={`/tests/${item.test_id}`}><span className='font-medium text-lg cursor-pointer'>{item.test_type}</span></Link>
                                                <span className='text-gray-500'>{item.facility_name}</span>
                                                <div className='flex items-center justify-center gap-3 w-auto h-8 bg-gray-200 rounded-xl px-2 py-1'>
                                                    <p className='font-extrabold text-2xl mb-1 cursor-pointer' onClick={()=>decreaseQty(item.test_type)}>&#45;</p>
                                                    <p className='font-semibold text-lg'>{totalObj[item.test_type]?.qty || 0}</p>
                                                    <p className='font-extrabold text-2xl mb-1 cursor-pointer' onClick={()=>increaseQty(item.test_type)}>&#43;</p>
                                                </div>
                                            </div>
                                            <label className='text-red-500 font-medium text-lg xl:text-xl cursor-pointer hover:text-red-800' onClick={() => handleRemoveItem(item.id)}>Remove</label>
                                        </div>
                                    )
                                })}

                                {cartItems.length === 0 && <p className='text-lg md:text-xl xl:text-2xl mt-32 mb-32 font-medium'>Your cart is empty</p>}
                            </>
                        )}
                    </div>
                </div>

                <div className='border-2 border-[#ccc] rounded-xl w-1/2  h-auto flex flex-col items-center justify-start bg-white p-4'>
                    <h3 className='text-lg md:text-xl xl:text-2xl font-semibold mb-4 mt-3'>Cart Summary</h3>

                    <div className='w-10/12 flex flex-col items-center justify-center gap-2 mb-4'>
                        {subTotal == null ? <img className='h-10 w-10' src='/spinner-200px-200px.svg' alt="Loading..." /> :
                        (
                            <>
                                <div className='flex justify-between w-full py-2'>
                                    <span className='font-medium text-lg'>Subtotal:</span>
                                    <span className='text-gray-500'>${subTotal.toFixed(2)}</span>
                                </div>
                                <br></br>
                                <div className='flex justify-between w-full py-2'>
                                    <span className='font-medium text-lg'>Total Price:</span>
                                    <span className='text-gray-500'>${(subTotal.toFixed(2)*1.15).toFixed(2)}</span>
                                </div>
                                <button className='bg-[#0d5d73] mt-8 rounded-md text-white font-semibold text-lg text-center w-10/12 shadow-md py-2 md:text-xl'>Checkout</button>
                            </>
                        )}
                        
                    </div>
                </div>
            </div>
        </section>
    )
}


const CartExport = () => {
    return (
    <div style={{width: '100%', height: '100%',minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'flex-start'}}>
            <Sidebar />
            <Cart />
        </div>
    )
}

export default CartExport;