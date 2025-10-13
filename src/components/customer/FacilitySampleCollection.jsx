import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import FacilityCollectionMap from './FacilityCollectionMap'

const FacilitySampleCollection = (props) => {
    const { register, handleSubmit, formState: { errors } } = useForm();


    return(
        <div className='flex flex-col xl:flex-row items-center justify-center gap-12 w-full px-4 py-2'>

            <div className='w-full mt-4 mb-2 flex items-center justify-center' style={{height: '500px'}}>
                {props.geoLocation ? (<FacilityCollectionMap latitude={props.geoLocation.latitude} longitude={props.geoLocation.longitude}/> ) : (<img src='/spinner-200px-200px.svg' alt='Loading...' />)}
            </div>
            
            <form className='w-full border border-[#ccc] bg-white rounded-2xl shadow-md px-3 py-2 flex flex-col items-center gap-4' onSubmit={handleSubmit(props.onSubmit)}>
                <div className='w-full md:w-11/12 h-auto mt-4 mb-2'>
                <h3 className='font-semibold text-lg md:text-2xl xl:text-3xl text-gray-600'>Sample Collection Point</h3>
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
                <input
                    className='w-full border rounded-md border-[#0d5d73] px-2 py-2 focus:outline-none text-[#0d5d73] bg-[#ebeff3] placeholder:text-[#0d5d73]'
                    id="sex"
                    placeholder='Sex'
                    {...register("sex", { required: true })}
                />
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

            <button className='w-full md:w-11/12 bg-[#0d5d73] hover:bg-[#09495a] text-white font-semibold py-2 rounded-md text-lg lg:text-xl xl:text-2xl' type="submit">Confirm</button>

            <label className=' flex cursor-pointer items-center justify-center w-full md:w-11/12 mb-4 bg-white border border-[#ccc] hover:bg-[#fefefe] text-[#0d5d73] font-semibold py-2 rounded-md text-lg lg:text-xl xl:text-2xl'>Cancel</label>

            </form>
        </div>
    )
}


export default FacilitySampleCollection