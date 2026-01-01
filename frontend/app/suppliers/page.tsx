import { MainLayout } from "@/components/layout/main-layout"
import { SupplierDialog } from "@/components/suppliers/supplier-dialog"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, Filter, Download, MoreVertical, Mail, Phone, MapPin, Edit, Trash2, FileText } from "lucide-react"
import { mockSuppliers } from "@/lib/mock-data"
import { Badge } from "@/components/ui/badge"
import type { Supplier } from "@/lib/types"

export default function SuppliersPage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground">Suppliers</h2>
            <p className="text-muted-foreground mt-1">Manage your supplier relationships and accounts</p>
          </div>
          <SupplierDialog />
        </div>

        {/* Summary Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="border-border bg-card">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Total Suppliers</p>
              <p className="text-3xl font-bold text-foreground mt-1">{mockSuppliers.length}</p>
            </CardContent>
          </Card>
          <Card className="border-border bg-card">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Total Payable (LKR)</p>
              <p className="text-3xl font-bold text-red-600 mt-1">860,000</p>
            </CardContent>
          </Card>
          <Card className="border-border bg-card">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Total Payable (USD)</p>
              <p className="text-3xl font-bold text-red-600 mt-1">150,000</p>
            </CardContent>
          </Card>
          <Card className="border-border bg-card">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Active This Month</p>
              <p className="text-3xl font-bold text-foreground mt-1">4</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search suppliers..." className="pl-9 bg-background" />
          </div>
          <Button variant="outline" className="gap-2 bg-transparent">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
          <Button variant="outline" className="gap-2 bg-transparent">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>

        {/* Suppliers List */}
        <div className="grid gap-4">
          {mockSuppliers.map((supplier: Supplier) => (
            <Card key={supplier.id} className="border-border bg-card hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700 font-bold text-lg">
                        {supplier.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">{supplier.name}</h3>
                        <Badge variant="secondary" className="mt-1">
                          {supplier.currency}
                        </Badge>
                      </div>
                    </div>

                    <div className="grid gap-2 md:grid-cols-3 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Mail className="h-4 w-4" />
                        <span>{supplier.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Phone className="h-4 w-4" />
                        <span>{supplier.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{supplier.address}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 pt-2 border-t border-border">
                      <div>
                        <p className="text-sm text-muted-foreground">Outstanding Balance</p>
                        <p className="text-xl font-bold text-red-600 mt-1">
                          {supplier.currency} {supplier.balance?.toLocaleString("en-US", { minimumFractionDigits: 2 }) || "0.00"}
                        </p>
                      </div>
                      <div className="h-12 w-px bg-border" />
                      <div>
                        <p className="text-sm text-muted-foreground">Open Bills</p>
                        <p className="text-xl font-semibold text-foreground mt-1">3</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                      <FileText className="h-4 w-4" />
                      New Bill
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon" className="h-8 w-8 bg-transparent">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <FileText className="mr-2 h-4 w-4" />
                          View Transactions
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete Supplier
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  )
}
