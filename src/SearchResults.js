// src/components/SearchResults.js
import React from 'react';
import './styles/SearchResults.css';

const SearchResults = ({ results, hasSearched, onAdd }) => {
  return (
    <div className="search-results">
      {results.length > 0 ? (
        <ul>
          {results.map((result) => (
            <li key={result.id} className="search-result-item">
              <h3>{result.title}</h3>
              <p>{result.artist}</p>
              <button onClick={() => onAdd(result)} className="add-button">Add to Playlist</button>
            </li>
          ))}
        </ul>
      ) : (
        hasSearched && <p>No results found</p>
      )}
    </div>
  );
};

export default SearchResults;