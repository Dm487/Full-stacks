import React from 'react';
import './App.css';
import CitySearch from './components/CitySearch';
import CurrentWeather from './components/CurrentWeather';
import TemperatureChart from './components/TemperatureChart';
import Insights from './components/Insights';
import { useWeather } from './hooks/useWeather';

function App() {
  const { loading, error, weatherData, dailyData, currentWeather, fetchWeather } = useWeather();

  const handleSearch = (city) => {
    fetchWeather(city);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Weather Trend Planner</h1>
      </header>

      <CitySearch onSearch={handleSearch} />

      {loading && <div className="loading">Loading weather data...</div>}
      {error && <div className="error">Error: {error}</div>}

      {currentWeather && <CurrentWeather data={currentWeather} />}

      {dailyData.length > 0 && (
        <>
          <TemperatureChart dailyData={dailyData} />
          <Insights dailyData={dailyData} rawData={weatherData} />
        </>
      )}
    </div>
  );
}

export default App;