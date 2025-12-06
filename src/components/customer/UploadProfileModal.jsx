import { useState, useEffect } from "react";
import { FaCamera } from "react-icons/fa";

import '../../style/newOrder.css';
const UploadProfileModal = (props) => {
    const [file, setFile] = useState(null)
    const [loading, setLoading] = useState(false)
    const [typeError, setTypeError] = useState(null)
    const handleOverlayClick = (e) => {
        // Only close if the clicked element is the overlay itself
        if (e.target === e.currentTarget) {
            props.onClose();
        }
    };

    const handleFileChange = (e) => {
        console.log('file: ', e.target.files)
        if (e.target.files && (e.target.files[0].type == 'png' || e.target.files[0].type == 'jpg')) {
            console.log(e.target.files)
            setFile(e.target.files[0])
            setTypeError(false)
        } else if (e.target.files.type != 'application/pdf') {
            setTypeError(true)
        }
    }

    const getProfilePic = async () => {
        setLoading(true)
        try {

        } catch (err) {
            console.error('Error fetching profile pic: ',err)
        } finally {
            setLoading(false)
        }
    }

    const uploadProfilePic = async () => {
        setLoading(true)
        try {

        } catch (err) {
            console.error('Error uploading profile pic: ',err)
        } finally {
            setLoading(false)
        }
    }

    return(
        <>
            <div className='overlay' onClick={handleOverlayClick}></div>
            <div className='border border-[var(--light-border-color)] relative rounded-lg bg-white flex flex-col gap-6 items-center justify-center h-96 w-11/12 md:w-3/5 lg:w-1/2 xl:w-2/5 px-3 py-2' id='new-order' onClick={(e) => e.stopPropagation()}>
                {file ? (<div>


                </div>) 
                :
                 (<div className="w-60 h-60 bg-gray-100 rounded-full p-2 box-border flex items-center justify-center cursor-pointer">
                        <FaCamera className="h-24 w-24 text-gray-400"/>
                        <input type='file' onChange={handleFileChange} className="hidden"/>
                 </div>)}

                <button className="text-white px-3 py-2 font-medium rounded-md text-base md:text-lg xl:text-xl">New Photo</button>
            </div>
        </>
    )
}

export default UploadProfileModal;