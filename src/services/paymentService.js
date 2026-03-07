import axios from "axios"
import { getCurrencyCode, getCountryCode } from "../utils/userUtils"

const API_URL = process.env.REACT_APP_API_URL;

export const initPawapayDeposit = async (obj,token) => {
    try {
        const response = await axios.post(`${API_URL}/payments`, obj, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'accept': '*/*'
                },
        })
        //console.log('initiate deposit response: ', response)
        if (response.status >= 200 && response.status < 300) {
            if (response.data.success) { //success route

            } else {
                return {
                    success: false,
                    message: response.data.message
                }
            }
        }
        return {
            success: false,
            message: response.data.message

        }
    } catch (err) {
        console.error('Error initiating deposit: ',err)
        return {
            success: false,
            err: err.message
        }
    }
}

export const getCorrespondents = async (country,token) => {
    try {
        const countryCode = country === 'Rwanda' ? 'RWA' : 'ETH'
        const response = await axios.get(`${API_URL}/payments/correspondents/country/${countryCode}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                },
        })
        //console.log('get correspondents response: ', response)
        if (response.status >= 200 && response.status < 300) {
            //return the correspondents for our country if it is supported
            const result = response.data.map(item => ({
                correspondent: item.correspondent,
                currency: item.currency,
                maxTransactionLimit: item.operationTypes[0].maxTransactionLimit
            }))
            return result
        }
        
        return null
    } catch (err) {
        console.error('Failed to get correspondents list: ', err)
        return null
    }
}

export const predictCorrespondent = async (phoneNumber,token) => {
    try {
        const response = await axios.post(``, {phoneNumber: phoneNumber} ,{
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
                },
        })
        //console.log('predict correspondent response: ', response)
        if (response.status >= 200 && response.status < 300) {
            return response.data
        }
        return null
    } catch (err) {
        console.error('Failed to predict correspondents: ', err)
        return null
    }
}