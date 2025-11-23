import axios from "axios"
const API_URL = 'https://api-v2.acubed.live/api'


export const getUser = async (id,token) => {
    try {
        const response = await axios.get(`${API_URL}/users/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'accept': '*/*'
                }
        })
        if (response.status >= 200 && response.status < 300) {
            const result = response.data.data
            console.log('getUser response: ',result)
            return result
        }
        return null
    } catch (e) {
        console.error('Error getting user profile: ', e)
        return null
    }
}

export const editProfile = async (obj,token) => {
    try {
        const response = await axios.put(`${API_URL}/users/${obj.id}`, obj, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'accept': '*/*'
                }
        })
        
        if (response.status >= 200 && response.status < 300) {
            return { success: true }
        }
        return { success: false }
    } catch (e) {
        console.error('Error editing profile: ',e)
        return { success: false}
    }
}

export const uploadProfilePicture = async (data, token) => {
    try {
        const response = await axios.put(`${API_URL}/users/${obj.id}`, obj, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'accept': '*/*'
                }
        })
        
        if (response.status >= 200 && response.status < 300) {
            return { success: true }
        }
        return { success: false }
    } catch (e) {
        console.error('Error editing profile: ',e)
        return { success: false}
    }
}

export const authenticateUser = async (obj) => {
    console.log('obj: ',obj)
    try {
        const response = await axios.post(`${API_URL}/login`, obj)
        if (response.status >= 200 && response.status < 300) {
            if (response.data?.error) {
                return { success: false}
            }
            return { success: true}
        }
        return { success: false}
    } catch (err) {
        console.log('error authenticating user: ',err)
        return { success: false}
    }
}

// export const uploadPDF = async (data) => {
//     try {
//         console.log('formData: ',data)
//         const response = await axios.post('http://localhost:4000/api/admin/uploadPDF', data, {
//         headers: {
//             "Content-Type": "multipart/form-data",
//         },})
//         if (response.status >= 200 && response.status < 300) {
//             return { success : true}
//         }
//         return { success: false}
//     } catch (err) {
//         console.log('error uploading pdf: ',err)
//         return { success: false}
//     }
// }