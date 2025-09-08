import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Sidebar from './Sidebar'
import styles from '../../style/Profile.module.css'
import { FaArrowLeft } from "react-icons/fa6";
import axios from 'axios';
import EditProfile from './EditProfile';
import profile from '../../images/profile.png'
import { useForm} from 'react-hook-form';


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
            const response = await axios.post('http://localhost:4000/getUser', {id: id});
            console.log('Fetched user profile: ', response.data.data);

            if (response.status >= 200 && response.status < 300) {
                setProfileData(response.data.data);
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
        <section id='profile' className="w-full h-full flex flex-col overflow-y-auto bg-[#f4fdfd] items-center justify-center">
            {loading ? (<div><img src='./spinner-200px-200px.svg' /></div>) : 
            (<>
                <div className='w-10/12 mb-8 mt-10'>
                    <h2 className='text-4xl font-semibold'>Account</h2>
                    <p className='text-base text-gray-500'>Manage your account preferences, security, and notification settings</p>
                </div>
                <div className='w-10/12 h-auto flex flex-col items-center justify-center rounded-lg border border-gray-300 pyb-8 bg-white mb-10 shadow-md'>
                    <div className='top-0 mb-6 border-b-gray-300 border-b bg-[#f4fdfd] w-full rounded-tl-lg rounded-tr-lg'>
                        <h3 className='text-2xl font-semibold ml-3'>Profile Settings</h3>
                    </div>
                    <div className={styles['profile-picture']}>
                        <img src={profile} alt="Profile" />
                    </div>
                    <div className={styles['p-container']}>
                                <div className='w-full'>
                                    <p className={styles['label']}>Gender</p>
                                    <p className="w-full border border-[#ccc] rounded-lg px-3 py-1">{profileData?.gender ? profileData.gender : 'None'}</p>
                                </div>
                                <div className='w-full'>
                                    <p className={styles['label']}>Date of Birth</p>
                                    <p className="w-full border border-[#ccc] rounded-lg px-3 py-1">{profileData?.dateofbirth ? profileData.dateofbirth : 'None'}</p>
                                </div>

                                <div className='w-full'>
                                    <p className={styles['label']}>First Name</p>
                                    <p className="w-full border border-[#ccc] rounded-lg px-3 py-1">{profileData?.firstname ? profileData.firstname : 'None'}</p>
                                </div>
                                <div className='w-full'>
                                    <p className={styles['label']}>Last Name</p>
                                    <p className="w-full border border-[#ccc] rounded-lg px-3 py-1">{profileData?.lastname ? profileData.lastname : 'None'}</p>
                                </div>

                                <div className='w-full'>
                                    <p className={styles['label']}>Email</p>
                                    <p className="w-full border border-[#ccc] rounded-lg px-3 py-1">{profileData?.email ? profileData.email : 'None'}</p>
                                </div>
                                <div className='w-full'>
                                    <p className={styles['label']}>Phone Number</p>
                                    <p className="w-full border border-[#ccc] rounded-lg px-3 py-1">{profileData?.phonenumber ? profileData.phonenumber : 'None'}</p>
                                </div>

                                <div className='w-full'>
                                    <p className={styles['label']}>Address</p>
                                    <p className="w-full border border-[#ccc] rounded-lg px-3 py-1">{profileData?.address ? profileData.address : 'None'}</p>
                                </div>
                                <div className='w-full'>
                                    <p className={styles['label']}>City</p>
                                    <p className="w-full border border-[#ccc] rounded-lg px-3 py-1">{profileData?.city ? profileData.city : 'None'}</p>
                                </div>
                    </div>
                    <button onClick={()=>setModalOpen(!modalOpen)} className="bg-[#00c2cb] rounded-lg px-3 py-1 text-xl md:text-2xl w-30 md:w-40 mb-10 hover:bg-[#03acb5]">Edit</button>
                </div>


                <div className='w-10/12 h-auto flex flex-col items-center justify-center rounded-lg border border-gray-300 pyb-8 bg-white mb-10 shadow-md'>
                    <div className='top-0 mb-6 border-b-gray-300 border-b bg-[#f4fdfd] w-full rounded-tl-lg rounded-tr-lg'>
                        <h3 className='text-2xl font-semibold ml-3'>Notification Settings</h3>
                    </div>
                    <form onSubmit={handleSubmit(updateNotifications)} className='w-full bg-white mt-3 mb-6 px-3 py-1 flex flex-col items-center justify-center'>
                        <div className='flex items-center w-full justify-between px-5 mb-3'>
                            <p className='text-base md:text-xl'>Email: {profileData?.email}</p>
                            <input id='email_notification' {...register("email_notification")} type='checkbox' className='w-5 h-5 md:w-8 md:h-8' />
                        </div>

                        <div className='flex items-center w-full justify-between px-5 mb-3'>
                            <p className='text-base md:text-xl'>Text: {profileData?.phonenumber}</p>
                            <input id='text_notification' {...register("text_notification")} type='checkbox' className='w-5 h-5 md:w-8 md:h-8' />
                        </div>

                        <button className="bg-[#00c2cb] rounded-lg px-3 py-1 text-xl md:text-2xl w-30 md:w-40 mb-2 hover:bg-[#03acb5]">
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