import React from "react";

const Track = ({ track, isRemoval, onRemove, onAdd }) => {
    const handleClick = () => {
        if (isRemoval) {
            onRemove(track);
        } else {
            onAdd(track); // Call onAdd when adding to the playlist
        }
    };

    return (
        <div className="Track">
            <div className="Track-information">
                <h3>{track.name}</h3>
                <p>{track.artist} | {track.album}</p>
            </div>
            <button className="Track-action" onClick={handleClick}>
                {isRemoval ? "-" : "+"}
            </button>
        </div>
    );
};

export default Track;