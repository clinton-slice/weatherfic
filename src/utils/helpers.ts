import { format, fromUnixTime, addSeconds } from "date-fns";
import { Forecast } from "@/types/weather";

/**
 * Maps OpenWeatherMap weather condition codes/main descriptions to emojis.
 * Prioritizes main description for broader categories.
 */
export const getWeatherEmoji = (main: string, description: string): string => {
  const descLower = description.toLowerCase();

  switch (main) {
    case "Thunderstorm":
      return "⛈️";
    case "Drizzle":
      return "🌦️";
    case "Rain":
      if (descLower.includes("light")) return "🌦️";
      if (descLower.includes("freezing")) return "🥶";
      return "🌧️";
    case "Snow":
      if (descLower.includes("light")) return "🌨️";
      return "❄️";
    case "Mist":
    case "Smoke":
    case "Haze":
    case "Dust":
    case "Fog":
    case "Sand":
    case "Ash":
      return "🌫️";
    case "Tornado":
      return "🌪️";
    case "Clear":
      return "☀️";
    case "Clouds":
      if (descLower.includes("few")) return "🌤️";
      return "☁️";
    default:
      return "❓";
  }
};

/**
 * Formats a Unix timestamp into a readable date string (e.g., "Aug 30").
 */
export const formatDate = (
  timestamp: number,
  timezoneOffset: number
): string => {
  const date = addSeconds(fromUnixTime(timestamp), timezoneOffset);
  return format(date, "MMM d");
};

/**
 * Formats a Unix timestamp into a readable day of the week (e.g., "Tuesday").
 */
export const getDayOfWeek = (
  timestamp: number,
  timezoneOffset: number
): string => {
  const date = addSeconds(fromUnixTime(timestamp), timezoneOffset);
  return format(date, "EEEE");
};

/**
 * Groups forecasts by day.
 */
export interface DailyForecast {
  date: string;
  dayOfWeek: string;
  forecasts: Forecast[];
}

export const groupForecastsByDay = (
  forecasts: Forecast[],
  timezoneOffset: number
): DailyForecast[] => {
  const groups: { [key: string]: Forecast[] } = {};

  forecasts.forEach((forecast) => {
    const dateKey = formatDate(forecast.dt, timezoneOffset);
    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }
    groups[dateKey].push(forecast);
  });

  return Object.keys(groups).map((dateKey) => ({
    date: dateKey,
    dayOfWeek: getDayOfWeek(groups[dateKey][0].dt, timezoneOffset),
    forecasts: groups[dateKey],
  }));
};
