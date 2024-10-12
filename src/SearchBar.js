import React, { useState } from 'react';
import './styles/SearchBar.css';

const SearchBar = ({ onSearch }) => {
  // State to store the value typed into the search bar
  const [searchTerm, setSearchTerm] = useState('');

  // Handles when the input value changes
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Handles when the search button is clicked or 'Enter' is pressed
  const handleSearch = () => {
    onSearch(searchTerm); // Call the parent component's function with the search term
  };

  // This enables the user to hit 'Enter' to trigger the search
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch(); // Trigger search on 'Enter' key press
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={searchTerm}         // Controlled component: input's value comes from state
        onChange={handleInputChange}  // Update state when user types
        onKeyDown={handleKeyDown}     // Trigger search on 'Enter' key press
        placeholder="Search for a song, artist, or album..."
      />
      <button onClick={handleSearch}> {/* Search button triggers the search */}
        <i className="fas fa-search"></i>
      </button>
    </div>
  );
};

export default SearchBar;