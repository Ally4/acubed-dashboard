import React, { useEffect, useState } from 'react'
import { useLocation, Link, useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import Sidebar from './Sidebar'
import '../../style/infoPage.css'
import { getFacility } from '../../services/dashboardService';
import profile from '../../images/profile.png'
import OrderModal from './newOrder'
import Card from './Card'


const FacilityCustomerPage = () => {
    const location = useLocation()
    const user = useSelector((state) => state.login.data);
    const { id } = useParams();
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
                <div className='w-11/12 lg:w-10/12 mt-16 mb-4 flex flex-col gap-6'>
                    <div className='w-full'>
                        <h2 className='text-4xl font-semibold'>Facility</h2>
                        <p className='text-base text-gray-500'>See available tests at this facility</p>
                    </div>
                    <div className='w-full flex items-center justify-start gap-4 h-auto'>
                        <div className='h-32 w-32 rounded-md border bg-gray-50'>
                            {/* <img className='max-h-full object-cover' src={profile} alt='profile'></img> */}
                        </div>
                        <div className='flex flex-col'>
                            <h2 className='text-2xl font-medium'>{facilityData['name']}</h2>
                            <p className='text-lg'>Country: {facilityData.country}</p>
                            <p className='text-lg'>Address: {facilityData["address"]}</p>
                            <p className='text-lg'><span>Category: </span>{facilityData["category"]}</p>
                        </div>
                    </div>
                    <div className="btn-container">
                        <Link to="/dashboard" style={{ textDecoration: 'none' }}>
                        <button className="back-btn text-[#0d5d73] bg-[#ebeff3] hover:bg-[#cadeef]">Back</button>
                        </Link>  
                    </div>
                </div>
                

                {/* <div className='details-container'>
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

                </div> */}

                <div className="w-11/12 lg:w-10/12 mb-4 h-auto">
                    <div className='viewable-data'>
                        {facilityData['tests'].map((item,index) => {
                            return(<Card key={index} name={item['name']} address={item['price']} type={item['type']} onClick={()=>{
                                setTestId(item['id'])
                                setModalOpen(!modalOpen)}}/> )
                        })}
                    </div>
                    {/* {facilityData["tests"].map((item,key) => {
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
                    })} */}
                    
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