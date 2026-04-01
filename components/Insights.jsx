import React from 'react';
import { generateInsights } from '../utils/generateInsights';

const Insights = ({ dailyData, rawData }) => {
  if (!dailyData || dailyData.length === 0) return null;

  const { bestDay, warnings } = generateInsights(dailyData, rawData?.list);

  const bestDayMessage = bestDay
    ? `Best day to go out: ${new Date(bestDay.date).toLocaleDateString('en-US', { weekday: 'long' })} (${bestDay.temp}°C)`
    : '';

  return (
    <div className="insights">
      {bestDayMessage && <p>{bestDayMessage}</p>}
      {warnings.length > 0 && (
        <div>
          {warnings.map((warning, idx) => (
            <p key={idx} className="warning">
              ⚠️ {warning}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default Insights;