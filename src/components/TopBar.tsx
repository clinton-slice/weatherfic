import ThemeToggle from "./ThemeToggle";

interface TopBarProps {
  cityName: string;
}

const TopBar: React.FC<TopBarProps> = ({ cityName }) => (
  <div className="flex justify-between items-center mb-12 w-full mx-auto">
    <div className="text-base sm:text-xl font-semibold text-zinc-900 dark:text-white">
      📍 {cityName}
    </div>
    <ThemeToggle />
  </div>
);

export default TopBar;
