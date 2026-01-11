import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { TbSend } from "react-icons/tb";
import { PiBuildingApartmentFill } from "react-icons/pi";
import { getConversationFromChatId, sendMessageToFacility, sendChatFile } from '../../../services/chatService'
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { RiRobot2Line } from "react-icons/ri";
import { MdAttachFile } from "react-icons/md";
//upload photo
import { RxCross2 } from "react-icons/rx";
import { HiOutlinePhotograph } from "react-icons/hi";
import { IoIosDocument } from "react-icons/io";

import FacilityConversations from './conversations/FacilityConversations'

const ConversationChat = (props) => {
    const user = useSelector(state => state.login.data)
    const token = user ? user.token : null
    const MAX_SIZE = 25 * 1024 * 1024;

    const [selectedConversation, setSelectedConversation] = useState(null)
    const [messages, setMessages] = useState([])
    const [currentMessage, setCurrentMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const [loadingMessages, setLoadingMessages] = useState(false)
    const [errors, setErrors] = useState({})
    const [showFacilityConversations, setShowFacilityConversations] = useState(false)
    const [showDeliveryConversations, setShowDeliveryConversations] = useState(false)
    const [files, setFiles] = useState([])
    const [images, setImages] = useState([])
    const [typeError, setTypeError] = useState(null)

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
        console.log('sending chat message')
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
                setMessages([...messages, {message: currentMessage, senderType: "USER", messageType: "TEXT"}])
                setCurrentMessage('')
            } else {
                //indicate to the user that it wasn't sent
            }
        } catch (err) {
                console.error("Failed to send message: ",err)
                setErrors({...errors, sendMessageError: "Failed to send message."})
        }
    }

    const sendFile = async (messageType) => {
        console.log('sending chat file')
        try {
            const obj = { //include list of file size and name
                chatRequestId: selectedConversation.id,
                message: currentMessage,
                messageType: messageType,
                fileSizes: messageType == 'IMAGE' ? images.map((item) => item.file.size) : files.map((item) => item.size),
                fileNames: messageType === 'IMAGE' ? images.map((item) => item.file.name) :  files.map((item) => item.name),
                formDatas: messageType === 'IMAGE' ? images.map((item) => {
                    const fd = new FormData()
                    fd.append('file', item.file)
                    return fd
                }) : files.map((item) => {
                    const fd = new FormData()
                    fd.append('file', item)
                    return fd
                })
            }
            const result = await sendChatFile(token,obj)
            if (result.errors.length == 0) { // Some immediate update to show the new image or file
                setCurrentMessage('')
            } else {
                // indicate that the file was not sent
                console.log('Encountered errors sending files: ', result.errors)
            }
            //reset
        } catch (err) {
            console.error("Failed to send file: ",err)
            setErrors({...errors, sendFileErrir: "Failed to send file"})
        } finally {
            setFiles([])
            setImages([])
        }
    }

    const handleImageChange = (e) => {
        console.log('upload chat image file: ', e.target.files)
        if (e.target.files[0].size > MAX_SIZE) {
            console.log('image size too large')
            return
        }
        if (e.target.files && (e.target.files[0].type == 'image/png' || e.target.files[0].type == 'image/jpeg')) {
            console.log(e.target.files)
            // setFile([...file,e.target.files[0]])
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                setImages([...images, {file:e.target.files[0] ,image:reader.result}]);
            });
            reader.readAsDataURL(e.target.files[0]);
            setTypeError(false)
        } else {
            setTypeError(true)
        }
    }

    const handleFileChange = (e) => {
        console.log('upload chat file: ', e.target.files)
        if (e.target.files[0].size > MAX_SIZE) {
            console.log('file size too large')
            return
        }
        if (e.target.files) {
            console.log(e.target.files)        
            setFiles([...files, e.target.files[0]]);
            setTypeError(false)
        } else {
            setTypeError(true)
        }
    }


    useEffect(() => {
        if(!selectedConversation || !token) return
        getConversation()
    },[selectedConversation])

    return(
        <div className='w-full min-h-96 h-full md:h-[450px] lg:h-[500px] border-b border-[var(--light-border-color)] grid grid-cols-[210px_1fr] lg:grid-cols-[250px_1fr] xl:grid-cols-[300px_1fr] lg:rounded-br-lg lg:rounded-bl-lg'>
            {/*Conversations*/}
            
            <div className='h-full w-full border-[var(--light-border-color)] overflow-y-auto flex flex-col items-center justify-start'>
                <div className='w-full h-12 border-b border-[var(--light-border-color)] flex items-center justify-start px-3 py-2 gap-4 cursor-pointer hover:bg-gray-50'>
                    <RiRobot2Line className='text-[var(--secondary-color)] h-8 w-8' />
                    <p className='text-gray-500 text-base md:text-lg'>ChatBot</p>
                </div>
                <div className='w-full h-10 border-b border-[var(--light-border-color)] flex items-center justify-between px-3 py-2'>
                    <p className='text-base md:text-lg text-gray-500'>Facilities</p>
                    {!showFacilityConversations ? <IoIosArrowUp className='text-gray-400 h-7 w-7 cursor-pointer' onClick={()=>setShowFacilityConversations(true)} /> : <IoIosArrowDown className='text-gray-400 h-7 w-7 cursor-pointer' onClick={()=> setShowFacilityConversations(false)} />}
                </div>
                {showFacilityConversations && <FacilityConversations onClick={(item)=>setSelectedConversation(item)} />}
                <div className='w-full h-10 border-b border-t border-[var(--light-border-color)] flex items-center justify-between px-3 py-2'>
                    <p className='text-base md:text-lg text-gray-500'>Deliveries</p>
                    {!showDeliveryConversations ? <IoIosArrowUp className='text-gray-400 h-7 w-7 cursor-pointer' onClick={()=>setShowDeliveryConversations(true)} /> : <IoIosArrowDown className='text-gray-400 h-7 w-7 cursor-pointer' onClick={()=> setShowDeliveryConversations(false)} />}
                </div>
            </div>

            
            {/*Chat Window */}
            <div className='w-full min-h-96 h-full md:h-[450px] lg:h-[500px] flex flex-col justify-end items-center border-l border-[var(--light-border-color)]'>
                {loadingMessages ? <img src="/secondary-color-spinner.svg" className="w-12 h-12" /> 
                : selectedConversation ? (<>
                    <div className='w-full border-b border-[var(--light-border-color)] bg-white flex items-center justify-start h-16 gap-3 md:gap-6'>
                        <div className='border border-[var(--light-border-color)] h-8 md:h-10 w-8 md:w-10 rounded-full ml-2 flex items-center justify-center bg-gray-200'>
                            {selectedConversation?.imageUrl ? <img src={selectedConversation?.imageUrl} className="max-h-full max-w-full object-cover"/> : <PiBuildingApartmentFill className='text-gray-500 h-5 md:h-7 w-5 md:w-7' />}
                        </div>
                        <h3 className="text-gray-500 text-sm md:text-base m-0">{selectedConversation?.facility?.name}</h3>
                    </div>

                    <div id='message window' className='h-full overflow-y-auto flex flex-col gap-4 w-full p-2'>
                        {messages.length > 0 ? messages?.map((item,index) => {
                            // text
                            if (item.messageType === "TEXT") {
                                if (item.senderType === "USER") return <p key={index} className='self-end bg-[#2aa1a3] p-2 h-auto w-fit ml-6 text-white text-right rounded-md'>{item.message}</p>
                                return <p key={index} className='self-start p-2 h-auto w-fit mr-6 border border-[var(--light-border-color)] rounded-md text-left text-gray-500'>{item.message}</p>
                            } else if (item.messageType === 'IMAGE') {
                                return <img key={index} src={item.fileUrl} alt={item.fileName} className={`${item.senderType === 'USER' ? 'self-end' : 'self-start'} rounded-md w-32 h-32 md:w-40 md:h-40 xl:w-52 xl:h-52`} />
                            } else if (item.messageType === "FILE") {
                                return (<a href={item.fileUrl}
                                            download={item.fileName}
                                            target="_blank"
                                            rel="noopener noreferrer" key={index} className={`${item.senderType === 'USER' ? 'self-end' : 'self-start'} bg-gray-200 rounded-lg flex flex-col items-center justify-center hover:bg-gray-100 cursor-pointer h-auto min-h-28 w-auto min-w-28 p-4`}>
                                    <IoIosDocument className='text-gray-500 h-12 w-12 lg:h-16 lg:w-16' />
                                    <p className='mt-1 text-gray-600 text-sm text-center truncate'>{item.fileName}</p>
                                    </a>)
                            }


                            //audio                            
                        }) : <h3 className="text-sm lg:text-base text-gray-400 my-auto mx-auto">Begin your conversation</h3>}
                    </div>
                    <div className='w-full h-auto flex flex-col items-center justify-center border-t border-[var(--light-border-color)]'>
                        {images.length > 0 && <div className='w-full h-auto flex items-center justify-start overflow-y-auto py-2 px-3 gap-2 m-0'>
                            {/* <div className='h-16 w-16 rounded-xl flex items-center justify-center bg-gray-100'>
                                <HiOutlinePhotograph className="text-gray-600 w-14 h-14"/>
                            </div> */}
                            {images?.map((item,index) => (
                                <div key={index} className='h-16 w-16 rounded-xl flex items-center justify-center relative'>
                                    <img src={item.image} className='object-cover max-h-full max-w-full h-full w-full rounded-xl' />
                                    <div className='absolute top-0 right-0 bg-gray-300 rounded-full h-5 w-5 flex items-center justify-center cursor-pointer' onClick={()=>{setImages(images.filter(k => k.file.name != item.file.name))}}>
                                        <RxCross2 className='text-gray-600 h-3 w-3' />
                                    </div>
                                </div>
                            ))}
                            </div>}

                        {files.length > 0 && <div className='w-full h-auto flex items-center justify-start overflow-y-auto py-2 px-3 gap-2 m-0'>
                            {/* <div className='h-16 w-16 rounded-xl flex items-center justify-center bg-gray-100'>
                                <HiOutlinePhotograph className="text-gray-600 w-14 h-14"/>
                            </div> */}
                            {files?.map((item,index) => (
                                <div key={index} className='h-16 w-16 rounded-xl flex items-center justify-center relative bg-gray-200'>
                                    <IoIosDocument className='text-gray-500 h-8 w-8 lg:h-12 lg:w-12' />
                                    <div className='absolute top-0 right-0 bg-gray-300 rounded-full h-5 w-5 flex items-center justify-center cursor-pointer' onClick={()=>{setFiles(files.filter(k => k.name != item.name))}}>
                                        <RxCross2 className='text-gray-600 h-3 w-3' />
                                    </div>
                                </div>
                            ))}
                            </div>}
                        
                        <div className='w-full h-20 flex items-center justify-between gap-3 p-2 m-0'>
                            <input className='border border-[var(--light-border-color)] h-12 w-full rounded-lg m-0 focus:outline-none text-gray-400' type='text' placeholder='Enter message...' value={currentMessage} onChange={handleChange}>

                            </input>

                            <label className='m-0' htmlFor='photo-upload'>
                                <HiOutlinePhotograph className='text-gray-500 w-7 h-7 lg:h-9 lg:w-9 cursor-pointer' />
                                <input type='file' hidden onChange={handleImageChange} accept="image/*" id='photo-upload' disabled={files.length > 0 ? true : false}/>
                            </label>                       
                            
                            <label className='m-0' htmlFor='file-upload'>
                                <MdAttachFile className='text-gray-500 w-7 h-7 lg:h-9 lg:w-9 cursor-pointer' />
                                <input type='file' hidden onChange={handleFileChange} accept="*" id='file-upload' disabled={images.length > 0 ? true : false}/>
                            </label>                       

                            <div className='rounded-md lg:rounded-xl bg-gradient-to-r from-[#1a7071] to-[#26c5c7] h-8 w-10  lg:h-10 lg:w-12 p-1 cursor-pointer hover:bg-opacity-80 flex items-center justify-center' onClick={()=>{
                                if (images.length == 0 && files.length == 0) {
                                    sendMessage()
                                } else {
                                    images.length > 0 ? sendFile('IMAGE') : sendFile('FILE')
                                }
                                }}>
                                <TbSend className='text-white h-4 w-4 lg:h-6 lg:w-6 '/>
                            </div>
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