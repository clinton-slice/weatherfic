import React from "react";

const weatherEmojis = ["🌤️", "🌥️", "☁️", "🌧️", "⛈️"];

const LoadingIndicator: React.FC = () => {
  return (
    <div
      role="status"
      className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-zinc-700 to-zinc-900 text-white space-y-6"
    >
      <div className="flex space-x-6" aria-hidden="true">
        {weatherEmojis.map((icon, index) => (
          <div
            key={index}
            className="text-5xl animate-bounce"
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            {icon}
          </div>
        ))}
      </div>
      <div
        aria-live="polite"
        className="text-md font-semibold animate-pulse text-center"
      >
        Loading weather data...
      </div>
    </div>
  );
};

export default LoadingIndicator;
