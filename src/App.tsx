import { useState, useMemo, useEffect } from 'react'
import { BuiButtonReact as BuiButton } from '@sbddesign/bui-ui/react'
import OnboardingScreen from './components/OnboardingScreen'
import SliderScreen from './components/SliderScreen'
import FinalScreen from './components/FinalScreen'
import HomePage from './components/HomePage'
import { onboardingScreens } from './data/onboardingData'
import './App.css'
const liberteImage = '/liberte.png';

interface WalletData {
  username: string
  bitcoinPercentage: number
  isCreated: boolean
}

function App() {
  const [currentScreenIndex, setCurrentScreenIndex] = useState<number>(-1) // -1 = home screen
  const [walletData, setWalletData] = useState<WalletData | null>(null)
  const [bitcoinPercentage, setBitcoinPercentage] = useState<number>(50)

  // Check localStorage on mount
  useEffect(() => {
    const savedWalletData = localStorage.getItem('liberte-wallet')
    if (savedWalletData) {
      const parsed = JSON.parse(savedWalletData)
      setWalletData(parsed)
      setCurrentScreenIndex(-2) // -2 = homepage
    }
  }, [])

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

  const handleBegin = (username: string) => {
    // Save wallet data to localStorage
    const newWalletData: WalletData = {
      username,
      bitcoinPercentage,
      isCreated: true
    }
    localStorage.setItem('liberte-wallet', JSON.stringify(newWalletData))
    setWalletData(newWalletData)
    setCurrentScreenIndex(-2) // Navigate to homepage
  }

  const handleBitcoinPercentageChange = (percentage: number) => {
    setBitcoinPercentage(percentage)
  }

  // Create screen data with proper handlers
  const currentScreenData = useMemo(() => {
    if (currentScreenIndex === -1 || currentScreenIndex >= 5) return null
    
    const screen = onboardingScreens[currentScreenIndex]
    return {
      ...screen,
      primaryButton: {
        ...screen.primaryButton,
        action: handleContinue
      },
      secondaryButton: screen.secondaryButton ? {
        ...screen.secondaryButton,
        action: handleBack
      } : undefined
    }
  }, [currentScreenIndex])

  // Show homepage if wallet is created
  if (currentScreenIndex === -2 && walletData) {
    return (
      <HomePage
        username={walletData.username}
        bitcoinPercentage={walletData.bitcoinPercentage}
      />
    )
  }

  // Show slider screen for screen 5
  if (currentScreenIndex === 4) {
    return (
      <SliderScreen
        onBack={handleBack}
        onBegin={handleContinue}
        onBitcoinPercentageChange={handleBitcoinPercentageChange}
        activeDotIndex={4}
        totalDots={6}
      />
    )
  }

  // Show final screen for screen 6
  if (currentScreenIndex === 5) {
    return (
      <FinalScreen
        onBack={handleBack}
        onBegin={handleBegin}
        activeDotIndex={5}
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
