import React from 'react'
import { BuiButtonReact as BuiButton, BuiOptionDotReact as BuiOptionDot } from '@sbddesign/bui-ui/react'
const tigerImage = '/tiger.png'

interface Screen2Props {
  onBack: () => void
  onContinue: () => void
}

export default function Screen2({ onBack, onContinue }: Screen2Props) {
  return (
    <div 
      className="bg-[var(--background-primary)] flex flex-col items-center justify-start px-12 py-24 gap-12 h-full"
      style={{ fontFamily: 'Outfit, sans-serif' }}
    >
      {/* Elephant Image */}
      <div 
        className="w-[364px] h-[364px] bg-cover bg-center bg-no-repeat shrink-0"
        style={{ backgroundImage: `url('${tigerImage}')` }}
      />
      
      {/* Text */}
      <div className="text-center text-white text-2xl font-normal leading-normal min-w-full shrink-0">
        <p>Your clients can pay you in their local currency.</p>
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
          onClick={onContinue}
        />
      </div>
      
      {/* Option Dots */}
      <div className="flex gap-4 items-start justify-start shrink-0">
        <BuiOptionDot />
        <BuiOptionDot active={true} />
        <BuiOptionDot />
        <BuiOptionDot />
        <BuiOptionDot />
        <BuiOptionDot />
      </div>
    </div>
  )
}
