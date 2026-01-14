import { responsiveFontSizes } from "@mui/material/styles";
import axios from "axios";
import { deliveryFee, getGeoCoords } from "./GeoLocationService";

import { API_URL } from '../../config'
// const API_URL = 'http://localhost:5000/api'

export const fetchOrders = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/orders/user/all`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'accept': '*/*'
                }
        })
        console.log('response from fetchOrders: ',response)
        if (response.status >= 200 && response.status < 300) {
            const orders = response.data.data.orders;
            return orders
        }
        return null
    } catch (e) {
        console.error('Error fetching orders: ',e)
        return null
    }

}

export const fetchOrderFromID = async (id,token) => {
    try {
        console.log('fetching orders from id: ',id)
        const response = await axios.get(`${API_URL}/orders/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'accept': '*/*'
                }
        })
        console.log('response from fetchOrderFromID: ',response)
        if (response.status >= 200 && response.status < 300) {
            const orderData = response.data.data;
            return orderData
        } 
        return null
    } catch (e) {
        console.error('Error fetching order from ID: ',e)
        return null
    }
}

export const SearchOrder = async (term,id,token) => {
    try {
        const response = await axios.post(`${API_URL}/orders/search`, { searchTerm: term, userId: id}, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'accept': '*/*'
                }
        })
        console.log('response from search order; ', response)
        if (response.status >= 200 && response.status < 300) {
            const filteredOrders = response.data.data.orders;
            const filteredIds = filteredOrders.map((item) => item.id)
            return filteredIds
        }
        return null
    } catch (e) {
        console.log('Error searching for order: ',e)
        return null
    }
}

export const createOrder = async (ids, paymentType, tax, token) => {
    try {
        console.log('cart ids received: ', ids)
        const response = await axios.post(`${API_URL}/orders/from-cart`, { cart_item_ids: ids, paymentType: paymentType, tax: tax}, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'accept': '*/*'
                }
        })
        if (response.status >= 200 && response.status < 300) {
            console.log('create order response: ',response)
            return { success: response.data.success }
        } 
        return { success: false}
    } catch (e) {
        console.error('Error creating order: ',e)
        return { success: false}
    }
}

export const initPawapay = async (obj,token) => {
    try {
        const response = await axios.post(`${API_URL}/payments/deposit`, obj, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'accept': '*/*'
                }
        })
        if (response.status >= 200 && response.status < 300) {
            if (!response.success) {
                return { success: false}
            } else {

            }
        }
        return { success: false}
    } catch (err) {
        console.error('Error with pawapay: ',err)
        return { success: false}
    }
}
//CART

// export const addToCartHome = async (obj) => {
//     console.log('object adding to cart: ', obj)
//     try {
//         const response = await axios.post('http://localhost:4000/api/order/addToCartHome', obj)
//         if (response.status >= 200 && response.status < 300) {
//             console.log('cart update success!')
//             return { success : true, cartId: response.data.cartId }
//         }
//     } catch (err) {
//         console.log('Error adding item to cart: ',err)
//         return { success: false }
//     }
// }

// export const addToCartFacility = async (obj) => {
//     console.log('object adding to facility pickup cart')
//     try {
//         const response = await axios.post('http://localhost:4000/api/order/addToCartFacility', obj)
//         if (response.status >= 200 && response.status < 300) {
//             console.log('cart update success!')
//             return { success : true, cartId: response.data.cartId }
//         }
//     } catch (err) {
//         console.log('Error adding item to cart')
//         return { success: false}
//     }
// }

export const addToCart = async (obj,token) => {
    try {
        const response = await axios.post(`${API_URL}/cart`, obj, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'accept': '*/*'
                }
        })
        if (response.status >= 200 && response.status < 300) {
            console.log(response.message)
            console.log('item added to cart: ',response.data)
            return { success: true, cartId: response.data.cartId }
        }
        return { success: false}
    } catch (err) {
        console.error('Error adding item to cart: ',err)
        return { success: false}
    }
}

