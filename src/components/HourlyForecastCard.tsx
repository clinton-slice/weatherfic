import React from "react";
import { getWeatherEmoji } from "../utils/helpers";
import Card from "./ui/Card";

interface HourlyForecastCardProps {
  day: string;
  temp: number;
  condition: string;
  description: string;
}

const HourlyForecastCard: React.FC<HourlyForecastCardProps> = ({
  day,
  temp,
  condition,
  description,
}) => {
  return (
    <Card className="flex-col">
      <div className="font-semibold">{day}</div>
      <div className="text-3xl font-bold mt-2">{temp}°</div>
      <div className="text-xl mt-1">
        {getWeatherEmoji(condition, description)}
      </div>
      <div className="text-sm text-zinc-500 dark:text-zinc-400">
        {condition}
      </div>
    </Card>
  );
};

export default HourlyForecastCard;
