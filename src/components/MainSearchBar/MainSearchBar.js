import React from "react";
import "./MainSearchBar.css";

const MainSearchBar = ({ searchInput, setSearchInput }) => {
  return (
    <div className="search-container">
      <div className="flex justify-space-btw items-center">
        <input
          onChange={(e) => setSearchInput(e.target.value)}
          name="search-field"
          value={searchInput}
          id="search-field"
          className="search-input"
          placeholder="Search with Title, Tags, Description..."
        />
        <button type="submit" id="submit-btn">
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>
    </div>
  );
};

export default MainSearchBar;
