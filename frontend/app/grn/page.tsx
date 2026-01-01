"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { MainLayout } from "@/components/layout/main-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Calendar,
  Plus,
  Trash2,
  Paperclip,
  Save,
  X,
  ChevronDown,
  Check,
  Printer,
  ArrowLeft,
} from "lucide-react";
import { mockSuppliers, mockItems } from "@/lib/mock-data";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";

interface GRNLine {
  id: string;
  itemDescription: string;
  model: string;
  serialNo: string;
  quantity: string;
  unitPrice: string;
  totalPrice: string;
  warrantyPeriod: string;
  remarks: string;
  tax: string;
}

function GRNPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();
  const mode = searchParams.get("mode") || "create"; // 'view', 'edit', or 'create'
  const grnId = searchParams.get("id");
  const isViewMode = mode === "view";
  const isEditMode = mode === "edit";

  const [grnNo, setGrnNo] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]); // Format: YYYY-MM-DD
  const [receivedBy, setReceivedBy] = useState("");
  const [supplierName, setSupplierName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [supplierSearch, setSupplierSearch] = useState("");
  const [isSupplierDropdownOpen, setIsSupplierDropdownOpen] = useState(false);
  const [isCompanyDropdownOpen, setIsCompanyDropdownOpen] = useState(false);
  const [itemSearchMap, setItemSearchMap] = useState<Record<string, string>>(
    {}
  );
  const [openItemDropdownId, setOpenItemDropdownId] = useState<string | null>(
    null
  );
  const [proformaOrderNo, setProformaOrderNo] = useState("");
  const [invoiceNo, setInvoiceNo] = useState("");
  const [purchasingPurpose, setPurchasingPurpose] = useState("");
  const [isTaxable, setIsTaxable] = useState(false);
  const [taxAmount, setTaxAmount] = useState("");

  const supplierDropdownRef = useRef<HTMLDivElement>(null);
  const companyDropdownRef = useRef<HTMLDivElement>(null);
  const itemDropdownRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const dropdownPositionRef = useRef<{
    id: string | null;
    rect: DOMRect | null;
  }>({ id: null, rect: null });

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        supplierDropdownRef.current &&
        !supplierDropdownRef.current.contains(event.target as Node)
      ) {
        setIsSupplierDropdownOpen(false);
      }

      if (
        companyDropdownRef.current &&
        !companyDropdownRef.current.contains(event.target as Node)
      ) {
        setIsCompanyDropdownOpen(false);
      }

      // Check if click is outside all item dropdowns
      const clickedOutsideAllItemDropdowns = Object.values(
        itemDropdownRefs.current
      ).every((ref) => !ref || !ref.contains(event.target as Node));

      if (clickedOutsideAllItemDropdowns) {
        setOpenItemDropdownId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Track and update fixed dropdown position on scroll/resize
  useEffect(() => {
    const updatePosition = () => {
      if (!dropdownPositionRef.current.id) return;
      const id = dropdownPositionRef.current.id;
      const trigger = itemDropdownRefs.current[id];
      if (!trigger) return;
      dropdownPositionRef.current.rect = trigger.getBoundingClientRect();
    };
    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);
    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, []);

  const filteredSuppliers = mockSuppliers.filter((supplier) =>
    supplier.name.toLowerCase().includes(supplierSearch.toLowerCase())
  );

  const getFilteredItems = (lineId: string) => {
    const searchTerm = itemSearchMap[lineId] || "";
    return mockItems.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const [grnLines, setGrnLines] = useState<GRNLine[]>([
    {
      id: "1",
      itemDescription: "",
      model: "",
      serialNo: "",
      quantity: "",
      unitPrice: "",
      totalPrice: "",
      warrantyPeriod: "",
      remarks: "",
      tax: "",
    },
  ]);

  const addGRNLine = () => {
    setGrnLines([
      ...grnLines,
      {
        id: Date.now().toString(),
        itemDescription: "",
        model: "",
        serialNo: "",
        quantity: "",
        unitPrice: "",
        totalPrice: "",
        warrantyPeriod: "",
        remarks: "",
        tax: "",
      },
    ]);
  };

  const removeGRNLine = (id: string) => {
    if (grnLines.length > 1) {
      setGrnLines(grnLines.filter((line) => line.id !== id));
    }
  };

  const updateGRNLine = (id: string, field: keyof GRNLine, value: string) => {
    setGrnLines(
      grnLines.map((line) => {
        if (line.id === id) {
          return { ...line, [field]: value };
        }
        return line;
      })
    );
  };

  const handleSave = () => {
    console.log({
      grnNo,
      date,
      receivedBy,
      supplierName,
      companyName,
      proformaOrderNo,
      invoiceNo,
      purchasingPurpose,
      grnLines,
    });
    // In a real app, this would save to the backend
    toast({
      variant: "default",
      title: isEditMode ? "GRN Updated" : "GRN Saved",
      description: isEditMode
        ? `GRN ${grnNo || "record"} has been updated successfully.`
        : `GRN ${grnNo || "record"} has been saved successfully.`,
    });
  };

  const handleClear = () => {
    setGrnNo("");
    setReceivedBy("");
    setSupplierName("");
    setCompanyName("");
    setSupplierSearch("");
    setProformaOrderNo("");
    setInvoiceNo("");
    setPurchasingPurpose("");
    setGrnLines([
      {
        id: "1",
        itemDescription: "",
        model: "",
        serialNo: "",
        quantity: "",
        unitPrice: "",
        totalPrice: "",
        warrantyPeriod: "",
        remarks: "",
        tax: "",
      },
    ]);
  };

  return (
    <MainLayout>
      <div className="flex h-full flex-col bg-background">
        {/* Header with Back Button */}
        {(isViewMode || isEditMode) && (
          <div className="border-b border-border bg-muted/50 px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => router.push("/grn-list")}
                  className="gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to List
                </Button>
                <div className="h-4 w-px bg-border"></div>
                <h2 className="text-lg font-semibold">
                  {isViewMode ? "View GRN" : "Edit GRN"} -{" "}
                  {grnNo || "Loading..."}
                </h2>
                {isViewMode && (
                  <span className="text-sm text-muted-foreground ml-2">
                    (Read-only mode)
                  </span>
                )}
              </div>
              {isViewMode && grnId && (
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => router.push(`/grn?id=${grnId}&mode=edit`)}
                  className="gap-2"
                >
                  <Save className="h-4 w-4" />
                  Edit GRN
                </Button>
              )}
            </div>
          </div>
        )}

        {/* Toolbar */}
        <div className="border-b border-border bg-muted/30 px-4 py-2">
          <div className="flex items-center gap-2">
            {!isViewMode && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 gap-1.5 bg-transparent"
                  onClick={handleClear}
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span className="text-xs">New</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 gap-1.5 bg-transparent"
                  onClick={handleSave}
                >
                  <Save className="h-3.5 w-3.5" />
                  <span className="text-xs">Save</span>
                </Button>
              </>
            )}
            <Button
              variant="outline"
              size="sm"
              className="h-8 gap-1.5 bg-transparent"
            >
              <Printer className="h-3.5 w-3.5" />
              <span className="text-xs">Print</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-8 gap-1.5 bg-transparent"
            >
              <Paperclip className="h-3.5 w-3.5" />
              <span className="text-xs">Attach File</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-8 gap-1.5 bg-transparent"
              onClick={handleClear}
            >
              <X className="h-3.5 w-3.5" />
              <span className="text-xs">Cancel</span>
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <div className="mx-auto max-w-[1400px] p-6">
            {/* Header Section */}
            <div className="mb-6 rounded-lg border border-border bg-card p-6">
              <div className="mb-6 flex items-center justify-between border-b border-green-600 pb-4">
                <div className="bg-green-600 px-6 py-3 rounded">
                  <h2 className="text-2xl font-bold text-white tracking-wide">
                    GOODS RECEIVED NOTE
                  </h2>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-end gap-4">
                    <Label className="font-semibold min-w-[80px] text-right">
                      GRN NO
                    </Label>
                    <Input
                      value={grnNo}
                      onChange={(e) => setGrnNo(e.target.value)}
                      className="w-40"
                      placeholder="GRN051"
                      disabled={isViewMode}
                    />
                  </div>
                  <div className="flex items-center justify-end gap-4">
                    <Label className="font-semibold min-w-[80px] text-right">
                      DATE
                    </Label>
                    <div className="relative w-40">
                      <Input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full"
                        disabled={isViewMode}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Invoice No</Label>
                    <Input
                      value={invoiceNo}
                      onChange={(e) => setInvoiceNo(e.target.value)}
                      placeholder="164985"
                      disabled={isViewMode}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Received By Name</Label>
                    <Input
                      value={receivedBy}
                      onChange={(e) => setReceivedBy(e.target.value)}
                      placeholder="Anuradha"
                      disabled={isViewMode}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Purchasing Purpose</Label>
                    <Textarea
                      value={purchasingPurpose}
                      onChange={(e) => setPurchasingPurpose(e.target.value)}
                      placeholder="Office"
                      className="min-h-[80px] resize-y"
                      disabled={isViewMode}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Supplier Name</Label>
                    <div className="relative" ref={supplierDropdownRef}>
                      <button
                        type="button"
                        onClick={() =>
                          setIsSupplierDropdownOpen(!isSupplierDropdownOpen)
                        }
                        className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        disabled={isViewMode}
                      >
                        <span
                          className={
                            supplierName ? "" : "text-muted-foreground"
                          }
                        >
                          {supplierName || "Select supplier"}
                        </span>
                        <ChevronDown className="h-4 w-4 opacity-50" />
                      </button>

                      {isSupplierDropdownOpen && !isViewMode && (
                        <div className="absolute z-50 mt-1 w-full rounded-md border bg-popover shadow-md">
                          <div className="p-2 border-b">
                            <Input
                              placeholder="Search suppliers..."
                              value={supplierSearch}
                              onChange={(e) =>
                                setSupplierSearch(e.target.value)
                              }
                              className="h-8"
                              autoFocus
                            />
                          </div>
                          <div className="max-h-[200px] overflow-y-auto p-1">
                            {filteredSuppliers.length > 0 ? (
                              filteredSuppliers.map((supplier) => (
                                <button
                                  key={supplier.id}
                                  type="button"
                                  onClick={() => {
                                    setSupplierName(supplier.name);
                                    setIsSupplierDropdownOpen(false);
                                    setSupplierSearch("");
                                  }}
                                  className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground cursor-pointer"
                                >
                                  {supplierName === supplier.name && (
                                    <Check className="h-4 w-4" />
                                  )}
                                  <span
                                    className={
                                      supplierName === supplier.name
                                        ? ""
                                        : "ml-6"
                                    }
                                  >
                                    {supplier.name}
                                  </span>
                                </button>
                              ))
                            ) : (
                              <div className="py-6 text-center text-sm text-muted-foreground">
                                No suppliers found.
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Proforma Order No</Label>
                    <Input
                      value={proformaOrderNo}
                      onChange={(e) => setProformaOrderNo(e.target.value)}
                      disabled={isViewMode}
                    />
                  </div>
                </div>
              </div>

              {/* Company and Tax Fields on the same row */}
              <div className="mt-4 border-t border-border pt-4">
                <div className="flex flex-row items-end gap-6">
                  {/* Company Dropdown (searchable, like Supplier) */}
                  <div className="flex-1">
                    <Label>Company</Label>
                    <div className="relative" ref={companyDropdownRef}>
                      <button
                        type="button"
                        onClick={() => setIsCompanyDropdownOpen(!isCompanyDropdownOpen)}
                        className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        disabled={isViewMode}
                      >
                        <span className={companyName ? "" : "text-muted-foreground"}>
                          {companyName || "Select company"}
                        </span>
                        <ChevronDown className="h-4 w-4 opacity-50" />
                      </button>
                      {isCompanyDropdownOpen && !isViewMode && (
                        <div className="absolute z-50 mt-1 w-full rounded-md border bg-popover shadow-md">
                          <div className="p-2 border-b">
                            <Input
                              placeholder="Search companies..."
                              value={supplierSearch}
                              onChange={(e) => setSupplierSearch(e.target.value)}
                              className="h-8"
                              autoFocus
                            />
                          </div>
                          <div className="max-h-[200px] overflow-y-auto p-1">
                            {filteredSuppliers.length > 0 ? (
                              filteredSuppliers.map((company) => (
                                <button
                                  key={company.id}
                                  type="button"
                                  onClick={() => {
                                    setCompanyName(company.name);
                                    setIsCompanyDropdownOpen(false);
                                    setSupplierSearch("");
                                  }}
                                  className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground cursor-pointer"
                                >
                                  {companyName === company.name && (
                                    <Check className="h-4 w-4" />
                                  )}
                                  <span className={companyName === company.name ? "" : "ml-6"}>
                                    {company.name}
                                  </span>
                                </button>
                              ))
                            ) : (
                              <div className="py-6 text-center text-sm text-muted-foreground">
                                No companies found.
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  {/* Tax Percentage (right side, 4 digits wide) */}
                  <div className="w-32 flex-shrink-0">
                    <Label>Tax</Label>
                    <div className="relative">
                      <Input
                        value={taxAmount}
                        onChange={(e) => setTaxAmount(e.target.value.replace(/[^0-9.]/g, '').slice(0, 4))}
                        placeholder="0.00"
                        maxLength={4}
                        className="pl-2 pr-8 text-left"
                        disabled={isViewMode}
                        style={{textAlign: 'left'}}
                      />
                      <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Items Table */}
            <div className="rounded-lg border border-border bg-card">
              <div className="overflow-x-auto overflow-y-visible">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-green-100">
                      <TableHead className="font-semibold text-foreground py-4 px-2">Model No</TableHead>
                      <TableHead className="font-semibold text-foreground py-4 px-2">Description</TableHead>
                      <TableHead className="font-semibold text-foreground py-4 px-2">Unit Price</TableHead>
                      <TableHead className="font-semibold text-foreground py-4 px-2">Qty</TableHead>
                      <TableHead className="font-semibold text-foreground py-4 px-2">Amount</TableHead>
                      <TableHead className="font-semibold text-foreground py-4 px-2">Tax Amount</TableHead>
                      <TableHead className="font-semibold text-foreground py-4 px-2">Amount With</TableHead>
                      <TableHead className="font-semibold text-foreground py-4 px-2">Reference No</TableHead>
                      <TableHead className="font-semibold text-foreground py-4 px-2">Remarks</TableHead>
                      <TableHead className="w-[50px] py-4 px-2"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {grnLines.map((line) => (
                      <TableRow key={line.id}>
                        <TableCell className="py-4 px-2">
                          <Input
                            value={line.model}
                            onChange={(e) => updateGRNLine(line.id, "model", e.target.value)}
                            className="min-w-[100px]"
                            disabled={isViewMode}
                          />
                        </TableCell>
                        <TableCell className="py-4 px-2">
                          <Input
                            value={line.itemDescription}
                            onChange={(e) => updateGRNLine(line.id, "itemDescription", e.target.value)}
                            className="min-w-[150px]"
                            disabled={isViewMode}
                          />
                        </TableCell>
                        <TableCell className="py-4 px-2">
                          <Input
                            type="number"
                            value={line.unitPrice}
                            onChange={(e) => updateGRNLine(line.id, "unitPrice", e.target.value)}
                            className="min-w-[100px]"
                            disabled={isViewMode}
                          />
                        </TableCell>
                        <TableCell className="py-4 px-2">
                          <Input
                            type="number"
                            value={line.quantity}
                            onChange={(e) => updateGRNLine(line.id, "quantity", e.target.value)}
                            className="min-w-[60px]"
                            disabled={isViewMode}
                          />
                        </TableCell>
                        <TableCell className="py-4 px-2">
                          <Input
                            value={
                              line.unitPrice && line.quantity
                                ? (parseFloat(line.unitPrice) * parseFloat(line.quantity)).toFixed(2)
                                : ""
                            }
                            readOnly
                            className="min-w-[100px] bg-muted"
                          />
                        </TableCell>
                        <TableCell className="py-4 px-2">
                          <Input
                            value={
                              line.unitPrice && line.quantity && taxAmount
                                ? (
                                    (parseFloat(line.unitPrice) * parseFloat(line.quantity)) * (parseFloat(taxAmount) || 0) / 100
                                  ).toFixed(2)
                                : ""
                            }
                            readOnly
                            className="min-w-[80px] bg-muted text-right"
                          />
                        </TableCell>
                        <TableCell className="py-4 px-2">
                          <Input
                            value={
                              line.unitPrice && line.quantity && taxAmount
                                ? (
                                    (parseFloat(line.unitPrice) * parseFloat(line.quantity)) +
                                    ((parseFloat(line.unitPrice) * parseFloat(line.quantity)) * (parseFloat(taxAmount) || 0) / 100)
                                  ).toFixed(2)
                                : ""
                            }
                            readOnly
                            className="min-w-[100px] bg-muted"
                          />
                        </TableCell>
                        <TableCell className="py-4 px-2">
                          <Input
                            value={line.serialNo}
                            onChange={(e) => updateGRNLine(line.id, "serialNo", e.target.value)}
                            className="min-w-[120px]"
                            disabled={isViewMode}
                          />
                        </TableCell>
                        <TableCell className="py-4 px-2">
                          <Input
                            value={line.remarks}
                            onChange={(e) => updateGRNLine(line.id, "remarks", e.target.value)}
                            className="min-w-[150px]"
                            disabled={isViewMode}
                          />
                        </TableCell>
                        <TableCell className="py-4 px-2">
                          {!isViewMode && (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeGRNLine(line.id)}
                              className="h-8 w-8"
                              disabled={grnLines.length === 1}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Add Line Button */}
              {!isViewMode && (
                <div className="border-t border-border p-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={addGRNLine}
                    className="gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Add Line
                  </Button>
                </div>
              )}

              {/* Total Section */}
              <div className="border-t-2 border-green-600 bg-green-50 p-4">
                <div className="flex justify-end">
                  <div className="flex items-center gap-6">
                    <Label className="text-lg font-bold text-gray-800">
                      Total
                    </Label>
                    <Input
                      placeholder="0.00"
                      className="w-40 text-right font-semibold bg-white border-green-300"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </MainLayout>
  );
}

export default function GRNPage() {
  return (
    <Suspense fallback={
      <MainLayout>
        <div className="flex h-full items-center justify-center">
          <div className="text-center">
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </div>
      </MainLayout>
    }>
      <GRNPageContent />
    </Suspense>
  );
}
