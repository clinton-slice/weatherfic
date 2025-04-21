import React from "react";
import { FiveDayOutlookItem } from "../utils/weatherUtils";
import FiveDayForecastItem from "./FiveDayForecastItem";

interface FiveDayForecastListProps {
  forecasts: FiveDayOutlookItem[];
}

const FiveDayForecastList: React.FC<FiveDayForecastListProps> = ({
  forecasts,
}) => {
  if (!forecasts || forecasts.length === 0) {
    return (
      <p className="text-zinc-500 dark:text-zinc-400 text-center py-4">
        No 5-day forecast data available.
      </p>
    );
  }

  return (
    <ul className="space-y-3">
      {forecasts.map((dayOutlook) => (
        <li key={dayOutlook.day}>
          <FiveDayForecastItem forecast={dayOutlook} />
        </li>
      ))}
    </ul>
  );
};

export default FiveDayForecastList;