// export const incrementCartItemQuantity = async (id) => {
//     try {
//         const response = await axios.post('http://localhost:4000/api/order/incrementCartQty', { cart_item_id: id})
//         if (response.status >= 200 && response.status < 300) {
//             return { success: true}
//         }
//     } catch (err) {
//         console.log('Error incrementing cart item qty: ',err)
//         return {success: false}
//     }
// }

// export const decrementCartItemQuantity = async (id) => {
//     try {
//         const response = await axios.post('http://localhost:4000/api/order/decrementCartQty', { cart_item_id: id})
//         if (response.status >= 200 && response.status < 300) {
//             return { success: true}
//         }
//     } catch (err) {
//         console.log('Error decrementing cart item qty: ',err)
//         return {success: false}
//     }
// }

export const updateCartItemQty = async (token,id,qty) => {
    try {
        const response = await axios.patch(`${API_URL}/cart/${id}`, {qty: qty}, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'accept': '*/*'
                }
        })
        if (response.status >= 200 && response.status < 300) {
            console.log('Update cart qty response: ',response)
            return { success: true}
        }
        return { success: false}
    } catch (err) {
        console.error('Error updating cart item qty: ',err)
        return { success: false}
    }
}
 
export const getCartItems = async (token) => {
    console.log('getting cart items')
    try {
        const response = await axios.get(`${API_URL}/cart`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'accept': '*/*'
                }
        })
        if (response.status >= 200 && response.status < 300) {
            console.log('get cart response: ',response)
            const data = response.data.data.cartItems
            return data
        } 
        return null
    } catch (err) {
        console.log('Error in getting user cart items: ', err)
        return null
    }
}

export const removeItemFromCart = async (id,token) => {
    try {
        const response = await axios.delete(`${API_URL}/cart/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'accept': '*/*'
                }
        })
        if (response.status >= 200 && response.status < 300) {
            console.log('item removed successfully')
            return { success: true }
        }
        return { success: false}
    } catch (err) {
        console.log('Error removing item fromc cart: ',err)
        return { success: false}
    }
}

export const emptyCart = async (token) => {
    try {
        const response = await axios.delete(`${API_URL}/cart`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'accept': '*/*'
                }
        })
        if (response.status >= 200 && response.status < 300) {
            console.log('cart emptied successfully')
            return { success: true}
        }
        return { success: false}
    } catch (err) {
        return { success: false}
    }
}

export const getDeliveryFee = async (collectionAddress,facilityCoords) => {
    try {
        const collectionCoords = await getGeoCoords(collectionAddress)
        if (collectionCoords) {
            const delivery_fee = deliveryFee(collectionCoords,facilityCoords)
            if (delivery_fee) {
                console.log('successfully calculated delivery fee')
                return { success: true, deliveryFee: delivery_fee}
            }
            return { success: false, message: ""}
        }
        return { success: false, message: ""}
    } catch (err) {
        console.error('Error getting delivery fee: ',err)
        return { success: false}
    }
}


//Checkout

export const emptySpecificCartItems = async (ids) => {
    try {
        const response = await axios.post('http://localhost:4000/api/order/emptySpecificCartItems', { ids: ids})
        if (response.status >= 200 && response.status < 300) {
            console.log('cart emptied successfully')
            return { success: true}
        }
    } catch (err) {
        return { success: false}
    }
}

export const getCheckoutItems = async(ids) => {
    try {
        const response = await axios.post('http://localhost:4000/api/order/getCheckoutItems', { ids: ids })
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

export const getNewOrders = async(id) => {
    try {
        const response = await axios.post('http://localhost:4000/api/order/getNewOrders', {id: id})
        if (response.status >= 200 && response.status < 300) {
            return response.data
        } 
    } catch (err) {
        return []
    }
    
}