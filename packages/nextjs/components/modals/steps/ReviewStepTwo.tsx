"use client"

import React from 'react';
import { motion } from "framer-motion";
import { X } from 'lucide-react';

interface ReviewStepTwoProps {
  onBack: () => void;
  onSubmit: () => void;
}

const ReviewStepTwo: React.FC<ReviewStepTwoProps> = ({ onBack, onSubmit }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="rounded-full bg-gray-900 p-2">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold">Additional Details</h2>
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-semibold">Add Supporting Details</h2>
        <p className="mt-2 text-muted-foreground">
          Help us understand your feedback better with specific examples or suggestions.
        </p>
      </div>

      <div className="space-y-4">
        <div className="rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-2 w-2 rounded-full bg-green-500"></div>
            <h3 className="font-medium">What went well?</h3>
          </div>
          <textarea
            className="w-full min-h-[80px] resize-none border-0 bg-transparent p-0 focus:ring-0"
            placeholder="Share the positive aspects..."
          />
        </div>

        <div className="rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-2 w-2 rounded-full bg-red-500"></div>
            <h3 className="font-medium">What could be improved?</h3>
          </div>
          <textarea
            className="w-full min-h-[80px] resize-none border-0 bg-transparent p-0 focus:ring-0"
            placeholder="Share your suggestions..."
          />
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="flex-1"
        >
          Back
        </button>
        <button
          onClick={onSubmit}
          className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700"
        >
          Submit Feedback
        </button>
      </div>
    </div>
  );
};

export default ReviewStepTwo;
