import Sidebar from './customer/Sidebar'
import Footer from './Footer'
import DashHeader from './DashHeader'
import '../style/layout.css'
import { useState, useEffect } from 'react'
const RouteLayout = ({children}) => {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    return(
        <div className='layout'>
            <DashHeader />
            <main className='flex-1'>
                {children}
            </main>
            <Sidebar />
            <Footer />

        </div>
    )
}

export default RouteLayout