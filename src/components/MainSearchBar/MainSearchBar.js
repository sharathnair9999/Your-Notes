import React from "react";
import "./MainSearchBar.css";

const MainSearchBar = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit");
  };
  return (
    <div className="search-container">
      <form
        onSubmit={handleSubmit}
        className="flex justify-space-btw items-center"
      >
        <input
          type="search"
          name="search-field"
          id="search-field"
          className="search-input"
          placeholder="Search with Title, Tags, Description..."
        />
        <button type="submit" id="submit-btn">
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </form>
    </div>
  );
};

export default MainSearchBar;
