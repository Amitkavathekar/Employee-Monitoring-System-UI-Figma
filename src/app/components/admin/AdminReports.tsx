import { useState } from "react";
import { Search, FileText, Download, Eye, Plus, CheckCircle, RefreshCw } from "lucide-react";

interface Report {
  id: number;
  name: string;
  type: "Productivity" | "Attendance" | "Compliance" | "Activity" | "Performance";
  department: string;
  generated: string;
  size: string;
  format: "PDF" | "Excel" | "CSV";
  status: "Ready" | "Generating";
  progress?: number;
}

const initialReports: Report[] = [
  { id: 1, name: "Monthly Productivity Report", type: "Productivity", department: "All Departments", generated: "Jun 1, 2026", size: "2.4 MB", format: "PDF", status: "Ready" },
  { id: 2, name: "Attendance Summary — May 2026", type: "Attendance", department: "Engineering", generated: "Jun 1, 2026", size: "1.1 MB", format: "Excel", status: "Ready" },
  { id: 3, name: "Policy Violations Log", type: "Compliance", department: "All Departments", generated: "Jun 9, 2026", size: "0.8 MB", format: "CSV", status: "Ready" },
  { id: 4, name: "Screen Time Analysis — May", type: "Activity", department: "Sales", generated: "Jun 1, 2026", size: "3.2 MB", format: "PDF", status: "Ready" },
  { id: 5, name: "Top Performers Q2 2026", type: "Performance", department: "All Departments", generated: "Jun 9, 2026", size: "0.6 MB", format: "PDF", status: "Ready" },
  { id: 6, name: "Website Usage Report", type: "Activity", department: "Marketing", generated: "Jun 8, 2026", size: "1.5 MB", format: "Excel", status: "Ready" },
  { id: 7, name: "Overtime Analysis — Q2", type: "Attendance", department: "All Departments", generated: "Jun 9, 2026", size: "0.9 MB", format: "PDF", status: "Generating", progress: 60 },
  { id: 8, name: "Department Comparison Report", type: "Performance", department: "All Departments", generated: "Jun 7, 2026", size: "2.1 MB", format: "Excel", status: "Ready" },
];

const typeStyles: Record<string, { color: string; bg: string }> = {
  Productivity: { color: "#818cf8", bg: "rgba(129, 140, 248, 0.15)" },
  Attendance: { color: "#60a5fa", bg: "rgba(96, 165, 250, 0.15)" },
  Compliance: { color: "#f87171", bg: "rgba(248, 113, 113, 0.15)" },
  Activity: { color: "#fbbf24", bg: "rgba(251, 191, 36, 0.15)" },
  Performance: { color: "#34d399", bg: "rgba(52, 211, 153, 0.15)" },
};

const formatStyles: Record<string, { color: string; bg: string }> = {
  PDF: { color: "#f87171", bg: "rgba(248, 113, 113, 0.2)" },
  Excel: { color: "#34d399", bg: "rgba(52, 211, 153, 0.2)" },
  CSV: { color: "#fbbf24", bg: "rgba(251, 191, 36, 0.2)" },
};

