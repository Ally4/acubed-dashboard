import { useState, useEffect } from "react";
import { FaCamera } from "react-icons/fa";
import { uploadProfilePicture, getUser } from '../../services/userService'
import { useSelector } from 'react-redux'
import '../../style/newOrder.css';

const UploadProfileModal = (props) => {
    const [file, setFile] = useState(null)
    const [image, setImage] = useState(null)
    const [loading, setLoading] = useState(false)
    const [typeError, setTypeError] = useState(null)
    const [errors, setErrors] = useState({})
    const [uploadSuccess, setUploadSuccess] = useState(false)
    const [profileUrl, setProfileUrl] = useState(null)

    const user = useSelector((state) => state.login.data);
    const token = user ? user.token : null
    const userId = user ? user.id : null
    
    const handleOverlayClick = (e) => {
        // Only close if the clicked element is the overlay itself
        if (e.target === e.currentTarget) {
            props.onClose();
        }
    };


    const handleFileChange = (e) => {
        console.log('file: ', e.target.files)
        if (e.target.files && (e.target.files[0].type == 'image/png' || e.target.files[0].type == 'image/jpeg')) {
            console.log(e.target.files)
            setFile(e.target.files[0])
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                setImage(reader.result);
            });
            reader.readAsDataURL(e.target.files[0]);
            setTypeError(false)
        } else {
            setTypeError(true)
        }
    }

    const getProfilePic = async () => {
        setLoading(true)
        try {
            const profileData = await getUser(userId,token)
            if (profileData?.profilePictureUrl) {
                setProfileUrl(profileData.profilePictureUrl)
            }
        } catch (err) {
            console.error('Error fetching profile pic: ',err)
        } finally {
            setLoading(false)
        }
    }

    const uploadProfilePic = async () => {
        setLoading(true)
        try {
            const fd = new FormData()
            fd.append('file', file)
            const result = await uploadProfilePicture(fd,token)
            if (result.success) {
                console.log('upload successful')
                setUploadSuccess(true)
            } else {
                console.error('profile upload failed')
                setErrors({...errors, uploadError: result.error})
            }
        } catch (err) {
            console.error('Error uploading profile pic: ',err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if(!userId || !token) return
        getProfilePic()
    },[userId,token])

    return(
        <>
            <div className='overlay' onClick={handleOverlayClick}></div>
            <div className='border border-[var(--light-border-color)] relative rounded-lg bg-white flex flex-col gap-6 items-center justify-center h-96 w-11/12 md:w-3/5 lg:w-1/2 xl:w-2/5 px-3 py-2' id='new-order' onClick={(e) => e.stopPropagation()}>
                {file && image ? (<div className="w-60 h-60 bg-gray-100 rounded-full mt-2 box-border flex items-center justify-center">
                        <img src={image} className="object-cover max-h-full max-w-full rounded-full"/>

                </div>) 
                :
                 (<label className="w-60 h-60 bg-gray-100 rounded-full mt-2 box-border flex items-center justify-center cursor-pointer">
                        {loading ? (<img src="secondary_color_spinner.svg" className="h-1/2 w-1/2" />)
                        :
                         
                         profileUrl ? (<img src={profileUrl} className="object-cover max-h-full max-w-full rounded-full"/>)
                         : 
                         (<>
                            <FaCamera className="h-24 w-24 text-gray-400"/>
                            <input type='file' onChange={handleFileChange} className="hidden"/>
                         </>)
                         }
                        
                 </label>)}

                {uploadSuccess != true && <div onClick={()=>uploadProfilePic()} className={`text-white w-1/4 px-3 py-2 font-medium mb-1 rounded-md text-base md:text-lg bg-[#1c7d7f] xl:text-xl ${file ? 'cursor-pointer hover:bg-opacity-80':'bg-opacity-30'} flex items-center justify-center`}>
                    {loading ? <img src="/gray_spinner.svg" className="h-8 w-8" /> : "Confirm"}
                </div>}
                {uploadSuccess && <p className="text-green-500 text-base xl:text-lg font-medium">Image uploaded successfully!</p>}
                {typeError && <p className="text-gray-600 text-base xl:text-lg text-center mb-2">Must upload either a PNG or JPG type file.</p>}
                {errors.uploadError && <p className="text-red-500 text-base xl:text-lg">{errors.uploadError}</p>}
            </div>
        </>
    )
}

export default UploadProfileModal;