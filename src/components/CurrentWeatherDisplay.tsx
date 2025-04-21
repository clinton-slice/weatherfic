import { getWeatherEmoji } from "@/utils/helpers";
import { Forecast } from "@/types/weather";
import StatItem from "@components/ui/StatItem";

interface CurrentWeatherDisplayProps {
  /**
   * The current weather forecast data.
   * @type {Forecast | null}
   */
  forecast: Forecast | null;
}

const CurrentWeatherDisplay: React.FC<CurrentWeatherDisplayProps> = ({
  forecast,
}) => {
  if (!forecast) {
    return (
      <div className="text-center text-zinc-500">
        Current weather data unavailable.
      </div>
    );
  }

  const { temp, humidity, feels_like, temp_min, temp_max } = forecast.main;
  const { main: condition, description } = forecast.weather[0];

  const windSpeed = forecast.wind.speed;
  const windSpeedKmh = Math.round(windSpeed * 3.6);

  return (
    <div className="flex flex-col items-center gap-0 justify-center">
      <div className="flex flex-row items-center justify-center">
        <div className="text-[10rem] sm:text-[12rem] text-zinc-600 dark:text-white font-bold leading-none flex">
          {Math.round(temp)}
          <span className="text-7xl sm:text-9xl">°</span>
        </div>
      </div>
      <div className="text-base text-zinc-500 dark:text-white space-y-2 capitalize">
        <span>Feels like {Math.round(feels_like)}°</span>
      </div>
      <div className="text-4xl text-zinc-500 dark:text-white mt-6 space-x-2 capitalize">
        <span>{getWeatherEmoji(condition, description)}</span>
        <span>{description}</span>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-6 w-full max-w-xs sm:max-w-sm">
        <StatItem
          icon="💨"
          value={`${windSpeedKmh} km/h`}
          ariaLabel="Wind speed"
        />
        <StatItem icon="💧" value={`${humidity} %`} ariaLabel="Humidity" />
        <StatItem
          icon="🌡"
          value={`↓ ${Math.round(temp_min)}° – ↑ ${Math.round(temp_max)}°`}
          ariaLabel="Temperature range (min/max)"
        />
      </div>
    </div>
  );
};

export default CurrentWeatherDisplay;
