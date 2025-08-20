import {useForm} from 'react-hook-form';
import React from 'react';
import '../../style/EditProfile.css'

const EditProfile = (props) => {
    const { register, handleSubmit } = useForm()
    const minDate = new Date(1900, 0, 1).toISOString().split("T")[0];
    const maxDate = new Date().toISOString().split("T")[0];

    const onSubmit = (data) => {
        console.log(data)
        //update the information
        props.onSubmit()
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
                        <input id='firstname' {...register("firstname")} type="text" placeholder='First name'/>
                    </div>
                    <div className='col'>
                        <label for="lastname">Last Name</label>
                        <input id='lastname' {...register("lastname")} type="text" placeholder='Last name'/>
                    </div>
                </div>
                <div className='content'>
                    <label for="phonenumber">Phone Number</label>
                    <input id='phonenumber' {...register("phonenumber")} type="tel" placeholder='Phone number'/>
                </div>
                
                <div className='content' id='two-col'>
                    <div className='col'>
                        <label for="address">Address</label>
                        <input id='address' {...register("address")} type="text" placeholder='Address'/>
                    </div>
                    <div className='col'>
                        <label for="city">City</label>
                        <input id='city' {...register("city")} type="text" placeholder='City'/>
                    </div>
                </div>
                <div>

                </div>
                <div className='content'>
                    <label for="dateofbirth">Date of Birth</label>
                    <input id='dateofbirth' {...register("dateofbirth")} type="date" min={minDate} max={maxDate} />
                </div>
                <div className='content'>
                    <label for="gender">Gender</label>
                    <select id='gender' {...register("gender")}>
                        <option value="MALE">Male</option>
                        <option value="FEMALE">Female</option>
                    </select>
                </div>
                <button className='save-button' type="submit">Save</button>
            </form></>
        )
    }
}

export default EditProfile;