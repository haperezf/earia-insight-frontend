
import React from "react";

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center py-8">
      <div className="h-12 w-12 border-4 border-t-blue-600 border-blue-200 rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;
