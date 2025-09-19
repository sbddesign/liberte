import { useState, useMemo, useEffect } from 'react'
import { BuiButtonReact as BuiButton } from '@sbddesign/bui-ui/react'
import OnboardingScreen from './components/OnboardingScreen'
import SliderScreen from './components/SliderScreen'
import FinalScreen from './components/FinalScreen'
import HomePage from './components/HomePage'
import NewInvoicePage from './components/NewInvoicePage'
import InvoiceDetailPage from './components/InvoiceDetailPage'
import InvoiceSharePage from './components/InvoiceSharePage'
import { Invoice, NewInvoicePayload } from './types'
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
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [path, setPath] = useState<string>(typeof window !== 'undefined' ? window.location.pathname : '/')

  // Check localStorage on mount
  useEffect(() => {
    const savedWalletData = localStorage.getItem('liberte-wallet')
    const savedInvoices = localStorage.getItem('liberte-invoices')
    if (savedWalletData) {
      const parsed = JSON.parse(savedWalletData)
      setWalletData(parsed)
      setCurrentScreenIndex(-2) // -2 = homepage
    }
    if (savedInvoices) {
      try {
        setInvoices(JSON.parse(savedInvoices))
      } catch {}
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

  const navigateTo = (nextPath: string) => {
    try {
      window.history.pushState({}, '', nextPath)
      setPath(nextPath)
    } catch {
      setPath(nextPath)
    }
  }
  const navigateHome = () => navigateTo('/')
  const navigateNewInvoice = () => navigateTo('/invoice/new')

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname)
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const handleCreateInvoice = (payload: NewInvoicePayload) => {
    const uuid = (typeof crypto !== 'undefined' && (crypto as any).randomUUID) ? (crypto as any).randomUUID() : `inv_${Date.now()}`
    const invoice: Invoice = {
      id: uuid,
      clientName: payload.clientName,
      amountUsd: payload.amountUsd,
      dateDue: payload.dateDue,
      description: payload.description,
      status: 'pending',
      createdAt: new Date().toISOString()
    }
    const next = [invoice, ...invoices]
    setInvoices(next)
    localStorage.setItem('liberte-invoices', JSON.stringify(next))
    navigateTo(`/invoice/${invoice.id}`)
  }

  // Create screen data with proper handlers
  const currentScreenData = useMemo(() => {
    if (currentScreenIndex < 0 || currentScreenIndex > 3) return null
    
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

  // Helper to find invoice by id
  const findInvoice = (id: string | undefined): Invoice | null => {
    if (!id) return null
    const local = JSON.parse(localStorage.getItem('liberte-invoices') || '[]') as Invoice[]
    const mem = invoices.length ? invoices : local
    return mem.find(i => i.id === id) || null
  }

  // URL-based UI once wallet exists (no external router)
  if (currentScreenIndex === -2 && walletData) {
    // Match routes
    const matchNew = path === '/invoice/new'
    const shareMatch = path.match(/^\/invoice\/([^/]+)\/share$/)
    const detailMatch = path.match(/^\/invoice\/([^/]+)$/)
    if (matchNew) {
      return (
        <NewInvoicePage 
          onCreateInvoice={handleCreateInvoice}
          onCancel={navigateHome}
        />
      )
    }
    if (shareMatch) {
      const id = shareMatch[1]
      return (
        <InvoiceSharePage 
          invoice={findInvoice(id)}
          onBack={(backId) => navigateTo(`/invoice/${backId}`)}
        />
      )
    }
    if (detailMatch) {
      const id = detailMatch[1]
      return (
        <InvoiceDetailPage 
          invoice={findInvoice(id)}
          onBack={navigateHome}
          onShare={(shareId) => navigateTo(`/invoice/${shareId}/share`)}
        />
      )
    }
    return (
      <HomePage
        username={walletData.username}
        bitcoinPercentage={walletData.bitcoinPercentage}
        hasInvoices={invoices.length > 0}
        onNewInvoice={navigateNewInvoice}
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
