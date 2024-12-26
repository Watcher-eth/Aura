import Image from 'next/image'
import { FramerIcon as Farcaster, HelpCircle, Instagram } from 'lucide-react'
import GlowingSearch from '~~/components/search/GlowingSearchBar'

export default function Page() {
  return (
    <div className="min-h-screen min-w-[70vw] bg-white relative overflow-hidden">
      {/* Background checkerboard pattern */}
      <div 
        className="absolute inset-0" 
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

      {/* Bottom gradient overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-[15vh] bg-gradient-to-t from-white to-transparent pointer-events-none"></div>

      <div className="relative z-10 container mx-auto px-4 py-8 min-h-screen flex flex-col items-center justify-between">
        {/* Header */}
        <div className="w-full flex justify-center mb-12">
          <div className="flex items-center gap-2">
            <img 
              src="https://media.istockphoto.com/id/1428028070/vector/abstract-background-with-blurry-magenta-and-orange-circular-shape-with-grain-spray-effect.jpg?s=612x612&w=0&k=20&c=jekWiLhrTlbV_b4ltLiKGYrDSilgvn-9H_xLWt4hL4M=" 
              alt="Rodeo logo" 
              width={24} 
              height={24} 
              className="dark:invert"
            />
            <span className="text-xl font-semibold">AURA</span>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col items-center justify-center relative w-full  mx-auto">
          {/* Floating images - positioned exactly as in screenshot */}
          <div className="absolute w-[150px] h-[150px] left-[10%] top-[5%] rotate-2">
            <img
              src="https://upload.wikimedia.org/wikipedia/en/b/bd/Pump_fun_logo.png?20241223193055"
              alt="Gradient art"
              width={150}
              height={150}
              className="rounded-2xl bg-white shadow-lg gentle-float"
            />
          </div>
          
          <div className="absolute w-[150px] h-[150px] right-[15%] top-[10%] -rotate-2">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd4yreGyWv2uCtfZ9NiIf6h8bXGdwouv-O2Q&s"
              alt="Easter Island statue"
              width={150}
              height={150}
              className="rounded-2xl bg-white shadow-lg gentle-float"
            />
          </div>

          <div className="absolute w-[120px] h-[120px] left-[20%] top-[30%] rotate-1">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkqrzNUqdQNE-PfCyyjQMyE1LyCKniZE-BDQ&s"
              alt="Profile avatar"
              width={120}
              height={120}
              className="rounded-full shadow-lg gentle-float"
            />
          </div>

          <div className="absolute w-[120px] h-[120px] right-[20%] bottom-[30%] -rotate-1">
            <img
              src="https://image.typedream.com/cdn-cgi/image/width=384,format=auto,fit=scale-down,quality=100/https://api.typedream.com/v0/document/public/1e17facc-56e9-4158-9522-8cfee85931a9/2VL60YXR4fzAMfLiIYDt95hGVhK_-E_TAwY8_400x400.png"
              alt="Profile avatar"
              width={120}
              height={120}
              className="rounded-full shadow-lg gentle-float"
            />
          </div>
          
          <div className="absolute w-[150px] h-[150px] left-[5%] bottom-[10%] rotate-3">
            <img
              src="https://static01.nyt.com/images/2021/03/12/arts/12nft-buyer-1/12nft-notebook-1-mediumSquareAt3X.jpg"
              alt="Flower field"
              width={150}
              height={150}
              className="rounded-2xl shadow-lg gentle-float"
            />
          </div>
          
          <div className="absolute w-[150px] h-[150px] right-[5%] bottom-[10%] -rotate-3">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWeU4SpfKaB9oGBcJxaiGLZwbQ2nJf0BkmNA&s"
              alt="Abstract art"
              width={150}
              height={150}
              className="rounded-2xl shadow-lg gentle-float"
            />
          </div>

          {/* Main text */}
          <h1 className="text-center  text-[80px] font-bold leading-tight mb-16 -mt-20 relative">
            REAL
            <div className="relative">
              <span className="font-['Rawbeat'] text-[100px] font-normal  bg-gradient-to-r from-[#FF3366] via-[#FF6633] to-[#FFCC33] text-transparent bg-clip-text ">
                REVIEWS
              </span>
              <div className="absolute inset-0 blur-2xl opacity-40 bg-gradient-to-r from-[#FF3366] via-[#FF6633] to-[#FFCC33]" />
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
