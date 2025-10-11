import React, { useState, useEffect } from 'react'
import Sidebar from './Sidebar'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


const Checkout = () => {

    return(
        <section>

        </section>
    )
}

const CheckoutExport = () => {
    return (
    <div style={{width: '100%', height: '100%',minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'flex-start'}}>
            <Sidebar />
            <Checkout />
        </div>
    )
}

export default CheckoutExport;