"use client"

import React from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { HelpingHand, Check } from 'lucide-react';
import { useReview } from '../context/ReviewContext';

interface ReviewStepOneProps {
  onNext: () => void;
}

interface Emotion {
  emoji: string;
  label: string;
}

export const emotions: Emotion[] = [
  { emoji: "😐", label: "Mid" },
  { emoji: "💎", label: "Gem" },
  { emoji: "🚩", label: "Rug" },
  { emoji: "🔥", label: "Fire" },
  { emoji: "👀", label: "Watching" },
  { emoji: "👑", label: "King" },
  { emoji: "💣", label: "Bomb" },
  { emoji: "🪫", label: "Low Juice" },
  { emoji: "🚀", label: "Rocketship" },
  { emoji: "⭐", label: "Star" },
  { emoji: "📈", label: "Bullish" },
  { emoji: "📉", label: "Bearish" },
  { emoji: "🤡", label: "Clown" },
  { emoji: "💰", label: "Moonbag" },
  { emoji: "💸", label: "Airdrop" }
];

const ReviewStepOne: React.FC<ReviewStepOneProps> = ({ onNext }) => {
  const { selectedEmotions, setSelectedEmotions } = useReview();

  const handleEmotionClick = (index: number) => {
    setSelectedEmotions(prev => {
      if (prev.includes(index)) {
        return prev.filter(i => i !== index);
      }
      if (prev.length >= 3) {
        return prev;
      }
      return [...prev, index];
    });
  };

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

      <div className="h-[400px] -mt-3 -mb-2 overflow-y-auto">
        <div className="grid grid-cols-3 gap-1.5 py-8">
          {emotions.map((emotion, index) => (
            <motion.button
              key={index}
              className="relative flex flex-col items-center"
              onClick={() => handleEmotionClick(index)}
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="relative w-full aspect-square">
                <AnimatePresence>
                  {selectedEmotions.includes(index) && (
                    <>
                      <motion.div
                        className="absolute inset-0 z-10 bg-[#fff5eb] rounded-xl border-4 border-[#ff9f43]"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                      />
                      <motion.div
                        className="absolute -right-1 -top-1 z-30 bg-[#ff9f43] rounded-full p-1"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                      >
                        <Check strokeWidth={4} className="w-4 h-4 text-white" />
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
                <div className={`relative z-20 w-full h-full flex flex-col items-center justify-center rounded-xl ${
                  selectedEmotions.includes(index) ? "bg-transparent" : "bg-[#fcfcfc] border-2 border-[#f5f5f5]"
                }`}>
                  <span className="text-[4.5rem]">{emotion.emoji}</span>
                  <span className="text-[#999999] -mt-1.5 font-medium">{emotion.label}</span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
        <div className="absolute mx-4 bottom-[12.5%] z-[10] left-0 right-0 h-[7vh] bg-gradient-to-t from-white via-white/90  to-transparent pointer-events-none"></div>

      </div>

    

      <div
        className="flex items-center justify-center z-[20] w-full bg-white border-[0.1rem] border-[#eeeeee] hover:from-green-600 h-12 hover:to-green-700 text-[#bbbbbb] rounded-sm"
        onClick={onNext}
      >
        Submit Review
      </div>
    </div>
  );
};

export default ReviewStepOne;
