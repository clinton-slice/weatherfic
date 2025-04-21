import { useMemo } from "react";
import { Forecast } from "./types/weather";
import {
  processTodayHourlyForecast,
  processFiveDayOutlook,
  ProcessedHourlyForecast,
  FiveDayOutlookItem,
} from "./utils/weatherUtils";
import { VANCOUVER_CITY } from "./constants";
import CurrentWeatherDisplay from "./components/CurrentWeatherDisplay";
import HourlyForecastList from "./components/HourlyForecastList";
import FiveDayForecastList from "./components/FiveDayForecastList";
import TopBar from "@components/TopBar";
import LoadingIndicator from "./components/ui/LoadingIndicator";
import ErrorMessage from "./components/ui/ErrorMessage";
import TwoColumnLayout from "./components/layout/TwoColumnLayout";
import { useWeatherData } from "./hooks/useWeatherData";

function App() {
  const { weatherData, groupedForecasts, isLoading, error, fetchWeather } =
    useWeatherData(VANCOUVER_CITY.lat, VANCOUVER_CITY.lon);

  const currentWeatherData: Forecast | null = useMemo(
    () => weatherData?.list?.[0] || null,
    [weatherData]
  );

  const todayHourlyForecasts: ProcessedHourlyForecast[] = useMemo(
    () => processTodayHourlyForecast(weatherData),
    [weatherData]
  );

  const fiveDayOutlook: FiveDayOutlookItem[] = useMemo(
    () => processFiveDayOutlook(groupedForecasts, weatherData),
    [groupedForecasts, weatherData]
  );

  const mainContent = useMemo(
    () => (
      <>
        <TopBar cityName={weatherData?.city.name || ""} />
        <main className="mt-8 md:mt-12 flex flex-col gap-8 md:gap-12 w-full">
          <section aria-labelledby="current-weather-heading">
            <h2 id="current-weather-heading" className="sr-only">
              Current Weather
            </h2>
            {currentWeatherData && (
              <CurrentWeatherDisplay forecast={currentWeatherData} />
            )}
          </section>

          {todayHourlyForecasts.length > 0 && (
            <section aria-labelledby="hourly-forecast-heading">
              <h2
                id="hourly-forecast-heading"
                className="text-lg text-center font-semibold mb-6 text-zinc-800 dark:text-white"
              >
                Today's 3-Hourly Forecast
              </h2>
              <HourlyForecastList forecasts={todayHourlyForecasts} />
            </section>
          )}
        </main>
      </>
    ),
    [weatherData?.city.name, currentWeatherData, todayHourlyForecasts]
  );

  const sidebarContent = useMemo(
    () => (
      <>
        {fiveDayOutlook.length > 0 && (
          <section aria-labelledby="five-day-forecast-heading">
            <h2
              id="five-day-forecast-heading"
              className="text-lg text-center font-semibold mb-3 text-zinc-800 dark:text-white sm:text-2xl"
            >
              5-Day Forecast
            </h2>
            <FiveDayForecastList forecasts={fiveDayOutlook} />
          </section>
        )}
      </>
    ),
    [fiveDayOutlook]
  );

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={fetchWeather} />;
  }

  if (!currentWeatherData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-zinc-800 p-4">
        <div className="text-xl font-semibold text-zinc-900 dark:text-white mb-4">
          Could not load current weather data.
        </div>
        <button
          onClick={fetchWeather}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <TwoColumnLayout
      mainContent={mainContent}
      sidebarContent={sidebarContent}
    />
  );
}

export default App;
