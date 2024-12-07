import React from 'react';

function RatingFilter({ setSelectedRating }) {
  return (
    <div className="filter">
      <h3>Filter by Rating</h3>
      <input type="range" min="0" max="10" step="0.1" onChange={(e) => setSelectedRating(e.target.value)} />
      <span>{`Rating: ${setSelectedRating}`}</span>
    </div>
  );
}

export default RatingFilter;
