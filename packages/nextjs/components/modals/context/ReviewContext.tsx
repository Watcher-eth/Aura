"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { emotions } from '../steps/ReviewStepOne';

interface ReviewContextType {
  selectedEmotions: number[];
  setSelectedEmotions: (emotions: number[]) => void;
  comment: string;
  setComment: (comment: string) => void;
  submitReview: () => Promise<void>;
}

const ReviewContext = createContext<ReviewContextType | undefined>(undefined);

export function ReviewProvider({ children }: { children: ReactNode }) {
  const [selectedEmotions, setSelectedEmotions] = useState<number[]>([]);
  const [comment, setComment] = useState("");

  const submitReview = async () => {
    try {
      const selectedEmotionLabels = selectedEmotions.map(index => emotions[index].label);
      
      // Here you would typically make an API call to submit the review
      const reviewData = {
        emotions: selectedEmotionLabels,
        comment: comment,
        timestamp: new Date().toISOString()
      };

      console.log('Submitting review:', reviewData);
      
      // Add your API call here
      // await submitReviewToAPI(reviewData);
      
    } catch (error) {
      console.error('Error submitting review:', error);
      throw error;
    }
  };

  return (
    <ReviewContext.Provider
      value={{
        selectedEmotions,
        setSelectedEmotions,
        comment,
        setComment,
        submitReview
      }}
    >
      {children}
    </ReviewContext.Provider>
  );
}

export function useReview() {
  const context = useContext(ReviewContext);
  if (context === undefined) {
    throw new Error('useReview must be used within a ReviewProvider');
  }
  return context;
}
