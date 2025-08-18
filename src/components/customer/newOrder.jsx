import React, { useState, useEffect } from 'react'
import '../../style/newOrder.css'
import axios from 'axios';

const NewOrder = (props) => {
    const [testData, setTestData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        customerName: '',
        customerEmail: '',
        testName: '',
        testPrice: '',
        date: '',
    })


    const getTestInfo = async (id) => {
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:4000/getTest', {id:id})

            if (response.status >= 200 && response.status < 300) {
                console.log('test data:', response.data)
                setTestData(response.data);
            }
        } catch (e) {
            console.error('Error fetching test info:', e)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getTestInfo(props.testId)
    },[])

    if (!props.open || props.testId == null) {
        return null
    } else {
        return (
            <>
            <div className='overlay'></div>
            <section onClick={(e) => e.stopPropagation()}  id="new-order">
                <div className='top-container'>
                    <button onClick={props.onClose} className='cancel-btn'>
                        Cancel
                    </button>
                    <button className='confirm-btn'>
                        Confirm
                    </button>
                </div>
                {loading? (<div>
                        Loading...
                    </div>) :
                    (<div>
                        <h3 className='title'>New Order</h3>
                        {testData? 
                        (<div>





                        </div>) 
                        : 
                        (<div>Error fetching test data</div>)}
                    </div>)}
            </section>
            </>
        )
    }
}


export default NewOrder