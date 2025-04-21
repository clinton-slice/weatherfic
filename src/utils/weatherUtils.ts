import { WeatherData } from "../types/weather";
import { DailyForecast } from "./helpers";
import { format, fromUnixTime, isSameDay, addSeconds } from "date-fns";

export interface ProcessedHourlyForecast {
  hour: string;
  temp: number;
  condition: string;
  description: string;
}

export interface FiveDayOutlookItem {
  day: string;
  minTemp: number;
  maxTemp: number;
  condition: string;
  description: string;
}

/**
 * Processes TODAY's hourly forecast data from API response.
 */
export const processTodayHourlyForecast = (
  weatherData: WeatherData | null
): ProcessedHourlyForecast[] => {
  if (!weatherData?.list || !weatherData.city) return [];

  const timezone = weatherData.city.timezone;
  const now = addSeconds(new Date(), timezone);

  // Filter forecasts for today
  const todayForecasts = weatherData.list.filter((forecast) => {
    const forecastDate = addSeconds(fromUnixTime(forecast.dt), timezone);
    return isSameDay(forecastDate, now);
  });

  return todayForecasts.map((forecast) => {
    const forecastDate = addSeconds(fromUnixTime(forecast.dt), timezone);
    return {
      hour: format(forecastDate, "h a"),
      temp: Math.round(forecast.main.temp),
      condition: forecast.weather[0].main,
      description: forecast.weather[0].description,
    };
  });
};

/**
 * Processes the 5-day outlook from grouped forecast data.
 * Uses the first forecast of the day for representative condition/description.
 */
export const processFiveDayOutlook = (
  groupedForecasts: DailyForecast[],
  weatherData: WeatherData | null
): FiveDayOutlookItem[] => {
  if (!weatherData || !groupedForecasts.length) return [];

  const timezone = weatherData.city.timezone;
  const currentDate = addSeconds(new Date(), timezone);

  console.log({ groupedForecasts });

  return groupedForecasts.slice(0, 5).map((day) => {
    if (!day.forecasts.length) {
      return {
        day: "N/A",
        minTemp: 0,
        maxTemp: 0,
        condition: "Unknown",
        description: "No data",
      };
    }

    const firstForecastOfDay = day.forecasts[0];
    let minTemp = firstForecastOfDay.main.temp_min;
    let maxTemp = firstForecastOfDay.main.temp_max;

    day.forecasts.forEach((forecast) => {
      minTemp = Math.min(minTemp, forecast.main.temp_min);
      maxTemp = Math.max(maxTemp, forecast.main.temp_max);
    });

    const representativeDate = addSeconds(
      fromUnixTime(firstForecastOfDay.dt),
      timezone
    );

    const isToday = isSameDay(representativeDate, currentDate);

    return {
      day: isToday ? "Today" : format(representativeDate, "EEE"),
      minTemp: Math.round(minTemp),
      maxTemp: Math.round(maxTemp),
      condition: firstForecastOfDay.weather[0].main,
      description: firstForecastOfDay.weather[0].description,
    };
  });
};
