import React, { useState, useEffect } from 'react'
import Sidebar from './Sidebar'
import { useSelector } from 'react-redux'
import { addToCart, getDeliveryFee } from '../../services/orderService'
import { useNavigate, useParams } from 'react-router-dom'
import HomeSampleCollectionForm from './HomeSampleCollectionForm'
import FacilitySampleCollection from './FacilitySampleCollection'
import { getUserLocation } from '../../services/GeoLocationService'
import { getFacility } from '../../services/dashboardService'

const CollectionPoint = () => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.login.data);
    const userId = user ? user.id : null;
    const token = user ? user.token : null
    const { facilityId, testId, name, price, order, sampleType} = useParams();
    const toCart = order? 'Checkout' : 'Add to Cart'
    const [selected, setSelected] = useState('Facility')
    const [geoLocation, setGeoLocation] = useState(null)
    const [facilityPickupAddress, setFacilityPickupAddress] = useState(null)

    const [homeCollectionFormSuccess, setHomeCollectionFormSuccess] = useState(null)
    const [homeCollectionFormLoading, setHomeCollectionFormLoading] = useState(false)
    const [facilityCollectionFormSuccess, setFacilityCollectionFormSuccess] = useState(null)
    const [facilityCollectionFormLoading, setFacilityCollectionFormLoading] = useState(false)

    const [homeCollectionFormError, setHomeCollectionFormError] = useState(null)
    const [facilityCollectionFormError, setFacilityCollectionFormError] = useState(null)
    
    const fetchUserLocation = async () => {
        const localtion = await getUserLocation();
        console.log(localtion);
        setGeoLocation(localtion);
    }
  
    
    const selectFacilityPickupAddress = (address) => {
        console.log('selected facility address: ', address)
        setFacilityPickupAddress(address);
    }
    useEffect(() => {
        fetchUserLocation();
    }, [])


    const submitHomeForm = async (data) => {
        if (data) {
            //determine delivery fee
            try {
                setHomeCollectionFormLoading(true)
                const collectionAddress = `${data.district} ${data.city} ${data.country}`
                const facilityData = await getFacility(facilityId,token)
                console.log('home collection facilityid: ', facilityId)
                console.log('home collection facility data: ',facilityData)
                const facilityCoords = [parseFloat(facilityData.latitude),  parseFloat(facilityData.longitude)]
                const deliveryFee = await getDeliveryFee(collectionAddress,facilityCoords)
                if (deliveryFee.success) {
                    console.log('home form data: ', data)
                    let obj = {formData: data, testCatalogId: testId, qty: parseInt(data.qty), delivery: true, deliveryFee: deliveryFee.deliveryFee.fee, distance: deliveryFee.deliveryFee.distance, collectionAddress: collectionAddress}
                    const result = await addToCart(obj,token)
                    if(result.success) {
                        setHomeCollectionFormSuccess(true)
                        if (toCart === 'Checkout') {
                            navigate(`/order-confirm/${result.cartId}`);
                        }
                    } else {
                        setHomeCollectionFormError('Failed to register item.')
                        setHomeCollectionFormSuccess(false)
                    }
                } else {
                    //We were not able to properly calculate the delivery fee
                    //Add detailed error communication
                    setHomeCollectionFormError('Could not process the entered address.')
                    setHomeCollectionFormSuccess(false)
                }    
            } catch (err) {
                console.log(err)
                setHomeCollectionFormError(err.message) 
                setHomeCollectionFormSuccess(false)
            } finally {
                setHomeCollectionFormLoading(false)
            }
        }
    }

    const submitFacilityForm = async (data) => {
        if (!facilityPickupAddress) return
        if (data) {
            console.log('facility form data: ', data)
            let obj = {formData: data, testCatalogId: testId, qty: parseInt(data.qty), delivery: false, deliveryFee: 0, collectionAddress: `${facilityPickupAddress.facility}, ${facilityPickupAddress.address}`, facilityPickupId: facilityPickupAddress.id}
            try {
                setFacilityCollectionFormLoading(true)
                const result = await addToCart(obj,token)
                if(result.success) {
                    setFacilityCollectionFormSuccess(true)
                    if (toCart === 'Checkout') {
                        navigate(`/order-confirm/${result.cartId}`);
                    }
                } else {
                    setFacilityCollectionFormError('Failed to register item.')
                    setFacilityCollectionFormSuccess(false)
                }
            } catch (err) {
                console.log(err)
                setFacilityCollectionFormError(err.message)
                setFacilityCollectionFormSuccess(false)
            } finally {
                setFacilityCollectionFormLoading(false)
            }
        }
    }

    return(
        <section id='orders'>
            <div className='w-full md:w-11/12 lg:w-11/12 mt-16 mb-4'>
                <h2 className='text-2xl lg:text-4xl font-semibold'>Collection Point</h2>
                <p className='text-base text-gray-500'>Set a point to a collect samples for {name}</p>
            </div>

            <div className='w-11/12 md:w-2/3 xl:w-3/5 mt-4 mb-4 grid grid-cols-2 gap-2 md:gap-6 xl:gap-12 h-16 md:h-17 xl:h-18 border-2 bg-white border-[var(--light-border-color)] rounded-full p-1'>
                <div className={`rounded-full flex items-center justify-center w-full cursor-pointer h-full ${selected === 'Facility' ? 'bg-[#0d5d73] hover:bg-[#09495a]' : ''}`} onClick={() => setSelected('Facility')}>
                    <label className={`mt-2 cursor-pointer text-lg md:text-xl xl:text-2xl font-semibold ${selected === 'Facility' ? 'text-white' : 'text-[#0d5d73]'}`}>Facility</label>
                </div>

                <div className={`rounded-full flex items-center justify-center w-full cursor-pointer h-full ${selected === 'Home' ? 'bg-[#0d5d73] hover:bg-[#09495a]' : ''}`} onClick={() => setSelected('Home')}>
                    <label className={`mt-2 cursor-pointer text-lg md:text-xl xl:text-2xl font-semibold ${selected === 'Home' ? 'text-white' : 'text-[#0d5d73]'}`}>Home or Other</label>
                </div>
            </div>

            <div className='w-full flex flex-col items-center justify-center px-2 py-1 mt-4 mb-10'>
                {selected == 'Home' && (
                    <HomeSampleCollectionForm onSubmit={submitHomeForm} error={homeCollectionFormError} submitSuccess={homeCollectionFormSuccess} loading={homeCollectionFormLoading} toCart={toCart} />
                )}
                {selected == 'Facility' && (
                    <FacilitySampleCollection onSubmit={submitFacilityForm} geoLocation={geoLocation} error={facilityCollectionFormError} submitSuccess={facilityCollectionFormSuccess} loading={facilityCollectionFormLoading} toCart={toCart} setMapFacility={selectFacilityPickupAddress} selectedFacility={facilityPickupAddress} />
                )}
            </div>


        </section>
    )
}


export default CollectionPoint;