import { useEffect, useState } from 'react'
import { useNavigate, Link, useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
// import Sidebar from './Sidebar'
import '../../style/infoPage.css'
import { getTest } from '../../services/dashboardService';
import { iconAssigner } from '../../utils/imageUtils';
import OrderModal from './orders/newOrder'
import Card from './Card'

const TestCustomerPage = () => {
    const navigate = useNavigate()
    const user = useSelector((state) => state.login.data);
    const token = user ? user.token : null
    const userId = user ? user.id : null
    const { id } = useParams();
    const [loading, setLoading] = useState(false)
    const [testData, setTestData] = useState(null)
    const [testId, setTestId] = useState(null)
    const [modalOpen, setModalOpen] = useState(false)

    const getInfo = async () => {
        setLoading(true)
        try {
            const result = await getTest(id,token)
            if (result) {
                console.log('test info: ', result)
                setTestData(result);
            }
        } catch (e) {
            console.error('Error in fetching test info', e)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
            getInfo()
        },[token])

    return(
        <section className='page min-h-screen'>
            <div className='w-11/12 lg:w-10/12 mt-16 mb-4 flex flex-col gap-6'>
                <div className='w-full'>
                    <h2 className='text-2xl lg:text-4xl font-semibold'>Lab Test</h2>
                    <p className='text-base text-gray-500'>You can perform your test in any of the following facilities</p>
                </div>
                {loading || testData == null ? (<img src='/secondary_color_spinner.svg' className='h-28 w-18 self-center' alt="Loading..." />) : (
                    <>
                    <div className='w-full flex items-center justify-start gap-4 h-auto'>
                        <div className='h-24 w-24 md:h-32 md:w-32 rounded-md border bg-[#0d5d73] bg-opacity-15 flex items-center justify-center'>
                            {iconAssigner(testData?.sampleType,70,"test")}
                        </div>
                        <div className='flex flex-col'>
                            <h2 className='text-lg lg:text-xl xl:text-2xl font-medium'>{testData?.name}</h2>
                            <p className='text-sm md:text-base xl:text-lg'>{testData?.price} {testData?.currency}</p>
                            <p className='text-sm md:text-lg xl:text-lg'><span>Approximate Wait: </span>{testData?.turnaroundTime}</p>
                        </div>
                    </div>
                    <div className="btn-container">
                        <button onClick={()=>navigate(-1)} className="back-btn text-[#0d5d73] bg-[#cadeef] hover:bg-[#bdd5eb]">Back</button>
                    </div>
            
                    <div className="w-w-full h-auto">
                        <div className='viewable-data'>
                            <Card name={testData?.facility.name} address={testData?.facility.city} type={"facility"} onClick={()=>{
                                    setTestId(testData?.id)
                                    setModalOpen(!modalOpen)}} />                           
                        </div>        
                    </div>
                    </>
                )}
            </div>
                
                {testId != null && userId != null && <OrderModal open={modalOpen} userId={userId} sampleType={testData?.sampleType} onClose={() => {
                    setModalOpen(false)}} testId={testId} />}
        </section>
    )
}

export default TestCustomerPage