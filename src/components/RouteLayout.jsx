import Sidebar from './customer/Sidebar'
import Footer from './Footer'
import DashHeader from './DashHeader'
import Chat from './customer/chat/Chat'
import { MdOutlineChatBubbleOutline } from "react-icons/md";

import '../style/layout.css'
import { useState, useEffect } from 'react'
const RouteLayout = ({children}) => {
    const [openChat, setOpenChat] = useState(false)
    return(
        <div className='layout'>
            {openChat && <Chat className='fixed right-10 bottom-10 z-40' onClose={()=>setOpenChat(false)}/>}
            <DashHeader />
            <main className='flex-1 relative'>
                {children}
                <div onClick={()=>setOpenChat(true)} className='right-4 bottom-4 fixed bg-gradient-to-r from-[#1a7071] to-[#26c5c7] rounded-full p-4 shadow-md flex items-center justify-center cursor-pointer'>
                    <MdOutlineChatBubbleOutline className='text-white font-semibold w-8 h-8'/>
                </div>
            </main>
            <Sidebar />
            <Footer />

        </div>
    )
}

export default RouteLayout