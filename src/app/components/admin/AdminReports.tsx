import { useState } from "react";
import { Search, FileText, Download, Eye, Plus, CheckCircle, RefreshCw, FileSpreadsheet, Send } from "lucide-react";

interface Report {
  id: number;
  name: string;
  type: "Attendance Reports" | "Employee Productivity Reports" | "App Usage Reports" | "Website Usage Reports" | "Late Login Reports" | "Break Time Reports" | "Work Hours Summary";
  department: string;
  generated: string;
  size: string;
  format: "PDF" | "Excel";
  status: "Ready" | "Generating";
  progress?: number;
}

const initialReports: Report[] = [
  { id: 1, name: "May Attendance Summary — Engineering", type: "Attendance Reports", department: "Engineering", generated: "Jun 1, 2026", size: "1.2 MB", format: "Excel", status: "Ready" },
  { id: 2, name: "Employee Productivity Trends Q2", type: "Employee Productivity Reports", department: "All Departments", generated: "Jun 10, 2026", size: "2.8 MB", format: "PDF", status: "Ready" },
  { id: 3, name: "System Application Usage Analysis", type: "App Usage Reports", department: "All Departments", generated: "Jun 15, 2026", size: "3.4 MB", format: "PDF", status: "Ready" },
  { id: 4, name: "Web Domain Category Usage Sheet", type: "Website Usage Reports", department: "Marketing", generated: "Jun 18, 2026", size: "1.9 MB", format: "Excel", status: "Ready" },
  { id: 5, name: "Weekly Late Login & Inactivity Log", type: "Late Login Reports", department: "Sales", generated: "Jun 19, 2026", size: "0.85 MB", format: "PDF", status: "Ready" },
  { id: 6, name: "Break Time & Idle Durations Report", type: "Break Time Reports", department: "All Departments", generated: "Jun 19, 2026", size: "1.4 MB", format: "Excel", status: "Ready" },
  { id: 7, name: "Total Work Hours Summary Q2", type: "Work Hours Summary", department: "Engineering", generated: "Jun 20, 2026", size: "2.1 MB", format: "PDF", status: "Generating", progress: 45 },
];

const typeStyles: Record<string, { color: string; bg: string }> = {
  "Attendance Reports": { color: "#3b82f6", bg: "rgba(59, 130, 246, 0.15)" },
  "Employee Productivity Reports": { color: "#6366f1", bg: "rgba(99, 102, 241, 0.15)" },
  "App Usage Reports": { color: "#a855f7", bg: "rgba(168, 85, 247, 0.15)" },
  "Website Usage Reports": { color: "#06b6d4", bg: "rgba(6, 182, 212, 0.15)" },
  "Late Login Reports": { color: "#f43f5e", bg: "rgba(244, 63, 94, 0.15)" },
  "Break Time Reports": { color: "#f97316", bg: "rgba(249, 115, 22, 0.15)" },
  "Work Hours Summary": { color: "#10b981", bg: "rgba(16, 185, 129, 0.15)" },
};

const formatStyles: Record<string, { color: string; bg: string }> = {
  PDF: { color: "#ef4444", bg: "rgba(239, 68, 68, 0.15)" },
  Excel: { color: "#10b981", bg: "rgba(16, 185, 129, 0.15)" },
};

