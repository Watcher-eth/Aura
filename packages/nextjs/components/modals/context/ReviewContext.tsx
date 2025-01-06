"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { StorageClient, testnet } from "@lens-protocol/storage-node-client";
import { useAccount } from "wagmi";
import { emotions } from '../steps/ReviewStepOne';
import { useWriteReviewRegistryAddReview } from '~~/lib/foundryGenerated';

interface ReviewContextType {
  selectedEmotions: number[];
  setSelectedEmotions: (emotions: number[]) => void;
  rating: number | undefined;
  setRating: (rating: number) => void;
  comment: string;
  setComment: (comment: string) => void;
  submitReview: () => Promise<void>;
}

const ReviewContext = createContext<ReviewContextType | undefined>(undefined);

export function ReviewProvider({ children }: { children: ReactNode }) {
  const [selectedEmotions, setSelectedEmotions] = useState<number[]>([]);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState<number>(2);
  const { address } = useAccount();
  const { writeContractAsync } = useWriteReviewRegistryAddReview();

  const storageClient = StorageClient.create(testnet);

  const submitReview = async () => {
    try {
      if (!address) {
        throw new Error("No wallet connected");
      }

      // Get the emotion labels for the selected indices
      const selectedEmotionLabels = selectedEmotions.map(index => emotions[index].label);
      console.log("Selected emotions:", selectedEmotions, "Labels:", selectedEmotionLabels);

      const reviewData = {
        address: address,
        rating,
        emotions: selectedEmotionLabels,
        content: comment,
        timestamp: new Date().toISOString()
      };

      console.log("Uploading review data:", reviewData);

      // Upload to Lens Storage Node
      const { uri } = await storageClient.uploadAsJson(reviewData);
      console.log("Review uploaded to Lens, URI:", uri);

      // Submit review to the smart contract
      // Convert rating from 0-4 scale to 1-5 scale for the contract
      const contractRating = rating + 1;
      
      // Write to the smart contract
      const tx = await writeContractAsync({
        args: [
          uri, // metadataURI
          reviewData.address, // contractAddress being reviewed
          contractRating // rating (1-5)
        ],
      });

      console.log("Review submitted to contract, transaction:", tx);

      // Reset form after successful submission
      setSelectedEmotions([]);
      setComment("");
      setRating(2);

    } catch (error) {
      console.error("Error submitting review:", error);
      throw error;
    }
  };

  return (
    <ReviewContext.Provider
      value={{
        selectedEmotions,
        rating,
        setSelectedEmotions,
        comment,
        setComment,
        submitReview,
        setRating,
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
