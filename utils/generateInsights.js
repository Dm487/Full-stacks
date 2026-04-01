export const generateInsights = (dailyData, rawList) => {
    if (!dailyData.length) return { bestDay: null, warnings: [] };
  
    const bestDayEntry = dailyData.reduce((max, day) =>
      day.temp > max.temp ? day : max
    );
  
    const bestDay = {
      date: bestDayEntry.date,
      temp: bestDayEntry.temp.toFixed(1),
    };
  
    const warnings = [];
  
    dailyData.forEach((day) => {
      if (day.temp > 35) {
        warnings.push(`Extreme heat warning on ${day.date}: ${day.temp.toFixed(1)}°C`);
      } else if (day.temp < 5) {
        warnings.push(`Cold warning on ${day.date}: ${day.temp.toFixed(1)}°C`);
      }
    });
  
    if (rawList && rawList.length) {
      const highRainDays = rawList.filter((item) => {
        const rainProb = item.pop ? item.pop : 0;
        return rainProb > 0.6;
      });
      if (highRainDays.length > 0) {
        warnings.push('Rain expected (>60% chance) on some days. Plan accordingly.');
      }
    }
  
    return { bestDay, warnings };
  };