import { useState, useEffect } from 'react'
import { FaRegCircleCheck } from "react-icons/fa6";
import { useSelector } from 'react-redux'
import { getCorrespondents, predictCorrespondent } from '../../../services/paymentService'

const PawapayCorrespondent = (props) => {
    const [phoneNumber, setPhoneNumber] = useState('')
    const [phoneNumberConfirmed, setPhoneNumberConfirmed] = useState(false)
    const [selectedCorrespondent, setSelectedCorrespondent] = useState(null)
    const [correspondents, setCorrespondents] = useState([])
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)
    const user = useSelector((state) => state.login.data)
    const country = user ? user.country : null
    const token = user ? user.token : null
    //Load available correspondents for their country, and allow them to select one

    //Also let them add their phonenumber
    const handlePhoneChange = (e) => {
        setPhoneNumber(e.target.value)
        setPhoneNumberConfirmed(false)
    }

    const getAvailableCorrespondents = async () => {
        // console.log(user)
        try {
            setLoading(true)
            const countryCorrespondents = await getCorrespondents(country,token)
            if (countryCorrespondents === null) {

                setErrors({...errors, failedToGetCorrespondentsError: ""})
            } else if (countryCorrespondents && countryCorrespondents.length == 0) {
                setErrors({...errors, countryNotSupportedError: ""})
            } else { // try and predict
                setCorrespondents(countryCorrespondents)
                const predictedCorrespondent = await predictCorrespondent(phoneNumber)
                if (predictedCorrespondent && correspondents.includes(predictedCorrespondent.correspondent)) {
                    const c = correspondents.filter(k => k.correspondent === predictedCorrespondent.correspondent)[0]
                    setSelectedCorrespondent(c)
                }
            }
        } catch (err) {

        } finally {
            setLoading(false)
        }
    }

    const confirmPhoneNumber = () => {
        //validation
        console.log('validating: ',phoneNumber)
        if(/^\+?[0-9]+$/.test(phoneNumber)){
            setPhoneNumberConfirmed(true)
            setErrors({})
        } else {
            setPhoneNumber('')
            setErrors({...errors, validPhoneNumberError: "Please enter a valid phone number"})
        }
    }

    useEffect(() => {
        if(!phoneNumberConfirmed || !country) return
        //Get the correspondents
        getAvailableCorrespondents()
        
    },[phoneNumberConfirmed])

    useEffect(() => {
        if (!selectedCorrespondent) return
        //update the correspondent in the parent, and phoneNumber
        props.setValues(selectedCorrespondent,phoneNumber)
    }, [selectedCorrespondent])


    return(
        <div className='w-full py-2 my-2 flex flex-col items-center justify-center'>

            <div className='w-full flex flex-col items-start justify-center'>
                <label for='phonenumber' className='mb-1 font-medium text-gray-600 text-base'>Phonenumber</label>
                <div className='w-full flex items-center gap-1'>
                    <input type='tel' id='phonenumber' required onChange={handlePhoneChange} className='text-sm text-gray-500 border border-gray-400 px-2 py-3 rounded-md focus:outline-none m-0' />
                    <button className='m-0' onClick={()=>confirmPhoneNumber()}>
                        {phoneNumberConfirmed ? <FaRegCircleCheck className='text-white h-6 w-6' /> : 'Confirm'}
                    </button>
                </div>
                {errors.validPhoneNumberError && <p className='text-red-700 text-sm'>{errors.validPhoneNumberError}</p>}
            </div>
            
            {loading ? (<img className='h-8 w-8 mt-2' src='/secondary_color_spinner.svg' />) :
                phoneNumberConfirmed ?
                !correspondents ? (<p className='text-red-600 text-sm'>Could load correspondents</p>) :
                    correspondents.length > 0 ? (
                        <div className='max-w-full flex items-center justify-start overflow-y-auto'>
                            {correspondents?.map((item,index) => {

                                return (<div onClick={()=> {
                                    setSelectedCorrespondent(item)
                                }} key={index} className={`p-2 border rounded-md border-${item.correspondent === selectedCorrespondent?.correspondent ? '[#1c7d7f]' : '[var(--light-border-color)]'} shadow-md cursor-pointer`}>
                                    <p className={`text-sm md:text-base font-medium text-gray-700`}>{item.correspondent}</p>
                                </div>)
                            })}

                        </div>
                    ) : 
                    (<p className='text-red-600 self-start text-sm'>No correspondents available for your country</p>)    
                    : (null) 
            }

                

        </div>
    )
}


export default PawapayCorrespondent