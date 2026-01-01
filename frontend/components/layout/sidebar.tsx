"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Home,
  Table,
  FileText,
  ChevronDown,
  ChevronRight,
  Package,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navigationItems = [
  { icon: Home, label: "Home", href: "/" },
  { icon: Table, label: "Table View", href: "/table" },
  { icon: FileText, label: "Enter Bills", href: "/bills" },
  { icon: Package, label: "GRN", href: "/grn-list" },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen border-r border-border bg-sidebar transition-all duration-300",
        isExpanded ? "w-64" : "w-16"
      )}
    >
      <div className="flex h-full flex-col">
        {/* Header */}
        <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-4">
          {isExpanded && (
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-14 items-center justify-center rounded overflow-hidden">
                <Image
                  src="/c3ss-logo.svg"
                  alt="C3SS Logo"
                  width={52}
                  height={52}
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="text-lg font-semibold text-sidebar-foreground">
                AccounTech
              </span>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsExpanded(!isExpanded)}
            className="h-8 w-8 text-sidebar-foreground"
          >
            {isExpanded ? (
              <ChevronDown className="h-4 w-4 rotate-[-90deg]" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 overflow-y-auto p-2">
          <div className="space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link key={item.href} href={item.href}>
                  <div
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-red-600 text-white"
                        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    )}
                  >
                    <Icon className="h-5 w-5 shrink-0" />
                    {isExpanded && <span>{item.label}</span>}
                  </div>
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </aside>
  );
}
