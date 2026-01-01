"use client"

import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Bell, Settings, User, ChevronDown } from "lucide-react"

const menuItems = [
  {
    label: "File",
    items: ["New", "Open", "Save", "Print", "Exit"],
  },
  {
    label: "Edit",
    items: ["Undo", "Redo", "Cut", "Copy", "Paste"],
  },
]

export function TopNav() {
  return (
    <header className="sticky top-0 z-30 w-full border-b border-border bg-background">
      <div className="flex h-10 items-center gap-1 px-4">
        {menuItems.map((menu) => (
          <DropdownMenu key={menu.label}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-7 text-sm font-medium">
                {menu.label}
                <ChevronDown className="ml-1 h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              {menu.items.map((item) => (
                <DropdownMenuItem key={item}>{item}</DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        ))}
      </div>

      {/* Action Bar */}
      <div className="flex h-14 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold text-foreground">Accounting Dashboard</h1>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <Settings className="h-5 w-5" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-2">
                <User className="h-5 w-5" />
                <span className="text-sm font-medium">Admin</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Sign out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
