import { useState, useCallback } from 'react';
import { fetchWeatherForecast } from '../services/weatherService';
import { processForecast } from '../utils/processForecast';

export const useWeather = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [dailyData, setDailyData] = useState([]);
  const [currentWeather, setCurrentWeather] = useState(null);

  const fetchWeather = useCallback(async (city) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWeatherForecast(city);
      const current = {
        city: data.city.name,
        temp: data.list[0].main.temp,
        condition: data.list[0].weather[0].description,
      };
      setCurrentWeather(current);

      const daily = processForecast(data);
      setDailyData(daily);
      setWeatherData(data);
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
      setDailyData([]);
      setCurrentWeather(null);
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, error, weatherData, dailyData, currentWeather, fetchWeather };
};