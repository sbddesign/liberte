import React, { useState } from 'react'
import { BuiButtonReact as BuiButton, BuiOptionDotReact as BuiOptionDot } from '@sbddesign/bui-ui/react'

interface SliderScreenProps {
  onBack: () => void
  onBegin: () => void
  onBitcoinPercentageChange: (percentage: number) => void
  activeDotIndex: number
  totalDots: number
}

export default function SliderScreen({ onBack, onBegin, onBitcoinPercentageChange, activeDotIndex, totalDots }: SliderScreenProps) {
  const [percentage, setPercentage] = useState(50)

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPercentage = parseInt(event.target.value)
    setPercentage(newPercentage)
    onBitcoinPercentageChange(newPercentage)
  }

  return (
    <div 
      className="bg-[var(--background-primary)] flex flex-col items-center justify-start px-12 py-24 gap-12 h-full"
      style={{ fontFamily: 'Outfit, sans-serif' }}
    >
      {/* Title */}
      <div className="text-center text-white text-4xl font-normal leading-normal min-w-full shrink-0">
        <p>How much do you want to save?</p>
      </div>
      
      {/* Slider Section */}
      <div className="flex flex-col gap-8 items-start justify-start shrink-0 w-full">
        {/* Percentage Display */}
        <div 
          className="text-center text-white text-8xl font-normal leading-normal w-full"
          style={{ fontFamily: 'var(--font-family-display)' }}
        >
          <p>{percentage}%</p>
        </div>
        
        {/* Slider */}
        <div className="rounded-[53px] w-full h-[67px] p-2.5 flex items-center" style={{ backgroundColor: 'var(--background-secondary)' }}>
          <div 
            className="h-full rounded-[53px] transition-all duration-200"
            style={{ 
              width: `${percentage}%`,
              backgroundColor: 'var(--system-interactive)'
            }}
          />
        </div>
        
        {/* Range Input (hidden but functional) */}
        <input
          type="range"
          min="0"
          max="100"
          value={percentage}
          onChange={handleSliderChange}
          className="w-full h-2 bg-transparent appearance-none cursor-pointer slider"
          style={{
            background: `linear-gradient(to right, var(--system-interactive) 0%, var(--system-interactive) ${percentage}%, var(--background-secondary) ${percentage}%, var(--background-secondary) 100%)`
          }}
        />
      </div>
      
      {/* Description Text */}
      <div className="text-center text-white text-xl font-normal leading-normal min-w-full shrink-0">
        <p>This will auto-convert {percentage}% of every payment you receive to bitcoin.</p>
      </div>
      
      {/* Buttons */}
      <div className="flex gap-4 items-start justify-center shrink-0">
        <BuiButton 
          label="Back"
          styleType="outline"
          size="large"
          onClick={onBack}
        />
        <BuiButton 
          label="Continue"
          styleType="filled"
          size="large"
          onClick={onBegin}
        />
      </div>
      
      {/* Option Dots */}
      <div className="flex gap-4 items-start justify-start shrink-0">
        {Array.from({ length: totalDots }, (_, index) => (
          <BuiOptionDot 
            key={index} 
            active={index === activeDotIndex} 
          />
        ))}
      </div>
    </div>
  )
}
