import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form';

const HomeSampleCollectionForm = (props) => {
    const { register, handleSubmit, formState: { errors } } = useForm();


    return (
        <form onSubmit={handleSubmit(props.onSubmit)} className="flex flex-col items-center gap-4 bg-white border border-[var(--light-border-color)] rounded-2xl shadow-md w-full md:w-9/12 lg:w-2/3 xl:w-3/5 2xl:w-1/2 px-4 py-2">
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

            {/* <div className='w-full md:w-11/12 h-auto'>
                <input
                    className='w-full border rounded-md border-[#0d5d73] px-2 py-2 focus:outline-none text-[#0d5d73] bg-[#ebeff3] placeholder:text-[#0d5d73]'
                    id="street"
                    placeholder='Street'
                    {...register("street", { required: true })}
                />
                {errors.street && <span>Please enter a valid street</span>}
            </div> */}

            <div className='w-full md:w-11/12 h-auto'>
                <input
                    className='w-full border rounded-md border-[#0d5d73] px-2 py-2 focus:outline-none text-[#0d5d73] bg-[#ebeff3] placeholder:text-[#0d5d73]'
                    id="district"
                    placeholder='District'
                    {...register("district")}
                />
                {errors.district && <span>Please enter a valid district</span>}
            </div>

            <div className='w-full md:w-11/12 h-auto'>
                <input
                    className='w-full border rounded-md border-[#0d5d73] px-2 py-2 focus:outline-none text-[#0d5d73] bg-[#ebeff3] placeholder:text-[#0d5d73]'
                    id="city"
                    placeholder='City/Town'
                    {...register("city", { required: true })}
                />
                {errors.city && <span>Please enter a valid city</span>}
            </div>

            <div className='w-full md:w-11/12 h-auto'>
                <input
                    className='w-full border rounded-md border-[#0d5d73] px-2 py-2 focus:outline-none text-[#0d5d73] bg-[#ebeff3] placeholder:text-[#0d5d73]'
                    id="country"
                    placeholder='Country'
                    {...register("country", { required: true })}
                />
                {errors.country && <span>Please enter a valid country</span>}
            </div>

            <div className='w-full md:w-11/12 h-auto'>
                <label className="font-medium text-base md:text-lg xl:text-xl text-gray-600" htmlFor="qty">Quantity</label>
                <input
                    className='w-full border rounded-md border-[#0d5d73] px-2 py-2 focus:outline-none text-[#0d5d73] bg-[#ebeff3] placeholder:text-[#0d5d73]'
                    id="qty"
                    type='number'
                    defaultValue={1}
                    min={1}
                    {...register("qty", { required: true, min: 1 })}
                />
                {errors.qty && <span>Please enter a valid quantity</span>}
            </div>

            {!props.loading && props.submitSuccess != true && (<button className='w-full md:w-11/12 bg-[#0d5d73] hover:bg-[#09495a] text-white font-semibold py-2 rounded-md text-lg lg:text-xl xl:text-2xl' type="submit">{props.toCart == 'Checkout' ? 'Confirm' : 'Add to Cart'}</button>)}
            {props.loading && (<button disabled className='w-full md:w-11/12 bg-[#0d5d73] hover:bg-[#09495a] text-white font-semibold py-2 rounded-md text-lg lg:text-xl xl:text-2xl flex items-center justify-center' type="button"><img className='h-9 w-9' src='/spinner-200px-200px.svg' /></button>)}
            {props.submitSuccess === true && <span className='text-green-600 font-semibold text-lg md:text-xl xl:text-2xl mb-4'>Added to cart successfully!</span>}
            {props.submitSuccess === false && <span className='text-red-600 font-semibold text-lg md:text-xl xl:text-2xl'>Error adding to cart. Please try again.</span>}

            {props.submitSuccess != true && (<label className=' flex cursor-pointer items-center justify-center w-full md:w-11/12 mb-4 bg-white border border-[var(--light-border-color)] hover:bg-[#fefefe] text-[#0d5d73] font-semibold py-2 rounded-md text-lg lg:text-xl xl:text-2xl'>Cancel</label>)}

        </form>
    );
}



export default HomeSampleCollectionForm;