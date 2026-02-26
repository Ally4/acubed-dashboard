import { useState, useEffect } from "react";
// import Sidebar  from './Sidebar'
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Card from "./Card";
// import { iconAssigner } from '../../utils/imageUtils';
import {
  getFacilitiesByTest,
  facilityTestSearch,
} from "../../services/dashboardService";
import "../../style/Home.css";
import { IoSearch } from "react-icons/io5";
import OrderModal from "./orders/newOrder";

const TestView = () => {
  const navigate = useNavigate();
  const { test, sampleType, testId } = useParams();
  const user = useSelector((state) => state.login.data);
  console.log("user: ", user);
  const countryId = user ? user.countryId : null;
  const userId = user ? user.id : null;
  const token = user ? user.token : null;
  const geoLocation = user ? user.geoLocation : null;
  const [facilityData, setFacilityData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(null);
  const [searchMaxPage, setSearchMaxPage] = useState(null);
  const [pageLimit, setPageLimit] = useState(12);

  const navigateInfo = (id, type) => {
    if (type == "F") {
      console.log(`nav facility id=${id}`);
      navigate(`/facility/${id}`);
    } else {
      console.log(`nav test id=${id}`);
      navigate(`/tests/${id}`);
    }
  };

  const fetchFacilitiesByTest = async () => {
    console.log("fetch test: ", test);
    setLoading(true);
    try {
      const result = await getFacilitiesByTest(
        countryId,
        token,
        test,
        page,
        pageLimit,
        geoLocation,
      );
      setFacilityData(result.data);
      setMaxPage(result.max);
    } catch (err) {
      console.error("Error fetching test from the sample type: ", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchInputPress = async (e) => {
    if (e.key == "Enter") {
      await Search(searchTerm);
    }
  };

  const Search = async () => {
    setLoading(true);
    try {
      const result = await facilityTestSearch(
        countryId,
        searchTerm,
        test,
        token,
        page,
        pageLimit,
        geoLocation,
      );
      if (result) {
        setSearchData(result.data);
        setMaxPage(result.max);
      } else {
        setSearchData([]);
        setSearchMaxPage(1);
      }
    } catch (err) {
      console.error("TestView search error: ", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token || !test || !countryId || !geoLocation) return;
    if (searchTerm) {
        console.log('facility search term:', searchTerm)
        Search();
    } else {
        fetchFacilitiesByTest();
    }
  }, [test, token, geoLocation]);

  return (
    <section id="dashboard">
      {testId != null && userId != null && (
        <OrderModal
          open={modalOpen}
          userId={userId}
          sampleType={sampleType}
          onClose={() => {
            setModalOpen(false);
          }}
          testId={testId}
        />
      )}
      <div className="w-11/12 lg:w-10/12 mt-4 mb-4 flex flex-col gap-6">
        <div className="w-full">
          <h2 className="text-2xl lg:text-4xl font-semibold mt-1">
            Available Facilities for {test} diagnoses
          </h2>
          <p className="text-sm xl:text-base text-gray-500">
            Browse available facilities for the test
          </p>
        </div>
        <div className="btn-container">
          <Link to="/dashboard/All" style={{ textDecoration: "none" }}>
            <button className="back-btn text-[#0d5d73] bg-[#cadeef] hover:bg-[#bdd5eb]">
              Back
            </button>
          </Link>
        </div>

        <div className="w-full flex items-center justify-center gap-4 px-4 py-4 mb-6 bg-white border border-[#e5e7eb] shadow-md rounded-[12px]">
          {/* <h3 className="text-[#0d5d73] text-sm md:text-2xl">3 Orders this month</h3> */}

          <div className="w-full flex items-center rounded-2xl px-5 py-2 bg-[#ebeff3] border border-[#0d5d73] shadow-sm">
            <input
              className="w-full text-[#0d5d73] bg-[#ebeff3] text-base md:text-lg p-0 m-0 focus:outline-none placeholder:text-[#0d5d73]"
              value={searchTerm}
              type="text"
              placeholder="Search..."
              onChange={handleSearch}
              onKeyDown={handleSearchInputPress}
            />
            <div className="icon">
              <IoSearch
                size={28}
                color="#0d5d73"
                onClick={() => Search(searchTerm)}
              />
            </div>
            <p
              onClick={() => {
                setSearchTerm("");
                fetchFacilitiesByTest();
              }}
              className="text-base md:text-lg ml-3 text-[#0d5d73] cursor-pointer"
            >
              Clear
            </p>
          </div>

          {/* <button className="rounded-lg px-3 py-2 text-base md:text-xl font-medium text-white bg-[#0d5d73] hover:bg-[#094f62]">Export History</button> */}
        </div>

        {loading ? (
          <img
            src="/secondary_color_spinner.svg"
            className="h-28 w-18 self-center"
            alt="Loading..."
          />
        ) : facilityData != null && facilityData.length > 0 ? (
          <>
            {!searchTerm ? (
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
                <div className="w-full flex flex-col items-center justify-center">
                  <div className="viewable-data">
                    {facilityData?.map((item, index) => {
                      console.log("item: ", item);
                      return (
                        <Card
                          key={index}
                          onClick={() => setModalOpen(true)}
                          name={
                            item?.facility?.name
                              ? item.facility.name
                              : item.name
                          }
                          address={
                            item?.facility?.address
                              ? item.facility.address
                              : item.address
                          }
                          type={"facility"}
                        />
                      );
                    })}
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
                <div className="w-full flex flex-col items-center justify-center">
                  <div className="viewable-data">
                    {searchData?.map((item, index) => {
                      console.log("item: ", item);
                      return (
                        <Card
                          key={index}
                          onClick={() => setModalOpen(true)}
                          name={
                            item?.facility?.name
                              ? item.facility.name
                              : item.name
                          }
                          address={
                            item?.facility?.address
                              ? item.facility.address
                              : item.address
                          }
                          type={"facility"}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="w-full flex items-center justify-center">
            <h3 className="font-medium text-[var(--secondary-color)] text-xl lg:text-2xl 2xl:text-3xl mt-12">
              Could not find facilities carrying this test available in your
              country.
            </h3>
          </div>
        )}
      </div>
    </section>
  );
};

export default TestView;
