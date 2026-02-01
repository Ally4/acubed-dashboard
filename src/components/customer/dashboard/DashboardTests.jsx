import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getTests, testSearch } from "../../../services/dashboardService";
import Card from "../Card";
import "../../../style/Home.css";

const DashboardTests = (props) => {
  const [testData, setTestData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(12);
  const [maxPage, setMaxPage] = useState(null);
  const [searchMaxPage, setSearchMaxPage] = useState(null);
  const navigate = useNavigate();

  const fetchTests = async () => {
    setLoading(true);
    try {
      const data = await getTests(
        page,
        pageLimit,
        null,
        props.countryId,
        props.token,
      );
      if (data) {
        console.log("test data:", data.data);
        setTestData(data.data);
        setMaxPage(data.max);
      }
    } catch (err) {
      console.error("Error getting tests for dashboard");
    } finally {
      setLoading(false);
    }
  };

  const searchTests = async () => {
    setLoading(true);
    try {
      const results = await testSearch(
        props.countryId,
        pageLimit,
        props.searchTerm,
        null,
        props.token,
      );
      if (results != null) {
        console.log(
          `Test search results for ${props.searchTerm}: `,
          results.data,
        );
        setSearchData(results.data);
        setSearchMaxPage(results.max);
      } else {
        setSearchData([]);
        setSearchMaxPage(1);
      }
    } catch (err) {
      console.error("Error searching tests: ", err);
      setSearchData([]);
      setSearchMaxPage(1);
    } finally {
      setLoading(false);
    }
  };

  const navigateInfo = (id) => {
    console.log(`nav test id=${id}`);
    navigate(`/tests/${id}`);
  };

  useEffect(() => {
    if (!props.token || !props.countryId) return;
    if (props.searchTerm) {
      searchTests();
    } else {
      fetchTests();
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
                  {testData?.map((item, index) => (
                    <Card
                      key={index}
                      onClick={() => {
                        navigateInfo(item.id);
                      }}
                      name={item.name}
                      facility={item.facility?.name}
                      address={item.price}
                      type={"test"}
                      profile={item.sampleType}
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
                      facility={item.facility?.name}
                      address={item.price}
                      type={"test"}
                      profile={item.sampleType}
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

export default DashboardTests;
