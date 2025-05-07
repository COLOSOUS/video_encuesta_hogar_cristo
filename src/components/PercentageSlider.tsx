import React, { useCallback } from 'react';

interface PercentageSliderProps {
  value: number;
  onChange: (value: number) => void;
}

export const PercentageSlider: React.FC<PercentageSliderProps> = ({ value, onChange }) => {
  // Throttle the onChange to match animation frames (~30fps)
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    onChange(newValue);
  }, [onChange]);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-gray-400">0%</span>
        <span className="text-2xl font-bold text-white">{value}%</span>
        <span className="text-gray-400">100%</span>
      </div>
      
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={handleChange}
        className="w-full h-3 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-orange-500"
      />
      
      <div className="relative h-2 bg-gray-700 rounded-full overflow-hidden">
        <div 
          className="absolute inset-y-0 left-0 bg-orange-500 transition-all duration-100"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
};