import React from 'react'
import { BuiButtonReact as BuiButton } from '@sbddesign/bui-ui/react'
import ArtAndLogo from './components/ArtAndLogo'
import './App.css'
import liberteImage from '../public/liberte.png';

function App() {
  return (
    <div className="text-center max-w-md mx-auto flex flex-col gap-6 w-full items-center justify-center h-full p-6">
      <img src={liberteImage} alt="Liberté" className="w-full h-auto mb-8" />
      <div className="flex flex-col mx-auto max-w-[320px] gap-6 items-center w-full h-ful">
        <BuiButton 
          label="Get Started"
          styleType="filled"
          size="large"
          wide
        />
        <BuiButton 
          label="Restore wallet"
          styleType="outline"
          size="large"
          wide
        />
      </div>
    </div>
  )
}

export default App
