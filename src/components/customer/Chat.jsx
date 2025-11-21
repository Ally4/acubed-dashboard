import { useState, useEffect } from 'react'
import '../../style/newOrder.css'
import { TbSend } from "react-icons/tb";


const Chat = (props) => {
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
                <div className='w-full flex items-center h-12 justify-between border-b broder-[var(--light-border-color)] py-2 px-2'>
                    <h3 className='m-0 font-medium text-lg xl:text-xl text-gray-600'>Messages</h3>
                    <p className='h-12 w-12 flex items-center font-semibold justify-center rounded-md text-[var(--secondary-color)] cursor-pointer' onClick={props.onClose}>✖</p>
                </div>
                <div className='w-full h-auto grid grid-cols-[200px_1fr] xl:grid-cols-[300px_1fr]'>
                    <div className='h-full w-full border-r border-[var(--light-border-color)] overflow-y-auto'>
                            <div className='w-full border-b border-[var(--light-border-color)] h-20 flex items-center justify-start cursor-pointer'>
                                <div className='border rounded-full h-12 w-12 border-[var(--light-border-color)] ml-2'>

                                </div>
                                <div>

                                </div>
                            </div>

                            <div className='w-full border-b border-[var(--light-border-color)] h-20 flex items-center justify-start cursor-pointer'>
                                <div className='border rounded-full h-12 w-12 border-[var(--light-border-color)] ml-2'>

                                </div>
                                <div>

                                </div>
                            </div>

                            <div className='w-full border-b border-[var(--light-border-color)] h-20 flex items-center justify-start'>
                                <div className='border rounded-full h-12 w-12 border-[var(--light-border-color)] ml-2'>

                                </div>
                                <div>

                                </div>
                            </div>

                            <div className='w-full border-b border-[var(--light-border-color)] h-20 flex items-center justify-start'>
                                <div className='border rounded-full h-12 w-12 border-[var(--light-border-color)] ml-2'>

                                </div>
                                <div>

                                </div>
                            </div>

                            <div className='w-full border-b border-[var(--light-border-color)] h-20 flex items-center justify-start'>
                                <div className='border rounded-full h-12 w-12 border-[var(--light-border-color)] ml-2'>

                                </div>
                                <div>

                                </div>
                            </div>
                    </div>

                    <div className='w-full h-full flex flex-col justify-between items-center'>
                        <div className='w-full border-b border-[var(--light-border-color)] flex items-center justify-start h-16'>
                            <div className='border border-[var(--light-border-color)] h-10 w-10 rounded-full ml-2'>

                            </div>
                        </div>

                        <div className='min-h-96 overflow-y-auto flex flex-col gap-4 w-full p-2'>

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

                

            </div>
        </>
    )
}

export default Chat