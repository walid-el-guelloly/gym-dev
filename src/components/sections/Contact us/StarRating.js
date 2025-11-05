import React, { useState } from "react";

const StarRating = ({ rating, onRatingChange, readonly = false }) => {
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className="flex gap-2 justify-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={readonly}
          onMouseEnter={() => !readonly && setHoverRating(star)}
          onMouseLeave={() => !readonly && setHoverRating(0)}
          onClick={() => !readonly && onRatingChange(star)}
          className={`text-5xl transition-all ${
            readonly ? "cursor-default" : "cursor-pointer hover:scale-110"
          }`}
        >
          {star <= (hoverRating || rating) ? (
            <span className="text-yellow-400">★</span>
          ) : (
            <span className="text-gray-600">★</span>
          )}
        </button>
      ))}
    </div>
  );
};

export default StarRating;
