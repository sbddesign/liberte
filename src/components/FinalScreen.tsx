import { useState } from 'react'
import { BuiButtonReact as BuiButton, BuiOptionDotReact as BuiOptionDot, BuiInputReact as BuiInput } from '@sbddesign/bui-ui/react'

interface FinalScreenProps {
  onBack: () => void
  onBegin: (username: string) => void
  activeDotIndex: number
  totalDots: number
}

export default function FinalScreen({ onBack, onBegin, activeDotIndex, totalDots }: FinalScreenProps) {
  const [name, setName] = useState('')

  const handleNameChange = (value: string) => {
    console.log('Name changed to:', value)
    setName(value)
  }

  // Debug: Log current state
  console.log('Current name:', name, 'Length:', name.trim().length, 'Show address:', name.trim().length > 0)

  const generatePaymentAddress = (userName: string) => {
    // Simple address generation - in real app this would be more sophisticated
    const cleanName = userName.toLowerCase().replace(/[^a-z0-9]/g, '')
    return `₿${cleanName}@liberte.cash`
  }

  return (
    <div 
      className="bg-[var(--background-primary)] flex flex-col items-center justify-start px-12 py-24 gap-12 h-full"
      style={{ fontFamily: 'Outfit, sans-serif' }}
    >
      {/* Title */}
      <div className="text-center text-white text-4xl font-normal leading-normal min-w-full shrink-0">
        <p>What is your name?</p>
      </div>
      
      {/* Input Section */}
      <div className="flex flex-col gap-12 items-center justify-center shrink-0 w-full h-[380px]">
        {/* Name Input */}
        <div className="w-full">
          <BuiInput
            placeholder="your name"
            value={name}
            onChange={handleNameChange}
            onValueChange={handleNameChange}
            onInput={(e: any) => handleNameChange(e.target.value)}
            size="large"
            label="Your Name"
            wide="true"
          />
        </div>
        
        {/* Payment Address Display */}
        {name.trim().length > 0 && (
          <div className="text-center text-white text-2xl font-normal leading-normal shrink-0 w-full">
            <p>
              Your payment address will be{' '}
              <span style={{ color: 'var(--text-secondary)' }}>
                {generatePaymentAddress(name)}
              </span>
            </p>
          </div>
        )}
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
          onClick={() => onBegin(name.trim())}
          disabled={!name.trim()}
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
