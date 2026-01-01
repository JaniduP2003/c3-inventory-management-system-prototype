import { MainLayout } from "@/components/layout/main-layout"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "lucide-react"
import { InventoryTable } from "@/components/table/inventory-table"

export default function TablePage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Inventory</h2>
        </div>

        {/* Tabs Navigation */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="bg-muted/50 p-1">
            <TabsTrigger value="overview">Stock Overview</TabsTrigger>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="components">Components</TabsTrigger>
            <TabsTrigger value="kitted">Kitted</TabsTrigger>
            <TabsTrigger value="serialized">Serialized</TabsTrigger>
            <TabsTrigger value="arriving">Arriving Soon</TabsTrigger>
            <TabsTrigger value="reorder">Reorder Soon</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6 space-y-6">
            {/* Filters */}
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-foreground">Select Inventory in</span>
                <Select defaultValue="warehouse">
                  <SelectTrigger className="w-[200px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="warehouse">Warehouse</SelectItem>
                    <SelectItem value="store">Store</SelectItem>
                    <SelectItem value="factory">Factory</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-foreground">warehouse as of</span>
                <Button variant="outline" className="gap-2 bg-transparent">
                  <Calendar className="h-4 w-4" />
                  Pick date
                </Button>
              </div>

              <div className="flex items-center gap-2 ml-auto">
                <Button variant="outline" size="sm">
                  Save Your Search
                </Button>
                <Button variant="outline" size="sm">
                  Expand Additional Filters
                </Button>
              </div>
            </div>

            {/* Inventory Table */}
            <InventoryTable />
          </TabsContent>

          <TabsContent value="overview">
            <div className="py-12 text-center text-muted-foreground">Stock Overview content will be displayed here</div>
          </TabsContent>

          <TabsContent value="components">
            <div className="py-12 text-center text-muted-foreground">Components content will be displayed here</div>
          </TabsContent>

          <TabsContent value="kitted">
            <div className="py-12 text-center text-muted-foreground">Kitted content will be displayed here</div>
          </TabsContent>

          <TabsContent value="serialized">
            <div className="py-12 text-center text-muted-foreground">Serialized content will be displayed here</div>
          </TabsContent>

          <TabsContent value="arriving">
            <div className="py-12 text-center text-muted-foreground">Arriving Soon content will be displayed here</div>
          </TabsContent>

          <TabsContent value="reorder">
            <div className="py-12 text-center text-muted-foreground">Reorder Soon content will be displayed here</div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  )
}
