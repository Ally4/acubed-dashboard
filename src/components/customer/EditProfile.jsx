import { useForm} from 'react-hook-form';
import React, { useState } from 'react';
import '../../style/EditProfile.css'
import axios from 'axios'

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
        const response = await axios.post('http://localhost:4000/editProfile', data)
        if (response.status >= 200 && response.status < 300) {
            // Handle success
            setUpdateSuccess('success');
            setTimeout(() => {
                setUpdateSuccess(null);
            }, 3000);
        } else {
            // Handle error
            console.error('Error updating profile:', response.statusText);
            setUpdateSuccess('fail');
            setTimeout(() => {
                setUpdateSuccess(null);
            }, 3000);
        }
        } catch (error) {
            console.error('Error updating profile:', error);
            setUpdateSuccess('fail');
            setTimeout(() => {
                setUpdateSuccess(null);
            }, 3000);
        }

        //submit action for Main profile page
        // props.onSubmit()
    }

    if (!props.open) {
        return null
    } else {
        return (
            <><div className='overlay'></div>
            <form className='edit-profile-container' onSubmit={handleSubmit(onSubmit)}>
                <div className='close' onClick={props.onClose}>✖</div>
                <h3>Edit Profile</h3>
                <div className='content' id='two-col'>
                    <div className='col'>
                        <label for="firstname">First Name</label>
                        <input id='firstname' {...register("firstname")} type="text" placeholder='First name' defaultValue={props.profileData?.firstname || ''}/>
                    </div>
                    <div className='col'>
                        <label for="lastname">Last Name</label>
                        <input id='lastname' {...register("lastname")} type="text" placeholder='Last name' defaultValue={props.profileData?.lastname || ''}/>
                    </div>
                </div>
                <div className='content'>
                    <label for="phonenumber">Phone Number</label>
                    <input id='phonenumber' {...register("phonenumber")} type="tel" placeholder='Phone number' defaultValue={props.profileData?.phonenumber || ''}/>
                </div>
                
                <div className='content' id='two-col'>
                    <div className='col'>
                        <label for="address">Address</label>
                        <input id='address' {...register("address")} type="text" placeholder='Address' defaultValue={props.profileData?.address || ''}/>
                    </div>
                    <div className='col'>
                        <label for="city">City</label>
                        <input id='city' {...register("city")} type="text" placeholder='City' defaultValue={props.profileData?.city || ''}/>
                    </div>
                </div>
                <div>

                </div>
                <div className='content'>
                    <label for="dateofbirth">Date of Birth</label>
                    <input id='dateofbirth' {...register("dateofbirth")} type="date" min={minDate} max={maxDate} defaultValue={props.profileData?.dateofbirth || ''}/>
                </div>
                <div className='content'>
                    <label for="gender">Gender</label>
                    <select id='gender' {...register("gender")} defaultValue={props.profileData?.gender || ''}>
                        <option value="MALE">Male</option>
                        <option value="FEMALE">Female</option>
                    </select>
                </div>
                <button className='save-button' type="submit">Save</button>
                {updateSuccess === 'success' && <p className='response-msg' id='success'>Saved successfully</p>}
                {updateSuccess === 'fail' && <p className='response-msg' id='error'>Could not save changes</p>}
            </form></>
        )
    }
}

export default EditProfile;