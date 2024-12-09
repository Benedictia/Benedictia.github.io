

import React from 'react';

function SearchBar({ onGenreChange, onYearChange, genres }) {
  const currentYear = new Date().getFullYear();
  const years = [];
  
  for (let year = 1992; year <= currentYear; year++) {
    years.push(year);
  }

  return (
    <div className="search-bar">
      {/* Genre Dropdown */}
      <div className="dropdown">
        <h3>Select Genre</h3>
        <select onChange={(e) => onGenreChange(e.target.value)} defaultValue="">
          <option value="">Select a Genre</option>
          {genres?.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>

      {/* Year Dropdown */}
      <div className="dropdown">
        <h3>Select Year</h3>
        <select onChange={(e) => onYearChange(e.target.value)} defaultValue="">
          <option value="">Select a Year</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default SearchBar;
