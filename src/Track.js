import React from 'react';

const Track = ({ track, isRemoval, onRemove }) => {
    const renderAction = () => {
        return isRemoval ? (
            <button className="remove-button" onClick={() => onRemove(track)}>Remove</button>
        ) : (
            <button className="add-button">Add to Playlist</button>
        );
    };

    return (
        <div className="track">
            <div>
                <h4>{track.title}</h4>
                <p>{track.artist}</p>
            </div>
            {renderAction()}
        </div>
    );
};

export default Track;