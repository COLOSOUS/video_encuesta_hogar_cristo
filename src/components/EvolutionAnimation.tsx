import React, { useRef, useEffect } from 'react';

interface EvolutionAnimationProps {
  percentage: number;
}

export const EvolutionAnimation: React.FC<EvolutionAnimationProps> = ({ percentage }) => {
  const gifRef = useRef<HTMLImageElement>(null);
  
  // Use a growing plant animation
  const animationUrl = 'https://media.giphy.com/media/3oKIPEqDGUULpEU0aQ/giphy.gif';
  
  useEffect(() => {
    const img = gifRef.current;
    if (!img) return;

    // Reset GIF by reloading it
    img.src = animationUrl + '?t=' + new Date().getTime();
    
    // Adjust opacity based on percentage
    img.style.opacity = (0.3 + (percentage / 100) * 0.7).toString();
  }, [percentage]);

  return (
    <div className="relative aspect-square max-w-xl mx-auto scale-50 items-top">
  <img
    ref={gifRef}
    src={animationUrl}
    alt={`Growth animation at ${percentage}%`}
    className="w-full h-full object-cover rounded-lg transition-opacity duration-300"
  />
  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent items-top" />
  
  {/* Enhanced percentage overlay */}
  <div className="absolute inset-0 flex items-center justify-center">
    <div className="relative">
      {/* Shadow layer for better contrast */}
      <span className="absolute inset-0 text-8xl font-black text-black/50 blur-sm select-none">
        {percentage}%
      </span>
      {/* Main text with glow effect */}
      <span className="relative text-8xl font-black text-white select-none drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
        {percentage}%
      </span>
    </div>
  </div>
</div>

  );
};