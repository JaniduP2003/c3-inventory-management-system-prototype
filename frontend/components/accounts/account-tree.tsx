"use client"

import { useState } from "react"
import { ChevronDown, ChevronRight, MoreVertical, Edit, Trash2, Eye } from "lucide-react"
import type { Account } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

interface AccountTreeProps {
  accounts: Account[]
}

interface GroupedAccounts {
  [key: string]: Account[]
}

export function AccountTree({ accounts }: AccountTreeProps) {
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set(["Bank", "Cash", "Accounts Receivable"]))

  // Group accounts by type
  const groupedAccounts: GroupedAccounts = accounts.reduce((acc, account) => {
    if (!acc[account.type]) {
      acc[account.type] = []
    }
    acc[account.type].push(account)
    return acc
  }, {} as GroupedAccounts)

  const toggleGroup = (type: string) => {
    const newExpanded = new Set(expandedGroups)
    if (newExpanded.has(type)) {
      newExpanded.delete(type)
    } else {
      newExpanded.add(type)
    }
    setExpandedGroups(newExpanded)
  }

  const formatBalance = (balance: number, currency: string) => {
    const absBalance = Math.abs(balance)
    const formatted = absBalance.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
    return `${currency} ${formatted}`
  }

  const getGroupTotal = (accounts: Account[]) => {
    return accounts.reduce((sum, account) => sum + Math.abs(account.balance), 0)
  }

  return (
    <div className="space-y-2">
      {Object.entries(groupedAccounts).map(([type, typeAccounts]) => {
        const isExpanded = expandedGroups.has(type)
        const groupTotal = getGroupTotal(typeAccounts)

        return (
          <div key={type} className="border border-border rounded-lg overflow-hidden bg-card">
            {/* Group Header */}
            <button
              onClick={() => toggleGroup(type)}
              className="w-full flex items-center justify-between p-4 hover:bg-accent transition-colors"
            >
              <div className="flex items-center gap-3">
                {isExpanded ? (
                  <ChevronDown className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                )}
                <div className="text-left">
                  <h3 className="font-semibold text-foreground">{type}</h3>
                  <p className="text-sm text-muted-foreground">{typeAccounts.length} accounts</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-foreground">{formatBalance(groupTotal, typeAccounts[0].currency)}</p>
              </div>
            </button>

            {/* Account Items */}
            {isExpanded && (
              <div className="border-t border-border">
                {typeAccounts.map((account, index) => (
                  <div
                    key={account.id}
                    className={cn(
                      "flex items-center justify-between p-4 pl-12 hover:bg-accent transition-colors group",
                      index !== typeAccounts.length - 1 && "border-b border-border",
                    )}
                  >
                    <div className="flex-1 grid grid-cols-3 gap-4">
                      <div>
                        <p className="font-medium text-foreground">{account.name}</p>
                        {account.accountNumber && (
                          <p className="text-sm text-muted-foreground">#{account.accountNumber}</p>
                        )}
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Type</p>
                        <p className="font-medium text-foreground">{account.type}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Currency</p>
                        <p className="font-medium text-foreground">{account.currency}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right min-w-[140px]">
                        <p
                          className={cn(
                            "font-semibold text-lg",
                            account.balance < 0 ? "text-red-600" : "text-foreground",
                          )}
                        >
                          {formatBalance(account.balance, account.currency)}
                        </p>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Account
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Account
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
