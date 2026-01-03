import axios from "axios"
import api from "./api"
import { getCurrencyCode } from "../utils/userUtils"
// import { API_URL } from "../config"
// const API_URL = 'https://api-v2.acubed.live/api'
const API_URL = 'http://localhost:5000/api'

export const getRequestableFacilities = async (token,countryId) => {
    try {
        const response = await axios.get(`${API_URL}/chat/${countryId}/requestable-facilities`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'accept': '*/*'
                }
        }
        )
        if (response.status >= 200 && response.status < 300) {
            console.log('requestable facilities response: ', response)
            if (response.data.error) {
                return null
            }
            const facilities = response.data.data
            const requestableFacilities = facilities.map(facility => ({
            ...facility,
            requested: facility.chatRequests.length > 0  // true if pending exists
            }));
            console.log('facilities that are requestable: ',requestableFacilities)
            return requestableFacilities.sort(function(x,y) {return (x.requested === y.requested)? 0 : x.requested? 1 : -1;})
        } 
        return null
    } catch (err) {
        console.error('Failed to get unrequested facilities: ',err)
        return null
    }
}

export const getUserConversations = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/chat/requests/approved/user`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'accept': '*/*'
                }
        })
        console.log('get user conversations response: ',response)
        if (response.status >= 200 && response.status < 300) {
            return {data: response.data.data, success: true}
        } else {
            return { success: false, error: "Failed to get conversations"}
        }

    } catch (err) {
        console.error('Failed to get user conversations: ',err)
        return {success: false, error: err.message}
    }
}

export const getConversationFromChatId = async(token,chatId) => {
    try {
        const response = await axios.get(`${API_URL}/chat/messages/${chatId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'accept': '*/*'
                }
        })
        console.log('Get conversations from chatId response: ',response)
        if (response.status >= 200 && response.status < 300) {
            return {success: true, data: response.data.data}
        } else {
            return { success: false, error: "Failed to get chat messages"}
        }
    } catch (err) {
        console.error("Failed to get Convesations from chat Id: ",err)
        return {success: false, error: err.message}
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

//Messaging

export const sendMessageToFacility = async (token,obj) => {
    try {
        const response = await axios.post(`${API_URL}/chat/message`, obj, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'accept': '*/*'
            }
        })
        console.log('Send message response: ',response)
        if (response.status >= 200 && response.status < 300) {
            return { success: true, data: response.data.data}
        } else {
            return { success: false, error: ""}
        }
    } catch (err) {
        console.error('Error sending a message: ',err)
        return { success: false, error: err.message}
    }
}