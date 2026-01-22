import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getUserConversations } from '../../../../services/chatService'
import { PiBuildingApartmentFill } from "react-icons/pi";

const FacilityConversations = (props) => {
    const user = useSelector(state => state.login.data)
    const token = user ? user.token : null
    const userId = user ? user.id : null
    const countryId = user ? user.countryId : null

    const [conversations, setConversations] = useState([])
    const [loading, setLoading] = useState(false)
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

    useEffect(() => {
        if (!token) return
        getConversations()
    }, [token])

    return(
        <>
            {loading ? (<div className='text-base text-gray-400 md:text-lg ml-2'>Loading...</div>) 
                : conversations.length > 0 ? (conversations?.map((item,index) => (<div key={index} className='w-full hover:bg-gray-50 border-[var(--light-border-color)] h-20 flex items-center justify-start gap-2 cursor-pointer relative' onClick={()=>props.onClick(item)}>
                    {item.facility.imageUrl ? (<img src={item.facility.imageUrl}/>) : (
                        <div className='border rounded-full h-7 md:h-10 w-7 md:w-10 bg-gray-200 border-[var(--light-border-color)] ml-2 flex items-center justify-center'>
                            <PiBuildingApartmentFill className='text-gray-500 h-5 md:h-7 w-5 md:w-7' />
                        </div>)}
                    <p className='text-xs sm:text-sm md:text-base text-gray-400 truncate'>{item.facility.name}</p>
                    {/* <MdAddCircleOutline  className='absolute right-1 text-[var(--secondary-color)] h-8 w-8'/> */}
                </div>)))
                : (<div className='text-wrap text-base text-gray-400 text-center my-6'>No Conversations</div>)}
        </>
    )
}

export default FacilityConversations