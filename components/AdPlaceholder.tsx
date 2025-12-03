import React from 'react';

interface AdPlaceholderProps {
  location: 'banner' | 'sidebar';
  className?: string;
}

export const AdPlaceholder: React.FC<AdPlaceholderProps> = ({ location, className = '' }) => {
  const sizeClasses = location === 'banner' 
    ? "w-full h-24 md:h-32" 
    : "w-full h-64";

  return (
    <div className={`bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center p-4 my-6 text-gray-500 ${sizeClasses} ${className}`}>
      <span className="font-semibold text-sm md:text-base">إعلان — مساحة متاحة</span>
      <span className="text-xs mt-1 opacity-70">
        {location === 'banner' ? 'Responsive Banner (728x90)' : 'Sidebar Ad (300x250)'}
      </span>
    </div>
  );
};