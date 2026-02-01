import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { allSearch } from "../../../services/dashboardService";
import Card from "../Card";
import "../../../style/newOrder.css";

const SearchModal = (props) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [pageLimit, setPageLimit] = useState(12);
    const [maxPage, setMaxPage] = useState(null);
    const [page, setPage] = useState(1)
    const navigate = useNavigate();

    const searchAll = async () => {
        try {
            const results = await allSearch(props.countryId,pageLimit,props.searchTerm,props.token)
            if (results != null) {
                console.log(`All (facility) search results for ${props.searchTerm}: `, results.data)

                setData(results.data)
                setMaxPage(results.max)
            } else {
                setData([])
                setMaxPage(1)
            }
        } catch (err) {
            console.error('Error searching tests and facilities: ',err)
            setData([])
                setMaxPage(1)
        }
    }

    const handleOverlayClick = (e) => {
        // Only close if the clicked element is the overlay itself
        if (e.target === e.currentTarget) {
            props.onClose();
        }
    };

    const navigateInfo = (id) => {
        console.log(`nav test id=${id}`);
        navigate(`/tests/${id}`);
    };

    useEffect(() => {
        if (!props.token || !props.countryId || !props.searchTerm) return;
        searchAll();
        
    }, [page, props.countryId, props.token, props.searchTerm]);

    return(<>
        <div className='overlay' onClick={handleOverlayClick}></div>
        <div className='border border-[var(--light-border-color)] bg-white rounded-md p-4 flex flex-col w-full h-screen sm:h-[80dvh] sm:w-10/12 items-center justify-center' id='new-order' onClick={(e) => e.stopPropagation()}>


            {loading ? <img src='/secondary_color_spinner.svg' className="w-28 h-28 self-center"
            alt="Loading..." /> : data?.length == 0 ? (
                <h3 className='text-gray-700 text-base md:text-lg'>No results matching {props.searchTerm}</h3>
            ) :
            (
                <div className=''>

                </div>
            )
            }

        </div>



    </>
    )
}

export default SearchModal