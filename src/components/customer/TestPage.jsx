import React, { useEffect, useState } from 'react'
import { useLocation, Link } from "react-router-dom";
import Sidebar from './Sidebar'
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import '../../style/infoPage.css'
import axios from 'axios';

import profile from '../../images/profile.png'


const TestCustomerPage = () => {
    const location = useLocation()
    const { id } = location.state || {};
    const [loading, setLoading] = useState(false)
    const [testData, setTestData] = useState(null)

    const getInfo = async () => {
        setLoading(true)
        try {
            const response = await fetch('http://localhost:4000'+'/getTest', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id: id})
            })
            if (response.ok) {
                const result = await response.json();
                console.log('test:', result.data)
                setTestData(result.data);
                setLoading(false);
            }
        } catch (e) {
            console.error('Error in fetching test info', e)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
            getInfo()
        },[])

    if (testData == null || loading == true) {
        return (
            <section className='page'>
                 
            </section>
        )
    }
    return(
        <section className='page'>
            <div className='header'>
                <img src={profile} alt='profile'></img>
                <h2>{testData['name']}</h2>
            </div>

            <div className='details-container'>
                    <p>Price: {testData["price"]}</p>
                    <p>Approximate Wait: {testData["approximateWait"]}</p>
            </div>

            <div className="accordion">
                    <div className="btn-container">
                        <Link smooth to="/dashboard" style={{ textDecoration: 'none' }}>
                        <button className="back-btn">Back</button>
                        </Link>  
                    </div>
                    {testData["facilities"].map((item) => {
                        return(
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ArrowDropDownIcon />}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                >
                                    <Typography className="title" >{item["name"]}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography className="p">
                                    Email: {item["email"]}
                                    </Typography>
                                    <Typography className="p">
                                    Phone Number: {item["phoneNumber"]}
                                    </Typography>
                                    <Typography className="p">
                                    Address: {item["address"]}
                                    </Typography>
                                    <Typography className="p">
                                    Category: {item["category"]}
                                    </Typography>
                                    <Typography className="p">
                                    <button className='order-btn'>Order</button>
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        )
                    })}
                    
                </div>
        </section>
    )
}



const TestExport = () => (
    <div style={{width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Sidebar />
        <TestCustomerPage />
    </div>
)

export default TestExport