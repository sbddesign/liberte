import { useRef, useState } from 'react'
import { BuiInputReact as BuiInput, BuiButtonReact as BuiButton } from '@sbddesign/bui-ui/react'
import { NewInvoicePayload } from '../types'

type BuiInputElement = HTMLElement & { value?: string }

interface NewInvoicePageProps {
  onCreateInvoice: (payload: NewInvoicePayload) => void
  onCancel: () => void
}

export default function NewInvoicePage({ onCreateInvoice }: NewInvoicePageProps) {
  const clientNameRef = useRef<BuiInputElement | null>(null)
  const amountRef = useRef<BuiInputElement | null>(null)
  const dateDueRef = useRef<BuiInputElement | null>(null)
  const descriptionRef = useRef<BuiInputElement | null>(null)

  const [error, setError] = useState<string | null>(null)

  const readValue = (el: BuiInputElement | null) => {
    if (!el) return ''
    const attrValue = el.getAttribute('value')
    return (el as any).value ?? attrValue ?? ''
  }

  const handleSubmit = () => {
    setError(null)

    const clientName = String(readValue(clientNameRef.current)).trim()
    const amountString = String(readValue(amountRef.current)).trim()
    const dateDue = String(readValue(dateDueRef.current)).trim()
    const description = String(readValue(descriptionRef.current)).trim()

    const amountUsd = parseFloat(amountString)

    if (!clientName) {
      setError('Client name is required')
      return
    }
    if (!amountString || Number.isNaN(amountUsd) || amountUsd <= 0) {
      setError('Enter a valid USD amount')
      return
    }

    const payload: NewInvoicePayload = {
      clientName,
      amountUsd,
      dateDue,
      description
    }

    onCreateInvoice(payload)
  }

  return (
    <div 
      className="bg-[var(--background-primary)] flex flex-col items-start justify-start p-9 gap-9 h-full"
      style={{ fontFamily: 'Outfit, sans-serif' }}
    >
      <div className="text-white text-4xl font-normal leading-normal shrink-0">
        <p>New Invoice</p>
      </div>

      <div className="flex flex-col gap-6 items-start justify-start shrink-0 w-full max-w-[368px]">
        <div className="text-white text-base font-normal leading-normal">
          <p>Client Name</p>
        </div>
        <BuiInput 
          ref={clientNameRef as any}
          size="large"
          placeholder="Widge Corp"
          showLabel="false"
        />

        <div className="text-white text-base font-normal leading-normal mt-6">
          <p>Amount (USD)</p>
        </div>
        <BuiInput 
          ref={amountRef as any}
          size="large"
          placeholder="1000"
          showLabel="false"
        />

        <div className="text-white text-base font-normal leading-normal mt-6">
          <p>Date Due</p>
        </div>
        <BuiInput 
          ref={dateDueRef as any}
          size="large"
          placeholder="1000"
          showLabel="false"
        />

        <div className="text-white text-base font-normal leading-normal mt-6">
          <p>What’s it for?</p>
        </div>
        <BuiInput 
          ref={descriptionRef as any}
          size="large"
          placeholder="1000"
          showLabel="false"
        />

        {error && (
          <div className="text-red-400 text-sm mt-2">{error}</div>
        )}

        <div className="mt-6 w-full">
          <BuiButton 
            label="Create Invoice"
            styleType="outline"
            size="large"
            wide="true"
            onClick={handleSubmit}
          />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 bg-[var(--background-primary)] flex items-start justify-between p-6 w-full">
        <div className="absolute border-t border-[#1d293d] border-solid inset-0 pointer-events-none shadow-[0px_-4px_12px_0px_rgba(0,0,0,0.15)]" />
        <div className="flex flex-col gap-2 items-center justify-start shrink-0">
          <div className="w-6 h-6 shrink-0" />
          <div className="text-[var(--system-interactive)] text-xl font-normal leading-normal shrink-0">
            <p>Home</p>
          </div>
        </div>
        <div className="flex flex-col gap-2 items-center justify-start shrink-0">
          <div className="w-6 h-6 shrink-0" />
          <div className="text-white text-xl font-normal leading-normal shrink-0">
            <p>Wallet</p>
          </div>
        </div>
        <div className="flex flex-col gap-2 items-center justify-start shrink-0">
          <div className="w-6 h-6 shrink-0" />
          <div className="text-white text-xl font-normal leading-normal shrink-0">
            <p>Settings</p>
          </div>
        </div>
      </div>
    </div>
  )
}


