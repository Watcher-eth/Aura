"use client"

import React, { useState } from 'react';
import { HelpingHand, X } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";


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

const emotionGradients = [
  "from-red-100 via-red-200 to-red-400",      // Very Sad
  "from-orange-100 via-orange-200 to-orange-400",  // Sad
  "from-yellow-100 via-yellow-200 to-yellow-400",  // Medium
  "from-green-100 via-green-200 to-green-400",   // Happy
  "from-blue-100 via-blue-200 to-blue-400"     // Very Happy
];

interface ReviewStepTwoProps {
  onBack: () => void;
  onSubmit: () => void;
}

const ReviewStepTwo: React.FC<ReviewStepTwoProps> = ({ onBack, onSubmit }) => {
  const [selectedEmotion, setSelectedEmotion] = useState<number | null>(2);
  const [comment, setComment] = useState("");

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="rounded-full bg-white border-[0.15rem] border-[#eeeeee] p-2">
          <HelpingHand className='text-[#999999]'/>
          </div>
          <h2 className="text-xl text-[#999999] font-semibold">Feedback</h2>
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-[2rem] font-semibold">Rate the Aura of </h2>
        <p className="mt-2 text-muted-foreground text-[1.3rem]">
        0x16859...49B363d        </p>
      </div>
<div className='relative pb-6 mt-1'>
      <div className="flex justify-center gap-8 z-[0] py-8">
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
                  className={`absolute -inset-4 rounded-full bg-gradient-to-b ${emotionGradients[index]}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                />
              )}
            </AnimatePresence>
            <motion.div
              className={`relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-[2rem]
                ${selectedEmotion === index ? "bg-transparent" : ""}`}
              animate={{
                scale: selectedEmotion === index ? 1.45 : 1,
              }}
            >
              {emotion.emoji}
            </motion.div>
          </motion.button>
        ))}
      </div>

      {selectedEmotion !== null && (
        <motion.div
          className="flex justify-center z-[20] -mt-3 "
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="rounded-full bg-gray-900 px-4 py-1 text-sm text-white">
            {emotions[selectedEmotion].label}
          </div>
        </motion.div>
      )}
</div>
      <textarea
        placeholder="Add a Comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="min-h-[140px] bg-white border-[0.12rem] border-[#eeeeee] rounded-xl p-2 w-full mt-7 resize-none placeholder:text-[#bbbbbb] active:border-[#cecece]"
      />

      <div
        className="  flex items-center justify-center w-full bg-white border-[0.1rem] border-[#eeeeee]  hover:from-green-600 h-12 hover:to-green-700 text-[#bbbbbb] rounded-sm"
        onClick={onSubmit}
      >
        Submit Review
      </div>
    </div>
  );
};

export default ReviewStepTwo;
