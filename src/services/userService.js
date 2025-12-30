import axios from "axios"
// import twilio from 'twilio'
// const API_URL = 'https://api-v2.acubed.live/api'
const API_URL = 'http://localhost:5000/api'
//const TWILIO_ACCOUNT_SID = process.env.REACT_APP_TWILIO_ACCOUNT_SID
//const TWILIO_AUTH_TOKEN = process.env.REACT_APP_TWILIO_TOKEN
//const twilioClient = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

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
        return { success: false, error: err.response.data.errors}
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
//TWILIO

// export const twilioSendToken = async (formData) => {
//     console.log('number received: ', formData.phonenumber)
//     try {
//         const verification = await twilioClient.verify.v2.services("")
//         .verifications.create({
//             channel: "sms",
//             to: formData.phonenumber,
//         })

//         console.log('twilio verification status: ', verification.status)

//     } catch (err) {
//         console.error('Error sending twilio token: ',err)
//         return { success: false, error: err.message }
//     }
// }

// export const twilioVerifyToken = async (token) => {
//     try {

//     } catch (err) {
//         console.error('Error verifying twilio token: ',err)
//         return { success: false, error: err.message }
//     }
//}

export const twilioPhoneRegister = async (phonenumber, countryId) => {
    try {   
        const response = await axios.post(`${API_URL}/auth/phone-register-otp`, {countryId: countryId, phoneNumber: phonenumber})
        if (response.status >= 200 && response.status < 300) {
            console.log('sent twilio verification code response: ',response)
            return {success: true}
        } else {
            return { success: false}
        }
    } catch (err) {
        console.error('Error sending twilio verification token: ',err)
        return { success: false }
    }
}

export const twilioVerifyPhoneRegister = async (obj) => {
    try {
        const response = await axios.post(`${API_URL}/auth/verify-phone-register-oty`, obj)
        if (response.status >= 200 && response.status < 300) {
            console.log('verifying phone number signup response: ', response)
            return { success: true}
        }
        return { success: false}
    } catch (err) {
        console.error('Error verifying phone number signup: ',err)
        return { success: false}
    }
}

export const addNewChronicCondition = async (obj,token) => {
    try {
        const response = await axios.post(`${API_URL}/users/add-chronic-condition`, obj, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'accept': '*/*'
                }
        })
        console.log('add new chronic condition response: ',response)
        if (response.status >= 200 && response.status < 300) {
            const updatedConditions = response.data
            updatedConditions.forEach((item) => {
                if (item.condition?.toLowerCase() == obj.condition?.toLowerCase()) {
                    return { success: true, data: updatedConditions}
                }
            })
            return { success: false, error: 'This condition already exist'}
        } else {
            return { success: false}
        }
    } catch (err) {
        console.error('Error adding a new chronic condition: ',err)
        return { success: false }
    }
}

export const deleteChronicCondition = async (obj,token) => {
    try {
        const response = await axios.post(`${API_URL}/users/remove-chronic-condition`, obj, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'accept': '*/*'
                }
        }) 
        console.log('Deleting chronic condition response: ', response)
        if (response.status >= 200 && response.status < 300) {
            const updatedConditions = response.data
            updatedConditions.forEach((item) => {
                if (item.condition?.toLowerCase() == obj.condition?.toLowerCase()) {
                    return { success: false}
                }
            })
            return { success: true, data: updatedConditions }
        } else {
            return { success: false}
        }
    } catch (err) {
        console.error('Error deleting a chronic condition: ',err)
        return { success: false}
    }
}