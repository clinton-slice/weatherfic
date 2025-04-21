import React from "react";

interface TwoColumnLayoutProps {
  mainContent: React.ReactNode;
  sidebarContent: React.ReactNode;
}

const TwoColumnLayout: React.FC<TwoColumnLayoutProps> = ({
  mainContent,
  sidebarContent,
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-stretch min-h-screen">
      <div className="w-full bg-white dark:bg-zinc-900 overflow-y-auto p-4 md:p-6 flex flex-col items-center">
        {mainContent}
      </div>

      <div className="flex flex-col items-center sm:justify-center justify-start max-w-md w-full p-4 md:p-6 sm:bg-zinc-100 bg-white dark:bg-zinc-800 flex-shrink-0">
        <div className="w-full">{sidebarContent}</div>
      </div>
    </div>
  );
};

export default TwoColumnLayout;
