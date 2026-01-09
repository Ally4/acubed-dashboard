import { useState, useEffect } from 'react'
import '../../../style/newOrder.css'
import { TbSend } from "react-icons/tb";
import { MdAddCircleOutline } from "react-icons/md";
import { useSelector } from 'react-redux';
import RequestChat from './RequestChat';
import ConversationChat from './ConversationChat';


const Chat = (props) => {
    const user = useSelector(state => state.login.data)
    const countryId = user ? user.countryId : null;
    const userId = user ? user.id : null;
    const name = user ? user.username : ''
    const token = user ? user.token : null

    const [selected, setSelected] = useState('Conversations')


    const handleOverlayClick = (e) => {
        // Only close if the clicked element is the overlay itself
        if (e.target === e.currentTarget) {
            props.onClose();
        }
    };

    return(
        <>
            <div className='overlay' onClick={handleOverlayClick}></div>
            <div className='border border-[var(--light-border-color)] relative rounded-lg bg-white flex flex-col items-center justify-start h-auto w-11/12 md:w-3/4 xl:w-3/5' id='new-order' onClick={(e) => e.stopPropagation()}>
                <div className='w-full flex items-center h-12 justify-center gap-6 border-b broder-[var(--light-border-color)] py-2 px-2 relative'>
                    {selected == 'Conversations' ? <h3 className='m-0 hidden md:block absolute left-2 font-medium text-lg xl:text-xl text-gray-600'>Messages</h3> : <h3 className='m-0 absolute hidden md:block left-2 font-medium text-lg xl:text-xl text-gray-600'>Request Facilities</h3>}
                    <p className='absolute right-2 h-12 w-12 flex items-center font-semibold justify-center rounded-md text-[var(--secondary-color)] cursor-pointer' onClick={props.onClose}>✖</p>
                    <h3 onClick={()=>setSelected('Conversations')} className={`text-base font-medium m-0 cursor-pointer md:text-lg text-${selected === 'Conversations' ? '[var(--secondary-color)]' : 'gray-400'}`}>Covnersations</h3>
                    <h3 onClick={()=>setSelected('Requests')} className={`text-base font-medium m-0 cursor-pointer md:text-lg text-${selected === 'Requests' ? '[var(--secondary-color)]' : 'gray-400'}`}>Request</h3>
                </div>

                <div className='w-full min-h-96 md:h-[450px] lg:h-[500px]  flex flex-col items-center justify-center'>
                    {selected == 'Conversations' ? (<ConversationChat />) : (<RequestChat />)}

                </div>
 

                
            </div>
        </>
    )
}

export default Chat