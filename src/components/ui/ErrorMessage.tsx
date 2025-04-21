import React from "react";

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-zinc-800 p-4">
      <div className="text-red-500 text-xl mb-4">Error: {message}</div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-zinc-900 text-white rounded hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-300 dark:bg-zinc-900 dark:hover:bg-zinc-700 dark:focus:ring-zinc-300"
        >
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
