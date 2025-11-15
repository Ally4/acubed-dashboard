import axios from "axios"


export const getUser = async (id) => {
    try {
        const response = await axios.post('http://localhost:4000/api/account/user', { id: id})
        if (response.status >= 200 && response.status < 300) {
            const result = response.data
            return result
        }
        return null
    } catch (e) {
        console.error('Error getting user profile: ', e)
        return null
    }
}

export const editProfile = async (obj) => {
    try {
        const response = await axios.post('http://localhost:4000/api/account/edit', obj)
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
        const response = await axios.post('http://localhost:4000/api/auth/login', obj)
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