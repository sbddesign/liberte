import React from 'react'
import { BuiButtonReact as BuiButton, BuiOptionDotReact as BuiOptionDot } from '@sbddesign/bui-ui/react'

export interface OnboardingScreenData {
  id: string
  image: string
  text: string
  primaryButton: {
    label: string
    action: (...args: any[]) => void
  }
  secondaryButton?: {
    label: string
    action: () => void
  }
  activeDotIndex: number
  totalDots: number
}

interface OnboardingScreenProps {
  data: OnboardingScreenData
}

export default function OnboardingScreen({ data }: OnboardingScreenProps) {
  return (
    <div 
      className="bg-[var(--background-primary)] flex flex-col items-center justify-start px-12 py-24 gap-12 h-full"
      style={{ fontFamily: 'Outfit, sans-serif' }}
    >
      {/* Animal Image */}
      <div 
        className="w-[364px] h-[364px] bg-cover bg-center bg-no-repeat shrink-0"
        style={{ backgroundImage: `url('${data.image}')` }}
      />
      
      {/* Text */}
      <div className="text-center text-white text-2xl font-normal leading-normal min-w-full shrink-0">
        <p>{data.text}</p>
      </div>
      
      {/* Buttons */}
      <div className="flex gap-4 items-start justify-center shrink-0">
        {data.secondaryButton && (
          <BuiButton 
            label={data.secondaryButton.label}
            styleType="outline"
            size="large"
            onClick={data.secondaryButton.action}
          />
        )}
        <BuiButton 
          label={data.primaryButton.label}
          styleType="filled"
          size="large"
          onClick={data.primaryButton.action}
        />
      </div>
      
      {/* Option Dots */}
      <div className="flex gap-4 items-start justify-start shrink-0">
        {Array.from({ length: data.totalDots }, (_, index) => (
          <BuiOptionDot 
            key={index} 
            active={index === data.activeDotIndex} 
          />
        ))}
      </div>
    </div>
  )
}
