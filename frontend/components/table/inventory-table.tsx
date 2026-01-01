"use client"

import { useState } from "react"
import { ChevronRight, ChevronDown, Package, Box, Boxes, PackageOpen, Layers, Archive } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"

interface InventoryItem {
  id: string
  image?: string
  productName: string
  sku?: string
  status: string
  currentQty: number
  incoming: number
  usage: number
  outOfStock: string
  ordersBy: string
  weeksStock: number
  lead: number
  children?: InventoryItem[]
}

const mockData: InventoryItem[] = [
  {
    id: "1",
    productName: "Footmen - Fleet - Backpack...",
    sku: "Table Grand Plastic",
    status: "11,982 Ready",
    currentQty: 653,
    incoming: 653,
    usage: 653,
    outOfStock: "Sep 14, 2022",
    ordersBy: "Sep 14, 2022",
    weeksStock: 43,
    lead: 103,
  },
  {
    id: "2",
    productName: "Footmen - Fleet - Backpack...",
    sku: "Table Grand Plastic",
    status: "11,982 Ready",
    currentQty: 653,
    incoming: 653,
    usage: 653,
    outOfStock: "Sep 14, 2022",
    ordersBy: "Sep 14, 2022",
    weeksStock: 43,
    lead: 103,
  },
  {
    id: "3",
    productName: "Footmen - Fleet - Backpack...",
    sku: "Table Grand Plastic",
    status: "11,982 Ready",
    currentQty: 653,
    incoming: 653,
    usage: 653,
    outOfStock: "Sep 14, 2022",
    ordersBy: "Sep 14, 2022",
    weeksStock: 43,
    lead: 103,
    children: [
      {
        id: "3-1",
        productName: "Footmen - Fleet - Backpack...",
        sku: "Table Grand Plastic",
        status: "11,982 Ready",
        currentQty: 653,
        incoming: 653,
        usage: 653,
        outOfStock: "Sep 14, 2022",
        ordersBy: "Sep 14, 2022",
        weeksStock: 43,
        lead: 103,
      },
      {
        id: "3-2",
        productName: "Footmen - Fleet - Backpack...",
        sku: "Table Grand Plastic",
        status: "11,982 Ready",
        currentQty: 653,
        incoming: 653,
        usage: 653,
        outOfStock: "Sep 14, 2022",
        ordersBy: "Sep 14, 2022",
        weeksStock: 43,
        lead: 103,
      },
      {
        id: "3-3",
        productName: "Footmen - Fleet - Backpack...",
        sku: "Table Grand Plastic",
        status: "11,982 Ready",
        currentQty: 653,
        incoming: 653,
        usage: 653,
        outOfStock: "Sep 14, 2022",
        ordersBy: "Sep 14, 2022",
        weeksStock: 43,
        lead: 103,
      },
    ],
  },
  {
    id: "4",
    productName: "Footmen - Fleet - Backpack...",
    sku: "Show Varieties",
    status: "11,982 Ready",
    currentQty: 653,
    incoming: 653,
    usage: 653,
    outOfStock: "Sep 14, 2022",
    ordersBy: "Sep 14, 2022",
    weeksStock: 43,
    lead: 103,
  },
  {
    id: "5",
    productName: "Footmen - Fleet - Backpack...",
    sku: "Table Grand Plastic",
    status: "11,982 Ready",
    currentQty: 653,
    incoming: 653,
    usage: 653,
    outOfStock: "Sep 14, 2022",
    ordersBy: "Sep 14, 2022",
    weeksStock: 43,
    lead: 103,
  },
]

interface InventoryRowProps {
  item: InventoryItem
  level?: number
}

// Get icon and color based on hierarchy level
function getIconAndColorForLevel(level: number) {
  const levels = [
    { Icon: Package, bgColor: "bg-gray-900" },      // Level 0 - Main items
    { Icon: Box, bgColor: "bg-blue-700" },          // Level 1 - Sub items
    { Icon: Boxes, bgColor: "bg-purple-700" },      // Level 2 - Nested sub items
    { Icon: PackageOpen, bgColor: "bg-green-700" }, // Level 3
    { Icon: Layers, bgColor: "bg-orange-700" },     // Level 4
    { Icon: Archive, bgColor: "bg-teal-700" },      // Level 5+
  ]
  return levels[Math.min(level, levels.length - 1)]
}

function InventoryRow({ item, level = 0 }: InventoryRowProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const hasChildren = item.children && item.children.length > 0
  const { Icon, bgColor } = getIconAndColorForLevel(level)

  return (
    <>
      <tr className={cn("border-b border-border hover:bg-muted/50", level > 0 && "bg-muted/30")}>
        <td className="px-4 py-3">
          <Checkbox />
        </td>
        <td className="px-4 py-3">
          <div className="flex items-center gap-2">
            {hasChildren ? (
              <button onClick={() => setIsExpanded(!isExpanded)} className="p-0.5 hover:bg-muted rounded">
                {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </button>
            ) : (
              <div className="w-5" style={{ marginLeft: `${level * 20}px` }} />
            )}
            <div className={cn("flex h-8 w-8 items-center justify-center rounded", bgColor)}>
              <Icon className="h-5 w-5 text-white" />
            </div>
          </div>
        </td>
        <td className="px-4 py-3 text-sm">{item.productName}</td>
        <td className="px-4 py-3 text-sm">{item.sku}</td>
        <td className="px-4 py-3 text-sm">{item.status}</td>
        <td className="px-4 py-3 text-sm text-right">{item.currentQty}</td>
        <td className="px-4 py-3 text-sm text-right">{item.incoming}</td>
        <td className="px-4 py-3 text-sm text-right">{item.usage}</td>
        <td className="px-4 py-3 text-sm">{item.outOfStock}</td>
        <td className="px-4 py-3 text-sm">{item.ordersBy}</td>
        <td className="px-4 py-3 text-sm text-right">{item.weeksStock}</td>
        <td className="px-4 py-3 text-sm text-right">{item.lead}</td>
      </tr>
      {isExpanded && hasChildren && (
        <>
          {item.children!.map((child) => (
            <InventoryRow key={child.id} item={child} level={level + 1} />
          ))}
        </>
      )}
    </>
  )
}

export function InventoryTable() {
  return (
    <div className="rounded-lg border border-border bg-background overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="px-4 py-3 text-left">
                <Checkbox />
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">Image</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">
                Product Names
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">SKU</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">Status</th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-muted-foreground uppercase">
                Current Qty / Stock
              </th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-muted-foreground uppercase">Incoming</th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-muted-foreground uppercase">Usage</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">
                Out Of Stock
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">Orders By</th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-muted-foreground uppercase">
                Weeks Stock
              </th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-muted-foreground uppercase">Lead</th>
            </tr>
          </thead>
          <tbody>
            {mockData.map((item) => (
              <InventoryRow key={item.id} item={item} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
