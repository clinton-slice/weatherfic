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
   * Whether the card is interactive.
   */
  isInteractive?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  className = "",
  isInteractive = false,
  ...props
}) => {
  const baseClasses =
    "flex-shrink-0 flex items-center p-4 min-w-[100px] text-zinc-800 dark:text-zinc-200 rounded-3xl cursor-default transition-all border border-zinc-200 dark:border-zinc-300";

  const interactiveClasses = isInteractive
    ? "cursor-pointer hover:shadow-md"
    : "cursor-default";

  return (
    <div className={cn(baseClasses, interactiveClasses, className)} {...props}>
      {children}
    </div>
  );
};

export default Card;
