import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import OnePage from "./onePage";
import Pagination from "./Pagination";
import FilterComponent from "./FilterComponent";
import { getGroupedPageData } from "./utils/countOccurences";
import _ from "lodash";
import { useSearchParams } from "react-router-dom";
import { CUSTOMERS_PER_PAGE } from "./constants/constants";

function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [state, setState] = useState({
    currentPage: 1,
    data: [],
    filteredData: [],
    filter: searchParams.get("filter") ? searchParams.get("filter") : "",
    isLoading: false,
  });
  const onPageChange = (pageNumber) => {
    setState({
      ...state,
      currentPage: pageNumber,
    });
  };

  const onFilterClick = (currentFilter) => {
    const filteredData = _.filter(applicationData, (x) =>
      x.psc.startsWith(currentFilter)
    );
    setState({
      ...state,
      filteredData: filteredData,
      filter: currentFilter,
      currentPage: 1,
    });
    setSearchParams({ filter: currentFilter });
  };
  //for pagination
  const lastIndex = state.currentPage * CUSTOMERS_PER_PAGE;
  const firstIndex =
    state.currentPage * CUSTOMERS_PER_PAGE - CUSTOMERS_PER_PAGE;
  //data for customers on one page removed whitespaces from PSC
  const applicationData = state.filter ? state.filteredData : state.data;
  const totalPages = Math.ceil(applicationData.length / CUSTOMERS_PER_PAGE);
  const currentPageCustomers = applicationData.slice(firstIndex, lastIndex);

  const groupedPageData = getGroupedPageData(
    currentPageCustomers,
    state.filter.length + 1
  );
  const filters = _.flatten(groupedPageData.map((item) => item[0]));
  const pageContent = _.flattenDeep(groupedPageData.map((item) => item[1]));

  useEffect(() => {
    setState({ ...state, isLoading: true });
    axios
      .get("https://demo.flexibee.eu/v2/c/demo/adresar.json?limit=0")
      .then((response) => {
        // filter out items without PSC
        const data = response.data.winstrom.adresar
          .filter((item) => item.psc !== "")
          .map((customer) => {
            return { ...customer, psc: customer.psc.replace(/\s/g, "") };
          });

        setState({
          ...state,
          data: data,
          filteredData: state.filter
            ? data.filter((x) => x.psc.startsWith(state.filter))
            : [],
          isLoading: false,
        });
      });
  }, []);

  return state.isLoading ? (
    <div>Loading</div>
  ) : (
    <>
      <div className="data-container">
        <FilterComponent data={filters} onFilterClick={onFilterClick} />
        <OnePage data={pageContent} />
      </div>
      <Pagination
        currentPage={state.currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </>
  );
}
export default App;
