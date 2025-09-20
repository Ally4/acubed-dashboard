import React, { useState, useMemo } from 'react';

const DataTable = ({
  title,
  columns,
  data,
  onRowClick,
  isLoading = false,
  error = null,
  emptyMessage = "No data available",
  className = "",
  searchable = true,
  filterable = true,
  paginated = true,
  pageSize = 10,
  sortable = true,
  columnToggle = true
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [filters, setFilters] = useState({});
  const [visibleColumns, setVisibleColumns] = useState(() =>
    columns.reduce((acc, col, index) => ({ ...acc, [index]: true }), {})
  );
  const [showFilters, setShowFilters] = useState(false);
  const [showColumnToggle, setShowColumnToggle] = useState(false);

  // Get unique values for filterable columns
  const getUniqueValues = (accessor) => {
    const values = data.map(row => {
      const value = row[accessor];
      return value !== undefined && value !== null ? String(value) : '';
    }).filter(value => value !== '');
    return [...new Set(values)].sort();
  };

  // Process data: filter, search, sort
  const processedData = useMemo(() => {
    let filtered = [...data];

    // Apply filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== 'all') {
        filtered = filtered.filter(row => {
          const cellValue = row[key];
          return cellValue !== undefined && cellValue !== null && String(cellValue).toLowerCase().includes(value.toLowerCase());
        });
      }
    });

    // Apply search
    if (searchTerm) {
      filtered = filtered.filter(row =>
        columns.some(column => {
          if (column.searchable === false) return false;
          const value = column.accessor ? row[column.accessor] : '';
          return value !== undefined && value !== null && String(value).toLowerCase().includes(searchTerm.toLowerCase());
        })
      );
    }

    // Apply sorting
    if (sortConfig.key) {
      filtered.sort((a, b) => {
        const aValue = a[sortConfig.key] || '';
        const bValue = b[sortConfig.key] || '';

        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    return filtered;
  }, [data, filters, searchTerm, sortConfig, columns]);

  // Pagination
  const totalPages = Math.ceil(processedData.length / pageSize);
  const paginatedData = paginated
    ? processedData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    : processedData;

  // Reset page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filters]);

  const handleSort = (accessor) => {
    if (!sortable || !accessor) return;

    let direction = 'asc';
    if (sortConfig.key === accessor && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key: accessor, direction });
  };

  const handleFilterChange = (accessor, value) => {
    setFilters(prev => ({
      ...prev,
      [accessor]: value
    }));
  };

  const clearFilters = () => {
    setFilters({});
    setSearchTerm('');
    setCurrentPage(1);
  };

  const toggleColumn = (columnIndex) => {
    setVisibleColumns(prev => ({
      ...prev,
      [columnIndex]: !prev[columnIndex]
    }));
  };

  const showAllColumns = () => {
    setVisibleColumns(columns.reduce((acc, col, index) => ({ ...acc, [index]: true }), {}));
  };

  const hideAllColumns = () => {
    setVisibleColumns(columns.reduce((acc, col, index) => ({ ...acc, [index]: false }), {}));
  };

  // Get visible columns
  const getVisibleColumns = () => {
    return columns.filter((_, index) => visibleColumns[index]);
  };

  const getSortIcon = (accessor) => {
    if (!sortable || !accessor || sortConfig.key !== accessor) {
      return (
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
        </svg>
      );
    }

    return sortConfig.direction === 'asc' ? (
      <svg className="w-4 h-4 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
      </svg>
    ) : (
      <svg className="w-4 h-4 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 13l-5 5m0 0l-5-5m5 5V6" />
      </svg>
    );
  };

  if (isLoading) {
    return (
      <div className={`bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 ${className}`}>
        {title && (
          <div className="border-b border-gray-200 dark:border-gray-700 px-6 py-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h2>
          </div>
        )}
        <div className="flex items-center justify-center py-12">
          <div className="flex flex-col items-center space-y-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 ${className}`}>
        {title && (
          <div className="border-b border-gray-200 dark:border-gray-700 px-6 py-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h2>
          </div>
        )}
        <div className="flex items-center justify-center py-12">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="text-red-500">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.268 14.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">Error loading data</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden ${className}`}>
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-gray-700 px-6 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {title && (
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h2>
          )}

          {/* Search and Controls */}
          <div className="flex flex-col sm:flex-row gap-2">
            {searchable && (
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 text-sm w-full sm:w-64"
                />
              </div>
            )}

            <div className="flex gap-2">
              {filterable && (
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`btn btn-secondary text-sm px-3 py-2 h-9 ${showFilters ? 'bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300' : ''}`}
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z" />
                  </svg>
                  Filters
                </button>
              )}

              {columnToggle && (
                <div className="relative">
                  <button
                    onClick={() => setShowColumnToggle(!showColumnToggle)}
                    className={`btn btn-secondary text-sm px-3 py-2 h-9 ${showColumnToggle ? 'bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300' : ''}`}
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2h2a2 2 0 002-2z" />
                    </svg>
                    Columns
                  </button>

                  {showColumnToggle && (
                    <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 z-10">
                      <div className="p-4">
                        <div className="flex justify-between items-center mb-3">
                          <h4 className="text-sm font-medium text-gray-900 dark:text-white">Show/Hide Columns</h4>
                          <button
                            onClick={() => setShowColumnToggle(false)}
                            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>

                        <div className="flex gap-2 mb-3">
                          <button
                            onClick={showAllColumns}
                            className="btn btn-secondary text-xs px-2 py-1"
                          >
                            Show All
                          </button>
                          <button
                            onClick={hideAllColumns}
                            className="btn btn-secondary text-xs px-2 py-1"
                          >
                            Hide All
                          </button>
                        </div>

                        <div className="space-y-2 max-h-60 overflow-y-auto">
                          {columns.map((column, index) => (
                            <label key={index} className="flex items-center space-x-2 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={visibleColumns[index]}
                                onChange={() => toggleColumn(index)}
                                className="w-4 h-4 text-primary-600 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded focus:ring-primary-500 focus:ring-2"
                              />
                              <span className="text-sm text-gray-700 dark:text-gray-300">{column.header}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {(Object.keys(filters).length > 0 || searchTerm) && (
                <button
                  onClick={clearFilters}
                  className="btn btn-secondary text-sm px-3 py-2 h-9"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Enhanced Filters Section */}
        {filterable && showFilters && (
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-medium text-gray-900 dark:text-white flex items-center">
                <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z" />
                </svg>
                Filter Options
              </h4>
              <button
                onClick={() => setShowFilters(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {columns
                .filter((column, index) => column.filterable !== false && column.accessor && visibleColumns[index])
                .map((column) => (
                  <div key={column.accessor} className="flex flex-col space-y-1">
                    <label className="text-xs font-medium text-gray-600 dark:text-gray-400">
                      {column.header}
                    </label>
                    <select
                      value={filters[column.accessor] || ''}
                      onChange={(e) => handleFilterChange(column.accessor, e.target.value)}
                      className="text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 px-3 py-2"
                    >
                      <option value="">All {column.header}</option>
                      {getUniqueValues(column.accessor).map(value => (
                        <option key={value} value={value}>
                          {value}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
            </div>

            {Object.keys(filters).length > 0 && (
              <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs text-gray-500 dark:text-gray-400">Active filters:</span>
                  {Object.entries(filters).map(([key, value]) => {
                    if (!value) return null;
                    const column = columns.find(col => col.accessor === key);
                    return (
                      <span
                        key={key}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary-100 dark:bg-primary-900/20 text-primary-800 dark:text-primary-200"
                      >
                        {column?.header}: {value}
                        <button
                          onClick={() => handleFilterChange(key, '')}
                          className="ml-1 text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-200"
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </span>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Data Stats */}
      <div className="px-6 py-2 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
          <span>
            Showing {paginatedData.length} of {processedData.length} entries
            {processedData.length !== data.length && ` (filtered from ${data.length})`}
          </span>
          {paginated && totalPages > 1 && (
            <span>
              Page {currentPage} of {totalPages}
            </span>
          )}
        </div>
      </div>

      {/* Table */}
      {processedData.length === 0 ? (
        <div className="flex items-center justify-center py-12">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="text-gray-400">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                {searchTerm || Object.keys(filters).length > 0 ? 'No matching results' : 'No data'}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {searchTerm || Object.keys(filters).length > 0
                  ? 'Try adjusting your search or filter criteria'
                  : emptyMessage
                }
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                {columns.map((column, index) => {
                  if (!visibleColumns[index]) return null;
                  return (
                    <th
                      key={index}
                      className={`${column.className || ''} ${
                        sortable && column.accessor ? 'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800' : ''
                      }`}
                      onClick={() => handleSort(column.accessor)}
                    >
                      <div className="flex items-center justify-between">
                        <span>{column.header}</span>
                        {sortable && column.accessor && getSortIcon(column.accessor)}
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={`${onRowClick ? 'clickable cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800' : ''}`}
                  onClick={onRowClick ? () => onRowClick(row) : undefined}
                  title={onRowClick ? 'Click to view details' : undefined}
                >
                  {columns.map((column, colIndex) => {
                    if (!visibleColumns[colIndex]) return null;
                    return (
                      <td key={colIndex} className={column.cellClassName || ''}>
                        {column.cell ? column.cell(row, rowIndex) : row[column.accessor]}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {paginated && totalPages > 1 && (
        <div className="border-t border-gray-200 dark:border-gray-700 px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="btn btn-secondary text-sm px-3 py-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>

              <div className="flex items-center space-x-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }

                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`px-3 py-1 text-sm rounded-md ${
                        currentPage === pageNum
                          ? 'bg-primary-600 text-white'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="btn btn-secondary text-sm px-3 py-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>

            <div className="text-sm text-gray-600 dark:text-gray-400">
              {((currentPage - 1) * pageSize) + 1} - {Math.min(currentPage * pageSize, processedData.length)} of {processedData.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;