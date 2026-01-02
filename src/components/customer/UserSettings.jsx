import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getUserSettings, updateNotificationSettings } from '../../services/userService'
import { useForm } from 'react-hook-form';
import styles from '../../style/Profile.module.css'
import { MdMarkEmailRead } from "react-icons/md";
import { PiPhoneCallBold } from "react-icons/pi";
import { IoGlobeOutline } from "react-icons/io5";

const UserSettings = () => {
    const [settings, setSettings] = useState(null)
    const [loading, setLoading] = useState(false)
    const [languages, setLangugaes] = useState([])
    const [updatingNotifications, setUpdatingNotifications] = useState(false)
    const user = useSelector(state => state.login.data)
    const userId = user ? user.id : null
    const token = user ? user.token : null
    const { register, handleSubmit } = useForm()
    

    const fetchUserSettings = async () => {
        setLoading(true)
        try {
            const result = await getUserSettings(token)
            if (result) {
                setSettings(result)
            }
        } catch (err) {

        } finally {
            setLoading(false)
        }
    }

    const updateNotifications = async (data) => {
        setUpdatingNotifications(true)
        try {
            const result = await updateNotificationSettings(data,token)
        } catch (err) {
            console.log('Error updateing notifications')
        } finally {
            setUpdatingNotifications(false)
        }
    }

    const updateLanguage = async (data) => {
        try {

        } catch (err) {

        } finally {

        }
     }

    useEffect(() => {
        if (!token) return
        fetchUserSettings()
    }, [token])

    
    return(
        <section id='profile' className="w-full h-full min-h-screen flex flex-col overflow-y-auto items-center justify-start relative" style={{ background: "linear-gradient(to bottom, white 35%, #cddfef 85%)" }}>
            {loading ? (<img src='./secondary_color_spinner.svg' className='absolute top-[50%] left-[%50] -translate-x-1/2 -translate-y-1/2' />) : 
            (<>
                <div className='w-11/12 md:w-8/12 h-auto flex flex-col items-center justify-center mb-10'>
                    <div className='top-0 mb-1 w-full'>
                        <h3 className='text-2xl font-semibold ml-3 text-[var(--secondary-color)]'>Notifications</h3>
                    </div>
                    <form onSubmit={handleSubmit(updateNotifications)} className='w-full mb-6 flex flex-col gap-2 items-center justify-center'>
                        <div className='w-full flex items-center justify-between px-8 py-3 rounded-tr-xl rounded-tl-xl rounded-bl-md rounded-br-md bg-gray-100 border border-[var(--light-border-color)]'>
                            <div className='flex items-center justify-center gap-6'>
                                <MdMarkEmailRead className='h-10 md:h-12 w-10 md:w-12 mr-3 text-[var(--secondary-color)]' />
                                <div className=''>
                                    <h3 className='text-lg md:text-xl font-medium text-gray-800 m-0'>Email:</h3>
                                    <p className='text-base md:text-lg text-gray-400'>{settings?.user?.email}</p>
                                </div>
                            </div>
                            <input id='email_notification' {...register("email")} type='checkbox' className='accent-[#187089] w-5 h-5 md:w-8 md:h-8' defaultChecked={settings?.email_notifications} />
                        </div>

                        <div className='w-full flex items-center justify-between px-8 py-3 rounded-tr-md rounded-tl-md rounded-bl-xl rounded-br-xl bg-gray-100 border border-[var(--light-border-color)]'>
                            <div className='flex items-center justify-center gap-6'>
                                <PiPhoneCallBold className='h-10 md:h-12 w-10 md:w-12 mr-3 text-[var(--secondary-color)]' />
                                <div className=''>
                                    <h3 className='text-lg md:text-xl font-medium text-gray-800 m-0'>Phone Number</h3>
                                    <p className='text-base md:text-lg text-gray-400'>{settings?.user?.phoneNumber}</p>
                                </div>
                            </div>
                            <input id='text_notification' {...register("mobile")} type='checkbox' className='accent-[#187089] w-5 h-5 md:w-8 md:h-8' defaultChecked={settings?.mobile_notifications}/>
                        </div>

                        <button className="bg-[var(--secondary-color)] rounded-lg px-3 py-1 text-xl md:text-2xl w-30 md:w-40 mb-2 mt-2 hover:bg-[#12708a] flex items-center justify-center">
                            {updatingNotifications ? <img src="/gray_spinner.svg" className="h-8 w-8" /> : "Save"}
                        </button>
                    </form>

                    <div className='top-0 mb-1 w-full'>
                        <h3 className='text-2xl font-semibold ml-3 text-[var(--secondary-color)]'>Language</h3>
                    </div>           
                    <form onSubmit={handleSubmit()} className='w-full mb-6 flex flex-col gap-2 items-center justify-center'>
                        <div className='w-full flex items-center justify-between px-8 py-3 rounded-tr-xl rounded-tl-xl rounded-bl-xl rounded-br-xl bg-gray-100 border border-[var(--light-border-color)]'>
                            <div className='flex items-center justify-center gap-6'>
                                <IoGlobeOutline className='h-10 md:h-12 w-10 md:w-12 mr-3 text-[var(--secondary-color)]' />
                                <div className=''>
                                    <h3 className='text-lg md:text-xl font-medium text-gray-800 m-0'>Language</h3>
                                    <p className='text-base md:text-lg text-gray-400'>{settings?.language}</p>
                                </div>
                            </div>
                            <select className="">

                            </select>
                        </div>
                    </form>
                </div>
            </>)}
        </section>
    )
}


export default UserSettings