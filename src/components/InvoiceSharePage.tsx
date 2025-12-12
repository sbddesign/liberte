import { BuiButtonReact as BuiButton, BuiMoneyValueReact as BuiMoneyValue } from '@sbddesign/bui-ui/react'
import { Invoice } from '../types'

interface InvoiceSharePageProps {
  invoice: Invoice | null
  onBack: (id: string) => void
}

export default function InvoiceSharePage({ invoice, onBack }: InvoiceSharePageProps) {
  if (!invoice) {
    return (
      <div className="bg-[var(--background-primary)] flex flex-col items-center justify-center p-9 gap-6 h-full" style={{ fontFamily: 'Outfit, sans-serif' }}>
        <div className="text-white text-xl">Invoice not found</div>
      </div>
    )
  }

  const shareUrl = `${window.location.origin}/invoice/${invoice.id}/share`

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
    } catch {}
  }

  return (
    <div className="bg-[var(--background-primary)] flex flex-col items-start justify-start p-9 gap-9 h-full" style={{ fontFamily: 'Outfit, sans-serif' }}>
      <div className="text-white text-4xl">
        <p>Share Invoice</p>
      </div>

      <div className="flex flex-col gap-4 w-full max-w-[368px]">
        <div className="text-white text-base">Client</div>
        <div className="text-white text-xl">{invoice.clientName}</div>

        <div className="text-white text-base mt-6">Amount</div>
        <div className="flex items-center gap-2">
          <BuiMoneyValue amount={String(invoice.amountUsd)} symbol="$" showEstimate="false" textSize="4xl" />
        </div>

        <div className="text-white text-base mt-6">Share Link</div>
        <div className="text-white text-sm break-all">{shareUrl}</div>
      </div>

      <div className="mt-8 w-full max-w-[368px] flex gap-3">
        <BuiButton label="Copy Link" styleType="outline" size="large" onClick={copy} />
        <BuiButton label="Back" styleType="outline" size="large" onClick={() => onBack(invoice.id)} />
      </div>
    </div>
  )
}


