import React from 'react'
import { BuiButtonReact as BuiButton } from '@sbddesign/bui-ui/react'
import ArtAndLogo from './components/ArtAndLogo'
import './App.css'

function App() {
  return (
    <div className="freedom-home">
      <ArtAndLogo />
      <div className="buttons-container">
        <BuiButton 
          label="Get Started"
          styleType="filled"
          data-name="Button" 
          data-node-id="7241:7340"
          className="get-started-button"
        />
        <BuiButton 
          label="Restore wallet"
          styleType="outline"
          data-name="Button" 
          data-node-id="7241:7341"
          className="restore-wallet-button"
        />
      </div>
    </div>
  )
}

export default App
