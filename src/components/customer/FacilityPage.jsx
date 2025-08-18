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
import Modal from './newOrder'


const FacilityCustomerPage = () => {
    const location = useLocation()
    const { id } = location.state || {};
    const [loading, setLoading] = useState(false)
    const [facilityData, setFacilityData] = useState(null)
    const [modalOpen, setModalOpen] = useState(false)
    const [testId, setTestId] = useState(null)

    const getInfo = async () => {
        setLoading(true)
        try {
            const response = await fetch('http://localhost:4000'+'/getFacility', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id: id})
            })
            if (response.ok) {
                const result = await response.json();
                console.log('facility:', result.data)
                setFacilityData(result.data);
                setLoading(false);
            }
        } catch (e) {
            console.error('Error in fetching facility info', e)
        } finally {
            setLoading(false)
        }
    }



    useEffect(() => {
        getInfo()
    },[])
    if (facilityData == null || loading == true) {
        return(
            <section className='page'>
                {/* <h2>Loading...</h2> */}
            </section>
        )
    }
    return (
            <section className='page'>
                <div className='header'>
                    <img src={profile} alt='profile'></img>
                    <h2>{facilityData['name']}</h2>
                </div>
                

                <div className='details-container'>
                    <p>Email: {facilityData["email"]}</p>
                    <p>Phone Number: {facilityData["phoneNumber"]}</p>
                    <p>Address: {facilityData["address"]}</p>
                    <p>Category: {facilityData["category"]}</p>

                </div>

                <div className="accordion">
                    <div className="btn-container">
                        <Link to="/dashboard" style={{ textDecoration: 'none' }}>
                        <button className="back-btn">Back</button>
                        </Link>  
                    </div>
                    {facilityData["tests"].map((item) => {
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
                                    Test Price: {item["price"]}
                                    </Typography>
                                    <Typography className="p">
                                    Approximate Wait: {item["approximateWait"]}
                                    </Typography>
                                    <Typography className="p">
                                    <button onClick={() => {
                                        setTestId(item['id'])
                                        setModalOpen(!modalOpen)}} className='order-btn'>Order</button>
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        )
                    })}
                    
                </div>

                {testId != null && <Modal open={modalOpen} onClose={() => {
                    setTestId(null)
                    setModalOpen(false)}} testId={testId} />}

            </section>
    )
}

const FacilityExport = () => (
    <div style={{width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Sidebar />
        <FacilityCustomerPage />
    </div>
)

export default FacilityExport