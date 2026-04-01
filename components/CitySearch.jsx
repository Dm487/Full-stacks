import React, { useState } from 'react';

const CitySearch = ({ onSearch }) => {
  const [city, setCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
    }
  };

  return (
    <form className="city-search" onSubmit={handleSubmit}>
      <label htmlFor="city-input">Enter city:</label>
      <input
        id="city-input"
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="e.g., London"
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default CitySearch;