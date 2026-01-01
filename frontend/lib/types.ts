export interface Account {
  id: string
  name: string
  accountNumber?: string
  type: string
  balance: number
  currency: string
  parent?: string
  children?: Account[]
}

export interface Supplier {
  id: string
  name: string
  email: string
  phone: string
  address: string
  balance?: number
  currency?: string
  status?: string
  totalPurchases?: number
}

export interface BillExpense {
  id: string
  account: string
  amountLKR: number
  vatPercentage: number
  vatAmountLKR: number
  totalLKR: number
  amountUSD: number
  memo: string
}

export interface Bill {
  id: string
  billNumber: string
  supplier: string
  billDate: Date
  dueDate: Date
  totalAmount: number
  status: string
  expenses: BillExpense[]
}
