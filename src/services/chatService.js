import axios from "axios"
import api from "./api"
import { getCountryCode } from "../utils/userUtils"
// import { API_URL } from "../config"
const API_URL = 'https://api-v2.acubed.live/api'

export const getRequestableFacilities = async (token,countryId,userId) => {
    const countryCode = getCountryCode(countryId)
    try {
        const response = await axios.get(`${API_URL}/facilities/country/${countryCode}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'accept': '*/*'
                }
        }
        )
        if (response.status >= 200 && response.status < 300) {
            console.log('unrequested facilities response: ', response)
            if (response.data.error) {
                return null
            }
            return response.data.data
        } 
        return null
    } catch (err) {
        console.error('Failed to get unrequested facilities: ',err)
        return null
    }
}

export const getConversations = async (token,countryId,userId) => {
    const countryCode = getCountryCode(countryId)
    try {
        return []

    } catch (err) {
        console.error('Failed to get user conversations: ',err)
        return null
    }
}

export const submitFacilityChatRequest = async (token,obj) => {
    try {
        const response = await axios.post(`${API_URL}/chat/request`, obj, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'accept': '*/*'
                }
        })
        if (response.status >= 200 && response.status < 300) {
            if (response.data?.error) {
                console.log('Error submting facility chat request: ', response.data.error)
                return { success: false}
            } else {
                return { success: true}
            }
        }
        return { success: false}
    } catch (err) {
        console.error('Error submiting facility chat request: ',err)
        return { success: false}
    }
}