import axios from "axios"
import api from "./api"
// import { API_URL } from "../config"
const API_URL = 'https://api-v2.acubed.live/api'


export const getFacilities = async (page, items_per_page, search, countryId, token) => {
    console.log('fetching facilities in country: ',countryId)
    try {
        const response = await axios.get(`${API_URL}/facilities`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'accept': '*/*'
                }
        })
        if (response.status >= 200 && response.status < 300) {
            const result = response.data.data.facilities.filter(k => k.countryId == countryId);
            console.log('getFacilities: ', result)
            return {data: result, max: 10}
        } else {
            return null
        }
    } catch (err) {
        console.error('Error in getting all facilities for dashboard: ',err)
        return null
    }
    
}

export const getAllFacilities = async (countryId,token) => {
    try {
        const response = await axios.get(`${API_URL}/facilities`,
            {headers: {
            'Authorization': `Bearer ${token}`,
            'accept': '*/*'
            }}
        )
        if (response.status >= 200 && response.status < 300) {
            const data = response.data.data.facilities.filter(k => k.countryId == countryId)
            console.log('all facility data: ', data)
            return data
        }
    } catch (err) {
        console.error('Error in getting all facilities for map: ',err)
        return null
    }
}

export const getTests = async (page, items_per_page, search, countryId, token) => {
    try {
        const response = await axios.get(`${API_URL}/tests`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'accept': '*/*'
            }}
        )
        if (response.status >= 200 && response.status < 300) {
            const result = response.data.data.testCatalog.filter(k => k.facility.countryId == countryId);
            
            return {data: result, max: 10}
        } else {
            return null
        }
    } catch (err) {
        console.log('Error getting tests for dashboard: ',err)
        return null
    }
    
}



export const getFacility = async(id,token) => {
    try {
        const response = await axios.get(`${API_URL}/facilities/${id}`, {
            headers: {
            'Authorization': `Bearer ${token}`,
            'accept': '*/*'
            }} 
        )
        if (response.status >= 200 && response.status < 300) {
            const result = response.data
            console.log('getFacility: ',result)
            return result.data
        } else {
            return null
        } 
    } catch (err) {
        console.error('requesting data from api')
        return null
    }
}

export const getFacilityTests = async(id,token) => {
    try {
        const response = await axios.get(`${API_URL}/tests`, {
            headers: {
            'Authorization': `Bearer ${token}`,
            'accept': '*/*'
            }}
        )
        const tests = response.data.data.testCatalog
        let facilityTests = []
        for (let i=0; i < tests.length; i++) {
            if (tests[i].facilityId == id) {
                facilityTests.push(tests[i])
            }
        }
        return facilityTests
    } catch (err) {
        console.error('failed to get facility tests: ',err)
        return null
    }
}

export const getTest = async(id,token) => {
    try {
        const response = await axios.get(`${API_URL}/tests/${id}`, {
            headers: {
            'Authorization': `Bearer ${token}`,
            'accept': '*/*'
            }}
        )
        if (response.status >= 200 && response.status < 300) {
            const result = response.data
            console.log('getTest: ',result)
            return result.data
        } else {
            console.log('request to get test info failed')
            return null
        } 
    } catch (err) {
        console.error('requesting data from api')
        return null
    }
}

export const getRecentTests = async(token,countryId) => {
    try {
        console.log('fetching tests')
        // const response = await api.get('/tests')
        console.log('api url: ',API_URL)
        const response = await axios.get(`${API_URL}/tests`, {
            headers: {
            'Authorization': `Bearer ${token}`,
            'accept': '*/*'
            }})
        if (response.status >= 200 && response.status < 300) {
            console.log('recent tests: ',response.data)
            return response.data.data.testCatalog.filter(k => k.facility.countryId == countryId).slice(0,7)
        } else {
            return null
        }
    } catch (err) {
        console.log('Error getting recent tests: ',err)
        return null
    }
}