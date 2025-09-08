import axios from "axios"

export const searchFacility = async (name) => {
    try {
        const response = await axios.post('http://localhost:4000'+'/searchFacility', {name: name})
        if (response.status >= 200 && response.status < 300) {
            const data = response.data
            return data
        } else {
            return null
        }
    } catch (err) {
        console.err(`Error searching facility name ${name}:`, err)
        return null
    }
}

export const searchTest = async (name) => {
    try {
        const response = await axios.post('http://localhost:4000'+'/searchTest', {name: name})
        if (response.status >= 200 && response.status < 300) {
            const data = response.data
            return data
        } else {
            return null
        }

    } catch (err) {
        console.error(`Error searching test name ${name}: `, err)
        return null
    }
}

export const getFacilities = async () => {
    const response = await axios.get('http://localhost:4000'+'/getFacilities')
        if (response.status >= 200 && response.status < 300) {
            const result = response.data;
            // console.log('facilities:', result.data)
            // setFacilityData(result.data);
            // setLoading(false);
            return result.data
        } else {
            return null
        }
}

export const getTests = async () => {
    const response = await axios.get('http://localhost:4000'+'/getTests')
        if (response.status >= 200 && response.status < 300) {
            const result = response.data;
            // console.log('tests:', result.data)
            // setFacilityData(result.data);
            // setLoading(false);
            return result.data
        } else {
            return null
        }
}