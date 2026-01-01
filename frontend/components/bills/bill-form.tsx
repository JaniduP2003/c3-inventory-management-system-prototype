"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ExpenseLineItems } from "./expense-line-items"
import { CalendarIcon, Upload, Save, Printer, X } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import type { BillExpense } from "@/lib/types"
import { mockSuppliers, mockAccounts } from "@/lib/mock-data"

export function BillForm() {
  const [supplier, setSupplier] = useState("")
  const [billNumber, setBillNumber] = useState("")
  const [billDate, setBillDate] = useState<Date>(new Date())
  const [dueDate, setDueDate] = useState<Date>(new Date())
  const [currency, setCurrency] = useState("LKR")
  const [terms, setTerms] = useState("")
  const [memo, setMemo] = useState("")
  const [expenses, setExpenses] = useState<BillExpense[]>([
    {
      id: crypto.randomUUID(),
      account: "",
      amountLKR: 0,
      vatPercentage: 0,
      vatAmountLKR: 0,
      totalLKR: 0,
      amountUSD: 0,
      memo: "",
    },
  ])

  const handleClear = () => {
    setSupplier("")
    setBillNumber("")
    setBillDate(new Date())
    setDueDate(new Date())
    setCurrency("LKR")
    setTerms("")
    setMemo("")
    setExpenses([
      {
        id: crypto.randomUUID(),
        account: "",
        amountLKR: 0,
        vatPercentage: 0,
        vatAmountLKR: 0,
        totalLKR: 0,
        amountUSD: 0,
        memo: "",
      },
    ])
  }

  const handleSave = () => {
    console.log({
      supplier,
      billNumber,
      billDate,
      dueDate,
      currency,
      terms,
      memo,
      expenses,
    })
    // In a real app, this would save to the backend
  }

  const expenseAccounts = mockAccounts
    .filter((acc: typeof mockAccounts[0]) => acc.type === "Expense" || acc.type === "Cost of Goods Sold")
    .map((acc: typeof mockAccounts[0]) => ({ id: acc.id, name: acc.name }))

  return (
    <div className="space-y-6">
      {/* Bill Header */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="supplier">Supplier / Vendor</Label>
            <Select value={supplier} onValueChange={setSupplier}>
              <SelectTrigger id="supplier" className="bg-background">
                <SelectValue placeholder="Select supplier" />
              </SelectTrigger>
              <SelectContent>
                {mockSuppliers.map((sup: typeof mockSuppliers[0]) => (
                  <SelectItem key={sup.id} value={sup.id}>
                    {sup.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="billNumber">Bill Number</Label>
            <Input
              id="billNumber"
              value={billNumber}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBillNumber(e.target.value)}
              placeholder="e.g., INV-2025-001"
              className="bg-background"
            />
          </div>

          <div className="space-y-2">
            <Label>Bill Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal bg-background",
                    !billDate && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {billDate ? format(billDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={billDate}
                  onSelect={(date: Date | undefined) => date && setBillDate(date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Bill Due Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal bg-background",
                    !dueDate && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dueDate ? format(dueDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="single" selected={dueDate} onSelect={(date: Date | undefined) => date && setDueDate(date)} initialFocus />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="currency">Currency</Label>
            <Select value={currency} onValueChange={setCurrency}>
              <SelectTrigger id="currency" className="bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="LKR">LKR - Sri Lankan Rupee</SelectItem>
                <SelectItem value="USD">USD - US Dollar</SelectItem>
                <SelectItem value="EUR">EUR - Euro</SelectItem>
                <SelectItem value="GBP">GBP - British Pound</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="terms">Payment Terms</Label>
            <Select value={terms} onValueChange={setTerms}>
              <SelectTrigger id="terms" className="bg-background">
                <SelectValue placeholder="Select terms" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="net15">Net 15</SelectItem>
                <SelectItem value="net30">Net 30</SelectItem>
                <SelectItem value="net45">Net 45</SelectItem>
                <SelectItem value="net60">Net 60</SelectItem>
                <SelectItem value="due-on-receipt">Due on Receipt</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Expense Line Items */}
      <div className="space-y-2">
        <Label className="text-base font-semibold">Expense Details</Label>
        <ExpenseLineItems expenses={expenses} onChange={setExpenses} accounts={expenseAccounts} />
      </div>

      {/* Memo and Attachments */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="memo">Memo / Notes</Label>
          <Textarea
            id="memo"
            value={memo}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setMemo(e.target.value)}
            placeholder="Add any additional notes about this bill..."
            className="min-h-[100px] bg-background"
          />
        </div>
        <div className="space-y-2">
          <Label>Attachments</Label>
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-red-600 transition-colors cursor-pointer bg-background">
            <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
            <p className="text-xs text-muted-foreground mt-1">PDF, PNG, JPG up to 10MB</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <Button variant="outline" onClick={handleClear} className="gap-2 bg-transparent">
          <X className="h-4 w-4" />
          Clear
        </Button>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2 bg-transparent">
            <Printer className="h-4 w-4" />
            Print
          </Button>
          <Button onClick={handleSave} className="gap-2 bg-red-600 hover:bg-red-700 text-white">
            <Save className="h-4 w-4" />
            Save & Close
          </Button>
        </div>
      </div>
    </div>
  )
}
