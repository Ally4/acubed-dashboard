import React, { useState, useEffect } from 'react'
import Sidebar from './Sidebar'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import HomeSampleCollectionForm from './HomeSampleCollectionForm'
import FacilitySampleCollection from './FacilitySampleCollection'
import { FaC } from 'react-icons/fa6'
import { getUserLocationTemp } from '../../services/GeoLocationService'
import { set } from 'react-hook-form'

const CollectionPoint = () => {
    const [selected, setSelected] = useState('Facility')
    const [geoLocation, setGeoLocation] = useState(null)
    
    const fetchUserLocation = async () => {
        const localtion = await getUserLocationTemp();
        console.log(localtion);
        setGeoLocation(localtion);
    }

    useEffect(() => {
        fetchUserLocation();
    }, [])

    const submitHomeForm = () => {

    }

    const submitFacilityForm = () => {

    }

    return(
        <section id='orders'>
            <div className='w-11/12 md:w-10/12 mt-16 mb-4'>
                <h2 className='text-2xl md:text-4xl font-semibold'>Collection Point</h2>
                <p className='text-base text-gray-500'>Search for a specific test or facility</p>
            </div>

            <div className='w-11/12 md:w-2/3 xl:w-3/5 mt-4 mb-4 grid grid-cols-2 gap-2 md:gap-6 xl:gap-12 h-16 md:h-17 xl:h-18 border-2 bg-white border-[#ccc] rounded-full p-1'>
                <div className={`rounded-full flex items-center justify-center w-full cursor-pointer h-full ${selected === 'Facility' ? 'bg-[#0d5d73] hover:bg-[#09495a]' : ''}`} onClick={() => setSelected('Facility')}>
                    <label className={`mt-2 cursor-pointer text-lg md:text-xl xl:text-2xl font-semibold ${selected === 'Facility' ? 'text-white' : 'text-[#0d5d73]'}`}>Facility</label>
                </div>

                <div className={`rounded-full flex items-center justify-center w-full cursor-pointer h-full ${selected === 'Home' ? 'bg-[#0d5d73] hover:bg-[#09495a]' : ''}`} onClick={() => setSelected('Home')}>
                    <label className={`mt-2 cursor-pointer text-lg md:text-xl xl:text-2xl font-semibold ${selected === 'Home' ? 'text-white' : 'text-[#0d5d73]'}`}>Home or Other</label>
                </div>
            </div>

            <div className='w-11/12 md:w-10/12 flex flex-col items-center justify-center px-2 py-1 mt-4 mb-10'>
                {selected == 'Home' && (
                    <HomeSampleCollectionForm onSubmit={submitHomeForm} />
                )}
                {selected == 'Facility' && (
                    <FacilitySampleCollection onSubmit={submitFacilityForm} geoLocation={geoLocation} />
                )}
            </div>


        </section>
    )
}

const CollectionPointExport = () => {
    return (
    <div style={{width: '100%', height: '100%',minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'flex-start'}}>
            <Sidebar />
            <CollectionPoint />
        </div>
    )
}

export default CollectionPointExport;