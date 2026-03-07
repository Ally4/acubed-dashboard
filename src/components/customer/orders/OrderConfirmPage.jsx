// import Sidebar from '../Sidebar'
import { getCartItems, createOrder } from '../../../services/orderService'
import { initPawapayDeposit } from '../../../services/paymentService'
import OrderConfirm from '../../OrderConfirm'
const OrderConfirmPage = () => {

    return(
        <section id='orders'>
             <div className='my-4 lg:mb-12 w-11/12 md:w-10/12'>
                <h2 className='text-2xl lg:text-4xl font-semibold'>Order Confirmation</h2>
                <p className='text-sm lg:text-base text-gray-500'>Confirm your order details</p>
            </div>

            <OrderConfirm getCartItems={getCartItems} checkout={initPawapayDeposit} createOrder={createOrder}/>
        
        </section>
    )
}


export default OrderConfirmPage;