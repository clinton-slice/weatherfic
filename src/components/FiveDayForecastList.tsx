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
    <div className="space-y-3">
      {forecasts.map((dayOutlook) => (
        <FiveDayForecastItem key={dayOutlook.day} forecast={dayOutlook} />
      ))}
    </div>
  );
};

export default FiveDayForecastList;
