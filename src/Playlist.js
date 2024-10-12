import React from 'react';
import Tracklist from './Tracklist';
import playlist from './styles/Playlist.css'

const Playlist = ({ name, tracks, onRemove, onNameChange, onSave }) => {
    return (
        <div className="playlist">
            {/* Input to rename the playlist */}
            <input
                value={name}
                onChange={(e) => onNameChange(e.target.value)}
                placeholder="Playlist Name"
            />
            
            {/* Display the list of tracks */}
            <Tracklist tracks={tracks} isRemoval={true} onRemove={onRemove} />
            
            {/* Save to Spotify button */}
            <button className="save-button" onClick={onSave}>Save to Spotify</button>
        </div>
    );
};

export default Playlist;