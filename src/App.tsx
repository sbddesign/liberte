import { useState } from 'react'
import { BuiButtonReact as BuiButton } from '@sbddesign/bui-ui/react'
import FreedomHome from './components/FreedomHome'
import './App.css'
const liberteImage = '/liberte.png';

function App() {
  const [currentScreen, setCurrentScreen] = useState<'home' | 'freedom'>('home')

  const handleGetStarted = () => {
    setCurrentScreen('freedom')
  }

  const handleContinue = () => {
    // Handle continue action - could navigate to next screen
    console.log('Continue clicked')
  }

  if (currentScreen === 'freedom') {
    return <FreedomHome onContinue={handleContinue} />
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
