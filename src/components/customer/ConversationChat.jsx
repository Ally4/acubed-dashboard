import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { TbSend } from "react-icons/tb";
import { PiBuildingApartmentFill } from "react-icons/pi";



const ConversationChat = (props) => {
    const user = useSelector(state => state.login.data)
    const countryId = user ? user.countryId : null;
    const userId = user ? user.id : null;
    const name = user ? user.username : ''
    const token = user ? user.token : null

    const [conversations, setConversations] = useState([])
    const [loading, setLoading] = useState(false)

    const convos = [
        {
            name: 'Kigali Medical Center',
            profilepicture: ''
        },
        {
            name: 'Butare Health Center',
            profilepicture: ''
        },
        {
            name: 'Rwandan Health Center 1',
            profilepicture: ''
        },
        {
            name: 'Rwandan Health Center 2',
            profilepicture: ''
        },
        {
            name: 'Rwandan Health Center 3',
            profilepicture: ''
        }
    ]

    const getConversations = async () => {

    }

    useEffect(() => {
        if (!token || !countryId || !userId) return
    }, [token,countryId,userId])

    return(
        <div className='w-full h-full border-b border-[var(--light-border-color)] grid grid-cols-[250px_1fr] lg:grid-cols-[250px_1fr] xl:grid-cols-[300px_1fr] lg:rounded-br-lg lg:rounded-bl-lg'>
            {/*Conversations*/}
            
            <div className='h-auto w-full border-[var(--light-border-color)] overflow-y-auto'>
                {loading ? (<div className='text-base text-gray-400 md:text-lg ml-2'>Loading...</div>) 
                : convos ? (convos?.map((item,index) => (<div className='w-full hover:bg-gray-50 border-[var(--light-border-color)] h-20 flex items-center justify-start gap-2 cursor-pointer relative'>
                    {item.profilepicture ? (<img src={''}/>) : (
                        <div key={index} className='border rounded-full h-10 w-10 bg-gray-200 border-[var(--light-border-color)] ml-2 flex items-center justify-center'>
                            <PiBuildingApartmentFill className='text-gray-500 h-7 w-7' />
                        </div>)}
                    <p className='text-sm md:text-base text-gray-400'>{item.name}</p>
                    {/* <MdAddCircleOutline  className='absolute right-1 text-[var(--secondary-color)] h-8 w-8'/> */}
                </div>)))
                : (<div className='text-wrap text-base text-gray-400 text-center'>No Conversations</div>)}
            </div>

            
            {/*Chat Window */}
            <div className='w-full h-auto flex flex-col justify-between items-center border-l border-[var(--light-border-color)]'>
                <div className='w-full border-b border-[var(--light-border-color)] flex items-center justify-start h-16'>
                    <div className='border border-[var(--light-border-color)] h-10 w-10 rounded-full ml-2'>

                    </div>
                </div>

                <div className='h-full overflow-y-auto flex flex-col gap-4 w-full p-2'>

                    <p className='self-end bg-[#2aa1a3] p-2 h-auto w-fit ml-6 text-white text-right rounded-md'>
                        Hello, what hours are your facility open?
                    </p>

                    <div className='self-start p-2 h-auto w-fit mr-6 border border-[var(--light-border-color)] rounded-md text-left text-gray-500'>
                        Hello! Our hours of operation are 9 AM to 5 PM, Monday to Friday. On Weekends we are open from 10 AM to 3 PM.
                    </div>

                    <p className='self-end bg-[#2aa1a3] p-2 h-auto w-fit ml-6 text-white text-right rounded-md'>
                        Thanks!
                    </p>
                </div>

                <div className='w-full border-t border-[var(--light-border-color)] h-20 flex items-center justify-between gap-4 p-2'>
                    <input className='border border-[var(--light-border-color)] h-12 w-full rounded-lg m-0 focus:outline-none text-gray-400' type='text' placeholder='Enter message...'>

                    </input>

                    <div className='rounded-xl bg-gradient-to-r from-[#1a7071] to-[#26c5c7]  h-10 w-12 p-1 cursor-pointer hover:bg-opacity-80 flex items-center justify-center'>
                        <TbSend className='text-white h-6 w-6 '/>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ConversationChat