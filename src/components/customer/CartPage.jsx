import React, { useState } from 'react'
import Sidebar from './Sidebar'
import { getCartItems, removeItemFromCart, emptyCart, updateCartItemQty } from '../../services/orderService'
import Cart from '../Cart'

const CartPage = () => {
    const [cartId, setCartId] = useState('')
    return(
        <section id='orders'>
            <div className="mt-16 mb-12 w-11/12 md:w-10/12">
                <h2 className='text-3xl md:text-4xl font-semibold'>Your Cart</h2>
                <p className='text-base text-gray-500'>Manage current items in your cart</p>
            </div>

            <Cart confirmCartUrl={`/order-confirm/${cartId}`} getCartItems={getCartItems} removeItemFromCart={removeItemFromCart} emptyCart={emptyCart} updateCartItemQty={updateCartItemQty} cartType={"test"} />

        </section>
    )
}

const CartExport = () => {
    return (
    <div style={{width: '100%', height: '100%',minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'flex-start'}}>
            <Sidebar />
            <CartPage />
        </div>
    )
}

export default CartExport;