import React from "react";

const weatherEmojis = ["🌤️", "🌥️", "☁️", "🌧️", "⛈️"];

const LoadingIndicator: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-zinc-700 to-zinc-900 text-white space-y-6">
      <div className="flex space-x-6">
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
      <div className="text-md font-semibold animate-pulse text-center">
        Loading weather data...
      </div>
    </div>
  );
};

export default LoadingIndicator;
