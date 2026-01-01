"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Plus, Trash2 } from "lucide-react"
import type { BillExpense } from "@/lib/types"

interface ExpenseLineItemsProps {
  expenses: BillExpense[]
  onChange: (expenses: BillExpense[]) => void
  accounts: Array<{ id: string; name: string }>
}

export function ExpenseLineItems({ expenses, onChange, accounts }: ExpenseLineItemsProps) {
  const [exchangeRate] = useState(325) // LKR to USD exchange rate

  const addExpense = () => {
    const newExpense: BillExpense = {
      id: crypto.randomUUID(),
      account: "",
      amountLKR: 0,
      vatPercentage: 0,
      vatAmountLKR: 0,
      totalLKR: 0,
      amountUSD: 0,
      memo: "",
    }
    onChange([...expenses, newExpense])
  }

  const removeExpense = (id: string) => {
    onChange(expenses.filter((exp) => exp.id !== id))
  }

  const updateExpense = (id: string, field: keyof BillExpense, value: string | number) => {
    onChange(
      expenses.map((exp) => {
        if (exp.id === id) {
          const updated = { ...exp, [field]: value }
          // Auto-calculate USD from LKR
          if (field === "amountLKR") {
            updated.amountUSD = Number(value) / exchangeRate
          }
          // Auto-calculate LKR from USD
          if (field === "amountUSD") {
            updated.amountLKR = Number(value) * exchangeRate
          }
          return updated
        }
        return exp
      }),
    )
  }

  const getTotalLKR = () => {
    return expenses.reduce((sum, exp) => sum + (exp.amountLKR || 0), 0)
  }

  const getTotalUSD = () => {
    return expenses.reduce((sum, exp) => sum + (exp.amountUSD || 0), 0)
  }

  const getTotalVAT = () => {
    return expenses.reduce((sum, exp) => sum + (exp.amountLKR * (exp.vatPercentage / 100) || 0), 0)
  }

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-border overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 bg-muted p-3 font-semibold text-sm text-foreground">
          <div className="col-span-3">Account</div>
          <div className="col-span-2">Amount (LKR)</div>
          <div className="col-span-2">VAT %</div>
          <div className="col-span-2">Amount (USD)</div>
          <div className="col-span-2">Memo</div>
          <div className="col-span-1"></div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-border">
          {expenses.map((expense) => (
            <div
              key={expense.id}
              className="grid grid-cols-12 gap-4 p-3 items-center hover:bg-accent transition-colors"
            >
              <div className="col-span-3">
                <Select value={expense.account} onValueChange={(value: string) => updateExpense(expense.id, "account", value)}>
                  <SelectTrigger className="h-9 bg-background">
                    <SelectValue placeholder="Select account" />
                  </SelectTrigger>
                  <SelectContent>
                    {accounts.map((account) => (
                      <SelectItem key={account.id} value={account.id}>
                        {account.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-2">
                <Input
                  type="number"
                  value={expense.amountLKR || ""}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateExpense(expense.id, "amountLKR", Number(e.target.value))}
                  placeholder="0.00"
                  className="h-9 bg-background"
                />
              </div>
              <div className="col-span-2">
                <Select
                  value={String(expense.vatPercentage)}
                  onValueChange={(value: string) => updateExpense(expense.id, "vatPercentage", Number(value))}
                >
                  <SelectTrigger className="h-9 bg-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">0%</SelectItem>
                    <SelectItem value="8">8%</SelectItem>
                    <SelectItem value="12">12%</SelectItem>
                    <SelectItem value="15">15%</SelectItem>
                    <SelectItem value="18">18%</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-2">
                <Input
                  type="number"
                  value={expense.amountUSD || ""}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateExpense(expense.id, "amountUSD", Number(e.target.value))}
                  placeholder="0.00"
                  className="h-9 bg-background"
                />
              </div>
              <div className="col-span-2">
                <Input
                  value={expense.memo || ""}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateExpense(expense.id, "memo", e.target.value)}
                  placeholder="Note..."
                  className="h-9 bg-background"
                />
              </div>
              <div className="col-span-1 flex justify-end">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeExpense(expense.id)}
                  className="h-8 w-8 text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Totals */}
        <div className="bg-muted p-4 space-y-2 border-t border-border">
          <div className="flex justify-between text-sm">
            <span className="font-medium text-foreground">Subtotal (LKR):</span>
            <span className="font-semibold text-foreground">
              {getTotalLKR().toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="font-medium text-foreground">Total VAT (LKR):</span>
            <span className="font-semibold text-foreground">
              {getTotalVAT().toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </span>
          </div>
          <div className="flex justify-between text-lg border-t border-border pt-2">
            <span className="font-semibold text-foreground">Total (USD):</span>
            <span className="font-bold text-red-600">
              ${getTotalUSD().toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </span>
          </div>
        </div>
      </div>

      {/* Add Line Button */}
      <Button onClick={addExpense} variant="outline" className="gap-2 bg-transparent">
        <Plus className="h-4 w-4" />
        Add Line Item
      </Button>
    </div>
  )
}
