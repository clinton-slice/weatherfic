import { useState, useEffect, useCallback } from "react";
import { getFiveDayForecast } from "../services/weatherService";
import { WeatherData } from "../types/weather";
import { DailyForecast, groupForecastsByDay } from "../utils/helpers";

interface UseWeatherDataResult {
  weatherData: WeatherData | null;
  groupedForecasts: DailyForecast[];
  isLoading: boolean;
  error: string | null;
  fetchWeather: () => Promise<void>;
}

export function useWeatherData(
  latitude: number,
  longitude: number
): UseWeatherDataResult {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [groupedForecasts, setGroupedForecasts] = useState<DailyForecast[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setWeatherData(null);
    setGroupedForecasts([]);
    try {
      const data = await getFiveDayForecast(latitude, longitude);
      setWeatherData(data);

      if (data?.list && data?.city?.timezone) {
        setGroupedForecasts(groupForecastsByDay(data.list, data.city.timezone));
      } else {
        setGroupedForecasts([]);
      }
    } catch (err) {
      console.error("Error fetching weather data:", err);
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
      setWeatherData(null);
      setGroupedForecasts([]);
    } finally {
      setIsLoading(false);
    }
  }, [latitude, longitude]);

  useEffect(() => {
    fetchWeather();
  }, [fetchWeather]);

  return {
    weatherData,
    groupedForecasts,
    isLoading,
    error,
    fetchWeather,
  };
}
