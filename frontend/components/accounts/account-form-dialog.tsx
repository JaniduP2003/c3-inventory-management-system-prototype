"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus } from "lucide-react"

const accountTypes = [
  "Bank",
  "Cash",
  "Accounts Receivable",
  "Other Current",
  "Fixed Asset",
  "Other Asset",
  "Accounts Payable",
  "Other Current Liability",
  "Equity",
  "Income",
  "Cost of Goods Sold",
  "Expense",
  "Other Income",
  "Other Expense",
]

const currencies = ["LKR", "USD", "EUR", "GBP"]

export function AccountFormDialog() {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2 bg-emerald-600 hover:bg-emerald-700 text-white">
          <Plus className="h-4 w-4" />
          New Account
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Create New Account</DialogTitle>
          <DialogDescription>Add a new account to your chart of accounts.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="accountName">Account Name</Label>
            <Input id="accountName" placeholder="e.g., Office Supplies" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="accountNumber">Account Number (Optional)</Label>
            <Input id="accountNumber" placeholder="e.g., 6003" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="accountType">Account Type</Label>
              <Select>
                <SelectTrigger id="accountType">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {accountTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="currency">Currency</Label>
              <Select defaultValue="LKR">
                <SelectTrigger id="currency">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((currency) => (
                    <SelectItem key={currency} value={currency}>
                      {currency}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="openingBalance">Opening Balance</Label>
            <Input id="openingBalance" type="number" placeholder="0.00" defaultValue="0" />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setOpen(false)} className="bg-emerald-600 hover:bg-emerald-700 text-white">
            Create Account
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
