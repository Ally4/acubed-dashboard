import axios from "axios";

export const fetchOrders = async (id) => {
    try {
        const response = await axios.post('http://localhost:4000/api/order/getOrders', {userId: id})

        if (response.status >= 200 && response.status < 300) {
            const orders = response.data.data;
            return orders
        }
    } catch (e) {
        console.error('Error fetching orders: ',e)
        return null
    }

}

export const fetchOrderFromID = async (id) => {
    try {
        const response = await axios.post('http://localhost:4000/api/order/getOrderFromID', {orderId: id})
        if (response.status >= 200 && response.status < 300) {
            const orderData = response.data.data;
            return orderData
        }
    } catch (e) {
        console.error('Error fetching order from ID: ',e)
        return null
    }
}

export const SearchOrder = async (term,id) => {
    try {
        const response = await axios.post('http://localhost:4000/api/order/searchOrder', {userId: id, term: term})

        if (response.status >= 200 && response.status < 300) {
            const filteredOrders = response.data;
            return filteredOrders.data
        }
    } catch (e) {
        console.log('Error searching for order: ',e)
        return null
    }
}

export const createOrder = async (obj) => {
    try {
        const response = await axios.post('http://localhost:4000/api/order/createOrder', obj)
        if (response.status >= 200 && response.status < 300) {
            return { success: true }
        } 
        return { success: false}
    } catch (e) {
        console.error('Error creating order: ',e)
        return { success: false}
    }
}
 
