import React, { useState, useEffect } from 'react';
import Header from './Header';
import Sidebar from './customer/Sidebar';
import { useSelector, useDispatch } from 'react-redux';

const LandingPage = () => {
    return (
        <section className='w-full h-full min-h-screen flex flex-col overflow-y-auto bg-gradient-to-b from-white to-[#cddfef] items-center justify-start'>
            <Header />

        </section>
    )
}

const LandingPageExport = () => {
    const user = useSelector((state) => state.login.data);

    return (
        <div style={{width: '100%', height: '100%',minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'flex-start'}}>
            {user != null && (<Sidebar />)}
            <LandingPage />
        </div>
    )
}

export default LandingPage;