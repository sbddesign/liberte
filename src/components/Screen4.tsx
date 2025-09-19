import React from 'react'
import { BuiButtonReact as BuiButton, BuiOptionDotReact as BuiOptionDot } from '@sbddesign/bui-ui/react'
const lionImage = '/lion.png'

interface Screen4Props {
  onBack: () => void
  onBegin: () => void
}

export default function Screen4({ onBack, onBegin }: Screen4Props) {
  return (
    <div 
      className="bg-[var(--background-primary)] flex flex-col items-center justify-start px-12 py-24 gap-12 h-full"
      style={{ fontFamily: 'Outfit, sans-serif' }}
    >
      {/* Elephant Image */}
      <div 
        className="w-[364px] h-[364px] bg-cover bg-center bg-no-repeat shrink-0"
        style={{ backgroundImage: `url('${lionImage}')` }}
      />
      
      {/* Text */}
      <div className="text-center text-white text-2xl font-normal leading-normal min-w-full shrink-0">
        <p>Choose a savings plan to automatically invest in bitcoin.</p>
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
          label="Begin"
          styleType="filled"
          size="large"
          onClick={onBegin}
        />
      </div>
      
      {/* Option Dots */}
      <div className="flex gap-4 items-start justify-start shrink-0">
        <BuiOptionDot />
        <BuiOptionDot />
        <BuiOptionDot />
        <BuiOptionDot active={true} />
        <BuiOptionDot />
        <BuiOptionDot />
      </div>
    </div>
  )
}
