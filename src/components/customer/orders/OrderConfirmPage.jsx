// import Sidebar from '../Sidebar'
import { getCartItems, createOrder, initPawapay } from '../../../services/orderService'
import OrderConfirm from '../../OrderConfirm'
const OrderConfirmPage = () => {

    return(
        <section id='orders'>
             <div className='w-full md:w-11/12 lg:w-11/12 mt-16 mb-4'>
                <h2 className='text-2xl lg:text-4xl font-semibold'>Order Confirmation</h2>
                <p className='text-sm lg:text-base text-gray-500'>Confirm your order details</p>
            </div>

            <OrderConfirm getCartItems={getCartItems} checkout={initPawapay} createOrder={createOrder}/>
        
        </section>
    )
}


export default OrderConfirmPage;