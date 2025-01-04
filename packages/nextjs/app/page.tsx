"use client";

import GlowingSearch from '~~/components/search/GlowingSearchBar';
import { useMemo, useState } from 'react';

const overcookFont = {
  fontFamily: 'TheOvercook',
  src: `url('/TheOvercook-vmjYM.ttf') format('truetype')`
};

const bulbisFont = {
  fontFamily: 'BulbisDemo',
  src: `url('/BulbisDemoOutline-9YL3j.ttf') format('truetype')`
};

export default function Page() {
  const emojis = "🏦💰🤑💵💸🏧🇺🇸😊🎉💎🎊💫⭐️💰🎈🌟✨💫🔥💲🌈🍾🥂🎰🎁💼💹📈🪙💳🧧🎯🎰🏆".split(" ");

  const textOptions = [
    { text: "REVIEWS", font: "Rawbeat" },
    { text: "AURA", font: "TheOvercook" },
    { text: "HUMANS", font: "Rawbeat" },
    { text: "VIBE CHECKS", font: "BulbisDemo" },
  ];

  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [rotationDirection, setRotationDirection] = useState(1);

  const cycleText = () => {
    setCurrentTextIndex((prev) => {
      setRotationDirection(-rotationDirection);
      return (prev + 1) % textOptions.length;
    });
  };

  // Generate emoji positions
  const generateStrictPositionArray = (count, side) => {
    return Array.from({ length: count }, (_, i) => {
      if (side === "left") {
        return {
          left: "0px", // Stick to the left edge
          top: `${Math.random() * 100}vh`, // Randomize along the vertical axis
        };
      } else if (side === "right") {
        return {
          right: "0px", // Stick to the right edge
          top: `${Math.random() * 100}vh`, // Randomize along the vertical axis
        };
      } else if (side === "bottom") {
        return {
          bottom: "0px", // Stick to the bottom edge
          left: `${Math.random() * 100}vw`, // Randomize along the horizontal axis
        };
      }
    });
  };

  const leftEmojis = useMemo(() => {
    return generateStrictPositionArray(30, "left").map((pos, i) => ({
      emoji: emojis[i % emojis.length],
      ...pos,
      transform: `rotate(${Math.random() * 360}deg) scale(${0.5 + Math.random() * 1.5})`,
    }));
  }, [emojis]);

  const rightEmojis = useMemo(() => {
    return generateStrictPositionArray(30, "right").map((pos, i) => ({
      emoji: emojis[i % emojis.length],
      ...pos,
      transform: `rotate(${Math.random() * 360}deg) scale(${0.5 + Math.random() * 1.5})`,
    }));
  }, [emojis]);

  const bottomEmojis = useMemo(() => {
    return generateStrictPositionArray(50, "bottom").map((pos, i) => ({
      emoji: emojis[i % emojis.length],
      ...pos,
      transform: `rotate(${Math.random() * 360}deg) scale(${0.5 + Math.random() * 1.5})`,
    }));
  }, [emojis]);

  return (
    <div className="relative min-h-screen h-screen bg-white overflow-hidden">
    

      {/* Background checkerboard pattern */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(45deg, #f7f7f7 25%, transparent 25%),
            linear-gradient(-45deg, #f7f7f7 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, #f7f7f7 75%),
            linear-gradient(-45deg, transparent 75%, #f7f7f7 75%)
          `,
          backgroundSize: '40px 40px',
          backgroundPosition: '0 0, 0 20px, 20px -20px, -20px 0px',
        }}
      />
      
   {/* Left Border */}
   <div className="absolute left-0 top-0 z-[10] bottom-0 w-[50px] pointer-events-none">
        {leftEmojis.map((item, i) => (
          <span
            key={`left-${i}`}
            className="absolute text-3xl"
            style={{
              ...item,
              zIndex: Math.floor(Math.random() * 30),
              opacity: 0.7 + Math.random() * 0.3,
            }}
          >
            {item.emoji}
          </span>
        ))}
      </div>

      {/* Right Border */}
      <div className="absolute right-0 top-0 z-[10] bottom-0 w-[50px] pointer-events-none">
        {rightEmojis.map((item, i) => (
          <span
            key={`right-${i}`}
            className="absolute text-3xl"
            style={{
              ...item,
              zIndex: Math.floor(Math.random() * 30),
              opacity: 0.7 + Math.random() * 0.3,
            }}
          >
            {item.emoji}
          </span>
        ))}
      </div>

      {/* Bottom Border */}
      <div className="absolute bottom-0 z-[10] left-0 right-0 h-[10px] pointer-events-none">
        {bottomEmojis.map((item, i) => (
          <span
            key={`bottom-${i}`}
            className="absolute text-3xl"
            style={{
              ...item,
              zIndex: Math.floor(Math.random() * 30),
              opacity: 0.7 + Math.random() * 0.3,
            }}
          >
            {item.emoji}
          </span>
        ))}
      </div>
      {/* Bottom gradient overlay */}
      <div className="absolute bottom-0 z-[10] left-0 right-0 h-[15vh] bg-gradient-to-t from-white/90 via-white/50 to-transparent pointer-events-none"></div>

      <div className="relative z-10 min-w-[70vw] container mx-auto px-4 py-8 min-h-screen flex flex-col items-center justify-between">
        {/* Main content */}
        <div className="flex-1 flex flex-col items-center justify-center relative w-full mx-auto">
          {/* Floating images - positioned exactly as in screenshot */}
          <div className="absolute w-[150px] h-[150px] left-[10%] top-[5%] rotate-2 transition-transform duration-300 hover:scale-105 hover:-rotate-2">
            <img
              src="https://d22z7e9agkmda7.cloudfront.net/witch2.png"
              alt="Gradient art"
              width={150}
              height={150}
              className="rounded-[12%] bg-green-200 shadow-lg gentle-float border-[0.3rem] border-white"
            />
          </div>

          <div className="absolute w-[150px] h-[150px] right-[15%] top-[10%] -rotate-2 transition-transform duration-300 hover:scale-105 hover:rotate-2">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd4yreGyWv2uCtfZ9NiIf6h8bXGdwouv-O2Q&s"
              alt="Easter Island statue"
              width={170}
              height={70}
              className="rounded-[12%] bg-white shadow-lg gentle-float border-[0.3rem] border-white"
            />
          </div>

          <div className="absolute w-[120px] h-[120px] left-[17%] top-[37%] rotate-1 transition-transform duration-300 hover:scale-105 hover:-rotate-1">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkqrzNUqdQNE-PfCyyjQMyE1LyCKniZE-BDQ&s"
              alt="Profile avatar"
              width={140}
              height={140}
              className="rounded-full shadow-lg gentle-float border-[0.3rem] border-white"
            />
          </div>

          <div className="absolute w-[120px] h-[120px] right-[17%] bottom-[38%] -rotate-1 transition-transform duration-300 hover:scale-105 hover:rotate-1">
            <img
              src="https://image.typedream.com/cdn-cgi/image/width=384,format=auto,fit=scale-down,quality=100/https://api.typedream.com/v0/document/public/1e17facc-56e9-4158-9522-8cfee85931a9/2VL60YXR4fzAMfLiIYDt95hGVhK_-E_TAwY8_400x400.png"
              alt="Profile avatar"
              width={140}
              height={140}
              className="rounded-full shadow-lg gentle-float border-[0.3rem] border-white"
            />
          </div>

          <div className="absolute w-[150px] h-[150px] left-[5%] bottom-[10%] rotate-3 transition-transform duration-300 hover:scale-105 hover:-rotate-3">
            <img
              src="https://raw.seadn.io/files/0919e7468d8708b3d848de4db1088bab.svg"
              alt="Flower field"
              width={180}
              height={180}
              className="rounded-[12%] shadow-lg gentle-float border-[0.3rem] border-white"
            />
          </div>

          <div className="absolute w-[150px] h-[150px] right-[5%] bottom-[11%] -rotate-3 transition-transform duration-300 hover:scale-105 hover:rotate-3">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWeU4SpfKaB9oGBcJxaiGLZwbQ2nJf0BkmNA&s"
              alt="Abstract art"
              width={160}
              height={160}
              className="rounded-[12%] shadow-lg gentle-float border-[0.3rem] border-white"
            />
          </div>

          {/* Main text */}
          <h1 className="text-center text-[80px] font-bold leading-tight mb-16 -mt-20 relative">
            REAL
            <div className={`relative transition-transform duration-300 hover:scale-105 ${rotationDirection === 1 ? 'rotate-[-4deg]' : 'rotate-[4deg]'}`} onClick={cycleText}>
              <span className={`transition-transform duration-300 hover:scale-105 text-[100px] font-[100] bg-gradient-to-r from-blue-400 via-[#FF3366] via-[#FF6633] to-[#FFCC33] text-transparent bg-clip-text cursor-pointer`} style={{ fontFamily: textOptions[currentTextIndex].font }}>
                {textOptions[currentTextIndex].text}
              </span>
              <div className="absolute inset-0 blur-2xl opacity-30 bg-gradient-to-r from-blue-400 via-[#FF3366] via-[#FF6633] to-[#FFCC33]" />
            </div>
            ONCHAIN
          </h1>

          {/* Download section */}
          <GlowingSearch />
        </div>

        {/* Footer */}
        <div className="flex gap-6 text-sm text-gray-500">
          <a href="#" className="hover:text-gray-900 hover:scale-105 flex items-center gap-1">
          <img src='https://i.ebayimg.com/images/g/-QEAAOSw2~pheAfW/s-l400.jpg' className="w-4 h-4 rounded-full object-cover" />
            Buy me a Coffee
          </a>
          <a href="#" className="hover:text-gray-900">X</a>
          <a href="#" className="hover:text-gray-900 hover:scale-105 flex items-center gap-1">
          <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/1690643591twitter-x-logo-png.webp/1024px-1690643591twitter-x-logo-png.webp.png' className="w-4 h-4 rounded-full object-cover" />
          Twitter
          </a>
          <a href="#" className="hover:text-gray-900 hover:scale-105 flex items-center gap-1">
            <img src='https://pbs.twimg.com/profile_images/1856110197418438656/lktVUaQ2_200x200.jpg' className="w-4 h-4 rounded-full object-cover" />
            Lens
          </a>
        </div>
      </div>
      <style jsx global>{`
        @font-face {
          font-family: 'TheOvercook';
          src: url('/TheOvercook-vmjYM.ttf') format('truetype');
        }
        @font-face {
          font-family: 'BulbisDemo';
          src: url('/BulbisDemoOutline-9YL3j.ttf') format('truetype');
        }
      `}</style>
    </div>
  );
}
