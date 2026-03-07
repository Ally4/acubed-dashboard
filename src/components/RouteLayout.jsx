import Sidebar from './customer/Sidebar'
import Footer from './Footer'
import DashHeader from './DashHeader'
import Chat from './customer/chat/Chat'
import { MdOutlineChatBubbleOutline } from "react-icons/md";
import { getTotalUnreadMessageCount } from '../services/chatService'

import '../style/layout.css'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
const RouteLayout = ({children}) => {
    const [openChat, setOpenChat] = useState(false)
    const [unreadMessages, setUnreadMessages] = useState(0)
    const user = useSelector((state) => state.login.data)
    const token = user ? user.token : null

    const getUnreadCount = async (token) => {
        const data = await getTotalUnreadMessageCount(token)
        // console.log('unread messages: ',data.unread)
        setUnreadMessages(data.unread)
    }

    useEffect(() => {
        if(!token) return
        getUnreadCount(token)
    },[])

    return(
        <div className='layout'>
            {openChat && <Chat className='fixed right-10 bottom-10 z-40' onClose={()=>setOpenChat(false)}/>}
            <DashHeader />
            <main className='flex-1 relative'>
                {children}
                <div onClick={()=>setOpenChat(true)} className='right-4 bottom-4 fixed'>
                    <div className='bg-gradient-to-r from-[#1a7071] to-[#26c5c7] rounded-full p-4 shadow-md flex items-center justify-center cursor-pointer relative'>
                        <MdOutlineChatBubbleOutline className='text-white font-semibold w-8 h-8'/>
                        {unreadMessages > 0 && <div className='absolute bg-red-500 rounded-full p-1 h-5 w-5 md:h-7 md:w-7 right-[-3px] top-[-3px] flex items-center justify-center'>
                                <p className='text-white text-sm md:text-base'>{unreadMessages}</p>
                            </div>}
                    </div>
                </div>
            </main>
            <Sidebar />
            <Footer />

        </div>
    )
}

export default RouteLayout