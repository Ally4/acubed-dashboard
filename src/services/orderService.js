import axios from "axios";

export const fetchOrders = async (id) => {
    try {
        const response = await axios.post('http://localhost:4000/getOrders', {userId: id})

        if (response.status >= 200 && response.status < 300) {
            const orders = response.data.data;
            console.log('orders: ', orders)
            return orders
        }
    } catch (e) {
        console.error('Error fetching orders: ',e)
        return null
    }

}

export const SearchOrder = async (term,id) => {
    try {
        const response = await axios.post('http://localhost:4000/searchOrder', {userId: id, term: term})

        if (response.status >= 200 && response.status < 300) {
            const filteredOrders = response.data;
            console.log('filtered orders: ', filteredOrders)
            return filteredOrders.data
        }
    } catch (e) {
        console.log('Error searching for order: ',e)
        return null
    }
}
 
