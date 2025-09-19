export interface Invoice {
  id: string
  clientName: string
  amountUsd: number
  dateDue: string
  description: string
  status: 'pending' | 'paid'
  createdAt: string
}

export interface NewInvoicePayload {
  clientName: string
  amountUsd: number
  dateDue: string
  description: string
}


