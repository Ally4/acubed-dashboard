import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getFacilities, facilitySearch } from "../../../services/dashboardService";
import Card from "../Card";
import "../../../style/Home.css";

const DashboardFacilities = (props) => {
  const [facilityData, setFacilityData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(null);
  const [searchMaxPage, setSearchMaxPage] = useState(null);
  const [pageLimit, setPageLimit] = useState(12);
  const navigate = useNavigate();

  const fetchFacilities = async () => {
    setLoading(true);
    try {
      const data = await getFacilities(
        page,
        pageLimit,
        null,
        props.countryId,
        props.token,
      );
      console.log("facility data:", data);
      if (data) {
        setFacilityData(data.data);
        setMaxPage(data.max);
      }
    } catch (err) {
      console.error("Error getting tests for dashboard");
    } finally {
      setLoading(false);
    }
  };

  const searchFacilities = async () => {
    setLoading(true);
    try {
      const results = await facilitySearch(
        props.countryId,
        pageLimit,
        props.searchTerm,
        props.token,
      );
      if (results != null) {
        console.log(
          `Faciliy search results for ${props.searchTerm}: `,
          results.data,
        );

        setSearchData(results.data);
        setSearchMaxPage(results.max);
      } else {
        setSearchData([]);
        setSearchMaxPage(1);
      }
    } catch (err) {
      console.error("Error searching facilities: ", err);
      setSearchData([]);
      setSearchMaxPage(1);
    } finally {
      setLoading(false);
    }
  };

  const navigateInfo = (id) => {
    console.log(`nav facility id=${id}`);
    navigate(`/facility/${id}`);
  };

  useEffect(() => {
    console.log('facility search term:', props.searchTerm)
    if (!props.token || !props.countryId) return;
    if (props.searchTerm) {
        console.log('Search term submitted for facility')
      searchFacilities();
    } else {
      fetchFacilities();
    }
  }, [page, props.countryId, props.token, props.searchTerm]);

  return (
    <div className="w-full p-2 flex items-center justify-center h-auto">
      {loading ? (
        <>
          <img
            src="/secondary_color_spinner.svg"
            className="w-28 h-28 self-center"
            alt="Loading..."
          />
        </>
      ) : (
        <>
          {!props.searchTerm ? (
            <div className="data-container">
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
              <div className="w-11/12 flex items-center justify-center">
                <div className="viewable-data">
                  {facilityData?.map((item, index) => (
                    <Card
                      key={index}
                      onClick={() => {
                        navigateInfo(item.id);
                      }}
                      name={item.name}
                      address={item.address}
                      type={"facility"}
                    />
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="data-container">
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
                  disabled={page === searchMaxPage}
                >
                  Next
                </button>
              </div>
              <div className="w-11/12 flex items-center justify-center">
                <div className="viewable-data">
                  {searchData?.map((item, index) => (
                    <Card
                      key={index}
                      onClick={() => {
                        navigateInfo(item.id);
                      }}
                      name={item.name}
                      address={item.address}
                      type={"facility"}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DashboardFacilities;
