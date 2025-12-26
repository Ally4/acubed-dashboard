import axios from "axios"
// const API_URL = 'https://api-v2.acubed.live/api'
const API_URL = 'http://localhost:5000/api'

export const getCurrencyCode = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/countries`)
        if (response.status >= 200 && response.status < 300) {
            const countries = response.data.data.countries
            for (let i=0; i<countries.length; i++) {
                if (countries[i].id == id) {
                    return countries[i].code
                }
            }
        }
        return null
    } catch (err) {
        console.log('Error getting country code: ',err)
        return null
    }
}

export const getCountryCode = async (countryId) => {
    const country = await getCountry(countryId)
    if (country == 'Rwanda') {
        return 'RWA'
    } else if (country == 'Ethiopia') {
        return 'ETH'
    }
}

export const getCountry = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/countries`)
        if (response.status >= 200 && response.status < 300) {
            const countries = response.data.data.countries
            for (let i=0; i<countries.length; i++) {
                if (countries[i].id == id) {
                    return countries[i].name
                }
            }
        }
        return null
    } catch (err) {
        console.log('Error getting country code: ',err)
        return null
    }
}
    