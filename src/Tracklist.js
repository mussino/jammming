import React from 'react';
import Track from './Track';

const Tracklist = ({ tracks, isRemoval, onRemove }) => {
    return (
        <div className="tracklist">
            {tracks.map(track => (
                <Track
                    key={track.id}
                    track={track}
                    isRemoval={isRemoval}
                    onRemove={onRemove} // Pass down remove handler
                />
            ))}
        </div>
    );
};

export default Tracklist;