import Footer from './Footer'
import '../style/layoutOpen.css'
const RouteLayoutOpen = ({children}) => {
    return(
        <div className='layoutOpen'>
            {children}
            <Footer />

        </div>
    )
}

export default RouteLayoutOpen