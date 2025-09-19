import React, { useEffect, useState } from 'react'
import { useLocation, Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import Sidebar from './Sidebar'
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import '../../style/infoPage.css'
import axios from 'axios';
import { getFacility } from '../../services/dashboardService';
import profile from '../../images/profile.png'
import OrderModal from './newOrder'


const FacilityCustomerPage = () => {
    const location = useLocation()
    const user = useSelector((state) => state.login.data);
    const { id } = location.state || {};
    const [loading, setLoading] = useState(false)
    const [facilityData, setFacilityData] = useState(null)
    const [modalOpen, setModalOpen] = useState(false)
    const [testId, setTestId] = useState(null)
    const [userId, setUserId] = useState(null)

    useEffect(() => {
            const id = user ? user.data?.id : null;
            setUserId(id);
        }, [user]);

    const getInfo = async () => {
        setLoading(true)
        try {
            const result = await getFacility(id)
            if (result) {
                console.log('facility info: ', result)
                setFacilityData(result);
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
                    <div>
                        <p><span>Email: </span>{facilityData["email"]}</p>
                    </div>
                    <div>
                        <p><span>Phone Number: </span> {facilityData["phoneNumber"]}</p>
                    </div>
                    <div>
                        <p><span>Address: </span>{facilityData["address"]}</p>
                    </div>
                    <div>
                        <p><span>Category: </span>{facilityData["category"]}</p>
                    </div>

                </div>

                <div className="accordion">
                    <div className="btn-container">
                        <Link to="/dashboard" style={{ textDecoration: 'none' }}>
                        <button className="back-btn">Back</button>
                        </Link>  
                    </div>
                    {facilityData["tests"].map((item,key) => {
                        return(
                            <Accordion key={key}>
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

                {testId != null && userId != null && <OrderModal open={modalOpen} userId={userId} onClose={() => {
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