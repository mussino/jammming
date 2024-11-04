import React, { useCallback, useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [term, setTerm] = useState("");

  const handleSearch = useCallback(() => {
    onSearch(term);
  }, [onSearch, term]); // Now, only 'onSearch' and 'term' are in the dependency array

  const handleTermChange = (event) => {
    setTerm(event.target.value);
  };

  return (
    <div className="SearchBar">
      <input placeholder="Enter A Song, Album, or Artist" onChange={handleTermChange} />
      <button className="SearchButton" onClick={handleSearch}>
        SEARCH
      </button>
    </div>
  );
};

export default SearchBar;