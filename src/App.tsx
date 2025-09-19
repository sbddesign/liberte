import { useState } from 'react'
import { BuiButtonReact as BuiButton } from '@sbddesign/bui-ui/react'
import FreedomHome from './components/FreedomHome'
import Screen2 from './components/Screen2'
import Screen3 from './components/Screen3'
import Screen4 from './components/Screen4'
import './App.css'
const liberteImage = '/liberte.png';

function App() {
  const [currentScreen, setCurrentScreen] = useState<'home' | 'screen1' | 'screen2' | 'screen3' | 'screen4'>('home')

  const handleGetStarted = () => {
    setCurrentScreen('screen1')
  }

  const handleContinue = () => {
    if (currentScreen === 'screen1') {
      setCurrentScreen('screen2')
    } else if (currentScreen === 'screen2') {
      setCurrentScreen('screen3')
    } else if (currentScreen === 'screen3') {
      setCurrentScreen('screen4')
    }
  }

  const handleBack = () => {
    if (currentScreen === 'screen2') {
      setCurrentScreen('screen1')
    } else if (currentScreen === 'screen3') {
      setCurrentScreen('screen2')
    } else if (currentScreen === 'screen4') {
      setCurrentScreen('screen3')
    }
  }

  const handleBegin = () => {
    // Handle begin action - could navigate to main app or next flow
    console.log('Begin clicked - ready to start!')
  }

  if (currentScreen === 'screen1') {
    return <FreedomHome onContinue={handleContinue} />
  }

  if (currentScreen === 'screen2') {
    return <Screen2 onBack={handleBack} onContinue={handleContinue} />
  }

  if (currentScreen === 'screen3') {
    return <Screen3 onBack={handleBack} onContinue={handleContinue} />
  }

  if (currentScreen === 'screen4') {
    return <Screen4 onBack={handleBack} onBegin={handleBegin} />
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
