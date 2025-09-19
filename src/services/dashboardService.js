import axios from "axios"

// export const searchFacility = async (name) => {
//     try {
//         const response = await axios.post('http://localhost:4000'+'/api/dashboard/searchFacility', {name: name})
//         if (response.status >= 200 && response.status < 300) {
//             const data = response.data
//             return data
//         } else {
//             return null
//         }
//     } catch (err) {
//         console.error(`Error searching facility name ${name}:`, err)
//         return null
//     }
// }

// export const searchTest = async (name) => {
//     try {
//         const response = await axios.post('http://localhost:4000'+'/api/dashboard/searchTest', {name: name})
//         if (response.status >= 200 && response.status < 300) {
//             const data = response.data
//             return data
//         } else {
//             return null
//         }

//     } catch (err) {
//         console.error(`Error searching test name ${name}: `, err)
//         return null
//     }
// }

export const getFacilities = async (page, items_per_page, search) => {
    const response = await axios.post('http://localhost:4000'+'/api/dashboard/getFacilities', { page: page, items_per_page: items_per_page, search: search})
        if (response.status >= 200 && response.status < 300) {
            const result = response.data;
            // console.log('returning facility data')
            // setFacilityData(result.data);
            // setLoading(false);
            return result.data
        } else {
            return null
        }
}

export const getTests = async (page, items_per_page, search) => {
    const response = await axios.post('http://localhost:4000'+'/api/dashboard/getTests', {page: page, items_per_page: items_per_page, search: search})
        if (response.status >= 200 && response.status < 300) {
            const result = response.data;
            // console.log('returning test data')
            // setFacilityData(result.data);
            // setLoading(false);
            return result.data
        } else {
            return null
        }
}

export const getData = async (page, items_per_page, search) => {
    try {
        const response = await axios.post('http://localhost:4000'+'/api/dashboard/getData', {page: page, items_per_page: items_per_page, search: search})
        if (response.status >= 200 && response.status < 300) {
            const result = response.data
            // console.log('Returning all data')
            return result.data
        } else {
            return null
        }   
    } catch (err) {
        console.error('requesting data from api')
        return null
    }
}

export const getFacility = async(id) => {
    try {
        const response = await axios.post('http://localhost:4000'+'/api/dashboard/getFacility', {id: id})
        if (response.status >= 200 && response.status < 300) {
            const result = response.data
            // console.log('Returning all data')
            return result.data
        } else {
            return null
        } 
    } catch (err) {
        console.error('requesting data from api')
        return null
    }
}

export const getTest = async(id) => {
    try {
        const response = await axios.post('http://localhost:4000'+'/api/dashboard/getTest', {id: id})
        if (response.status >= 200 && response.status < 300) {
            const result = response.data
            // console.log('Returning all data')
            return result.data
        } else {
            return null
        } 
    } catch (err) {
        console.error('requesting data from api')
        return null
    }
}