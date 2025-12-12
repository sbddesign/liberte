import { BuiButtonReact as BuiButton, BuiMoneyValueReact as BuiMoneyValue } from '@sbddesign/bui-ui/react'
import { Invoice } from '../types'

interface InvoiceDetailPageProps {
  invoice: Invoice | null
  onBack: () => void
  onShare: (id: string) => void
}

export default function InvoiceDetailPage({ invoice, onBack, onShare }: InvoiceDetailPageProps) {
  if (!invoice) {
    return (
      <div className="bg-[var(--background-primary)] flex flex-col items-center justify-center p-9 gap-6 h-full" style={{ fontFamily: 'Outfit, sans-serif' }}>
        <div className="text-white text-xl">Invoice not found</div>
        <BuiButton label="Back" styleType="outline" size="large" onClick={onBack} />
      </div>
    )
  }

  return (
    <div className="bg-[var(--background-primary)] flex flex-col items-start justify-start p-9 gap-9 h-full" style={{ fontFamily: 'Outfit, sans-serif' }}>
      <div className="text-white text-4xl">
        <p>Invoice</p>
      </div>

      <div className="flex flex-col gap-4 w-full max-w-[368px]">
        <div className="text-white text-base">Client</div>
        <div className="text-white text-xl">{invoice.clientName}</div>

        <div className="text-white text-base mt-6">Amount</div>
        <div className="flex items-center gap-2">
          <BuiMoneyValue amount={String(invoice.amountUsd)} symbol="$" showEstimate="false" textSize="4xl" />
        </div>

        <div className="text-white text-base mt-6">Date Due</div>
        <div className="text-white text-xl">{invoice.dateDue || '—'}</div>

        <div className="text-white text-base mt-6">What’s it for?</div>
        <div className="text-white text-xl">{invoice.description || '—'}</div>
      </div>

      <div className="mt-8 w-full max-w-[368px]">
        <BuiButton label="Share Link" styleType="outline" size="large" wide="true" onClick={() => onShare(invoice.id)} />
      </div>

      <div className="mt-2 w-full max-w-[368px]">
        <BuiButton label="Back" styleType="outline" size="large" onClick={onBack} />
      </div>
    </div>
  )
}


