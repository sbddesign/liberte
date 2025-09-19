import React from 'react'
import { BuiButtonReact as BuiButton, BuiOptionDotReact as BuiOptionDot } from '@sbddesign/bui-ui/react'
const elephantImage = '/elephant.png'

interface FreedomHomeProps {
  onContinue: () => void
}

export default function FreedomHome({ onContinue }: FreedomHomeProps) {
  return (
    <div 
      className="bg-[var(--background-primary)] flex flex-col items-center justify-start px-12 py-24 gap-12 h-full"
      style={{ fontFamily: 'Outfit, sans-serif' }}
    >
      {/* Elephant Image */}
      <div 
        className="w-[364px] h-[364px] bg-cover bg-center bg-no-repeat shrink-0"
        style={{ backgroundImage: `url('${elephantImage}')` }}
      />
      
      {/* Text */}
      <div className="text-center text-white text-2xl font-normal leading-normal min-w-full shrink-0">
        <p>Freelancers around the world use Liberté to get paid.</p>
      </div>
      
      {/* Continue Button */}
      <div className="flex gap-4 items-start justify-center shrink-0">
        <BuiButton 
          label="Continue"
          styleType="filled"
          size="large"
          onClick={onContinue}
        />
      </div>
      
      {/* Option Dots */}
      <div className="flex gap-4 items-start justify-start shrink-0">
        <BuiOptionDot active={true} />
        <BuiOptionDot />
        <BuiOptionDot />
        <BuiOptionDot />
        <BuiOptionDot />
        <BuiOptionDot />
      </div>
    </div>
  )
}
