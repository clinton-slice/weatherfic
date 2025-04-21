import React from "react";
import { cn } from "@utils/classNames";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The content of the card.
   */
  children: React.ReactNode;
  /**
   * The class name for additional styling.
   */
  className?: string;
  /**
   * The onClick handler for the card.
   */
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const Card: React.FC<CardProps> = ({
  children,
  className = "",
  onClick,
  ...props
}) => {
  const baseClasses =
    "flex-shrink-0 flex items-center p-4 min-w-[100px] text-zinc-800 dark:text-zinc-200 rounded-3xl transition-all border border-zinc-200 dark:border-zinc-700 focus:outline-none";

  const hasOnClick = typeof onClick === "function";

  const interactiveClasses = hasOnClick
    ? "cursor-pointer hover:shadow-md focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
    : "cursor-default";

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (hasOnClick && (event.key === "Enter" || event.key === " ")) {
      event.preventDefault();
      onClick(event as unknown as React.MouseEvent<HTMLDivElement>);
    }
  };

  return (
    <div
      className={cn(baseClasses, interactiveClasses, className)}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role={hasOnClick ? "button" : undefined}
      tabIndex={hasOnClick ? 0 : undefined}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
