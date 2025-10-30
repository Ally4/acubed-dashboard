import { responsiveFontSizes } from "@mui/material/styles";
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

export const addToCartHome = async (obj) => {
    console.log('object adding to cart: ', obj)
    try {
        const response = await axios.post('http://localhost:4000/api/order/addToCartHome', obj)
        if (response.status >= 200 && response.status < 300) {
            console.log('cart update success!')
            return { success : true, cartId: response.data.cartId }
        }
    } catch (err) {
        console.log('Error adding item to cart: ',err)
        return { success: false }
    }
}

export const addToCartFacility = async (obj) => {
    console.log('object adding to facility pickup cart')
    try {
        const response = await axios.post('http://localhost:4000/api/order/addToCartFacility', obj)
        if (response.status >= 200 && response.status < 300) {
            console.log('cart update success!')
            return { success : true, cartId: response.data.cartId }
        }
    } catch (err) {
        console.log('Error adding item to cart')
        return { success: false}
    }
}

export const incrementCartItemQuantity = async (id) => {
    try {
        const response = await axios.post('http://localhost:4000/api/order/incrementCartQty', { cart_item_id: id})
        if (response.status >= 200 && response.status < 300) {
            return { success: true}
        }
    } catch (err) {
        console.log('Error incrementing cart item qty: ',err)
        return {success: false}
    }
}

export const decrementCartItemQuantity = async (id) => {
    try {
        const response = await axios.post('http://localhost:4000/api/order/decrementCartQty', { cart_item_id: id})
        if (response.status >= 200 && response.status < 300) {
            return { success: true}
        }
    } catch (err) {
        console.log('Error decrementing cart item qty: ',err)
        return {success: false}
    }
}
 
export const getCartItems = async (userId) => {
    try {
        const response = await axios.post('http://localhost:4000/api/order/getCart', { userId: userId})
        if (response.status >= 200 && response.status < 300) {
            console.log('get cart response: ',response)
            const data = response.data.cart
            return data
        } 
        return null
    } catch (err) {
        console.log('Error in getting user cart items: ', err)
        return null
    }
}

export const removeItemFromCart = async (id) => {
    try {
        const response = await axios.post('http://localhost:4000/api/order/removeItemFromCart', { cart_item_id: id})
        if (response.status >= 200 && response.status < 300) {
            console.log('item removed successfully')
            return { success: true }
        }
    } catch (err) {
        console.log('Error removing item fromc cart: ',err)
        return { success: false}
    }
}

export const emptyCart = async (id) => {
    try {
        const response = await axios.post('http://localhost:4000/api/order/emptyCart', { userId: id})
        if (response.status >= 200 && response.status < 300) {
            console.log('cart emptied successfully')
            return { success: true}
        }
    } catch (err) {
        return { success: false}
    }
}

export const getCheckoutItems = async(ids) => {
    const response = await axios.post('http://localhost:4000/api/order/getCheckoutItems', { ids: ids })
    try {
        if (response.status >= 200 && response.status < 300) {

            return response.data
        } else {
            return null
        }
    } catch (err) {
        console.log('Error getting checkout items: ',err)
        return null
    }
}