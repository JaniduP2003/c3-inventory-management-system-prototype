"use client";

import { useState } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Calendar, Plus, Trash2, Paperclip, Save, X } from "lucide-react";

interface ExpenseLine {
  id: string;
  account: string;
  amountLKR: string;
  currency: string;
  vat: string;
  amountUSD: string;
  memo: string;
}

export default function BillsPage() {
  const [supplier, setSupplier] = useState("");
  const [address, setAddress] = useState("");
  const [terms, setTerms] = useState("");
  const [memo, setMemo] = useState("");
  const [date, setDate] = useState("10/12/2025");
  const [amountDue, setAmountDue] = useState("0.00");
  const [billDue, setBillDue] = useState("26/12/2025");

  const [expenses, setExpenses] = useState<ExpenseLine[]>([
    {
      id: "1",
      account: "",
      amountLKR: "",
      currency: "Rupees",
      vat: "",
      amountUSD: "",
      memo: "",
    },
  ]);

  const addExpenseLine = () => {
    setExpenses([
      ...expenses,
      {
        id: Date.now().toString(),
        account: "",
        amountLKR: "",
        currency: "Rupees",
        vat: "",
        amountUSD: "",
        memo: "",
      },
    ]);
  };

  const removeExpenseLine = (id: string) => {
    if (expenses.length > 1) {
      setExpenses(expenses.filter((exp) => exp.id !== id));
    }
  };

  const updateExpense = (
    id: string,
    field: keyof ExpenseLine,
    value: string
  ) => {
    setExpenses(
      expenses.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp))
    );
  };

  return (
    <MainLayout>
      <div className="flex h-full flex-col bg-background">
        {/* Toolbar */}
        <div className="border-b border-border bg-muted/30 px-4 py-2">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="h-8 gap-1.5 bg-transparent"
            >
              <Plus className="h-3.5 w-3.5" />
              <span className="text-xs">New</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-8 gap-1.5 bg-transparent"
            >
              <Save className="h-3.5 w-3.5" />
              <span className="text-xs">Save</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-8 gap-1.5 bg-transparent"
            >
              <X className="h-3.5 w-3.5" />
              <span className="text-xs">Delete</span>
            </Button>
            <div className="mx-2 h-6 w-px bg-border" />
            <Button
              variant="outline"
              size="sm"
              className="h-8 gap-1.5 bg-transparent"
            >
              <span className="text-xs">Create a Copy</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-8 gap-1.5 bg-transparent"
            >
              <span className="text-xs">Memorize</span>
            </Button>
            <div className="mx-2 h-6 w-px bg-border" />
            <Button
              variant="outline"
              size="sm"
              className="h-8 gap-1.5 bg-transparent"
            >
              <span className="text-xs">Print</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-8 gap-1.5 bg-transparent"
            >
              <Paperclip className="h-3.5 w-3.5" />
              <span className="text-xs">Attach File</span>
            </Button>
            <div className="mx-2 h-6 w-px bg-border" />
            <Button
              variant="outline"
              size="sm"
              className="h-8 gap-1.5 bg-transparent"
            >
              <span className="text-xs">Mark inc VAT</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-8 gap-1.5 bg-transparent"
            >
              <Calendar className="h-3.5 w-3.5" />
              <span className="text-xs">Enter Time</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-8 gap-1.5 bg-transparent"
            >
              <span className="text-xs">Clear Splits</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-8 gap-1.5 bg-transparent"
            >
              <span className="text-xs">Recalculate</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-8 gap-1.5 bg-transparent"
            >
              <span className="text-xs">Pay Bill</span>
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto p-6">
          <div className="mx-auto max-w-6xl">
            {/* Bill Header */}
            <div className="mb-6 rounded-lg border border-border bg-card p-6">
              <div className="mb-4 flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 text-xs bg-transparent"
                >
                  List
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 text-xs bg-transparent"
                >
                  Credit
                </Button>
                <div className="flex items-center gap-2">
                  <Label className="text-xs font-medium">All Accounts:</Label>
                  <Select defaultValue="payable">
                    <SelectTrigger className="h-7 w-48 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="payable">
                        12 Payable-Catalog Payable
                      </SelectItem>
                      <SelectItem value="other">Other Account</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="ml-auto">
                  <label className="flex items-center gap-2 text-xs">
                    <input type="checkbox" className="h-4 w-4" defaultChecked />
                    <span>Bill Received</span>
                  </label>
                </div>
              </div>

              <h2 className="mb-4 text-2xl font-semibold">Bill</h2>

              <div className="grid grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="supplier" className="text-xs font-medium">
                      SUPPLIER
                    </Label>
                    <Select value={supplier} onValueChange={setSupplier}>
                      <SelectTrigger id="supplier" className="mt-1">
                        <SelectValue placeholder="Select supplier" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="supplier1">Supplier 1</SelectItem>
                        <SelectItem value="supplier2">Supplier 2</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="address" className="text-xs font-medium">
                      ADDRESS
                    </Label>
                    <Textarea
                      id="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="mt-1 min-h-[80px]"
                    />
                  </div>

                  <div>
                    <Label htmlFor="terms" className="text-xs font-medium">
                      TERMS
                    </Label>
                    <Select value={terms} onValueChange={setTerms}>
                      <SelectTrigger id="terms" className="mt-1">
                        <SelectValue placeholder="Select terms" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="net30">Net 30</SelectItem>
                        <SelectItem value="net60">Net 60</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="memo" className="text-xs font-medium">
                      MEMO
                    </Label>
                    <Input
                      id="memo"
                      value={memo}
                      onChange={(e) => setMemo(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="date" className="text-xs font-medium">
                        DATE
                      </Label>
                      <Input
                        id="date"
                        type="text"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="ref" className="text-xs font-medium">
                        REF. NO
                      </Label>
                      <Input id="ref" className="mt-1" />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="amountDue" className="text-xs font-medium">
                      AMOUNT DUE
                    </Label>
                    <div className="mt-1 flex items-center gap-2">
                      <span className="rounded border border-border bg-red-600 px-3 py-2 text-sm font-medium text-white">
                        LKR
                      </span>
                      <Input
                        id="amountDue"
                        value={amountDue}
                        onChange={(e) => setAmountDue(e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="billDue" className="text-xs font-medium">
                      BILL DUE
                    </Label>
                    <Input
                      id="billDue"
                      type="text"
                      value={billDue}
                      onChange={(e) => setBillDue(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Expenses Table */}
            <div className="rounded-lg border border-border bg-card">
              <div className="border-b border-border bg-muted/30 px-4 py-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">Expenses</h3>
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-medium">LKR 0.00</span>
                    <span className="text-xs text-muted-foreground">
                      Rupees
                    </span>
                    <span className="text-xs text-muted-foreground">
                      USD 0.00
                    </span>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-8"></TableHead>
                      <TableHead className="min-w-[200px]">ACCOUNT</TableHead>
                      <TableHead className="w-32">AMOUNT (LKR)</TableHead>
                      <TableHead className="w-32">CURRENCY</TableHead>
                      <TableHead className="w-24">VAT</TableHead>
                      <TableHead className="w-32">AMOUNT (USD)</TableHead>
                      <TableHead className="min-w-[150px]">MEMO</TableHead>
                      <TableHead className="w-8"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {expenses.map((expense, index) => (
                      <TableRow key={expense.id}>
                        <TableCell className="text-center text-xs text-muted-foreground">
                          {index + 1}
                        </TableCell>
                        <TableCell>
                          <Select
                            value={expense.account}
                            onValueChange={(value) =>
                              updateExpense(expense.id, "account", value)
                            }
                          >
                            <SelectTrigger className="h-8 text-xs">
                              <SelectValue placeholder="Select account" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="supplies">
                                Office Supplies
                              </SelectItem>
                              <SelectItem value="utilities">
                                Utilities
                              </SelectItem>
                              <SelectItem value="rent">Rent</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <Input
                            type="text"
                            value={expense.amountLKR}
                            onChange={(e) =>
                              updateExpense(
                                expense.id,
                                "amountLKR",
                                e.target.value
                              )
                            }
                            className="h-8 text-xs"
                          />
                        </TableCell>
                        <TableCell>
                          <Select
                            value={expense.currency}
                            onValueChange={(value) =>
                              updateExpense(expense.id, "currency", value)
                            }
                          >
                            <SelectTrigger className="h-8 text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Rupees">Rupees</SelectItem>
                              <SelectItem value="USD">USD</SelectItem>
                              <SelectItem value="EUR">EUR</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <Input
                            type="text"
                            value={expense.vat}
                            onChange={(e) =>
                              updateExpense(expense.id, "vat", e.target.value)
                            }
                            className="h-8 text-xs"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="text"
                            value={expense.amountUSD}
                            onChange={(e) =>
                              updateExpense(
                                expense.id,
                                "amountUSD",
                                e.target.value
                              )
                            }
                            className="h-8 text-xs"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="text"
                            value={expense.memo}
                            onChange={(e) =>
                              updateExpense(expense.id, "memo", e.target.value)
                            }
                            className="h-8 text-xs"
                          />
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => removeExpenseLine(expense.id)}
                            disabled={expenses.length === 1}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="border-t border-border p-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={addExpenseLine}
                  className="gap-2 bg-transparent"
                >
                  <Plus className="h-4 w-4" />
                  Add Line
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex justify-end gap-3">
              <Button variant="outline">Clear</Button>
              <Button
                variant="outline"
                className="bg-blue-50 hover:bg-blue-100"
              >
                Save & Close
              </Button>
              <Button className="bg-red-600 hover:bg-red-700">
                Save & New
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
