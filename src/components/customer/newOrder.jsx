import React, { useState, useEffect } from 'react'
import { set, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import '../../style/newOrder.css'
import { getTest } from '../../services/dashboardService';
import { createOrder, addToCart } from '../../services/orderService';
import { getUser } from '../../services/userService';

const NewOrder = (props) => {
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm()
    const [testData, setTestData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [orderSuccess, setOrderSuccess] = useState(null);
    const [profileData, setProfileData] = useState(null);
    const [facilities, setFacilities] = useState([]);
    const [selectedEmail, setSelectedEmail] = useState('');
    const [chosenFacility, setChosenFacility] = useState('')
    const [chosenFacilityId, setChosenFacilityId] = useState(null)
    const [qty, setQty] = useState(1)



    const onSubmit = async () => {
        try {
            const obj = {
                patientId: props.userId,
                patientName: profileData.firstname + ' ' + profileData.lastname,
                patientEmail: profileData.email,
                patientPhone: profileData.phonenumber,
                patientAddress: profileData.address,
                diagnosis: testData.name,
                facilityName: Object.keys(facilities).find(key => facilities[key] === selectedEmail),
                facilityEmail: selectedEmail,
                user: profileData
            }

            const result = await createOrder(obj);

            if (result && result.success) {
                setOrderSuccess('success');
            } else {
                setOrderSuccess('fail');
            }
        } catch (err) {
            console.log('Error creating order:', err)
        }
    }

    const addItemtoCart = async () => {
        const obj = {
            testId: props.testId,
            facilityId: chosenFacilityId,
            userId: props.userId,
            facilityName: chosenFacility,
            testName: testData.name,
            qty: qty,
            price_per_pc: testData.price
        }
        const res = await addToCart(obj)
        console.log('add to cart response: ', res)
        if (res && res.success) {
            console.log('Item added to cart')
            navigate(`/cart`)
        } else {
            console.log('Could not add item to cart')
        }
    }   


    const handleFacilityChange = (e) => {
        const facilityName = e.target.value;
        console.log('Selected facility email:', facilities[facilityName]);
        setSelectedEmail(facilities[facilityName] || '');
        setChosenFacility(facilityName)
    };


    const getTestInfo = async () => {
        setLoading(true);
        try {
            const result = await getTest(props.testId)

            if (result) {
                console.log('test data:', result)
                setTestData(result);

                //update the facility Info
                const facilityList = result.facilities;
                const fData = {}
                facilityList.forEach((item) => {
                    fData[item.name] = { email: item.email, id: item.id }
                });
                setFacilities(fData);
                setChosenFacility(Object.keys(fData)[0])
                setSelectedEmail(Object.values(fData)[0].email);
                setChosenFacilityId(Object.values(fData)[0].id)
                console.log('facility data:', fData);
            }
        } catch (e) {
            console.error('Error fetching test info:', e)
        } finally {
            setLoading(false);
        }
    }

    const getProfileInfo = async () => {
        try {
            const result = await getUser(props.userId)
            if (result) {
                console.log('profile data:', result)
                setProfileData(result.data);
            }
        } catch (e) {
            console.error('Error fetching profile info:', e)
        }
    }

    const handleOverlayClick = (e) => {
        // Only close if the clicked element is the overlay itself
        if (e.target === e.currentTarget) {
            props.onClose();
        }
    };

    useEffect(() => {
        getTestInfo()
        getProfileInfo()
    },[])

    if (!props.open || props.testId == null || props.userId == null) {
        return null
    } else {
        return (
            <>
                <div className='overlay' onClick={handleOverlayClick}></div>
                <form className='border rounded-lg bg-white flex flex-col items-center justify-center h-auto w-8/12 md:w-1/2 xl:w-4/12 px-3 py-1' id='new-order' onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit(onSubmit)}>
                    <div className='w-full flex items-center justify-end h-auto gap-3 px-3 mt-2'>
                        <div className='flex items-center justify-center w-auto gap-2'>
                            <p className='text-[#0d5d73] font-medium text-base md:text-lg xl:text-xl'>Quantity:</p>
                            <input className='border h-8 w-14 mt-3 border-[#0d5d73] focus:outline-none hover:outline-none' type='number' min={1} max={10} value={qty} onChange={(e) => setQty(e.target.value)} />
                        </div>
                        <button className='text-[#0d5d73] bg-[#ebeff3] hover:bg-[#e0eaf4] font-medium text-base xl:text-lg px-3 py-1' onClick={()=>addItemtoCart()}>Add</button>
                        <p className='h-9 w-9 flex items-center justify-center rounded-md bg-[#a3b1c0] text-white cursor-pointer' onClick={props.onClose}>✖</p>
                        </div>
                    {!profileData || !testData || !facilities ? (<><img src='/spinner-200px-200px.svg' alt="Loading..." /></>)
                    : (
                        <>
                        <h3 className='mt-4 mb-3 font-semibold text-3xl md:text-4xl xl:5xl'>{testData.name}</h3>

                        <div className='w-11/12 mb-2 flex flex-col items-center justify-center px-2 py-1'>
                            <select className='text-[#0d5d73] text-lg lg:text-xl xl:text-2xl font-semibold mb-8' onChange={handleFacilityChange}>
                                {facilities && Object.keys(facilities).map((key) => (
                                    <option key={key} value={key}>{key}</option>
                                ))}
                            </select>

                            <div className='mb-3 w-full flex items-center justify-between'>
                                <p className='text-[#0d5d73] font-medium text-lg'>Price:</p> 
                                <span className='text-[#0d5d73] font-semibold text-xl'>{testData.price}</span>
                            </div>
                            <div className='mb-3 w-full flex items-center justify-between'>
                                <p className='text-[#0d5d73] font-medium text-lg'>Turn around time:</p> 
                                <span className='text-[#0d5d73] font-semibold text-xl'>{testData.approximateWait}</span>
                            </div>
                            <button className='w-full text-white bg-[#0d5d73] hover:bg-[#09495a] rounded-md font-semibold text-xl md:text-2xl py-2 mt-2 mb-4'>Order</button>
                        </div>

                        {/* <div className='w-10/12 mb-2'>
                            <label className='text-lg font-semibold'>Name</label>
                            <p className=' w-full text-base md:text-lg border rounded-md px-3 py-1 border-[#ccc]'>{profileData?.firstname + ' ' + profileData?.lastname}</p>
                        </div>
                        <div className='w-10/12 mb-2'>
                            <label className='text-lg font-semibold'>Email</label>
                            <p className=' w-full text-base md:text-lg border rounded-md px-3 py-1 border-[#ccc]'>{profileData?.email}</p>
                        </div>

                        <div className='w-10/12 mb-2'>
                            <label className='text-lg font-semibold'>Phone Number</label>
                            <p className='w-full text-base md:text-lg border rounded-md px-3 py-1 border-[#ccc]'>{profileData?.phonenumber}</p>
                        </div>
                        <div className='w-10/12 mb-2'>
                            <label className='text-lg font-semibold'>Address</label>
                            <p className='w-full text-base md:text-lg border rounded-md px-3 py-1 border-[#ccc]'>{profileData?.address}</p>
                        </div>

                        <div className='w-10/12 mt-6 mb-2'>
                            <p><span className='text-lg font-semibold'>Test Type:</span> {testData?.name}</p>
                        </div>

                        <div className='w-10/12 mb-3'>
                            <label className='text-lg font-semibold' htmlFor="facilityname">Facility</label>
                            <select className='border rounded-lg px-3 py-1 text-base md:text-lg' id='facilityname' {...register("facilityname")} defaultValue={Object.keys(facilities)[0]} onChange={handleFacilityChange}>
                                {facilities && Object.keys(facilities).map((key) => (
                                    <option key={key} value={key}>{key}</option>
                                ))}
                            </select>
                        </div>
                        <div className='w-10/12 mb-2'>
                            <p className='text-base md:text-lg'>Facility email: {selectedEmail}</p>
                        </div>

                        <div className='w-10/12 mb-3'>
                            <p className='text-base md:text-lg'>Price: {testData?.price}</p>
                        </div>

                        {!orderSuccess && (<button className='text-base xl:text-lg rounded-lg px-3 py-1 mb-6' type="submit">Create Order</button>)}
                        {orderSuccess === 'success' && <p className='response-msg mb-6 font-semibold md:text-xl text-lg' id='success'>Order submitted</p>}
                        {orderSuccess === 'fail' && <p className='response-msg mb-6 font-semibold md:text-xl text-lg' id='error'>Could not complete order</p>} */}
                        </>
                    )}
                </form>
            </>
        )
    }
}


export default NewOrder