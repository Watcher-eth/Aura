"use client"
import Image from 'next/image'
import { FramerIcon as Farcaster, HelpCircle, Instagram } from 'lucide-react'
import GlowingSearch from '~~/components/search/GlowingSearchBar'
import { useMemo } from 'react'

// Add global styles for emoji font
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Noto+Color+Emoji&display=swap');
  
  .emoji {
    font-family: 'Noto Color Emoji', Apple Color Emoji, Segoe UI Emoji, sans-serif;
  }
`;

export default function Page() {
  // Array of emojis to use
  const emojis = "🏦💰🤑💵💸🏧🇺🇸😊🎉💎🎊💫⭐️💰🎈🌟✨💫🔥💲🌈🍾🥂🎰🎁💼💹📈🪙💳🧧🎯🎰🏆".split('')

  // Function to generate random position within constraints
  const generatePosition = (isBottom = false) => {
    if (isBottom) {
      return {
        left: `${Math.random() * 120 - 10}%`,
        bottom: `${Math.random() * 80 - 40}px`,
        transform: `rotate(${Math.random() * 360}deg) scale(${0.5 + Math.random() * 1.5})`
      }
    }
    return {
      left: `${Math.random() * 120 - 60}px`,
      top: `${Math.random() * 120 - 10}%`,
      transform: `rotate(${Math.random() * 360}deg) scale(${0.5 + Math.random() * 1.5})`
    }
  }

  // Generate arrays of positioned emojis using useMemo
  const leftEmojis = useMemo(() => 
    Array(250).fill(null).map((_, i) => ({
      emoji: emojis[i % emojis.length],
      ...generatePosition()
    })), []
  )

  const rightEmojis = useMemo(() => 
    Array(200).fill(null).map((_, i) => ({
      emoji: emojis[i % emojis.length],
      ...generatePosition()
    })), []
  )

  const bottomEmojis = useMemo(() => 
    Array(350).fill(null).map((_, i) => ({
      emoji: emojis[i % emojis.length],
      ...generatePosition(true)
    })), []
  )

  return (
    <div className="relative min-h-screen bg-white overflow-hidden">
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
          backgroundPosition: '0 0, 0 20px, 20px -20px, -20px 0px'
        }}
      />
      {/* Left Border */}
      <div className="fixed left-0 top-0 z-[10] bottom-0 w-32 overflow-hidden pointer-events-none">
        {leftEmojis.map((item, i) => (
          <span
            key={`left-${i}`}
            className="absolute text-4xl emoji"
            style={{
              left: item.left,
              top: item.top,
              transform: item.transform,
              zIndex: Math.floor(Math.random() * 30),
              opacity: 0.7 + Math.random() * 0.3
            }}
          >
            {item.emoji}
          </span>
        ))}
      </div>

      {/* Right Border */}
      <div className="fixed right-0 z-[10] top-0 bottom-0 w-32 overflow-hidden pointer-events-none">
        {rightEmojis.map((item, i) => (
          <span
            key={`right-${i}`}
            className="absolute text-4xl emoji"
            style={{
              right: item.left,
              top: item.top,
              transform: item.transform,
              zIndex: Math.floor(Math.random() * 30),
              opacity: 0.7 + Math.random() * 0.3
            }}
          >
            {item.emoji}
          </span>
        ))}
      </div>

      {/* Bottom Border */}
      <div className="fixed bottom-0 z-[10] left-0 right-0 h-48 overflow-hidden pointer-events-none">
        {bottomEmojis.map((item, i) => (
          <span
            key={`bottom-${i}`}
            className="absolute text-4xl emoji"
            style={{
              left: item.left,
              bottom: item.bottom,
              transform: item.transform,
              zIndex: Math.floor(Math.random() * 30),
              opacity: 0.7 + Math.random() * 0.3
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
        <div className="flex-1 flex flex-col items-center justify-center relative w-full  mx-auto">
          {/* Floating images - positioned exactly as in screenshot */}
          <div className="absolute w-[150px] h-[150px] left-[10%] top-[5%] rotate-2 transition-transform duration-300 hover:scale-105 hover:-rotate-2">
            <img
              src="https://upload.wikimedia.org/wikipedia/en/b/bd/Pump_fun_logo.png"
              alt="Gradient art"
              width={150}
              height={150}
              className="rounded-2xl bg-green-200 shadow-lg gentle-float border-4 border-white"
            />
          </div>
          
          <div className="absolute w-[150px] h-[150px] right-[15%] top-[10%] -rotate-2 transition-transform duration-300 hover:scale-105 hover:rotate-2">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd4yreGyWv2uCtfZ9NiIf6h8bXGdwouv-O2Q&s"
              alt="Easter Island statue"
              width={150}
              height={150}
              className="rounded-2xl bg-white shadow-lg gentle-float border-4 border-white"
            />
          </div>

          <div className="absolute w-[120px] h-[120px] left-[17%] top-[37%] rotate-1 transition-transform duration-300 hover:scale-105 hover:-rotate-1">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkqrzNUqdQNE-PfCyyjQMyE1LyCKniZE-BDQ&s"
              alt="Profile avatar"
              width={120}
              height={120}
              className="rounded-full shadow-lg gentle-float border-4 border-white"
            />
          </div>

          <div className="absolute w-[120px] h-[120px] right-[17%] bottom-[38%] -rotate-1 transition-transform duration-300 hover:scale-105 hover:rotate-1">
            <img
              src="https://image.typedream.com/cdn-cgi/image/width=384,format=auto,fit=scale-down,quality=100/https://api.typedream.com/v0/document/public/1e17facc-56e9-4158-9522-8cfee85931a9/2VL60YXR4fzAMfLiIYDt95hGVhK_-E_TAwY8_400x400.png"
              alt="Profile avatar"
              width={120}
              height={120}
              className="rounded-full shadow-lg gentle-float border-4 border-white"
            />
          </div>
          
          <div className="absolute w-[150px] h-[150px] left-[5%] bottom-[10%] rotate-3 transition-transform duration-300 hover:scale-105 hover:-rotate-3">
            <img
              src="https://static01.nyt.com/images/2021/03/12/arts/12nft-buyer-1/12nft-notebook-1-mediumSquareAt3X.jpg"
              alt="Flower field"
              width={150}
              height={150}
              className="rounded-2xl shadow-lg gentle-float border-4 border-white"
            />
          </div>
          
          <div className="absolute w-[150px] h-[150px] right-[5%] bottom-[11%] -rotate-3 transition-transform duration-300 hover:scale-105 hover:rotate-3">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWeU4SpfKaB9oGBcJxaiGLZwbQ2nJf0BkmNA&s"
              alt="Abstract art"
              width={150}
              height={150}
              className="rounded-2xl shadow-lg gentle-float border-4 border-white"
            />
          </div>

          {/* Main text */}
          <h1 className="text-center  text-[80px] font-bold leading-tight mb-16 -mt-20 relative">
            REAL
            <div className="relative">
              <span className="font-['Rawbeat'] text-[100px] font-[100]  bg-gradient-to-r from-blue-400 via-[#FF3366] via-[#FF6633] to-[#FFCC33] text-transparent bg-clip-text ">
                REVIEWS
              </span>
              <div className="absolute inset-0 blur-2xl opacity-40 bg-gradient-to-r from-blue-400 via-[#FF3366] via-[#FF6633] to-[#FFCC33]" />
            </div>
            ONCHAIN
          </h1>

          {/* Download section */}
          <GlowingSearch />   


        </div>

        {/* Footer */}
        <div className="flex gap-6 text-sm text-gray-500">
          <a href="#" className="hover:text-gray-900 flex items-center gap-1">
            <HelpCircle className="w-4 h-4" />
            Help Center
          </a>
          <a href="#" className="hover:text-gray-900">X</a>
          <a href="#" className="hover:text-gray-900 flex items-center gap-1">
            <Instagram className="w-4 h-4" />
            Instagram
          </a>
          <a href="#" className="hover:text-gray-900 flex items-center gap-1">
            <Farcaster className="w-4 h-4" />
            Farcaster
          </a>
        </div>
      </div>
    </div>
  )
}
