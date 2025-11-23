import { useForm} from 'react-hook-form';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import '../../style/EditProfile.css'
import { editProfile } from '../../services/userService';

const EditProfile = (props) => {
    const user = useSelector((state) => state.login.data)
    const token = user ? user.token : null
    const { register, handleSubmit } = useForm()
    const minDate = new Date(1900, 0, 1).toISOString().split("T")[0];
    const maxDate = new Date().toISOString().split("T")[0];
    const [updateSuccess, setUpdateSuccess] = useState(null);
    const [loading, setLoading] = useState(false)

    const onSubmit = async (data) => {
        try {
            setLoading(true)
            data.id = props.id
            console.log('edit form data: ', data)
            //update the information
            const result = await editProfile(data,token)
            if (result && result.success) {
                // Handle success
                setUpdateSuccess('success');
            } else {
                // Handle error
                console.error('Failure updating profile');
                setUpdateSuccess('fail');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            setUpdateSuccess('fail');
        } finally {
            setLoading(false)
        }
    }

    const handleOverlayClick = (e) => {
        // Only close if the clicked element is the overlay itself
        if (e.target === e.currentTarget) {
            props.onClose();
        }
    };

    if (!props.open) {
        return null
    } else {
        return (
            <><div className='overlay' onClick={handleOverlayClick}></div>
            <form className='edit-profile-container w-10/12 md:w-3/5' onSubmit={handleSubmit(onSubmit)}>
                <button className='h-9 w-9 flex items-center justify-center rounded-md bg-[#a3b1c0] text-white cursor-pointer absolute top-1 right-1' onClick={props.onClose}>✖</button>
                <h3 className='text-[var(--secondary-color)] font-semibold text-2xl'>Edit Profile</h3>
                <div className='w-11/12'>
                    <label className='font-medium text-base md:text-lg' for="firstname">First Name</label>
                    <input className='w-full border text-[#0d5d73] bg-[#ebeff3] border-[#0d5d73] rounded-lg px-3 py-2 focus:outline-none' id='firstname' {...register("firstName")} type="text" placeholder='First name' defaultValue={props.profileData?.firstName || ''}/>
                </div>
                <div className='w-11/12'>
                    <label className='font-medium text-base md:text-lg' for="lastname">Last Name</label>
                    <input className='w-full border text-[#0d5d73] bg-[#ebeff3] border-[#0d5d73] rounded-lg px-3 py-2 focus:outline-none' id='lastname' {...register("lastName")} type="text" placeholder='Last name' defaultValue={props.profileData?.lastName || ''}/>
                </div>

                <div className='w-11/12'>
                    <label className='font-medium text-base md:text-lg' for="phonenumber">Phone Number</label>
                    <input className='w-full border text-[#0d5d73] bg-[#ebeff3] border-[#0d5d73] rounded-lg px-3 py-2 focus:outline-none' id='phonenumber' {...register("phoneNumber")} type="tel" placeholder='Phone number' defaultValue={props.profileData?.phoneNumber || ''}/>
                </div>
                
                <div className='w-11/12'>
                    <label className='font-medium text-base md:text-lg' for="street">Street</label>
                    <input className='w-full border text-[#0d5d73] bg-[#ebeff3] border-[#0d5d73] rounded-lg px-3 py-2 focus:outline-none' id='street' {...register("street")} type="text" placeholder='Street' defaultValue={props.profileData?.street || ''}/>
                </div>
                <div className='w-11/12'>
                    <label className='font-medium text-base md:text-lg' for="district">District</label>
                    <input className='w-full border text-[#0d5d73] bg-[#ebeff3] border-[#0d5d73] rounded-lg px-3 py-2 focus:outline-none' id='district' {...register("district")} type="text" placeholder='District' defaultValue={props.profileData?.district || ''}/>
                </div>
                <div className='w-11/12'>
                    <label className='font-medium text-base md:text-lg' for="city">City</label>
                    <input className='w-full border text-[#0d5d73] bg-[#ebeff3] border-[#0d5d73] rounded-lg px-3 py-2 focus:outline-none' id='city' {...register("city")} type="text" placeholder='City' defaultValue={props.profileData?.city || ''}/>
                </div>
                <div className='w-11/12'>
                    <label className='font-medium text-base md:text-lg' for="city">Occupation</label>
                    <input className='w-full border text-[#0d5d73] bg-[#ebeff3] border-[#0d5d73] rounded-lg px-3 py-2 focus:outline-none' id='occupation' {...register("occupation")} type="text" placeholder='Occupation' defaultValue={props.profileData?.occupation || ''}/>
                </div>
                
                <div className='w-11/12'>
                    <label className='font-medium text-base md:text-lg' for="dateofbirth">Date of Birth</label>
                    <input className='w-full border text-[#0d5d73] bg-[#ebeff3] border-[#0d5d73] rounded-lg px-3 py-2 focus:outline-none' id='dateofbirth' {...register("dateOfBirth")} type="date" min={minDate} max={maxDate} defaultValue={props.profileData?.dateOfBirth || ''}/>
                </div>
                <div className='w-11/12 mb-4'>
                    <label className='font-medium text-base md:text-lg' for="gender">Gender</label>
                    <select className='w-full border text-[#0d5d73] bg-[#ebeff3] border-[#0d5d73] rounded-lg px-3 py-2 focus:outline-none' id='gender' {...register("gender")} defaultValue={props.profileData?.gender || ''}>
                        <option value="MALE">Male</option>
                        <option value="FEMALE">Female</option>
                    </select>
                </div>
                {updateSuccess != 'success' && (<button className='w-11/12 text-white bg-[#0d5d73] hover:bg-[#09495a] rounded-md font-semibold text-xl md:text-2xl py-2 mt-2 mb-4' type="submit">
                {loading ? <img src='./gray_spinner.svg' className='h-9 w-9' /> : 'Save'}
                </button>)}
                {updateSuccess === 'success' && <p className='response-msg mb-6 font-semibold md:text-xl text-lg' id='success'>Saved successfully</p>}
                {updateSuccess === 'fail' && <p className='response-msg mb-6 font-semibold md:text-xl text-lg' id='error'>Could not save changes</p>}
            </form></>
        )
    }
}

export default EditProfile;