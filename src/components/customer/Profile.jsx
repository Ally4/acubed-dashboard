import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Sidebar from './Sidebar'
import styles from '../../style/Profile.module.css'
import { FaArrowLeft } from "react-icons/fa6";
import EditProfile from './EditProfile';
import profile from '../../images/profile.png'
import { useForm} from 'react-hook-form';
import { getUser } from '../../services/userService';

//icons
import { FiCamera } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { MdMarkEmailRead, MdOutlineCake } from "react-icons/md";
import { MdOutlinePersonOutline } from "react-icons/md";
import { MdOutlinePhoneEnabled } from "react-icons/md";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaRegAddressCard } from "react-icons/fa";
import { PiCity, PiPhoneCallBold } from "react-icons/pi";
import { MdOutlineWorkOutline } from "react-icons/md";
import { IoGlobeOutline } from "react-icons/io5";

const Profile = () => {
    const [loading, setLoading] = useState(false)
    const [profileData, setProfileData] = useState(null);
    const [userId, setUserId] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [edit, setEdit] = useState(false);
    const { register, handleSubmit } = useForm()
    

    const user = useSelector((state) => state.login.data);
    console.log('user data: ',user)
    const fetchProfile = async (id) => {
        setLoading(true)
        try {
            const result = await getUser(id);
            if (result) {
                console.log('user profile: ', result)
                setProfileData(result.data);
            }
        } catch (e) {
            console.error('Error fetching user profile: ', e);
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        const id = user ? user.data?.id : null;
        setUserId(id);
    }, [user]);

    useEffect(() => {
        console.log('useEf triggered: ',userId)
        if (userId) {
            console.log('Fetching profile for user ID:', userId);
            fetchProfile(userId);
        }
    }, [userId,edit])

    useEffect(() => {
        console.log('useEffect triggered: ', userId);
        if (userId) {
            console.log('Fetching profile for user ID:', userId);
            fetchProfile(userId);
        }
    }, [])

    const updateNotifications = async () => {
        try {

        } catch (err) {
            console.log('Error updateing notifications')
        }
    }


    return(
        <section id='profile' className="w-full h-full flex flex-col overflow-y-auto items-center justify-center" style={{ background: "linear-gradient(to bottom, white 35%, #cddfef 85%)" }}>
            {loading ? (<div><img src='./spinner-200px-200px.svg' /></div>) : 
            (<>
                <div className='w-11/12 md:w-8/12 mb-8 mt-10'>
                    <h2 className='text-4xl font-semibold'>Account</h2>
                    <p className='text-base text-gray-500'>Manage your account preferences, security, and notification settings</p>
                </div>


                <div className='w-11/12 md:w-8/12 h-auto flex flex-col items-center justify-center'>
                    <div className='top-0 mb-1 w-full flex items-center justify-between'>
                        <h3 className='text-2xl font-semibold text-[var(--secondary-color)]'>Profile Settings</h3>
                        <button onClick={()=>setModalOpen(!modalOpen)} className="bg-[var(--secondary-color)] rounded-md px-8 py-1 text-xl text-white md:text-2xl hover:bg-opacity-80">Edit</button>
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

                            <img className='rounded-full flex items-center justify-center h-20 md:h-24 w-20 md:w-24' src={profile} alt="Profile" />
                        </div>

                        <div className='w-full flex items-center justify-between px-8 py-3 rounded-md bg-gray-100 border border-[var(--light-border-color)]'>
                            <div className='flex items-center justify-center gap-6'>
                                <CgProfile className='h-10 md:h-12 w-10 md:w-12 mr-3 text-[var(--secondary-color)]' />
                                <div className=''>
                                    <h3 className='text-lg md:text-xl font-medium text-gray-800 m-0'>Name</h3>
                                    <p className='text-base md:text-lg text-gray-400'>{profileData?.firstname} {profileData?.lastname}</p>
                                </div>
                            </div>

                        </div>

                        <div className='w-full flex items-center justify-between px-8 py-3 rounded-md bg-gray-100 border border-[var(--light-border-color)]'>
                            <div className='flex items-center justify-center gap-6'>
                                <MdOutlineCake className='h-10 md:h-12 w-10 md:w-12 mr-3 text-[var(--secondary-color)]' />
                                <div className=''>
                                    <h3 className='text-lg md:text-xl font-medium text-gray-800 m-0'>Birthday</h3>
                                    <p className='text-base md:text-lg text-gray-400'>{profileData?.dateofbirth ? profileData.dateofbirth : 'None'}</p>
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
                        <h3 className='text-2xl font-semibold text-[var(--secondary-color)]'>Contact Information</h3>
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
                                    <p className='text-base md:text-lg text-gray-400'>{profileData?.phonenumber ? profileData.phonenumber : 'None'}</p>
                                </div>
                            </div>

                        </div>

                    </div>

                    <div className='mt-3 mb-1 w-full'>
                        <h3 className='text-2xl font-semibold text-[var(--secondary-color)]'>Address</h3>
                    </div>

                    <div className='w-full flex flex-col items-center justify-center pb-8 mb-10 gap-2'>
                        <div className='w-full flex items-center justify-between px-8 py-3 rounded-tl-xl rounded-tr-xl rounded-bl-md rounded-br-md bg-gray-100 border border-[var(--light-border-color)]'>
                            <div className='flex items-center justify-center gap-6'>
                                <FaRegAddressCard className='h-10 md:h-12 w-10 md:w-12 mr-3 text-[var(--secondary-color)]' />
                                <div className=''>
                                    <h3 className='text-lg md:text-xl font-medium text-gray-800 m-0'>Address</h3>
                                    <p className='text-sm md:text-base text-gray-400'>{profileData?.address ? profileData.address : 'None'}</p>
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
                                    <p className='text-base md:text-lg text-gray-400'>{profileData?.country ? profileData.country : 'None'}</p>
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
                </div>


                <div className='w-11/12 md:w-8/12 h-auto flex flex-col items-center justify-center mb-10'>
                    <div className='top-0 mb-1 w-full'>
                        <h3 className='text-2xl font-semibold ml-3 text-[var(--secondary-color)]'>Notification Settings</h3>
                    </div>
                    <form onSubmit={handleSubmit(updateNotifications)} className='w-full mb-6 flex flex-col gap-2 items-center justify-center'>
                        <div className='w-full flex items-center justify-between px-8 py-3 rounded-tr-xl rounded-tl-xl rounded-bl-md rounded-br-md bg-gray-100 border border-[var(--light-border-color)]'>
                            <div className='flex items-center justify-center gap-6'>
                                <MdMarkEmailRead className='h-10 md:h-12 w-10 md:w-12 mr-3 text-[var(--secondary-color)]' />
                                <div className=''>
                                    <h3 className='text-lg md:text-xl font-medium text-gray-800 m-0'>Email:</h3>
                                    <p className='text-base md:text-lg text-gray-400'>{profileData?.email}</p>
                                </div>
                            </div>
                            <input id='email_notification' {...register("email_notification")} type='checkbox' className='accent-[#187089] w-5 h-5 md:w-8 md:h-8' />
                        </div>

                        <div className='w-full flex items-center justify-between px-8 py-3 rounded-tr-md rounded-tl-md rounded-bl-xl rounded-br-xl bg-gray-100 border border-[var(--light-border-color)]'>
                            <div className='flex items-center justify-center gap-6'>
                                <PiPhoneCallBold className='h-10 md:h-12 w-10 md:w-12 mr-3 text-[var(--secondary-color)]' />
                                <div className=''>
                                    <h3 className='text-lg md:text-xl font-medium text-gray-800 m-0'>Phone Number</h3>
                                    <p className='text-base md:text-lg text-gray-400'>{profileData?.phonenumber}</p>
                                </div>
                            </div>
                            <input id='text_notification' {...register("text_notification")} type='checkbox' className='accent-[#187089] w-5 h-5 md:w-8 md:h-8' />
                        </div>

                        <button className="bg-[var(--secondary-color)] rounded-lg px-3 py-1 text-xl md:text-2xl w-30 md:w-40 mb-2 mt-2 hover:bg-[#12708a]">
                            Save
                        </button>
                    </form>           
                </div>
                </>)}

            <EditProfile open={modalOpen} id={userId} profileData={profileData} onClose={() => {
                    setModalOpen(false)}} onSubmit={()=> {
                        setModalOpen(false)
                        setEdit(!edit)
                    }}/>

        </section>
    )
}


const ProfileExport = () => (
    <div style={{width: '100%', height: '100%',minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'flex-start'}}>
        <Sidebar />
        <Profile />
    </div>
)
export default ProfileExport