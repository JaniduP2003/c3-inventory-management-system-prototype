import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, TrendingUp, Users, FileText, ArrowUpRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Dashboard</h2>
          <p className="text-muted-foreground mt-1">Welcome back! Here's an overview of your finances.</p>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-border bg-card hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
              <DollarSign className="h-5 w-5 text-emerald-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">LKR 2,456,890</div>
              <div className="flex items-center gap-1 text-sm text-emerald-600 mt-1">
                <ArrowUpRight className="h-4 w-4" />
                <span>12.5% from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-card hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Expenses</CardTitle>
              <TrendingUp className="h-5 w-5 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">LKR 1,234,560</div>
              <div className="flex items-center gap-1 text-sm text-red-600 mt-1">
                <ArrowUpRight className="h-4 w-4" />
                <span>8.3% from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-card hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Customers</CardTitle>
              <Users className="h-5 w-5 text-teal-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">342</div>
              <div className="flex items-center gap-1 text-sm text-emerald-600 mt-1">
                <ArrowUpRight className="h-4 w-4" />
                <span>24 new this month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-card hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Pending Bills</CardTitle>
              <FileText className="h-5 w-5 text-slate-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">18</div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                <span>Due within 30 days</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions & Recent Activity */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Quick Actions */}
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-foreground">Quick Actions</CardTitle>
              <CardDescription>Common tasks and shortcuts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="/bills/new">
                <Button variant="outline" className="w-full justify-start gap-2 h-12 bg-transparent">
                  <FileText className="h-5 w-5 text-emerald-600" />
                  <span className="font-medium">Enter New Bill</span>
                </Button>
              </Link>
              <Link href="/accounts">
                <Button variant="outline" className="w-full justify-start gap-2 h-12 bg-transparent">
                  <DollarSign className="h-5 w-5 text-blue-600" />
                  <span className="font-medium">View Chart of Accounts</span>
                </Button>
              </Link>
              <Link href="/suppliers">
                <Button variant="outline" className="w-full justify-start gap-2 h-12 bg-transparent">
                  <Users className="h-5 w-5 text-teal-600" />
                  <span className="font-medium">Manage Suppliers</span>
                </Button>
              </Link>
              <Link href="/reports">
                <Button variant="outline" className="w-full justify-start gap-2 h-12 bg-transparent">
                  <TrendingUp className="h-5 w-5 text-slate-600" />
                  <span className="font-medium">View Financial Reports</span>
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Recent Transactions */}
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-foreground">Recent Transactions</CardTitle>
              <CardDescription>Latest financial activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "ABC Suppliers Ltd", amount: "-LKR 45,000", date: "Dec 15, 2025", type: "expense" },
                  { name: "XYZ Customer", amount: "+LKR 125,000", date: "Dec 14, 2025", type: "income" },
                  { name: "Office Rent Payment", amount: "-LKR 50,000", date: "Dec 13, 2025", type: "expense" },
                  { name: "DEF Client Invoice", amount: "+LKR 89,500", date: "Dec 12, 2025", type: "income" },
                ].map((transaction, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between border-b border-border pb-3 last:border-0 last:pb-0"
                  >
                    <div>
                      <p className="font-medium text-foreground">{transaction.name}</p>
                      <p className="text-sm text-muted-foreground">{transaction.date}</p>
                    </div>
                    <div
                      className={
                        transaction.type === "income" ? "text-emerald-600 font-semibold" : "text-red-600 font-semibold"
                      }
                    >
                      {transaction.amount}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  )
}
