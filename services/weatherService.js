const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/forecast';

export const fetchWeatherForecast = async (city) => {
  if (!API_KEY) {
    throw new Error('API key is missing. Set VITE_WEATHER_API_KEY in .env');
  }

  const url = `${BASE_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;

  const response = await fetch(url);

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('City not found');
    }
    throw new Error('Failed to fetch weather data');
  }

  return await response.json();
};