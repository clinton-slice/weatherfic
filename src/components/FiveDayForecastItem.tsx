import React from "react";
import { FiveDayOutlookItem } from "../utils/weatherUtils";
import { getWeatherEmoji } from "../utils/helpers";
import BaseCard from "./ui/Card";

interface FiveDayForecastItemProps {
  /**
   * The forecast data for the day.
   */
  forecast: FiveDayOutlookItem;
}

const FiveDayForecastItem: React.FC<FiveDayForecastItemProps> = ({
  forecast,
}) => {
  const { day, condition, description, maxTemp, minTemp } = forecast;

  return (
    <BaseCard className="flex flex-row items-center justify-between">
      <span className="font-medium text-xl text-zinc-800 dark:text-white w-10 text-left">
        {day}
      </span>
      <span className="text-2xl">
        {getWeatherEmoji(condition, description)}
      </span>
      <div className="flex flex-col items-end gap-1">
        <span className="font-semibold text-zinc-800 dark:text-white">
          ↑ {maxTemp}°
        </span>
        <span className="text-sm text-zinc-500 dark:text-zinc-400">
          ↓ {minTemp}°
        </span>
      </div>
    </BaseCard>
  );
};

export default FiveDayForecastItem;
