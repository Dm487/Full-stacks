export const processForecast = (data) => {
    const dailyTemps = {};
  
    data.list.forEach((item) => {
      const date = item.dt_txt.split(' ')[0];
      if (!dailyTemps[date]) {
        dailyTemps[date] = [];
      }
      dailyTemps[date].push(item.main.temp);
    });
  
    const result = Object.keys(dailyTemps).map((date) => {
      const temps = dailyTemps[date];
      const avgTemp = temps.reduce((a, b) => a + b, 0) / temps.length;
      return { date, temp: avgTemp };
    });
  
    return result.slice(0, 7);
  };