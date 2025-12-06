import axios from "axios"
import api from "./api"
import { getCountryCode } from "../utils/userUtils"
// import { API_URL } from "../config"
const API_URL = 'https://api-v2.acubed.live/api'


export const getFacilities = async (page, items_per_page, search, countryId, token) => {
    console.log('fetching facilities in country: ',countryId)
    const countryCode = await getCountryCode(countryId)
    try {
        const response = await axios.get(`${API_URL}/facilities/country/${countryCode}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'accept': '*/*'
                }
        })
        if (response.status >= 200 && response.status < 300) {
            const result = response.data.data
            console.log('getFacilities response: ', response)
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
    const countryCode = await getCountryCode(countryId)
    try {
        const response = await axios.get(`${API_URL}/facilities/country/${countryCode}`,
            {headers: {
            'Authorization': `Bearer ${token}`,
            'accept': '*/*'
            }}
        )
        if (response.status >= 200 && response.status < 300) {
            const data = response.data.data
            //.filter(k => k.countryId == countryId)
            console.log('all facility data: ', data)
            return data
        }
    } catch (err) {
        console.error('Error in getting all facilities for map: ',err)
        return null
    }
}

export const getTests = async (page, items_per_page, search, countryId, token) => {
    const countryCode = await getCountryCode(countryId)
    try {
        const response = await axios.get(`${API_URL}/tests/country/${countryCode}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'accept': '*/*'
            }}
        )
        if (response.status >= 200 && response.status < 300) {
            console.log('getTests response: ',response)
            const result = response.data.data
            
            return {data: result, max: 10}
        } else {
            return null
        }
    } catch (err) {
        console.log('Error getting tests for dashboard: ',err)
        return null
    }
    
}

export const getTestsBySampleType = async (countryId, token, sampleType) => {
    const countryCode = await getCountryCode(countryId)
    try {
        const response = await axios.get(`${API_URL}/tests/country/${countryCode}/${sampleType.toLowerCase()}`, {
            headers: {
            'Authorization': `Bearer ${token}`,
            'accept': '*/*'
            }}
        )
        if (response.status >= 200 && response.status < 300) {
            console.log('get test by sampleType response: ',response)
            const result = response.data.data
            return {data: result, max: 10}
        }
    } catch (err) {
        console.error('Error getting tests by sample type: ',err)
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
        console.log('getFacilityTests response: ',response)
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

//Search Endpoints

export const testSearch = async (countryId,searchTerm,sampleType,token) => {
    const countryCode = await getCountryCode(countryId)
    try {
        const response  = await axios.post(`${API_URL}/tests/search`, {country: countryCode, searchTerm: searchTerm.toLowerCase(), sampleType: sampleType ? sampleType.toLowerCase() : null}, {
            headers: {
            'Authorization': `Bearer ${token}`,
            'accept': '*/*'
        }})
        if (response.status >= 200 && response.status < 300) {
            console.log('tests search response: ',response)
            if (response.data.error) {
                console.error('test search error: ',response.data.error)
                return null
            } else {
                return {data: response.data.data }
            }
        }   
        return null

    } catch (err) {
        console.error(`Error searching tests for term: ${searchTerm}. `, err)
        return null
    }
}

export const facilitySearch = async (countryId,searchTerm,token) => {
    const countryCode = await getCountryCode(countryId)
    try {
        const response  = await axios.post(`${API_URL}/facilities/search`, {country: countryCode, q: searchTerm.toLowerCase()}, {
            headers: {
            'Authorization': `Bearer ${token}`,
            'accept': '*/*'
        }})
        if (response.status >= 200 && response.status < 300) {
            console.log('tests search response: ',response)
            if (response.data.error) {
                console.error('facility search error: ',response.data.error)
                return null
            } else {
                return response.data.data
            }
        }    
        return null

    } catch (err) {
        console.error(`Error searching facilities for term: ${searchTerm}. `, err)
        return null
    }
}