"use client"

import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ReviewStepOneProps {
  onNext: () => void;
}

interface Emotion {
  emoji: string;
  label: string;
}

const emotions: Emotion[] = [
  { emoji: "😢", label: "Very Sad" },
  { emoji: "😔", label: "Sad" },
  { emoji: "😐", label: "Medium" },
  { emoji: "🙂", label: "Happy" },
  { emoji: "😊", label: "Very Happy" },
];

const ReviewStepOne: React.FC<ReviewStepOneProps> = ({ onNext }) => {
  const [selectedEmotion, setSelectedEmotion] = useState<number | null>(2);
  const [comment, setComment] = useState("");

  return (
    <div className="mt-4 space-y-4">
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
          <h2 className="text-xl font-semibold">Feedback</h2>
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-semibold">How are you feeling?</h2>
        <p className="mt-2 text-muted-foreground">
          Your input is valuable in helping us better understand your needs and tailor our service accordingly.
        </p>
      </div>

      <div className="flex justify-center gap-4 py-8">
        {emotions.map((emotion, index) => (
          <motion.button
            key={index}
            className="relative"
            onClick={() => setSelectedEmotion(index)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence>
              {selectedEmotion === index && (
                <motion.div
                  className="absolute -inset-4 rounded-full bg-gradient-to-b from-green-100 to-green-200"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                />
              )}
            </AnimatePresence>
            <motion.div
              className={`relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-2xl
                ${selectedEmotion === index ? "bg-white" : ""}`}
              animate={{
                scale: selectedEmotion === index ? 1.2 : 1,
              }}
            >
              {emotion.emoji}
            </motion.div>
          </motion.button>
        ))}
      </div>

      {selectedEmotion !== null && (
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="rounded-full bg-gray-900 px-4 py-1 text-sm text-white">
            {emotions[selectedEmotion].label}
          </div>
        </motion.div>
      )}

      <textarea
        placeholder="Add a Comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="min-h-[100px] resize-none"
      />

      <button
        className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700"
        onClick={onNext}
      >
        Next Step
      </button>
    </div>
  );
};

export default ReviewStepOne;
