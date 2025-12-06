import { responsiveFontSizes } from "@mui/material/styles";
import axios from "axios";
import { deliveryFee, getGeoCoords } from "./GeoLocationService";

const API_URL = 'https://api-v2.acubed.live/api'

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

export const createOrder = async (ids, userId, paymentType, paymentInfo) => {
    try {
        console.log('cart ids received: ', ids)
        const response = await axios.post('http://localhost:4000/api/order/createOrder', { cartIds: ids, userId: userId, paymentType: paymentType, paymentInfo: paymentInfo ? paymentInfo : null})
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