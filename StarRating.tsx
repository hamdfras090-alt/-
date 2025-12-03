import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number; // 0 to 5
  size?: number;
  interactive?: boolean;
  onRate?: (rating: number) => void;
}

export const StarRating: React.FC<StarRatingProps> = ({ 
  rating, 
  size = 20, 
  interactive = false,
  onRate 
}) => {
  return (
    <div className="flex flex-row-reverse justify-end gap-1">
      {[...Array(5)].map((_, index) => {
        // Since we are RTL, the visual order is reversed, but logic remains 1-5.
        // Wait, for RTL flex-row-reverse, the first item in DOM is rightmost.
        // Let's keep it simple: Map 1 to 5.
        const starValue = index + 1;
        const isFilled = starValue <= rating;
        
        return (
          <Star
            key={index}
            size={size}
            className={`transition-colors ${
              interactive ? 'cursor-pointer hover:scale-110' : ''
            } ${isFilled ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
            onClick={() => interactive && onRate && onRate(starValue)}
          />
        );
      })}
    </div>
  );
};