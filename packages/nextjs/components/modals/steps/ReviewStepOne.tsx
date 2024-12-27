"use client"

import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { HelpingHand } from 'lucide-react';

interface ReviewStepOneProps {
  onNext: () => void;
}

interface Emotion {
  emoji: string;
  label: string;
}

const emotions: Emotion[] = [
  { emoji: "😐", label: "Mid" },
  { emoji: "💎", label: "Gem" },
  { emoji: "🚩", label: "Rug" },
  { emoji: "🔥", label: "Fire" },
  { emoji: "👀", label: "Watching" },
  { emoji: "👑", label: "King" },
];

const ReviewStepOne: React.FC<ReviewStepOneProps> = ({ onNext }) => {
  const [selectedEmotion, setSelectedEmotion] = useState<number | null>(null);
  const [comment, setComment] = useState("");

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="rounded-full bg-white border-[0.15rem] border-[#eeeeee] p-2">
            <HelpingHand className='text-[#999999]'/>
          </div>
          <h2 className="text-xl text-[#999999] font-semibold">Vibe Check</h2>
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-[2rem] font-semibold">Choose up to 3</h2>
        <p className="mt-2 text-muted-foreground text-[1.3rem]">
          0x16859...49B363d
        </p>
      </div>

      <div className="grid grid-cols-3 gap-1.5 py-8">
        {emotions.map((emotion, index) => (
          <motion.button
            key={index}
            className="relative flex flex-col items-center"
            onClick={() => setSelectedEmotion(index)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="relative w-full aspect-square">
              <AnimatePresence>
                {selectedEmotion === index && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-b from-green-100 to-green-200 rounded-xl"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                  />
                )}
              </AnimatePresence>
              <div className={`relative z-10 w-full h-full flex items-center justify-center  rounded-xl border-2 bg-[#fcfccfc] ${
                selectedEmotion === index ? "bg-transparent border-transparent" : ""
              }`}>
                <span className="text-4xl">{emotion.emoji}</span>
              </div>
            </div>
            <span className="mt-2 text-[#999999] font-medium">{emotion.label}</span>
          </motion.button>
        ))}
      </div>

      <textarea
        placeholder="Add a Comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="min-h-[140px] bg-white border-[0.12rem] border-[#eeeeee] rounded-xl p-2 w-full mt-7 resize-none placeholder:text-[#bbbbbb] active:border-[#cecece]"
      />

      <div
        className="flex items-center justify-center w-full bg-white border-[0.1rem] border-[#eeeeee] hover:from-green-600 h-12 hover:to-green-700 text-[#bbbbbb] rounded-sm"
        onClick={onNext}
      >
        Submit Review
      </div>
    </div>
  );
};

export default ReviewStepOne;
