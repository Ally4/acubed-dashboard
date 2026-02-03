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
            const results = await allSearch(props.countryId,pageLimit,page,props.searchTerm,props.token)
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

    const navigateInfoTest = (id) => {
        console.log(`nav test id=${id}`);
        navigate(`/tests/${id}`);
    };

    const navigateInfoFacility = (id) => {
        console.log(`nav facility id=${id}`);
        navigate(`/facility/${id}`);
    }

    useEffect(() => {
        if (!props.token || !props.countryId || !props.searchTerm) return;
        searchAll();
        
    }, [page, props.countryId, props.token, props.searchTerm]);

    return(<>
        <div className='overlay' onClick={handleOverlayClick}></div>
        <div className='border border-[var(--light-border-color)] bg-white rounded-md sm:px-4 pt-8 pb-4 flex flex-col w-full h-[100dvh] sm:h-[80dvh] sm:w-10/12 items-center justify-start relative' id='new-order' onClick={(e) => e.stopPropagation()}>
            <p className='h-9 w-9 absolute top-3 right-5 flex items-center justify-center rounded-md bg-[#a3b1c0] text-white cursor-pointer' onClick={props.onClose}>✖</p>

            {loading ? <img src='/secondary_color_spinner.svg' className="w-28 h-28 self-center"
            alt="Loading..." /> : data?.length == 0 ? (
                <h3 className='text-gray-700 text-base md:text-lg'>No results matching {props.searchTerm}</h3>
            ) :
            (
                <div className="data-container">
                    <h3 className='text-gray-600 font-medium text-base md:text-lg 2xl:text-xl'>Search results for "{props.searchTerm}"</h3>
                    <div className="pagination">
                        <button
                        className="text-sm md:text-base text-[#1c7d7f] bg-[#cadeef] hover:bg-[#bdd5eb] rounded-lg px-3 py-1"
                        onClick={() => setPage(page - 1)}
                        disabled={page === 1}
                        >
                        Previous
                        </button>
                        <button
                        className="text-sm md:text-base text-[#1c7d7f] bg-[#cadeef] hover:bg-[#bdd5eb] rounded-lg px-3 py-1"
                        onClick={() => setPage(page + 1)}
                        disabled={page === maxPage}
                        >
                        Next
                        </button>
                    </div>
                    <div className="w-11/12 flex items-start justify-center overflow-y-auto h-[80dvh] sm:h-[60dvh]">
                        <div className="viewable-data">
                        {data?.map((item, index) => { 
                            if (item.type == "facility"){
                                return (
                                    <Card
                                    key={index}
                                    onClick={() => {
                                        navigateInfoFacility(item.id);
                                    }}
                                    name={item.name}
                                    address={item.address}
                                    type={"facility"}
                                    />
                                )
                            } else {
                                return (
                                    <Card
                                    key={index}
                                    onClick={() => {
                                        navigateInfoTest(item.id);
                                    }}
                                    name={item.name}
                                    facility={item.facility?.name}
                                    address={item.price}
                                    type={"test"}
                                    profile={item.sampleType}
                                    />
                                )
                            }
                            
                    
                        })}
                        </div>
                    </div>
                </div>
            )
            }

        </div>



    </>
    )
}

export default SearchModal