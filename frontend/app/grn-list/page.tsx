"use client";

import { useState } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Plus,
  Eye,
  Edit,
  Trash2,
  AlertTriangle,
  Search,
  X,
  Filter,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";

interface GRNRecord {
  id: string;
  grnNumber: string;
  invoiceNumber: string;
  date: string;
}

export default function GRNListPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState("10");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState<GRNRecord | null>(null);

  // Advanced search filters
  const [searchGrnNumber, setSearchGrnNumber] = useState("");
  const [searchInvoiceNumber, setSearchInvoiceNumber] = useState("");
  const [searchDateFrom, setSearchDateFrom] = useState("");
  const [searchDateTo, setSearchDateTo] = useState("");
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(true);

  // Mock data - replace with actual data fetching
  const [grnRecords, setGrnRecords] = useState<GRNRecord[]>([
    {
      id: "1",
      grnNumber: "GRN001",
      invoiceNumber: "INV2024001",
      date: "2024-12-15",
    },
    {
      id: "2",
      grnNumber: "GRN002",
      invoiceNumber: "INV2024002",
      date: "2024-12-18",
    },
    {
      id: "3",
      grnNumber: "GRN003",
      invoiceNumber: "INV2024003",
      date: "2024-12-20",
    },
    {
      id: "4",
      grnNumber: "GRN004",
      invoiceNumber: "INV2024004",
      date: "2024-12-22",
    },
    {
      id: "5",
      grnNumber: "GRN005",
      invoiceNumber: "INV2024005",
      date: "2024-12-25",
    },
    {
      id: "6",
      grnNumber: "GRN006",
      invoiceNumber: "INV2024006",
      date: "2024-12-26",
    },
    {
      id: "7",
      grnNumber: "GRN007",
      invoiceNumber: "INV2024007",
      date: "2024-12-27",
    },
    {
      id: "8",
      grnNumber: "GRN008",
      invoiceNumber: "INV2024008",
      date: "2024-12-28",
    },
    {
      id: "9",
      grnNumber: "GRN009",
      invoiceNumber: "INV2024009",
      date: "2024-12-29",
    },
    {
      id: "10",
      grnNumber: "GRN010",
      invoiceNumber: "INV2024010",
      date: "2024-12-29",
    },
    {
      id: "11",
      grnNumber: "GRN011",
      invoiceNumber: "INV2024011",
      date: "2024-12-28",
    },
    {
      id: "12",
      grnNumber: "GRN012",
      invoiceNumber: "INV2024012",
      date: "2024-12-27",
    },
    {
      id: "13",
      grnNumber: "GRN013",
      invoiceNumber: "INV2024013",
      date: "2024-12-26",
    },
    {
      id: "14",
      grnNumber: "GRN014",
      invoiceNumber: "INV2024014",
      date: "2024-12-25",
    },
    {
      id: "15",
      grnNumber: "GRN015",
      invoiceNumber: "INV2024015",
      date: "2024-12-24",
    },
  ]);

  const filteredRecords = grnRecords.filter((record) => {
    // Quick search (applies to all fields)
    const matchesQuickSearch =
      !searchTerm ||
      record.grnNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase());

    // Advanced search filters
    const matchesGrnNumber =
      !searchGrnNumber ||
      record.grnNumber.toLowerCase().includes(searchGrnNumber.toLowerCase());

    const matchesInvoiceNumber =
      !searchInvoiceNumber ||
      record.invoiceNumber
        .toLowerCase()
        .includes(searchInvoiceNumber.toLowerCase());

    const matchesDateFrom =
      !searchDateFrom || new Date(record.date) >= new Date(searchDateFrom);

    const matchesDateTo =
      !searchDateTo || new Date(record.date) <= new Date(searchDateTo);

    return (
      matchesQuickSearch &&
      matchesGrnNumber &&
      matchesInvoiceNumber &&
      matchesDateFrom &&
      matchesDateTo
    );
  });

  const clearAllFilters = () => {
    setSearchTerm("");
    setSearchGrnNumber("");
    setSearchInvoiceNumber("");
    setSearchDateFrom("");
    setSearchDateTo("");
  };

  const hasActiveFilters =
    searchTerm ||
    searchGrnNumber ||
    searchInvoiceNumber ||
    searchDateFrom ||
    searchDateTo;

  const handleAddGRN = () => {
    router.push("/grn");
  };

  const handleView = (id: string) => {
    router.push(`/grn?id=${id}&mode=view`);
  };

  const handleEdit = (id: string) => {
    router.push(`/grn?id=${id}&mode=edit`);
  };

  const handleDelete = (id: string) => {
    const record = grnRecords.find((r) => r.id === id);
    if (record) {
      setRecordToDelete(record);
      setDeleteDialogOpen(true);
    }
  };

  const confirmDelete = () => {
    if (recordToDelete) {
      setGrnRecords(grnRecords.filter((r) => r.id !== recordToDelete.id));
      toast({
        title: "GRN Deleted",
        description: `GRN ${recordToDelete.grnNumber} has been deleted successfully.`,
        variant: "destructive",
      });
      setDeleteDialogOpen(false);
      setRecordToDelete(null);
    }
  };

  const cancelDelete = () => {
    setDeleteDialogOpen(false);
    setRecordToDelete(null);
  };

  return (
    <MainLayout>
      <Toaster />
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">GRN Records</h1>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button
              onClick={handleAddGRN}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add GRN
            </Button>

            <div className="flex items-center gap-2">
              <select
                value={entriesPerPage}
                onChange={(e) => setEntriesPerPage(e.target.value)}
                className="border border-input rounded-md px-3 py-2 text-sm bg-background"
              >
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
              <span className="text-sm text-muted-foreground">
                entries per page
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant={showAdvancedSearch ? "default" : "outline"}
              size="sm"
              onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
              className="gap-2"
            >
              <Filter className="h-4 w-4" />
              {showAdvancedSearch ? "Hide Filters" : "Show Filters"}
            </Button>
          </div>
        </div>

        {/* Advanced Search Panel */}
        {showAdvancedSearch && (
          <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Search className="h-5 w-5 text-muted-foreground" />
                <h3 className="text-lg font-semibold">Search Filters</h3>
              </div>
              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAllFilters}
                  className="gap-2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                  Clear All
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Quick Search */}
              <div className="space-y-2">
                <label htmlFor="quickSearch" className="text-sm font-medium">
                  Quick Search
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="quickSearch"
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search all fields..."
                    className="pl-9"
                  />
                </div>
              </div>

              {/* GRN Number */}
              <div className="space-y-2">
                <label htmlFor="grnNumber" className="text-sm font-medium">
                  GRN Number
                </label>
                <Input
                  id="grnNumber"
                  type="text"
                  value={searchGrnNumber}
                  onChange={(e) => setSearchGrnNumber(e.target.value)}
                  placeholder="e.g., GRN001"
                />
              </div>

              {/* Invoice Number */}
              <div className="space-y-2">
                <label htmlFor="invoiceNumber" className="text-sm font-medium">
                  Invoice Number
                </label>
                <Input
                  id="invoiceNumber"
                  type="text"
                  value={searchInvoiceNumber}
                  onChange={(e) => setSearchInvoiceNumber(e.target.value)}
                  placeholder="e.g., INV2024001"
                />
              </div>

              {/* Date From */}
              <div className="space-y-2">
                <label htmlFor="dateFrom" className="text-sm font-medium">
                  Date From
                </label>
                <Input
                  id="dateFrom"
                  type="date"
                  value={searchDateFrom}
                  onChange={(e) => setSearchDateFrom(e.target.value)}
                />
              </div>

              {/* Date To */}
              <div className="space-y-2 md:col-start-2 lg:col-start-auto">
                <label htmlFor="dateTo" className="text-sm font-medium">
                  Date To
                </label>
                <Input
                  id="dateTo"
                  type="date"
                  value={searchDateTo}
                  onChange={(e) => setSearchDateTo(e.target.value)}
                />
              </div>
            </div>

            {/* Active Filters Summary */}
            {hasActiveFilters && (
              <div className="mt-4 pt-4 border-t border-border">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    Active filters:
                  </span>
                  {searchTerm && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                      Quick: {searchTerm}
                      <button
                        onClick={() => setSearchTerm("")}
                        className="hover:bg-blue-200 dark:hover:bg-blue-800 rounded-full p-0.5"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  )}
                  {searchGrnNumber && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      GRN: {searchGrnNumber}
                      <button
                        onClick={() => setSearchGrnNumber("")}
                        className="hover:bg-green-200 dark:hover:bg-green-800 rounded-full p-0.5"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  )}
                  {searchInvoiceNumber && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                      Invoice: {searchInvoiceNumber}
                      <button
                        onClick={() => setSearchInvoiceNumber("")}
                        className="hover:bg-purple-200 dark:hover:bg-purple-800 rounded-full p-0.5"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  )}
                  {searchDateFrom && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">
                      From: {searchDateFrom}
                      <button
                        onClick={() => setSearchDateFrom("")}
                        className="hover:bg-orange-200 dark:hover:bg-orange-800 rounded-full p-0.5"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  )}
                  {searchDateTo && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">
                      To: {searchDateTo}
                      <button
                        onClick={() => setSearchDateTo("")}
                        className="hover:bg-orange-200 dark:hover:bg-orange-800 rounded-full p-0.5"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Table */}
        <div className="rounded-lg border border-border bg-card overflow-hidden shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50">
                <TableHead className="font-semibold text-xs uppercase tracking-wider h-11 px-6 w-[100px]">
                  GRN Number
                </TableHead>
                <TableHead className="font-semibold text-xs uppercase tracking-wider h-11 px-6 w-[100px]">
                  Invoice Number
                </TableHead>
                <TableHead className="font-semibold text-xs uppercase tracking-wider h-11 px-6 w-[100px]">
                  Date
                </TableHead>
                <TableHead className="font-semibold text-xs uppercase tracking-wider h-11 px-6 w-[100px] text-center">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecords.length > 0 ? (
                filteredRecords.map((record, index) => (
                  <TableRow
                    key={record.id}
                    className="hover:bg-muted/30 transition-colors"
                  >
                    <TableCell className="font-medium py-3 px-6 w-[100px]">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-green-50 text-green-700 text-sm font-semibold border border-green-200">
                        {record.grnNumber}
                      </span>
                    </TableCell>
                    <TableCell className="py-3 px-6 text-sm text-muted-foreground w-[100px]">
                      {record.invoiceNumber}
                    </TableCell>
                    <TableCell className="py-3 px-6 text-sm text-muted-foreground w-[100px]">
                      {record.date}
                    </TableCell>
                    <TableCell className="py-3 px-6 w-[100px]">
                      <div className="flex items-center justify-center gap-1">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleView(record.id)}
                          title="View details"
                          className="h-8 px-2"
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(record.id)}
                          title="Edit GRN"
                          className="h-8 px-2"
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-12">
                    <div className="flex flex-col items-center gap-2">
                      <Search className="h-8 w-8 text-muted-foreground/50" />
                      <p className="text-sm font-medium text-muted-foreground">
                        No GRN records found
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Try adjusting your search filters
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination info */}
        <div className="text-sm text-muted-foreground">
          Showing 1 to{" "}
          {Math.min(Number(entriesPerPage), filteredRecords.length)} of{" "}
          {filteredRecords.length} entries
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
                <AlertTriangle className="h-5 w-5 text-red-600" />
              </div>
              <DialogTitle className="text-xl">Delete GRN</DialogTitle>
            </div>
            <DialogDescription className="pt-3 text-base">
              Are you sure you want to delete GRN{" "}
              <span className="font-semibold text-foreground">
                {recordToDelete?.grnNumber}
              </span>
              ? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={cancelDelete}
              className="sm:mr-2"
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
}
