import React, { useState } from "react";
import StarRating from "./StarRating";

const RatingSection = () => {
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (rating === 0) {
      alert("Please select a rating");
      return;
    }
    console.log("Rating submitted:", rating);
    setSubmitted(true);
    setTimeout(() => {
      setRating(0);
      setSubmitted(false);
    }, 3000);
  };

  if (submitted) {
    return (
      <div className="bg-gray-800 rounded-lg p-12">
        <div className="text-center">
          <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h3 className="text-white text-2xl font-bold mb-2">Thank You!</h3>
          <p className="text-gray-400">
            Your rating has been submitted successfully
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black-800 border-2 border-gray-600 rounded-lg p-12">
      <h2 className="text-white text-4xl font-bold mb-3 text-center">
        Rate Our Services
      </h2>
      <p className="text-gray-400 text-center mb-8">
        How would you rate your experience with us?
      </p>
      <div className="space-y-8">
        <StarRating rating={rating} onRatingChange={setRating} />
        {rating > 0 && (
          <p className="text-gray-400 text-center text-sm">
            {rating === 1 &&
              "We're sorry to hear that. We'll work on improving."}
            {rating === 2 && "Thank you for your feedback. We can do better!"}
            {rating === 3 && "Thanks! We appreciate your honest feedback."}
            {rating === 4 && "Great! We're glad you enjoyed our services."}
            {rating === 5 && "Awesome! Thank you for the excellent rating!"}
          </p>
        )}
        <button
          onClick={handleSubmit}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-full transition mt-8"
        >
          Submit Rating
        </button>
      </div>
    </div>
  );
};

export default RatingSection;
