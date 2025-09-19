import React from 'react'
import { BuiButtonReact as BuiButton, BuiMoneyValueReact as BuiMoneyValue, BuiBitcoinValueReact as BuiBitcoinValue } from '@sbddesign/bui-ui/react'

interface HomePageProps {
  username: string
  bitcoinPercentage: number
}

export default function HomePage({ username, bitcoinPercentage }: HomePageProps) {
  return (
    <div 
      className="bg-[var(--background-primary)] flex flex-col items-start justify-start p-9 gap-9 h-full"
      style={{ fontFamily: 'Outfit, sans-serif' }}
    >
      {/* Header */}
      <div className="text-white text-4xl font-normal leading-normal shrink-0">
        <p>At a Glance</p>
      </div>
      
      {/* Stats Cards */}
      <div className="flex flex-col gap-9 items-center justify-start shrink-0 w-full">
        {/* Top Row - Stats Cards */}
        <div className="flex gap-6 items-start justify-start shrink-0 w-full">
          {/* Pending Invoices Card */}
          <div className="flex-1 bg-[#141f3c] flex flex-col gap-2 items-center justify-start px-6 py-4 rounded-6 relative">
            <div className="absolute border border-[#1d293d] border-solid inset-0 pointer-events-none rounded-6" />
            <div className="text-white text-5xl font-normal leading-normal shrink-0">
              <p>0</p>
            </div>
            <div className="text-white text-base font-normal leading-normal shrink-0">
              <p>Pending Invoices</p>
            </div>
          </div>
          
          {/* Pending Amount Card */}
          <div className="flex-1 bg-[#141f3c] flex flex-col gap-2 items-center justify-start px-6 py-4 rounded-6 relative">
            <div className="absolute border border-[#1d293d] border-solid inset-0 pointer-events-none rounded-6" />
            <div className="flex gap-2 items-center justify-start shrink-0">
              <BuiMoneyValue 
                amount="0" 
                symbol="$" 
                showEstimate={false} 
                textSize="5xl" 
              />
            </div>
            <div className="text-white text-base font-normal leading-normal shrink-0">
              <p>Pending Amount</p>
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex gap-6 items-center justify-center shrink-0 w-full">
          <BuiButton 
            label="New Invoice"
            styleType="outline"
            size="large"
            wide
          />
          <BuiButton 
            label="My Wallet"
            styleType="outline"
            size="large"
            wide
          />
        </div>
      </div>
      
      {/* Bottom Navigation */}
      <div className="absolute bottom-0 left-0 bg-[var(--background-primary)] flex items-start justify-between p-6 w-full">
        <div className="absolute border-t border-[#1d293d] border-solid inset-0 pointer-events-none shadow-[0px_-4px_12px_0px_rgba(0,0,0,0.15)]" />
        <div className="flex flex-col gap-2 items-center justify-start shrink-0">
          <div className="w-6 h-6 shrink-0">
            {/* Home icon would go here */}
          </div>
          <div className="text-[var(--system-interactive)] text-xl font-normal leading-normal shrink-0">
            <p>Home</p>
          </div>
        </div>
        <div className="flex flex-col gap-2 items-center justify-start shrink-0">
          <div className="w-6 h-6 shrink-0">
            {/* Wallet icon would go here */}
          </div>
          <div className="text-white text-xl font-normal leading-normal shrink-0">
            <p>Wallet</p>
          </div>
        </div>
        <div className="flex flex-col gap-2 items-center justify-start shrink-0">
          <div className="w-6 h-6 shrink-0">
            {/* Settings icon would go here */}
          </div>
          <div className="text-white text-xl font-normal leading-normal shrink-0">
            <p>Settings</p>
          </div>
        </div>
      </div>
      
      {/* Call to Action Section */}
      <div className="flex flex-col gap-4 items-center justify-center px-0 py-12 shrink-0 w-full h-[480px]">
        <div className="text-white text-xl font-normal leading-normal text-center shrink-0 w-full">
          <p>
            Send your clients an
            <br />
            invoice to start receiving!
          </p>
        </div>
        <BuiButton 
          label="Create First Invoice"
          styleType="filled"
          size="large"
          wide
        />
      </div>
    </div>
  )
}
