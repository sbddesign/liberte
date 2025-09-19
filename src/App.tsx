import { useState, useMemo } from 'react'
import { BuiButtonReact as BuiButton } from '@sbddesign/bui-ui/react'
import OnboardingScreen from './components/OnboardingScreen'
import SliderScreen from './components/SliderScreen'
import { onboardingScreens } from './data/onboardingData'
import './App.css'
const liberteImage = '/liberte.png';

function App() {
  const [currentScreenIndex, setCurrentScreenIndex] = useState<number>(-1) // -1 = home screen

  const handleGetStarted = () => {
    setCurrentScreenIndex(0)
  }

  const handleContinue = () => {
    if (currentScreenIndex < onboardingScreens.length - 1) {
      setCurrentScreenIndex(currentScreenIndex + 1)
    }
  }

  const handleBack = () => {
    if (currentScreenIndex > 0) {
      setCurrentScreenIndex(currentScreenIndex - 1)
    }
  }

  const handleBegin = () => {
    // Handle begin action - could navigate to main app or next flow
    console.log('Begin clicked - ready to start!')
  }

  // Create screen data with proper handlers
  const currentScreenData = useMemo(() => {
    if (currentScreenIndex === -1) return null
    
    const screen = onboardingScreens[currentScreenIndex]
    return {
      ...screen,
      primaryButton: {
        ...screen.primaryButton,
        action: screen.id === 'screen5' ? handleBegin : handleContinue
      },
      secondaryButton: screen.secondaryButton ? {
        ...screen.secondaryButton,
        action: handleBack
      } : undefined
    }
  }, [currentScreenIndex])

  // Show slider screen for screen 5
  if (currentScreenIndex === 4) {
    return (
      <SliderScreen
        onBack={handleBack}
        onBegin={handleBegin}
        activeDotIndex={4}
        totalDots={6}
      />
    )
  }

  // Show onboarding screen if we're in the flow
  if (currentScreenData) {
    return <OnboardingScreen data={currentScreenData} />
  }

  return (
    <div className="text-center max-w-md mx-auto flex flex-col gap-6 w-full items-center justify-center h-full p-6">
      <img src={liberteImage} alt="Liberté" className="w-full h-auto mb-8" />
      <div className="flex flex-col mx-auto max-w-[320px] gap-6 items-center w-full h-ful">
        <BuiButton 
          label="Get Started"
          styleType="filled"
          size="large"
          wide="true"
          onClick={handleGetStarted}
        />
        <BuiButton 
          label="Restore wallet"
          styleType="outline"
          size="large"
          wide="true"
        />
      </div>
    </div>
  )
}

export default App
