import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { TbSend } from "react-icons/tb";
import { PiBuildingApartmentFill } from "react-icons/pi";
import { getUserConversations, getConversationFromChatId, sendMessageToFacility } from '../../../services/chatService'



const ConversationChat = (props) => {
    const user = useSelector(state => state.login.data)
    const token = user ? user.token : null

    const [conversations, setConversations] = useState([])
    const [selectedConversation, setSelectedConversation] = useState(null)
    const [messages, setMessages] = useState([])
    const [currentMessage, setCurrentMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const [loadingMessages, setLoadingMessages] = useState(false)
    const [errors, setErrors] = useState({})

    const getConversations = async () => {
        try {
            setLoading(true)
            const result = await getUserConversations(token)
            if (result.success) {
                setConversations(result.data)
                setErrors({...errors, loadingConversationsError: result.error})
            }
        } catch (err) {

        } finally {
            setLoading(false)
        }
    }

    const handleChange = (e) => {
        setCurrentMessage(e.target.value)
    }

    const getConversation = async () => {
        try {
            setLoadingMessages(true)
            const result = await getConversationFromChatId(token,selectedConversation.id)
            if (result.success) {
                setMessages(result.data)
            } else {
                setErrors({...errors, messagesError: result.error})
            }
        } catch (err) {

        } finally {
            setLoadingMessages(false)
        }
    }

    const sendMessage = async () => {
        console.log('dagdsga')
        if (currentMessage == "") return
        try {
            const obj = {
                chatRequestId: selectedConversation.id,
                message: currentMessage,
                messageType: "TEXT"
            }
            console.log('message being sent: ',obj)
            const result = await sendMessageToFacility(token,obj)
            if (result.success) {
                //we need to append this message to the previous ones and display it
                setCurrentMessage('')
                setMessages([...messages, {message: currentMessage, senderType: "USER", messageType: "TEXT"}])
            } else {
                //indicate to the user that it wasn't sent
            }
        } catch (err) {
                console.error("Failed to send message: ",err)
                setErrors({...errors, sendMessageError: "Failed to send message."})
        }
    }

    useEffect(() => {
        if (!token) return
        getConversations()
    }, [token])

    useEffect(() => {
        if(!selectedConversation || !token) return
        getConversation()
    },[selectedConversation])

    return(
        <div className='w-full min-h-96 md:h-[450px] lg:h-[500px] border-b border-[var(--light-border-color)] grid grid-cols-[210px_1fr] lg:grid-cols-[250px_1fr] xl:grid-cols-[300px_1fr] lg:rounded-br-lg lg:rounded-bl-lg'>
            {/*Conversations*/}
            
            <div className='h-full w-full border-[var(--light-border-color)] overflow-y-auto'>
                {loading ? (<div className='text-base text-gray-400 md:text-lg ml-2'>Loading...</div>) 
                : conversations.length > 0 ? (conversations?.map((item,index) => (<div key={index} className='w-full hover:bg-gray-50 border-[var(--light-border-color)] h-20 flex items-center justify-start gap-2 cursor-pointer relative' onClick={()=>setSelectedConversation(item)}>
                    {item.facility.imageUrl ? (<img src={item.facility.imageUrl}/>) : (
                        <div className='border rounded-full h-10 w-10 bg-gray-200 border-[var(--light-border-color)] ml-2 flex items-center justify-center'>
                            <PiBuildingApartmentFill className='text-gray-500 h-7 w-7' />
                        </div>)}
                    <p className='text-sm md:text-base text-gray-400'>{item.facility.name}</p>
                    {/* <MdAddCircleOutline  className='absolute right-1 text-[var(--secondary-color)] h-8 w-8'/> */}
                </div>)))
                : (<div className='text-wrap text-base text-gray-400 text-center mt-12'>No Conversations</div>)}
            </div>

            
            {/*Chat Window */}
            <div className='w-full h-full flex flex-col justify-between items-center border-l border-[var(--light-border-color)]'>
                {loadingMessages ? <img src="/secondary-color-spinner.svg" className="w-12 h-12" /> 
                : selectedConversation ? (<>
                    <div className='w-full border-b border-[var(--light-border-color)] flex items-center justify-start h-16 gap-3 md:gap-6'>
                        <div className='border border-[var(--light-border-color)] h-8 md:h-10 w-8 md:w-10 rounded-full ml-2 flex items-center justify-center bg-gray-200'>
                            {selectedConversation?.imageUrl ? <img src={selectedConversation?.imageUrl} className="max-h-full max-w-full object-cover"/> : <PiBuildingApartmentFill className='text-gray-500 h-5 md:h-7 w-5 md:w-7' />}
                        </div>
                        <h3 className="text-gray-500 text-sm md:text-base m-0">{selectedConversation?.facility?.name}</h3>
                    </div>

                    <div className='h-full overflow-y-auto flex flex-col gap-4 w-full p-2'>
                        {messages.length > 0 ? messages?.map((item,index) => {
                            // text
                            if (item.messageType == "TEXT") {
                                if (item.senderType == "USER") return <p key={index} className='self-end bg-[#2aa1a3] p-2 h-auto w-fit ml-6 text-white text-right rounded-md'>{item.message}</p>
                                return <p key={index} className='self-start p-2 h-auto w-fit mr-6 border border-[var(--light-border-color)] rounded-md text-left text-gray-500'>{item.message}</p>
                            }
                            //image


                            //audio


                            //file
                            
                        }) : <h3 className="text-sm lg:text-base text-gray-400 my-auto mx-auto">Begin your conversation</h3>}

                        {/* <p className='self-end bg-[#2aa1a3] p-2 h-auto w-fit ml-6 text-white text-right rounded-md'>
                            Hello, what hours are your facility open?
                        </p>

                        <div className='self-start p-2 h-auto w-fit mr-6 border border-[var(--light-border-color)] rounded-md text-left text-gray-500'>
                            Hello! Our hours of operation are 9 AM to 5 PM, Monday to Friday. On Weekends we are open from 10 AM to 3 PM.
                        </div>

                        <p className='self-end bg-[#2aa1a3] p-2 h-auto w-fit ml-6 text-white text-right rounded-md'>
                            Thanks!
                        </p> */}

                    </div>

                    <div className='w-full border-t border-[var(--light-border-color)] h-20 flex items-center justify-between gap-4 p-2'>
                        <input className='border border-[var(--light-border-color)] h-12 w-full rounded-lg m-0 focus:outline-none text-gray-400' type='text' placeholder='Enter message...' onChange={handleChange}>

                        </input>

                        <div className='rounded-xl bg-gradient-to-r from-[#1a7071] to-[#26c5c7]  h-10 w-12 p-1 cursor-pointer hover:bg-opacity-80 flex items-center justify-center' onClick={()=>sendMessage()}>
                            <TbSend className='text-white h-6 w-6 '/>
                        </div>
                    </div>
                
                </>)
                :
                (
                    <h3 className="text-gray-400 text-base xl:text-lg self-center my-auto px-8">Choose a conversation to begin chatting.</h3>
                )}
                
            </div>

        </div>
    )
}

export default ConversationChat