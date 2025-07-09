import React from 'react'
import { Link } from 'react-router-dom';
import Header from './Header'
import '../../style/Home.css'

const Home = () => {

    return(
        <section id='dashboard'>
            <div className='welcome'>
                <h2>Hello <span style={{color: '#00c2cb'}}>!</span></h2>
                <p>Which facility or test are you looking for today?</p>
            </div>

            <input className='search' type='text' placeholder='Search...'/>

        </section>
    )
}

const HomeExport = () => (
    <div style={{width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <Header />
        <Home />
    </div>
)
export default HomeExport

