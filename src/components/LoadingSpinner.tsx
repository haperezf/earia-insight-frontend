
import React from "react";
import { Loader2 } from "lucide-react";

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center py-12 space-y-4">
      <div className="relative h-16 w-16">
        <div className="absolute inset-0 spinner"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
        </div>
      </div>
      <p className="text-blue-600 font-medium animate-pulse">
        Procesando análisis...
      </p>
    </div>
  );
};

export default LoadingSpinner;
