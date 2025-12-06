import React, { useState, useEffect } from 'react'
import { TbSend } from "react-icons/tb";

const ChatBot = (props) => {

    return(
        <div className='border border-[var(--light-border-color)] h-auto w-auto rounded-2xl p-2 bg-white shadow-md'>
            <div className='h-96 md:h-[400px] xl:h-[420px] w-80 bg-[#e1f6f7] rounded-xl relative flex flex-col items-center justify-start'>
                <div className='border-b border-[var(--light-border-color)] rounded-tr-xl rounded-tl-xl h-16 w-full flex items-center justify-between px-2 py-1'>
                    <h3 className='m-0 font-semibold text-[var(--secondary-color)] text-lg xl:text-xl'>ChatBot</h3>
                    <p className='cursor-pointer font-semibold text-lg: xl:text-xl text-[var(--secondary-color)]' onClick={props.onClose}>✖</p>
                </div>

                <div className='w-full h-full'>


                </div>

                <div className='px-1 pb-1 w-full h-auto'>
                    <div className='w-full bg-white rounded-xl border border-[var(--light-border-color)] h-16 flex items-center justify-end p-1 gap-1'>
                        <input type='text' placeholder='Ask a question..' className='w-full h-full focus:outline-none m-0' />
                        <div className='rounded-xl bg-gradient-to-r from-[#1a7071] to-[#26c5c7]  h-10 w-12 p-1 cursor-pointer hover:bg-opacity-80 flex items-center justify-center'>
                            <TbSend className='text-white h-6 w-6 '/>
                        </div>
                    </div>
                </div>
                



            </div>

        </div>
    )
}

export default ChatBot