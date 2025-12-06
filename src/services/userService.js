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
        const response = await axios.put(`${API_URL}/users/${obj?.id}`, obj, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'accept': '*/*'
                }
        })
        
        if (response.status >= 200 && response.status < 300) {
            console.log('editProfile response: ',response)
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
        const response = await axios.put(`${API_URL}/users/profile`, data, {
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
        const response = await axios.post(`${API_URL}/auth/login`, obj)
        if (response.status >= 200 && response.status < 300) {
            console.log('login response: ', response)
            if (response.data?.error) {
                return null
            }
            return response.data.data
        }
        return null
    } catch (err) {
        console.log('error authenticating user: ',err)
        return null
    }
}

export const registerUser = async (obj) => {
    try {
        const response = await axios.post(`${API_URL}/auth/register`, obj)
        if (response.status >= 200 && response.status < 300) {
            console.log('signup response: ', response.data)
            if (response.data.error) {
                return { success: false}
            } 
            return { success: true}
        }
    } catch (err) {
        console.log('error on signup: ',err)
        return { success: false}
    }
}

export const forgotPassword = async (obj) => {
    try {
        const response = await axios.post(`${API_URL}/auth/forgot-password`, obj)
        if (response.status >= 200 && response.status < 300) {
            console.log('forgot password response: ', response)
            if (response.data.error) {
                return { success: false}
            }
            return { success: true}
        }
        return { success: false}
    } catch (err) {
        console.error('Error initializing reset password: ',err)
        return { success: false}
    }
}

export const resetPassword = async (obj) => {
    try {
        const response = await axios.post(`${API_URL}/auth/reset-password`, obj)
        if (response.status >= 200 && response.status < 300) {
            console.log('reset password response: ',response)
            if (response.data.error) {
                return { success: false}
            }
            return { success: true}
        }
        return { success: false}
    } catch (err) {
        console.error('Error resetting password: ',err)
        return { success: false}
    }
}

export const verifyOTP = async (obj) => {
    try {
        const response = await axios.post(`${API_URL}/auth/verify-otp`, obj)
        if (response.status >= 200 && response.status < 300) {
            console.log('verify otp response: ',response)
            if  (response.data.error) {
                return { success: false}
            }
            return { success: true}
        }
        return { success: false}
    } catch (err) {
        console.error("Error validating OTP: ",err)
        return { success: false}
    }
}
