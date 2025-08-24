import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import '../../style/newOrder.css'
import axios from 'axios';

const NewOrder = (props) => {
    const { register, handleSubmit } = useForm()
    const [testData, setTestData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [orderSuccess, setOrderSuccess] = useState(null);
    const [profileData, setProfileData] = useState(null);
    const [facilities, setFacilities] = useState([]);
    const [selectedEmail, setSelectedEmail] = useState('');



    const onSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:4000/createOrder', {
                patientId: props.userId,
                patientName: profileData.firstname + ' ' + profileData.lastname,
                patientEmail: profileData.email,
                patientPhone: profileData.phonenumber,
                patientAddress: profileData.address,
                diagnosis: testData.name,
                facilityName: Object.keys(facilities).find(key => facilities[key] === selectedEmail),
                facilityEmail: selectedEmail,
                user: profileData
            })

            if (response.status >= 200 && response.status < 300) {
                setOrderSuccess('success');
            } else {
                setOrderSuccess('fail');
            }

        } catch (err) {
            console.log('Error creating order:', err)
        }
    }


    const handleFacilityChange = (e) => {
        const facilityName = e.target.value;
        console.log('Selected facility email:', facilities[facilityName]);
        setSelectedEmail(facilities[facilityName] || '');
    };


    const getTestInfo = async () => {
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:4000/getTest', {id:props.testId})

            if (response.status >= 200 && response.status < 300) {
                console.log('test data:', response.data)
                setTestData(response.data.data);

                //update the facility Info
                const facilityList = response.data.data.facilities;
                const fData = {}
                facilityList.forEach((item) => {
                    fData[item.name] = item.email
                });
                setFacilities(fData);
                setSelectedEmail(Object.values(fData)[0]);
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
            const response = await axios.post('http://localhost:4000/getUser', {id: props.userId})

            if (response.status >= 200 && response.status < 300) {
                console.log('profile data:', response.data)
                setProfileData(response.data.data);
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
            <section onClick={(e) => e.stopPropagation()}  id="new-order">
                <div className='top-container'>
                    <button onClick={props.onClose} className='cancel-btn'>
                        Cancel
                    </button>
                    {/* <button className='confirm-btn'>
                        Confirm
                    </button> */}
                </div>
                {loading? (<div>
                        Loading...
                    </div>) :
                    (<div className='order-container'>
                        <h3 className='title'>New Order</h3>
                        {testData && profileData && facilities? 
                        (<form className='order-form' onSubmit={handleSubmit(onSubmit)}>
                            <div className='order-content' id='two-col'>
                                <div className='col'>
                                    <label>Name</label>
                                    <p className='info'>{profileData?.firstname + ' ' + profileData?.lastname}</p>
                                </div>
                                <div className='col'>
                                    <label>Email</label>
                                    <p className='info'>{profileData?.email}</p>
                                </div>
                            </div>

                            <div className='order-content' id='two-col'>
                                <div className='col'>
                                    <label>Phone Number</label>
                                    <p className='info'>{profileData?.phonenumber}</p>
                                </div>
                                <div className='col'>
                                    <label>Address</label>
                                    <p className='info'>{profileData?.address}</p>
                                </div>
                            </div>

                            <div className='order-content'>
                                <p><span>Test Type:</span> {testData?.name}</p>
                            </div>

                            <div className='order-content'>
                                <label htmlFor="facilityname">Facility</label>
                                <select id='facilityname' {...register("facilityname")} defaultValue={Object.keys(facilities)[0]} onChange={handleFacilityChange}>
                                    {facilities && Object.keys(facilities).map((key) => (
                                        <option key={key} value={key}>{key}</option>
                                    ))}
                                </select>
                            </div>
                            <div className='order-content'>
                                <p>Facility email: {selectedEmail}</p>
                            </div>

                            <div className='order-content'>
                                <p>Price: {testData?.price}</p>
                            </div>

                            <button className='save-button' type="submit">Confirm</button>
                {orderSuccess === 'success' && <p className='response-msg' id='success'>Order submitted</p>}
                {orderSuccess === 'fail' && <p className='response-msg' id='error'>Could not complete order</p>}



                        </form>) 
                        : 
                        (<div>Error fetching test data</div>)}
                    </div>)}
            </section>
            </>
        )
    }
}


export default NewOrder