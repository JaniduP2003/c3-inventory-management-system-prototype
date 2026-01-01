import { MainLayout } from "@/components/layout/main-layout"
import { AccountTree } from "@/components/accounts/account-tree"
import { AccountFormDialog } from "@/components/accounts/account-form-dialog"
import { Input } from "@/components/ui/input"
import { Search, Download, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { mockAccounts } from "@/lib/mock-data"

export default function AccountsPage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground">Chart of Accounts</h2>
            <p className="text-muted-foreground mt-1">Manage your account structure and balances</p>
          </div>
          <AccountFormDialog />
        </div>

        {/* Search and Filters */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search accounts..." className="pl-9" />
          </div>
          <Button variant="outline" className="gap-2 bg-transparent">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button variant="outline" className="gap-2 bg-transparent">
            <Upload className="h-4 w-4" />
            Import
          </Button>
        </div>

        {/* Summary Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <div className="rounded-lg border border-border bg-card p-4">
            <p className="text-sm text-muted-foreground">Total Assets</p>
            <p className="text-2xl font-bold text-foreground mt-1">LKR 10,220,000</p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <p className="text-sm text-muted-foreground">Total Liabilities</p>
            <p className="text-2xl font-bold text-red-600 mt-1">LKR 1,155,000</p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <p className="text-sm text-muted-foreground">Total Equity</p>
            <p className="text-2xl font-bold text-foreground mt-1">LKR 10,000,000</p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <p className="text-sm text-muted-foreground">Net Income</p>
            <p className="text-2xl font-bold text-emerald-600 mt-1">LKR 1,445,000</p>
          </div>
        </div>

        {/* Accounts Tree */}
        <AccountTree accounts={mockAccounts} />
      </div>
    </MainLayout>
  )
}
