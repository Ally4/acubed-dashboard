import React, { useEffect, useState } from 'react'
import { useLocation, Link, useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import Sidebar from './Sidebar'
import '../../style/infoPage.css'
import { getFacility, getFacilityTests } from '../../services/dashboardService';
import { getCountry } from '../../utils/userUtils'
import OrderModal from './newOrder'
import Card from './Card'


const FacilityCustomerPage = () => {
    const location = useLocation()
    const user = useSelector((state) => state.login.data);
    const token = user ? user.token : null
    const userId = user ? user.id : null
    const countryId = user ? user.countryId : null
    const { id } = useParams();
    const [loading, setLoading] = useState(false)
    const [facilityData, setFacilityData] = useState(null)
    const [facilityTests, setFacilityTests] = useState(null)
    const [facilityCountry, setFacilityCountry] = useState('')
    const [modalOpen, setModalOpen] = useState(false)
    const [testId, setTestId] = useState(null)
    const [sampleType, setSampleType] = useState(null)

    const fetchData = async (token) => {
        setLoading(true)

        try {
            const [facilityData, FTests,country] = await Promise.all([
                getFacility(id,token),
                getFacilityTests(id,token),
                getCountry(countryId)
            ]);

            if (facilityData) {
                console.log('facility info: ', facilityData)
                setFacilityData(facilityData)
            }

            if (FTests) {
                console.log('facility tests: ', FTests)
                setFacilityTests(FTests)
            }
            if (country) {
                setFacilityCountry(country)
            }
        } catch (err) {
            console.log('error fetching facility data: ',err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if(!token || !countryId) return
        fetchData(token)
    },[token,countryId])

    return (
            <section className='page'>
                <div className='w-11/12 lg:w-10/12 mt-16 mb-4 flex flex-col gap-6'>
                    <div className='w-full'>
                        <h2 className='text-4xl font-semibold'>Facility</h2>
                        <p className='text-base text-gray-500'>See available tests at this facility</p>
                    </div>
                    {loading || facilityData == null ? (<img src='/secondary_color_spinner.svg' className='h-28 w-18 self-center' alt="Loading..." />) : (
                        <>
                            <div className='w-full flex items-center justify-start gap-4 h-auto'>
                                <div className='h-32 w-32 rounded-md border bg-gray-50'>
                            {/* <img className='max-h-full object-cover' src={profile} alt='profile'></img> */}
                                </div>
                                <div className='flex flex-col'>
                                    <h2 className='text-2xl font-medium'>{facilityData?.name}</h2>
                                    <p className='text-lg'>Country: {facilityCountry}</p>
                                    <p className='text-lg'>Address: {facilityData?.address} {facilityData?.city} {facilityData?.state}</p>
                                </div>
                            </div>
                            <div className="btn-container">
                                <Link to="/dashboard/All" style={{ textDecoration: 'none' }}>
                                <button className="back-btn text-[#0d5d73] bg-[#cadeef] hover:bg-[#bdd5eb]">Back</button>
                                </Link>  
                            </div>

                            <div className="w-full mb-4 h-auto">
                                <div className='viewable-data'>
                                    {facilityTests.map((item,index) => {
                                        console.log('item: ', item)
                                        return(<Card key={index} name={item.name} address={item.price} type={"test"} profile={item.sampleType} onClick={()=>{
                                            setTestId(item.id)
                                            setSampleType(item.sampleType)
                                            setModalOpen(!modalOpen)}}/> )
                                    })}
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {testId != null && userId != null && <OrderModal open={modalOpen} userId={userId} sampleType={sampleType} onClose={() => {
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