export function AdminReports() {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<string>("All");
  const [reports, setReports] = useState<Report[]>(initialReports);
  
  // Export panel state
  const [exportType, setExportType] = useState<Report["type"]>("Attendance Reports");
  const [exportFormat, setExportFormat] = useState<Report["format"]>("PDF");
  const [exportDept, setExportDept] = useState("All Departments");
  const [exporting, setExporting] = useState(false);

  // Custom date states
  const [startDate, setStartDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() - 7);
    return d.toISOString().split("T")[0];
  });
  const [endDate, setEndDate] = useState(() => new Date().toISOString().split("T")[0]);

  const triggerDownload = (report: Report) => {
    const content = `Report Name: ${report.name}\nReport Type: ${report.type}\nDepartment: ${report.department}\nDate Generated: ${report.generated}\nSize: ${report.size}\nFormat: ${report.format}\nStatus: ${report.status}\n\nDisclaimer: This is a generated mock workforce analytics dataset for demonstration.`;
    const mimeType = report.format === "PDF" ? "application/pdf" : "application/vnd.ms-excel";
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${report.name.toLowerCase().replace(/[^a-z0-9]+/g, "_")}.${report.format === "PDF" ? "pdf" : "xlsx"}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success(`Downloaded: ${report.name}.${report.format === "PDF" ? "pdf" : "xlsx"}`);
  };

  const handleExportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setExporting(true);
    
    // Simulate generation of report
    setTimeout(() => {
      const newReport: Report = {
        id: Date.now(),
        name: `${exportType.replace(" Reports", "").replace(" Summary", "")} (${startDate} to ${endDate}) — ${exportDept}`,
        type: exportType,
        department: exportDept,
        generated: "Just Now",
        size: `${(Math.random() * 3 + 0.5).toFixed(2)} MB`,
        format: exportFormat,
        status: "Ready",
      };
      setReports([newReport, ...reports]);
      setExporting(false);
      toast.success("Custom report generated successfully!");
    }, 1500);
  };

  const filtered = reports.filter(r => {
    const matchesSearch = r.name.toLowerCase().includes(search.toLowerCase()) || r.department.toLowerCase().includes(search.toLowerCase());
    const matchesType = filterType === "All" || r.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="p-6 space-y-6 overflow-y-auto h-full text-foreground animate-fade-in" style={{ background: "var(--background)" }}>
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 700 }}>Reports & Exports</h2>
          <p style={{ fontSize: "0.85rem", color: "var(--muted-foreground)" }}>Generate, view, and export workforce analytics reports</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search reports..."
            className="pl-9 pr-4 py-2 rounded-xl outline-none"
            style={{
              background: "var(--input-background)",
              border: "1px solid var(--border)",
              color: "var(--foreground)",
              fontSize: "0.85rem",
              width: "240px"
            }}
          />
        </div>
      </div>

      {/* Export Controls (PDF / Excel) Panel */}
      <div className="rounded-2xl p-6 space-y-4" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center gradient-primary text-white">
            <Download className="w-4 h-4" />
          </div>
          <div>
            <h3 style={{ fontWeight: 600, fontSize: "1.05rem" }}>Export Reports (PDF / Excel)</h3>
            <p style={{ fontSize: "0.75rem", color: "var(--muted-foreground)" }}>Select report criteria and download in your desired format</p>
          </div>
        </div>

        <form onSubmit={handleExportSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 items-end">
          <div>
            <label className="block mb-1.5 text-xs font-semibold text-muted-foreground">Report Type</label>
            <select
              value={exportType}
              onChange={e => setExportType(e.target.value as Report["type"])}
              className="w-full px-3 py-2 rounded-xl outline-none"
              style={{ background: "var(--input-background)", border: "1px solid var(--border)", color: "var(--foreground)", fontSize: "0.85rem" }}
            >
              <option value="Attendance Reports">Attendance Reports</option>
              <option value="Employee Productivity Reports">Employee Productivity Reports</option>
              <option value="App Usage Reports">App Usage Reports</option>
              <option value="Website Usage Reports">Website Usage Reports</option>
              <option value="Late Login Reports">Late Login Reports</option>
              <option value="Break Time Reports">Break Time Reports</option>
              <option value="Work Hours Summary">Work Hours Summary</option>
            </select>
          </div>

          <div>
            <label className="block mb-1.5 text-xs font-semibold text-muted-foreground">Department Scope</label>
            <select
              value={exportDept}
              onChange={e => setExportDept(e.target.value)}
              className="w-full px-3 py-2 rounded-xl outline-none"
              style={{ background: "var(--input-background)", border: "1px solid var(--border)", color: "var(--foreground)", fontSize: "0.85rem" }}
            >
              <option value="All Departments">All Departments</option>
              <option value="Engineering">Engineering</option>
              <option value="Sales">Sales</option>
              <option value="Marketing">Marketing</option>
              <option value="Support">Support</option>
            </select>
          </div>

          <div>
            <label className="block mb-1.5 text-xs font-semibold text-muted-foreground">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
              className="w-full px-3 py-2 rounded-xl outline-none"
              style={{ background: "var(--input-background)", border: "1px solid var(--border)", color: "var(--foreground)", fontSize: "0.85rem", colorScheme: "dark" }}
            />
          </div>

          <div>
            <label className="block mb-1.5 text-xs font-semibold text-muted-foreground">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={e => setEndDate(e.target.value)}
              className="w-full px-3 py-2 rounded-xl outline-none"
              style={{ background: "var(--input-background)", border: "1px solid var(--border)", color: "var(--foreground)", fontSize: "0.85rem", colorScheme: "dark" }}
            />
          </div>

          <div>
            <label className="block mb-1.5 text-xs font-semibold text-muted-foreground">Export Format</label>
            <div className="flex gap-2">
              {(["PDF", "Excel"] as const).map(f => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setExportFormat(f)}
                  className="flex-1 py-2 rounded-xl border flex items-center justify-center gap-1.5 font-semibold transition-all"
                  style={{
                    background: exportFormat === f ? "var(--primary)" : "var(--muted)",
                    color: exportFormat === f ? "white" : "var(--muted-foreground)",
                    borderColor: exportFormat === f ? "var(--primary)" : "var(--border)",
                    fontSize: "0.8rem",
                  }}
                >
                  {f === "PDF" ? <FileText className="w-3.5 h-3.5" /> : <FileSpreadsheet className="w-3.5 h-3.5" />}
                  {f}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={exporting}
            className="flex items-center justify-center gap-2 w-full py-2 rounded-xl text-white font-medium gradient-primary transition-all hover:opacity-90 active:scale-95 disabled:opacity-50"
            style={{ fontSize: "0.85rem", height: "38px" }}
          >
            {exporting ? (
              <><RefreshCw className="w-4 h-4 animate-spin" /> Generating...</>
            ) : (
              <><Send className="w-4 h-4" /> Export Report</>
            )}
          </button>
        </form>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 flex-wrap" style={{ borderBottom: "1px solid var(--border)", paddingBottom: "12px" }}>
        {["All", "Attendance Reports", "Employee Productivity Reports", "App Usage Reports", "Website Usage Reports", "Late Login Reports", "Break Time Reports", "Work Hours Summary"].map(tab => (
          <button
            key={tab}
            onClick={() => setFilterType(tab)}
            className="px-3.5 py-1.5 rounded-xl transition-all"
            style={{
              background: filterType === tab ? "var(--primary)" : "var(--muted)",
              color: filterType === tab ? "white" : "var(--muted-foreground)",
              fontWeight: filterType === tab ? 600 : 400,
              fontSize: "0.75rem",
            }}
          >
            {tab === "All" ? "All Reports" : tab.replace(" Reports", "")}
          </button>
        ))}
      </div>

      {/* Reports Table Card */}
      <div className="rounded-2xl overflow-hidden" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr style={{ background: "var(--muted)", borderBottom: "1px solid var(--border)" }}>
                {["REPORT NAME", "TYPE", "DEPARTMENT", "GENERATED", "SIZE", "FORMAT", "STATUS", "ACTIONS"].map(h => (
                  <th key={h} className="px-5 py-3 text-left" style={{ fontSize: "0.72rem", color: "var(--muted-foreground)", fontWeight: 600, textTransform: "uppercase" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((report) => (
                <tr key={report.id} className="hover:opacity-95 transition-opacity" style={{ borderBottom: "1px solid var(--border)" }}>
                  <td className="px-5 py-4 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    <span style={{ fontSize: "0.85rem", fontWeight: 600 }}>{report.name}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="px-2.5 py-0.5 rounded text-[0.68rem] font-bold"
                      style={{
                        background: typeStyles[report.type]?.bg || "rgba(255,255,255,0.1)",
                        color: typeStyles[report.type]?.color || "var(--foreground)"
                      }}>
                      {report.type}
                    </span>
                  </td>
                  <td className="px-5 py-4" style={{ fontSize: "0.8rem", color: "var(--muted-foreground)" }}>
                    {report.department}
                  </td>
                  <td className="px-5 py-4" style={{ fontSize: "0.8rem", color: "var(--muted-foreground)" }}>
                    {report.generated}
                  </td>
                  <td className="px-5 py-4" style={{ fontSize: "0.8rem", color: "var(--muted-foreground)" }}>
                    {report.size}
                  </td>
                  <td className="px-5 py-4">
                    <span className="px-2 py-0.5 rounded text-[0.65rem] font-bold inline-flex items-center gap-1"
                      style={{
                        background: formatStyles[report.format]?.bg,
                        color: formatStyles[report.format]?.color
                      }}>
                      {report.format === "PDF" ? <FileText className="w-3 h-3" /> : <FileSpreadsheet className="w-3 h-3" />}
                      {report.format}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    {report.status === "Ready" ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[0.68rem] font-bold"
                        style={{ background: "rgba(16, 185, 129, 0.15)", color: "#10b981" }}>
                        <CheckCircle className="w-3 h-3" /> Ready
                      </span>
                    ) : (
                      <div className="flex flex-col gap-1 w-24">
                        <div className="flex justify-between items-center text-[0.65rem] text-muted-foreground">
                          <span>Generating</span>
                          <span>{report.progress}%</span>
                        </div>
                        <div className="h-1.5 w-full rounded-full" style={{ background: "var(--muted)" }}>
                          <div className="h-1.5 rounded-full transition-all" style={{ width: `${report.progress}%`, background: "var(--primary)" }} />
                        </div>
                      </div>
                    )}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex gap-2">
                      <button className="p-1.5 rounded-lg hover:bg-neutral-800 transition-colors"
                        style={{ background: "var(--muted)", color: "var(--foreground)" }}>
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => triggerDownload(report)}
                        className="p-1.5 rounded-lg hover:bg-neutral-800 transition-colors active:scale-95 disabled:opacity-50"
                        style={{ background: "var(--muted)", color: "var(--foreground)" }}
                        disabled={report.status !== "Ready"}
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-5 py-8 text-center text-muted-foreground" style={{ fontSize: "0.85rem" }}>
                    No reports match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
