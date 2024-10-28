import React from "react";
import Track from "./Track"; // Ensure Track is imported

const TrackList = ({ tracks, isRemoval, onRemove, onAdd }) => {
    return (
        <div className="TrackList">
            {tracks.map(track => {
                return (
                    <Track
                        key={track.id}
                        track={track}
                        isRemoval={isRemoval}
                        onRemove={onRemove}
                        onAdd={onAdd} // Add the onAdd prop to handle adding tracks
                    />
                );
            })}
        </div>
    );
};

export default TrackList;