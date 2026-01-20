import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import styles from '../../../style/Profile.module.css'
import EditProfile from './EditProfile';
import profile from '../../../images/profile.png'
import { useForm } from 'react-hook-form';
import { getUser, deleteChronicCondition, addNewChronicCondition, updateNotificationSettings } from '../../../services/userService';
import { getCountry } from '../../../utils/userUtils';

//icons
import { FiCamera } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { MdMarkEmailRead, MdOutlineCake } from "react-icons/md";
import { MdOutlinePersonOutline } from "react-icons/md";
import { MdOutlinePhoneEnabled } from "react-icons/md";
import { MdOutlineMailOutline } from "react-icons/md";
import { AiOutlineHome } from "react-icons/ai";
import { MdOutlineHomeWork } from "react-icons/md";
import { PiCity, PiPhoneCallBold } from "react-icons/pi";
import { MdOutlineWorkOutline } from "react-icons/md";
import { IoGlobeOutline } from "react-icons/io5";
import { MdOutlineSick } from "react-icons/md";
import UploadProfileModal from './UploadProfileModal';

const UserProfile = () => {
    const [loading, setLoading] = useState(false)
    const [updatingChronicCondition, setUpdatingChronicCondition] = useState(false)
    const [profileData, setProfileData] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [profilePicModalOpen, setProfilePicModalOpen] = useState(false)
    const [edit, setEdit] = useState(false);
    const [userCountry, setUserCountry] = useState('')
    const { register, handleSubmit } = useForm()
    const [newChronicCondition, setNewChronicCondition] = useState(false)
    //chronic condition(s)
    const [chronicConditionData, setChronicConditionData] = useState({
        condition: '',
        date: '',
        otherSpecifiedCondition: ''
    })
    const dropDownConditions = [
        'Hypertension (High Blood Pressure)',
        'Hyperlipidemia (High Cholesterol)',
        'Diabetes (Type 2)',
        'Obesity',
        'Coronary Artery Disease (Heart Disease)',
        'Asthma',
        'Chronic Kidney Disease',
        'Depression',
        'Osteoarthritis',
        'Chronic Obstructive Pulmonary Disease (COPD)',
        'Atrial Fibrillation',
        'Cancer',
        'Congestive Heart Failure',
        'Osteoporosis',
        'Stroke',
        'Other (Please Specify)'
    ]
    const [chronicConditionErrors, setChronicConditionErrors] = useState({})

    const handleChange = (e) => {
        const { name, value } = e.target;
        setChronicConditionData({
        ...chronicConditionData,
        [name]: value
        });
    };
    

    const user = useSelector((state) => state.login.data);
    const userId = user ? user.id : null
    const token = user ? user.token : null
    const countryId = user ? user.countryId : null
    const profilePictureUrl = user ? user.profilePictureUrl : null
    const fetchProfile = async (id) => {
        setLoading(true)
        try {
            const result = await getUser(id,token);
            if (result) {
                console.log('user profile: ', result)
                setProfileData(result);
            }
            const country = await getCountry(countryId)
            setUserCountry(country)
        } catch (e) {
            console.error('Error fetching user profile: ', e);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (!userId || !token) return
        console.log('Fetching profile for user ID:', userId);
        fetchProfile(userId,token);
    }, [userId,edit,token])


    const addChronicCondition = async () => {
        setUpdatingChronicCondition(true)
        try {
            const data = {...chronicConditionData, userId: userId}
            console.log('Adding data as a new conditoin: ',data)
            const result = await addNewChronicCondition(data,token)
            if (result.error) {
                setChronicConditionErrors({...chronicConditionErrors, additionError: result.error})
            } else {
                setProfileData({...profileData, chronic_conditions: result.data})
                setNewChronicCondition(false)
            }
        } catch (err) {
            console.error('Error occured adding a new chronic condition')
            setChronicConditionErrors({...chronicConditionErrors, additionError: "Failed to add new condition"})
        } finally {
            setUpdatingChronicCondition(false)
        }
    }

    const removeChronicCondition = async (condition) => {
        try {
            const result = await deleteChronicCondition({condition: condition, userId: userId},token)
            if (result.error) {
                setChronicConditionErrors({...chronicConditionErrors, removalError: "Failed to remove condition."})
            } else {
                setProfileData({...profileData, chronic_conditions: result.data})
            }
        } catch (err) {
            console.error('Error occured removing a chronic condition: ',err)
            setChronicConditionErrors({...chronicConditionErrors, removalError: "Failed to remove condition."})
        }
    }


    return(
        <section id='profile' className="w-full h-full min-h-screen flex flex-col overflow-y-auto items-center justify-start" style={{ background: "linear-gradient(to bottom, white 35%, #cddfef 85%)" }}>
            {loading ? (<img src='./secondary_color_spinner.svg' className='mx-auto my-auto' />) : 
            (<>
                


                <div className='w-11/12 md:w-8/12 h-auto flex flex-col items-center justify-center'>
                    <div className='top-0 mb-1 w-full flex items-center justify-between'>
                        <h3 className='text-xl lg:text-2xl font-semibold text-[var(--secondary-color)] ml-3'>Profile</h3>
                        <button onClick={()=>setModalOpen(!modalOpen)} className="bg-[var(--secondary-color)] rounded-md px-8 py-1 text-lg lg:text-xl text-white xl:text-2xl hover:bg-opacity-80">Edit</button>
                    </div>

                    <div className='w-full flex flex-col items-center justify-center pb-8 mb-3 gap-2'>
                        <div className='w-full flex items-center justify-between px-8 py-3 rounded-tl-xl rounded-tr-xl rounded-bl-md rounded-br-md bg-gray-100 border border-[var(--light-border-color)]'>
                            <div className='flex items-center justify-center gap-6'>
                                <FiCamera className='h-10 md:h-12 w-10 md:w-12 mr-3 text-[var(--secondary-color)]' />
                                <div className=''>
                                    <h3 className='text-lg md:text-xl font-medium text-gray-800 m-0'>Profile Picture</h3>
                                    <p className='text-sm md:text-base text-gray-400'>Personalize your account</p>
                                </div>
                            </div>
                            <div className='flex flex-col items-center justify-center gap-1'>
                                <img onClick={()=>setProfilePicModalOpen(true)} className='rounded-full cursor-pointer flex items-center justify-center h-20 md:h-24 w-20 md:w-24' src={profilePictureUrl ? profilePictureUrl : profile} alt="Profile" />
                            </div>
                            
                        </div>

                        <div className='w-full flex items-center justify-between px-8 py-3 rounded-md bg-gray-100 border border-[var(--light-border-color)]'>
                            <div className='flex items-center justify-center gap-6'>
                                <CgProfile className='h-10 md:h-12 w-10 md:w-12 mr-3 text-[var(--secondary-color)]' />
                                <div className=''>
                                    <h3 className='text-lg md:text-xl font-medium text-gray-800 m-0'>Name</h3>
                                    <p className='text-base md:text-lg text-gray-400'>{profileData?.firstName} {profileData?.lastName}</p>
                                </div>
                            </div>

                        </div>

                        <div className='w-full flex items-center justify-between px-8 py-3 rounded-md bg-gray-100 border border-[var(--light-border-color)]'>
                            <div className='flex items-center justify-center gap-6'>
                                <MdOutlineCake className='h-10 md:h-12 w-10 md:w-12 mr-3 text-[var(--secondary-color)]' />
                                <div className=''>
                                    <h3 className='text-lg md:text-xl font-medium text-gray-800 m-0'>Birthday</h3>
                                    <p className='text-base md:text-lg text-gray-400'>{profileData?.dateOfBirth ? profileData.dateOfBirth : 'None'}</p>
                                </div>
                            </div>

                        </div>

                        <div className='w-full flex items-center justify-between px-8 py-3 rounded-tr-md rounded-tl-md rounded-bl-xl rounded-br-xl bg-gray-100 border border-[var(--light-border-color)]'>
                            <div className='flex items-center justify-center gap-6'>
                                <MdOutlinePersonOutline className='h-10 md:h-12 w-10 md:w-12 mr-3 text-[var(--secondary-color)]' />
                                <div className=''>
                                    <h3 className='text-lg md:text-xl font-medium text-gray-800 m-0'>Gender</h3>
                                    <p className='text-base md:text-lg text-gray-400'>{profileData?.gender ? profileData.gender : 'None'}</p>
                                </div>
                            </div>

                        </div>

                    </div>

                    <div className='mt-3 mb-1 w-full'>
                        <h3 className='text-xl lg:text-2xl font-semibold text-[var(--secondary-color)] ml-3'>Contact Information</h3>
                    </div>

                    <div className='w-full flex flex-col items-center justify-center pb-8 mb-3 gap-2'>
                        <div className='w-full flex items-center justify-between px-8 py-3 rounded-tl-xl rounded-tr-xl rounded-bl-md rounded-br-md bg-gray-100 border border-[var(--light-border-color)]'>
                            <div className='flex items-center justify-center gap-6'>
                                <MdOutlineMailOutline className='h-10 md:h-12 w-10 md:w-12 mr-3 text-[var(--secondary-color)]' />
                                <div className=''>
                                    <h3 className='text-lg md:text-xl font-medium text-gray-800 m-0'>Email</h3>
                                    <p className='text-sm md:text-base text-gray-400'>{profileData?.email ? profileData.email : 'None'}</p>
                                </div>
                            </div>
                        </div>

                        <div className='w-full flex items-center justify-between px-8 py-3 rounded-tr-md rounded-tl-md rounded-bl-xl rounded-br-xl bg-gray-100 border border-[var(--light-border-color)]'>
                            <div className='flex items-center justify-center gap-6'>
                                <MdOutlinePhoneEnabled className='h-10 md:h-12 w-10 md:w-12 mr-3 text-[var(--secondary-color)]' />
                                <div className=''>
                                    <h3 className='text-lg md:text-xl font-medium text-gray-800 m-0'>Phone Number</h3>
                                    <p className='text-base md:text-lg text-gray-400'>{profileData?.phoneNumber ? profileData.phoneNumber : 'None'}</p>
                                </div>
                            </div>

                        </div>

                    </div>

                    <div className='mt-3 mb-1 w-full'>
                        <h3 className='text-xl lg:text-2xl font-semibold text-[var(--secondary-color)] ml-3'>Address</h3>
                    </div>

                    <div className='w-full flex flex-col items-center justify-center pb-8 mb-10 gap-2'>
                        <div className='w-full flex items-center justify-between px-8 py-3 rounded-tl-xl rounded-tr-xl rounded-bl-md rounded-br-md bg-gray-100 border border-[var(--light-border-color)]'>
                            <div className='flex items-center justify-center gap-6'>
                                <AiOutlineHome className='h-10 md:h-12 w-10 md:w-12 mr-3 text-[var(--secondary-color)]' />
                                <div className=''>
                                    <h3 className='text-lg md:text-xl font-medium text-gray-800 m-0'>Street</h3>
                                    <p className='text-sm md:text-base text-gray-400'>{profileData?.street ? profileData.street : 'None'}</p>
                                </div>
                            </div>
                        </div>

                        <div className='w-full flex items-center justify-between px-8 py-3 rounded-md bg-gray-100 border border-[var(--light-border-color)]'>
                            <div className='flex items-center justify-center gap-6'>
                                <MdOutlineHomeWork className='h-10 md:h-12 w-10 md:w-12 mr-3 text-[var(--secondary-color)]' />
                                <div className=''>
                                    <h3 className='text-lg md:text-xl font-medium text-gray-800 m-0'>District</h3>
                                    <p className='text-base md:text-lg text-gray-400'>{profileData?.district ? profileData.district : 'None'}</p>
                                </div>
                            </div>

                        </div>

                        <div className='w-full flex items-center justify-between px-8 py-3 rounded-md bg-gray-100 border border-[var(--light-border-color)]'>
                            <div className='flex items-center justify-center gap-6'>
                                <PiCity className='h-10 md:h-12 w-10 md:w-12 mr-3 text-[var(--secondary-color)]' />
                                <div className=''>
                                    <h3 className='text-lg md:text-xl font-medium text-gray-800 m-0'>City</h3>
                                    <p className='text-base md:text-lg text-gray-400'>{profileData?.city ? profileData.city : 'None'}</p>
                                </div>
                            </div>

                        </div>

                        <div className='w-full flex items-center justify-between px-8 py-3 rounded-md bg-gray-100 border border-[var(--light-border-color)]'>
                            <div className='flex items-center justify-center gap-6'>
                                <IoGlobeOutline className='h-10 md:h-12 w-10 md:w-12 mr-3 text-[var(--secondary-color)]' />
                                <div className=''>
                                    <h3 className='text-lg md:text-xl font-medium text-gray-800 m-0'>Country</h3>
                                    <p className='text-base md:text-lg text-gray-400'>{countryId ? userCountry : 'None'}</p>
                                </div>
                            </div>

                        </div>

                        <div className='w-full flex items-center justify-between px-8 py-3 rounded-tr-md rounded-tl-md rounded-bl-xl rounded-br-xl bg-gray-100 border border-[var(--light-border-color)]'>
                            <div className='flex items-center justify-center gap-6'>
                                <MdOutlineWorkOutline className='h-10 md:h-12 w-10 md:w-12 mr-3 text-[var(--secondary-color)]' />
                                <div className=''>
                                    <h3 className='text-lg md:text-xl font-medium text-gray-800 m-0'>Occupation</h3>
                                    <p className='text-base md:text-lg text-gray-400'>{profileData?.occupation ? profileData.occupation : 'None'}</p>
                                </div>
                            </div>

                        </div>

                    </div>

                    <div className='mt-3 mb-1 w-full flex items-center justify-between'>
                        <h3 className='text-xl lg:text-2xl font-semibold text-[var(--secondary-color)] ml-3'>Chronic Conditions</h3>

                        <button onClick={()=>setNewChronicCondition(!newChronicCondition)} className='flex cursor-pointer items-center justify-center px-3 py-2 text-white font-medium text-base lg:text-lg xl:text-xl bg-[var(--secondary-color)]'>
                            Add new Condition
                        </button>
                    </div>

                    {newChronicCondition && (<form className='flex mb-4 w-full flex-col items-center justify-center rounded-md gap-4 bg-gray-100 py-3 px-4'>
                        <div className='w-full grid grid-cols-[100px_1fr] md:grid-cols-[120px_1fr] lg:grid-cols-[200px_1fr] lg:gap-2'>
                            <p className='font-medium text-[var(--secondary-color)] text-base md:text-lg'>Chronic Condition:</p>
                            {/* <input onChange={handleChange} name='condition' type='text' className='focus:outline-none w-full px-3 py-2 border border-[var(--secondary-color)] rounded-md' placeholder='Condition Name' /> */}
                            <select name='condition' className='focus:outline-none w-full px-3 py-2 border border-[var(--secondary-color)] rounded-md' onChange={handleChange}>
                                {dropDownConditions.map(condition => (<option>{condition}</option>))}
                            </select>
                        </div>
                        {chronicConditionData.condition == 'Other (Please Specify)' && <div className='w-full grid grid-cols-[100px_1fr] md:grid-cols-[120px_1fr] lg:grid-cols-[200px_1fr] lg:gap-2'>
                            <p className='font-medium text-[var(--secondary-color)] text-base md:text-lg'>Other Condition:</p>
                            <input onChange={handleChange} name='otherSpecifiedCondition' type='text' className='focus:outline-none w-full px-3 py-2 border border-[var(--secondary-color)] rounded-md' placeholder='Other Condition' />
                        </div>}
                        <div className='w-full grid grid-cols-[100px_1fr] md:grid-cols-[120px_1fr] lg:grid-cols-[200px_1fr] lg:gap-2'>
                            <p className='font-medium text-[var(--secondary-color)] text-base md:text-lg'>Beginning on:</p>
                            <input onChange={handleChange} name='date' type='date' className='focus:outline-none w-full' />
                        </div>
                        
                        <div onClick={()=>addChronicCondition()} className='w-full bg-[#1c7d7f] rounded-md flex items-center justify-center text-white font-medium text-base md:text-lg xl:text-xl py-2 hover:bg-opacity-80 cursor-pointer'>
                            {updatingChronicCondition ? <img src="/gray_spinner.svg" className="h-8 w-8"/> : "Add"}
                            </div>

                        {chronicConditionErrors.addtionError && <p className="mt-4 mb-4 text-red-500 font-medium text-base md:text-lg 2xl:text-xl">{chronicConditionErrors.additionError}</p>}
                    </form>)}


                    
                    <div className='w-full flex flex-col items-center justify-center pb-8 mb-3 gap-2'>
                        {profileData?.chronic_conditions?.map((item,index) => (
                            <div className={`w-full relative flex items-center justify-between px-8 pb-3 pt-6 rounded-tl-${index == 0 ? 'xl' : 'md'} rounded-tr-${index == 0 ? 'xl' : 'md'} rounded-bl-${index == profileData?.chronicConditions?.length-1 ? 'xl' : 'md'} rounded-br-${index == profileData?.chronicConditions?.length-1 ? 'xl' : 'md'} bg-gray-100 border border-[var(--light-border-color)]`}>
                                <div className='flex items-center justify-center gap-6'>
                                    <MdOutlineSick className='h-10 md:h-12 w-10 md:w-12 mr-3 text-[var(--secondary-color)]' />
                                    <div className=''>
                                        <h3 className='text-lg md:text-xl font-medium text-gray-800 m-0'>Condition</h3>
                                        <p className='text-sm md:text-base text-gray-400'>{item?.condition}</p>
                                    </div>
                                </div>
                                <p className='text-sm md:text-base xl:text-lg font-medium text-gray-700'>From {item?.date}</p>
                                <p onClick={()=>removeChronicCondition(item?.condition)} className="absolute right-8 top-1 text-sm md:text-base xl:text-lg font-bold text-red-800 hover:text-red-700 cursor-pointer">Remove</p>
                            </div>
                        ))}
                    </div>

                    {chronicConditionErrors.removalError && <p className="mt-4 mb-4 text-red-500 font-medium text-base md:text-lg 2xl:text-xl" >{chronicConditionErrors.removalError}</p>}
                </div>

                </>)}

            <EditProfile open={modalOpen} id={userId} profileData={profileData} onClose={() => {
                    setModalOpen(false)}} onSubmit={()=> {
                        setModalOpen(false)
                        setEdit(!edit)
                    }}/>
            {profilePicModalOpen && (<UploadProfileModal profileData={profileData} id={userId} onClose={()=>{
                setProfilePicModalOpen(false)
            }}/>)}

        </section>
    )
}




export default UserProfile