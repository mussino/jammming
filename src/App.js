import React, { useState, useEffect } from 'react';
import Header from './Header';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import Playlist from './Playlist';
import Spotify from './Spotify'; // Import the Spotify module

const App = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [playlistName, setPlaylistName] = useState('My Playlist');
  const [playlistTracks, setPlaylistTracks] = useState([]);

  // State for holding the access token
  const [accessToken, setAccessToken] = useState('');

  // Use useEffect to get the access token when the app loads
  useEffect(() => {
    const token = Spotify.getAccessToken();  // Get the Spotify access token
    setAccessToken(token);  // Store it in state
  }, []);

  const handleSearch = (searchTerm) => {
    if (!accessToken) {
      alert("You're not logged in to Spotify!");
      return;
    }

    // Simulate searching for music (you’ll replace this with an actual API call using the token)
    const mockResults = [
      { id: 1, title: 'Song 1', artist: 'Artist A', uri: 'spotify:track:1' },
      { id: 2, title: 'Song 2', artist: 'Artist B', uri: 'spotify:track:2' },
      { id: 3, title: 'Song 3', artist: 'Artist C', uri: 'spotify:track:3' },
    ];

    // Filter results based on search term (you’ll eventually replace this with actual Spotify API filtering)
    const filteredResults = mockResults.filter(
      (song) =>
        song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        song.artist.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setSearchResults(filteredResults);
  };

  const addTrackToPlaylist = (track) => {
    const isTrackInPlaylist = playlistTracks.some((item) => item.id === track.id);
    
    if (!isTrackInPlaylist) {
      setPlaylistTracks([...playlistTracks, track]); // Add track if it’s not in playlist
    }
  };

  const removeTrackFromPlaylist = (track) => {
    setPlaylistTracks(playlistTracks.filter((item) => item.id !== track.id)); // Remove track
  };

  const savePlaylist = () => {
    if (!accessToken) {
      alert("You need to log in to Spotify to save the playlist.");
      return;
    }

    const trackUris = playlistTracks.map(track => track.uri);  // Extract URIs from tracks
    if (trackUris.length === 0) {
      alert("Your playlist is empty!");
      return;
    }

    // You’ll eventually make a POST request to Spotify’s API here to save the playlist.
    // Example (pseudo-code):
    // Spotify.savePlaylist(playlistName, trackUris, accessToken).then(() => {
    //   setPlaylistTracks([]);  // Clear playlist after saving
    //   setPlaylistName('New Playlist');  // Reset the playlist name
    // });

    console.log('Saving playlist to Spotify:', playlistName, trackUris);
  };

  return (
    <div className="App">
      <Header />
      <SearchBar onSearch={handleSearch} />
      <SearchResults results={searchResults} onAdd={addTrackToPlaylist} />
      <Playlist 
        name={playlistName} 
        tracks={playlistTracks} 
        onRemove={removeTrackFromPlaylist} 
        onNameChange={setPlaylistName} 
        onSave={savePlaylist}
      />
    </div>
  );
};

export default App;