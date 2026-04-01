import React from 'react';

const CurrentWeather = ({ data }) => {
  if (!data) return null;

  return (
    <div className="current-weather">
      <h2>{data.city}</h2>
      <p className="temperature">{data.temp}°C</p>
      <p>Condition: {data.condition}</p>
    </div>
  );
};

export default CurrentWeather;