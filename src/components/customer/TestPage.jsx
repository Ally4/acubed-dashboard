import React, { useEffect, useState } from 'react'
import { useLocation, Link, useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import Sidebar from './Sidebar'
import '../../style/infoPage.css'
import { getTest } from '../../services/dashboardService';
import { iconAssigner } from '../../utils/imageUtils';
import OrderModal from './newOrder'
import Card from './Card'


const TestCustomerPage = () => {
    const location = useLocation()
    const user = useSelector((state) => state.login.data);
    const { id } = useParams();
    const [loading, setLoading] = useState(false)
    const [testData, setTestData] = useState(null)
    const [userId, setUserId] = useState(null)
    const [testId, setTestId] = useState(null)
    const [modalOpen, setModalOpen] = useState(false)

    const [selectedFacilityId, setSelectedFacilityId] = useState(null)
    
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
            <div className='w-11/12 lg:w-10/12 mt-16 mb-4 flex flex-col gap-6'>
                <div className='w-full'>
                    <h2 className='text-4xl font-semibold'>Lab Test</h2>
                    <p className='text-base text-gray-500'>You can perform your test in any of the following facilities</p>
                </div>
                <div className='w-full flex items-center justify-start gap-4 h-auto'>
                    <div className='h-32 w-32 rounded-md border bg-[#0d5d73] bg-opacity-30 flex items-center justify-center'>
                        {iconAssigner(testData['profilepicture'],100,"test")}
                    </div>
                    <div className='flex flex-col'>
                        <h2 className='text-2xl font-medium'>{testData['name']}</h2>
                        <p className='text-lg'>{testData["price"]}</p>
                        <p className='text-lg'><span>Approximate Wait: </span>{testData["approximateWait"]}</p>
                    </div>
                </div>
                <div className="btn-container">
                    <Link to="/dashboard/All" style={{ textDecoration: 'none' }}>
                    <button className="back-btn text-[#0d5d73] bg-[#cadeef] hover:bg-[#bdd5eb]">Back</button>
                    </Link>  
                </div>
            </div>

            <div className="w-11/12 lg:w-10/12 mb-4 h-auto">
                    <div className='viewable-data'>
                        {testData['facilities'].map((item,index) => {
                            return(<Card key={index} name={item['name']} address={item['address']} type={item['type']} onClick={()=>{
                                setTestId(testData.id)
                                setModalOpen(!modalOpen)}}/> )
                        })}
                    </div>
                    {/* <div className="btn-container">
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
                    })} */}
                    
                </div>

                {testId != null && userId != null && <OrderModal open={modalOpen} userId={userId} iconid={testData.profilepicture} onClose={() => {
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