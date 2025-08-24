import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Sidebar from './Sidebar'
import '../../style/Profile.css'
import { FaArrowLeft } from "react-icons/fa6";
import axios from 'axios';
import EditProfile from './EditProfile';
import profile from '../../images/profile.png'

const Profile = () => {
    const [loading, setLoading] = useState(false)
    const [profileData, setProfileData] = useState(null);
    const [userId, setUserId] = useState(null);
    const [modalOpen, setModalOpen] = useState(false)
    const [edit, setEdit] = useState(false)
    
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


    return(
        <section id='profile'>
            {loading ? (<div><img src='./spinner-200px-200px.svg' /></div>) : 
            (<>
                <div className='header'>
                <Link to="/dashboard"> <FaArrowLeft size={28} color='black'/> </Link>
                <h2>Welcome {profileData?.username}</h2>
            </div>
            <div className='p-container'>
                <div className='profile-container'>
                    <div className='profile-picture'>
                        <img src={profile} alt="Profile" />
                    </div>
                    <div className='profile-info'>
                        <div>
                            <p className='label'>Gender</p>
                            <p className='info'>{profileData?.gender ? profileData.gender : 'None'}</p>
                        </div>
                        <div>
                            <p className='label'>Date of Birth</p>
                            <p className='info'>{profileData?.dateofbirth ? profileData.dateofbirth : 'None'}</p>
                        </div>
                    </div>
                    <button onClick={()=>setModalOpen(!modalOpen)} className='edit-btn'>Edit</button>


                </div>
                <div className='data-container'>
                    <div className='user-info'>
                        <div>
                            <p className='label'>First Name</p>
                            <p className='info'>{profileData?.firstname ? profileData.firstname : 'None'}</p>
                        </div>
                        <div>
                            <p className='label'>Last Name</p>
                            <p className='info'>{profileData?.lastname ? profileData.lastname : 'None'}</p>
                        </div>
                    </div>

                    <div className='user-info'>
                        <div>
                            <p className='label'>Email</p>
                            <p className='info'>{profileData?.email ? profileData.email : 'None'}</p>
                        </div>
                        <div>
                            <p className='label'>Phone Number</p>
                            <p className='info'>{profileData?.phonenumber ? profileData.phonenumber : 'None'}</p>
                        </div>
                    </div>

                    <div className='user-info'>
                        <div>
                            <p className='label'>Address</p>
                            <p className='info'>{profileData?.address ? profileData.address : 'None'}</p>
                        </div>
                        <div>
                            <p className='label'>City</p>
                            <p className='info'>{profileData?.city ? profileData.city : 'None'}</p>
                        </div>
                    </div>

                </div>

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
    <div style={{width: '100%', height: '100vh',minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Sidebar />
        <Profile />
    </div>
)
export default ProfileExport