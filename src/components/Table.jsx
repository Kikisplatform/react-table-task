import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setFilteredData } from "../store/tableSlice";
import * as XLSX from "xlsx";

const Table = () => {
  const dispatch = useDispatch();
  const tableData = useSelector((state) => state.table.filteredData);
  const [sortOrder, setSortOrder] = useState("asc");
  const [filterText, setFilterText] = useState(""); // State for the global filter
  const [sortBy, setSortBy] = useState("name"); // State for sorting column
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const itemsPerPage = 10; // Number of items per page

  useEffect(() => {
    dispatch(
      setFilteredData([
        { id: 1, name: "Alice", age: 25, country: "USA" },
        { id: 2, name: "Bob", age: 30, country: "UK" },
        { id: 3, name: "Charlie", age: 35, country: "Canada" },
        { id: 4, name: "David", age: 28, country: "USA" },
        { id: 5, name: "Eva", age: 22, country: "UK" },
        { id: 6, name: "Frank", age: 40, country: "Canada" },
        { id: 7, name: "Grace", age: 33, country: "USA" },
        { id: 8, name: "Helen", age: 29, country: "UK" },
        { id: 9, name: "Ivy", age: 27, country: "Canada" },
        { id: 10, name: "Jack", age: 36, country: "USA" },
        { id: 11, name: "Karen", age: 39, country: "UK" },
        { id: 12, name: "Leo", age: 32, country: "Canada" },
        { id: 13, name: "Mona", age: 45, country: "USA" },
        { id: 14, name: "Nathan", age: 23, country: "UK" },
        { id: 15, name: "Olivia", age: 31, country: "Canada" },
      ])
    );
  }, [dispatch]);

  // Function to handle sorting by selected column
  const handleSort = () => {
    const sortedData = [...tableData].sort((a, b) => {
      if (a[sortBy] > b[sortBy]) return sortOrder === "asc" ? 1 : -1;
      if (a[sortBy] < b[sortBy]) return sortOrder === "asc" ? -1 : 1;
      return 0;
    });

    dispatch(setFilteredData(sortedData));
  };

  // Function to handle global filtering
  const handleGlobalFilter = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setFilterText(searchTerm);

    const filteredData = tableData.filter((row) => {
      return Object.values(row).some((val) =>
        String(val).toLowerCase().includes(searchTerm)
      );
    });

    dispatch(setFilteredData(filteredData));
  };

  // Function to handle downloading filtered data as Excel
  const handleDownload = () => {
    const ws = XLSX.utils.json_to_sheet(tableData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "tableData.xlsx");
  };

  // Function to toggle sort order
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  // Function to change page
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Get current page data
  const currentData = tableData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Calculate total pages
  const totalPages = Math.ceil(tableData.length / itemsPerPage);

  return (
    <div className="table-container">
      <div className="filter-container">
        <input
          type="text"
          value={filterText}
          onChange={handleGlobalFilter}
          placeholder="Search..."
        />
      </div>
      <button onClick={handleDownload}>Download Excel</button>

      <div className="sort-container">
        <select onChange={(e) => setSortBy(e.target.value)} value={sortBy}>
          <option value="name">Name</option>
          <option value="age">Age</option>
          <option value="country">Country</option>
        </select>
        <button onClick={toggleSortOrder}>
          Sort {sortOrder === "asc" ? "Descending" : "Ascending"}
        </button>
        <button onClick={handleSort}>Sort by {sortBy}</button>
      </div>

      <div id="table-box">
        <table>
          <thead>
            <tr>
              <th onClick={() => setSortBy("name")}>Name</th>
              <th onClick={() => setSortBy("age")}>Age</th>
              <th onClick={() => setSortBy("country")}>Country</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((row) => (
              <tr key={row.id}>
                <td>{row.name}</td>
                <td>{row.age}</td>
                <td>{row.country}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Table;
