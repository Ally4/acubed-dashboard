import Sidebar from './Sidebar'
import { getCartItems } from '../../services/orderService'
import OrderConfirm from '../OrderConfirm'
const OrderConfirmPage = () => {

    return(
        <section id='orders'>
             <div className='w-full md:w-11/12 lg:w-11/12 mt-16 mb-4'>
                <h2 className='text-2xl md:text-4xl font-semibold'>Order Confirmation</h2>
                <p className='text-base text-gray-500'>Confirm your order details</p>
            </div>

            <OrderConfirm getCartItems={getCartItems} />
        
        </section>
    )
}


const OrderConfirmExport = () => {
    return (
    <div style={{width: '100%', height: '100%',minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'flex-start'}}>
            <Sidebar />
            <OrderConfirmPage />
        </div>
    )
}

export default OrderConfirmExport;