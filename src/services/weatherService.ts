import { WeatherData } from "@/types/weather";

const API_BASE_URL = "https://api.openweathermap.org/data/2.5";
const API_KEY = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;

export const getFiveDayForecast = async (
  lat: number,
  lon: number
): Promise<WeatherData> => {
  if (!API_KEY) {
    throw new Error(
      "OpenWeatherMap API key is missing. Please set VITE_OPENWEATHERMAP_API_KEY in your .env file."
    );
  }

  const url = `${API_BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Error fetching weather data: ${response.status} ${
          response.statusText
        } - ${errorData.message || "Unknown error"}`
      );
    }
    const data: WeatherData = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch forecast:", error);

    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error("An unknown error occurred during fetch.");
    }
  }
};
