// import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import FacilityCollectionMap from './FacilityCollectionMap'
import { useNavigate } from 'react-router-dom'
const FacilitySampleCollection = (props) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate()

    const handleGoBack = () => {
        if (window.history.length > 1) {
            navigate(-1);
        } else {
            navigate('/dashboard/All'); // Fallback to home
        }
    };

    return(
        <div className='flex flex-col xl:flex-row items-start justify-center gap-12 w-full md:px-4 py-2 h-full'>

            <div className='w-full mt-4 mb-2 flex items-center justify-center h-[400px] md:h-[500px] z-10'>
                {props.geoLocation ? (<FacilityCollectionMap latitude={props.geoLocation.latitude} longitude={props.geoLocation.longitude} setMapFacility={props.setMapFacility} /> ) : (<img src='/secondary_color_spinner.svg' alt='Loading...' />)}
            </div>
            
            <form className='w-full border border-[var(--light-border-color)] bg-white rounded-2xl shadow-md px-3 py-2 flex flex-col items-center gap-4' onSubmit={handleSubmit(props.onSubmit)}>
                <div className='w-full md:w-11/12 h-auto mt-2 mb-1'>
                    <h3 className='font-semibold text-lg md:text-2xl text-gray-600 m-0'>Sample Collection Point</h3>
                    <p className='font-medium text-sm xl:text-base'>Selected Facility: <span className='font-normal text-gray-700'>{props.selectedFacility ? props.selectedFacility.facility : 'None'}</span></p>
                </div>
            <div className='w-full md:w-11/12 h-auto'>
                <input
                    className='w-full border rounded-md border-[#0d5d73] px-2 py-2 focus:outline-none text-[#0d5d73] bg-[#ebeff3] placeholder:text-[#0d5d73]'
                    id="firstname"
                    placeholder='First name'
                    {...register("firstname", { required: true })}
                />
                {errors.firstname && <span>This field is required</span>}
            </div>
            <div className='w-full md:w-11/12 h-auto'>
                <input
                    className='w-full border rounded-md border-[#0d5d73] px-2 py-2 focus:outline-none text-[#0d5d73] bg-[#ebeff3] placeholder:text-[#0d5d73]'
                    id="lastname"
                    placeholder='Last name'
                    {...register("lastname", { required: true })}
                />
                {errors.lastname && <span>This field is required</span>}
            </div>

            <div className='w-full md:w-11/12 h-auto'>
                {/* <input
                    className='w-full border rounded-md border-[#0d5d73] px-2 py-2 focus:outline-none text-[#0d5d73] bg-[#ebeff3] placeholder:text-[#0d5d73]'
                    id="sex"
                    placeholder='Sex'
                    {...register("sex", { required: true })}
                /> */}
                <select className='w-full border rounded-md border-[#0d5d73] px-2 py-2 focus:outline-none text-[#0d5d73] bg-[#ebeff3] placeholder:text-[#0d5d73]' {...register("sex", { required: true })}>
                    <option value="" disabled selected>Choose Sex</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
                {errors.sex && <span>Please enter a valid sex</span>}
            </div>

            <div className='w-full md:w-11/12 h-auto'>
                <input
                    className='w-full border rounded-md border-[#0d5d73] px-2 py-2 focus:outline-none text-[#0d5d73] bg-[#ebeff3] placeholder:text-[#0d5d73]'
                    id="age"
                    type="number"
                    placeholder='Age'
                    min={1}
                    {...register("age", { required: true, min: 1 })}
                />
                {errors.age && <span>Please enter a valid age</span>}
            </div>

            <div className='w-full md:w-11/12 h-auto'>
                <input
                    className='w-full border rounded-md border-[#0d5d73] px-2 py-2 focus:outline-none text-[#0d5d73] bg-[#ebeff3] placeholder:text-[#0d5d73]'
                    id="phonenumber"
                    type='tel'
                    placeholder='Phone Number'
                    {...register("phonenumber", { required: true, minLength: 10, maxLength: 15 })}
                />
                {errors.phonenumber && <span>Please enter a valid phone number</span>}
            </div>

            <div className='w-full md:w-11/12 h-auto'>
                <label className="font-medium text-sm md:text-base text-gray-600" htmlFor="qty">Quantity</label>
                <input
                    className='w-full border rounded-md border-[#0d5d73] px-2 py-2 focus:outline-none text-[#0d5d73] bg-[#ebeff3] placeholder:text-[#0d5d73]'
                    id="qty"
                    defaultValue={1}
                    type='number'
                    min={1}
                    {...register("qty", { required: true, min: 1 })}
                />
                {errors.qty && <span>Please enter a valid quantity</span>}
            </div>

            {!props.loading && props.submitSuccess != true && (<button className='w-full md:w-11/12 bg-[#0d5d73] hover:bg-[#09495a] text-white font-semibold py-2 rounded-md text-sm md:text-base xl:text-lg' type="submit">{props.toCart == 'Checkout' ? 'Confirm' : 'Add to Cart'}</button>)}
            {props.loading && (<button disabled className='w-full md:w-11/12 bg-[#0d5d73] hover:bg-[#09495a] text-white font-semibold py-2 rounded-md text-lg lg:text-xl xl:text-2xl flex items-center justify-center' type="button"><img className='h-9 w-9' src='/gray_spinner.svg' /></button>)}
            {props.submitSuccess === true && <span className='text-green-600 font-semibold text-lg md:text-xl xl:text-2xl mb-4'>Added to cart successfully!</span>}
            {props.submitSuccess === false && props.error && <span className='text-red-600 font-semibold text-lg md:text-xl xl:text-2xl'>{props.error} Please try again.</span>}

            {props.submitSuccess != true && (<label onClick={handleGoBack} className=' flex cursor-pointer items-center justify-center w-full md:w-11/12 mb-4 bg-white border border-[var(--light-border-color)] hover:bg-[#fefefe] text-[#0d5d73] font-semibold py-2 rounded-md text-sm md:text-base xl:text-lg'>Cancel</label>)}

            </form>
        </div>
    )
}


export default FacilitySampleCollection