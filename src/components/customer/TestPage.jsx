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
import { getTest } from '../../services/dashboardService';
import profile from '../../images/profile.png'
import OrderModal from './newOrder'


const TestCustomerPage = () => {
    const location = useLocation()
    const user = useSelector((state) => state.login.data);
    const { id } = location.state || {};
    const [loading, setLoading] = useState(false)
    const [testData, setTestData] = useState(null)
    const [userId, setUserId] = useState(null)
    const [testId, setTestId] = useState(null)
    const [modalOpen, setModalOpen] = useState(false)
    
    useEffect(() => {
                const id = user ? user.data?.id : null;
                setUserId(id);
            }, [user]);

    const getInfo = async () => {
        setLoading(true)
        try {
            const result = await getTest(id)
            if (result) {
                console.log('test info: ', result)
                setTestData(result);
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
                <div>
                    <p><span>Price: </span>{testData["price"]}</p>
                </div>
                <div>
                    <p><span>Approximate Wait: </span>{testData["approximateWait"]}</p>
                </div>
            </div>

            <div className="accordion">
                    <div className="btn-container">
                        <Link to="/dashboard" style={{ textDecoration: 'none' }}>
                        <button className="back-btn">Back</button>
                        </Link>  
                    </div>
                    {testData["facilities"].map((item,key) => {
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
                                    <button className='order-btn' onClick={() => setModalOpen(!modalOpen)}>Order</button>
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        )
                    })}
                    
                </div>

                {testId != null && userId != null && <OrderModal open={modalOpen} userId={userId} onClose={() => {
                    setModalOpen(false)}} testId={testId} />}
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