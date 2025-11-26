import React, { useState, useEffect } from 'react'
import Sidebar  from './Sidebar'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Card from './Card'
import { iconAssigner } from '../../utils/imageUtils';
import '../../style/Home.css'


const TestView = () => {
    const navigate = useNavigate()
    const { test } = useParams()
    const user = useSelector((state) => state.login.data);
    console.log('user: ',user)
    const countryId = user ? user.countryId : null;
    const userId = user ? user.id : null;
    const name = user ? user.username : ''
    const token = user ? user.token : null
    const [facilityData, setFacilityData] = useSelector([])
    const [loading, setLoading] = useState(false)

    const navigateInfo = (id,type) => {
        if (type == 'F') {
            console.log(`nav facility id=${id}`)
            navigate(`/facility/${id}`)
        } else {
            console.log(`nav test id=${id}`)
            navigate(`/tests/${id}`)
        }
        
    }

    const fetchFacilities = async () => {
        setLoading(true)
        try {

        } catch (err) {
            console.error('Error displaying facilities with a specific test sample type')
        } finally {
            setLoading(false)
        }
    }


    return(
        <section id='dashboard'>
            <div className='w-11/12 md:w-10/12 mt-8 mb-4 flex items-center justify-start'>
                <h2 className='text-4xl font-semibold mt-1'>Available Facilities for {test}</h2>
                <p className='text-base text-gray-500'>Browse available facilities providing test for the sample</p>
            </div>


            <div className='w-11/12 md:w-10/12 flex flex-col items-center justify-center'>
                <div className='viewable-data'>
                        {facilityData?.map((item,index) => {
                            console.log('item: ', item)
                                return <Card key={index} onClick={()=>{navigateInfo(item.id,'F')}} name={item.name} address={item.address} type={"facility"}/>                        
                            })}
                    </div>
            </div>
        </section>
    )
}

const TestViewExport = () => (
    <div style={{width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'flex-start'}}>
        <Sidebar />
        <TestView />
    </div>
)
export default TestViewExport