export function AdminReports() {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<string>("All");
  const [reports, setReports] = useState<Report[]>(initialReports);
  const [generating, setGenerating] = useState(false);

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      const newReport: Report = {
        id: Date.now(),
        name: `Custom System Report — ${new Date().toLocaleDateString()}`,
        type: "Compliance",
        department: "All Departments",
        generated: "Just Now",
        size: "1.2 MB",
        format: "PDF",
        status: "Ready",
      };
      setReports([newReport, ...reports]);
      setGenerating(false);
    }, 1500);
  };

  const filtered = reports.filter(r => {
    const matchesSearch = r.name.toLowerCase().includes(search.toLowerCase()) || r.department.toLowerCase().includes(search.toLowerCase());
    const matchesType = filterType === "All" || r.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="p-6 space-y-6 overflow-y-auto h-full text-foreground" style={{ background: "var(--background)" }}>
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 700 }}>Reports</h2>
          <p style={{ fontSize: "0.85rem", color: "var(--muted-foreground)" }}>Generate and download monitoring reports</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search..."
              className="pl-9 pr-4 py-2 rounded-xl outline-none"
              style={{
                background: "var(--input-background)",
                border: "1px solid var(--border)",
                color: "var(--foreground)",
                fontSize: "0.85rem",
                width: "200px"
              }}
            />
          </div>
          <button
            onClick={handleGenerate}
            disabled={generating}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-white font-medium gradient-primary transition-all hover:opacity-90 active:scale-95 disabled:opacity-50"
            style={{ fontSize: "0.85rem" }}
          >
            {generating ? (
              <><RefreshCw className="w-4 h-4 animate-spin" /> Generating...</>
            ) : (
              <><Plus className="w-4 h-4" /> Generate Report</>
            )}
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Reports", value: "48", sub: "This month", color: "#6366f1" },
          { label: "Auto-Generated", value: "32", sub: "Scheduled", color: "#06b6d4" },
          { label: "Downloaded", value: "21", sub: "This week", color: "#10b981" },
          { label: "Scheduled Jobs", value: "4", sub: "Active", color: "#f59e0b" },
        ].map((card, i) => (
          <div key={i} className="rounded-2xl p-5" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <div style={{ fontSize: "2rem", fontWeight: 800, color: "var(--foreground)", lineHeight: 1 }}>{card.value}</div>
            <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--foreground)", marginTop: "6px" }}>{card.label}</div>
            <div style={{ fontSize: "0.75rem", color: "var(--muted-foreground)", marginTop: "4px" }}>{card.sub}</div>
          </div>
        ))}
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 flex-wrap" style={{ borderBottom: "1px solid var(--border)", paddingBottom: "12px" }}>
        {["All", "Productivity", "Attendance", "Compliance", "Activity", "Performance"].map(tab => (
          <button
            key={tab}
            onClick={() => setFilterType(tab)}
            className="px-4 py-1.5 rounded-xl capitalize transition-all"
            style={{
              background: filterType === tab ? "var(--primary)" : "var(--muted)",
              color: filterType === tab ? "white" : "var(--muted-foreground)",
              fontWeight: filterType === tab ? 600 : 400,
              fontSize: "0.8rem",
            }}
          >
            {tab}
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
                  <th key={h} className="px-5 py-3 text-left" style={{ fontSize: "0.75rem", color: "var(--muted-foreground)", fontWeight: 600, textTransform: "uppercase" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((report) => (
                <tr key={report.id} className="hover:opacity-90 transition-opacity" style={{ borderBottom: "1px solid var(--border)" }}>
                  <td className="px-5 py-4 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    <span style={{ fontSize: "0.875rem", fontWeight: 600 }}>{report.name}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="px-2.5 py-0.5 rounded text-[0.7rem] font-bold"
                      style={{
                        background: typeStyles[report.type]?.bg || "rgba(255,255,255,0.1)",
                        color: typeStyles[report.type]?.color || "var(--foreground)"
                      }}>
                      {report.type}
                    </span>
                  </td>
                  <td className="px-5 py-4" style={{ fontSize: "0.85rem", color: "var(--muted-foreground)" }}>
                    {report.department}
                  </td>
                  <td className="px-5 py-4" style={{ fontSize: "0.85rem", color: "var(--muted-foreground)" }}>
                    {report.generated}
                  </td>
                  <td className="px-5 py-4" style={{ fontSize: "0.85rem", color: "var(--muted-foreground)" }}>
                    {report.size}
                  </td>
                  <td className="px-5 py-4">
                    <span className="px-1.5 py-0.5 rounded text-[0.65rem] font-bold"
                      style={{
                        background: formatStyles[report.format]?.bg,
                        color: formatStyles[report.format]?.color
                      }}>
                      {report.format}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    {report.status === "Ready" ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[0.7rem] font-bold"
                        style={{ background: "rgba(52, 211, 153, 0.15)", color: "#34d399" }}>
                        Ready
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
                      <button className="p-1.5 rounded-lg hover:opacity-75 transition-opacity"
                        style={{ background: "var(--muted)", color: "var(--foreground)" }}>
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button className="p-1.5 rounded-lg hover:opacity-75 transition-opacity"
                        style={{ background: "var(--muted)", color: "var(--foreground)" }}>
                        <Download className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
