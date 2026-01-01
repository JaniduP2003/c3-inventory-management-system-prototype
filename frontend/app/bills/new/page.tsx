import { MainLayout } from "@/components/layout/main-layout"
import { BillForm } from "@/components/bills/bill-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText } from "lucide-react"

export default function NewBillPage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-600 text-white">
            <FileText className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground">Enter New Bill</h2>
            <p className="text-muted-foreground">Record a new bill from your supplier</p>
          </div>
        </div>

        {/* Bill Form */}
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle>Bill Information</CardTitle>
            <CardDescription>Enter the details of the bill you received</CardDescription>
          </CardHeader>
          <CardContent>
            <BillForm />
          </CardContent>
        </Card>

        {/* Recent Bills */}
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle>Recent Bills</CardTitle>
            <CardDescription>Your recently entered bills</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { supplier: "ABC Suppliers Ltd", amount: "LKR 45,000", date: "Dec 15, 2025", status: "Pending" },
                { supplier: "Global Tech Solutions", amount: "USD 850", date: "Dec 12, 2025", status: "Paid" },
                { supplier: "Office Supplies Inc", amount: "LKR 28,500", date: "Dec 10, 2025", status: "Pending" },
              ].map((bill, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-accent transition-colors"
                >
                  <div>
                    <p className="font-medium text-foreground">{bill.supplier}</p>
                    <p className="text-sm text-muted-foreground">{bill.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-foreground">{bill.amount}</p>
                    <span
                      className={cn(
                        "inline-block text-xs px-2 py-1 rounded-full",
                        bill.status === "Paid" ? "bg-emerald-100 text-emerald-700" : "bg-yellow-100 text-yellow-700",
                      )}
                    >
                      {bill.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ")
}
