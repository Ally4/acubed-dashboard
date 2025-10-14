import { useForm} from 'react-hook-form';
import React, { useState } from 'react';
import '../../style/EditProfile.css'
import { editProfile } from '../../services/userService';

const EditProfile = (props) => {
    const { register, handleSubmit } = useForm()
    const minDate = new Date(1900, 0, 1).toISOString().split("T")[0];
    const maxDate = new Date().toISOString().split("T")[0];
    const [updateSuccess, setUpdateSuccess] = useState(null);

    const onSubmit = async (data) => {
        try {
            data['id'] = props.id
            console.log('edit form data: ', data)
            //update the information
            const result = await editProfile(data)
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
                <h3 className='text-[#0d5d73] font-semibold text-2xl'>Edit Profile</h3>
                <div className='w-11/12'>
                    <label className='font-medium text-base md:text-lg' for="firstname">First Name</label>
                    <input className='w-full border text-[#0d5d73] bg-[#ebeff3] border-[#0d5d73] rounded-lg px-3 py-2 focus:outline-none' id='firstname' {...register("firstname")} type="text" placeholder='First name' defaultValue={props.profileData?.firstname || ''}/>
                </div>
                <div className='w-11/12'>
                    <label className='font-medium text-base md:text-lg' for="lastname">Last Name</label>
                    <input className='w-full border text-[#0d5d73] bg-[#ebeff3] border-[#0d5d73] rounded-lg px-3 py-2 focus:outline-none' id='lastname' {...register("lastname")} type="text" placeholder='Last name' defaultValue={props.profileData?.lastname || ''}/>
                </div>

                <div className='w-11/12'>
                    <label className='font-medium text-base md:text-lg' for="phonenumber">Phone Number</label>
                    <input className='w-full border text-[#0d5d73] bg-[#ebeff3] border-[#0d5d73] rounded-lg px-3 py-2 focus:outline-none' id='phonenumber' {...register("phonenumber")} type="tel" placeholder='Phone number' defaultValue={props.profileData?.phonenumber || ''}/>
                </div>
                
                <div className='w-11/12'>
                    <label className='font-medium text-base md:text-lg' for="address">Address</label>
                    <input className='w-full border text-[#0d5d73] bg-[#ebeff3] border-[#0d5d73] rounded-lg px-3 py-2 focus:outline-none' id='address' {...register("address")} type="text" placeholder='Address' defaultValue={props.profileData?.address || ''}/>
                </div>
                <div className='w-11/12'>
                    <label className='font-medium text-base md:text-lg' for="city">City</label>
                    <input className='w-full border text-[#0d5d73] bg-[#ebeff3] border-[#0d5d73] rounded-lg px-3 py-2 focus:outline-none' id='city' {...register("city")} type="text" placeholder='City' defaultValue={props.profileData?.city || ''}/>
                </div>
                
                <div className='w-11/12'>
                    <label className='font-medium text-base md:text-lg' for="dateofbirth">Date of Birth</label>
                    <input className='w-full border text-[#0d5d73] bg-[#ebeff3] border-[#0d5d73] rounded-lg px-3 py-2 focus:outline-none' id='dateofbirth' {...register("dateofbirth")} type="date" min={minDate} max={maxDate} defaultValue={props.profileData?.dateofbirth || ''}/>
                </div>
                <div className='w-11/12 mb-4'>
                    <label className='font-medium text-base md:text-lg' for="gender">Gender</label>
                    <select className='w-full border text-[#0d5d73] bg-[#ebeff3] border-[#0d5d73] rounded-lg px-3 py-2 focus:outline-none' id='gender' {...register("gender")} defaultValue={props.profileData?.gender || ''}>
                        <option value="MALE">Male</option>
                        <option value="FEMALE">Female</option>
                    </select>
                </div>
                {updateSuccess != 'success' && (<button className='w-11/12 text-white bg-[#0d5d73] hover:bg-[#09495a] rounded-md font-semibold text-xl md:text-2xl py-2 mt-2 mb-4' type="submit">Save</button>)}
                {updateSuccess === 'success' && <p className='response-msg mb-6 font-semibold md:text-xl text-lg' id='success'>Saved successfully</p>}
                {updateSuccess === 'fail' && <p className='response-msg mb-6 font-semibold md:text-xl text-lg' id='error'>Could not save changes</p>}
            </form></>
        )
    }
}

export default EditProfile;