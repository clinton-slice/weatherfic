import React from "react";
import { ProcessedHourlyForecast } from "@utils/weatherUtils";
import HourlyForecastCard from "@components/HourlyForecastCard";

interface HourlyForecastListProps {
  forecasts: ProcessedHourlyForecast[];
}

const HourlyForecastList: React.FC<HourlyForecastListProps> = ({
  forecasts,
}) => {
  if (!forecasts || forecasts.length === 0) {
    return (
      <p className="text-zinc-500 dark:text-zinc-400">
        No hourly forecasts available.
      </p>
    );
  }

  return (
    <ul
      className={`grid lg:grid-cols-6 sm:grid-cols-4 md:grid-cols-3 grid-cols-3 gap-4 pb-4 justify-items-center`}
    >
      {forecasts.map((hourData, index) => (
        <li key={index} className="flex">
          <HourlyForecastCard
            day={hourData.hour}
            temp={hourData.temp}
            condition={hourData.condition}
            description={hourData.description}
          />
        </li>
      ))}
    </ul>
  );
};

export default HourlyForecastList;
