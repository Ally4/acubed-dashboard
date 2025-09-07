import axios from "axios";

export const fetchOrders = async (id) => {
    const response = await axios.post('http://localhost:4000/getOrders', {userId: id})

    if (response.status >= 200 && response.status < 300) {
        const orders = response.data.data;
        console.log('orders: ', orders)
        return orders
    }

}

