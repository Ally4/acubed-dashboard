import axios from "axios";

export const fetchOrders = async (id) => {
    try {
        const response = await axios.post('http://localhost:4000/getOrders', {userId: id})

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
        const response = await axios.post('http://localhost:4000/getOrderFromID', {orderId: id})
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
        const response = await axios.post('http://localhost:4000/searchOrder', {userId: id, term: term})

        if (response.status >= 200 && response.status < 300) {
            const filteredOrders = response.data;
            return filteredOrders.data
        }
    } catch (e) {
        console.log('Error searching for order: ',e)
        return null
    }
}
 
