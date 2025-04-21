import React from "react";

interface StatItemProps {
  /**
   * The icon to display.
   */
  icon: React.ReactNode;
  /**
   * The value to display.
   */
  value: string | number;
}

const StatItem: React.FC<StatItemProps> = ({ icon, value }) => {
  return (
    <div className="flex items-center justify-center gap-1 text-sm text-zinc-500 dark:text-zinc-300">
      <span aria-hidden="true">{icon}</span>
      <span>{value}</span>
    </div>
  );
};

export default StatItem;
