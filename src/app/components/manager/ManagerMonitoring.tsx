import { useState } from "react";
import {
  Search, Laptop, Globe, Calendar, User, Building, FileText, Check, Download,
  Eye, ChevronDown, ChevronUp, AlertTriangle, TrendingUp, Info, HelpCircle, X
} from "lucide-react";
import {
  BarChart, Bar, Cell, PieChart, Pie, ResponsiveContainer, XAxis, YAxis,
  Tooltip, CartesianGrid, Legend
} from "recharts";

// ─────────────────────────────────────────────────────────────────────────────
// DATA TYPES & MOCK DATA
// ─────────────────────────────────────────────────────────────────────────────

interface AppUsage {
  id: number;
  employeeName: string;
  department: string;
  appName: string;
  category: "Productive" | "Non-Productive";
  startTime: string;
  endTime: string;
  duration: string; // duration of this single record
  durationMs: number; // in milliseconds for calculation
  totalUsageTime: string; // total time spent on this app
  appDetails: { name: string; time: string; durationMs: number }[];
}

interface WebActivity {
  id: number;
  employeeName: string;
  department: string;
  websiteName: string;
  category: "Development" | "Research" | "Social Media" | "Entertainment" | "News";
  visits: number;
  timeSpent: string;
  timeSpentMs: number;
  status: "Productive" | "Non-Productive";
  webDetails: { url: string; time: string; durationMs: number }[];
}

const mockAppUsages: AppUsage[] = [
  {
    id: 1,
    employeeName: "Sarah Johnson",
    department: "Engineering",
    appName: "VS Code",
    category: "Productive",
    startTime: "09:00 AM",
    endTime: "01:30 PM",
    duration: "4h 30m",
    durationMs: 16200000,
    totalUsageTime: "11h 20m",
    appDetails: [
      { name: "VS Code", time: "4h 30m", durationMs: 16200000 },
      { name: "Chrome", time: "2h 50m", durationMs: 10200000 },
      { name: "Figma", time: "3h 10m", durationMs: 11400000 },
      { name: "Slack", time: "1h 20m", durationMs: 4800000 },
      { name: "Spotify", time: "30m", durationMs: 1800000 },
    ]
  },
  {
    id: 2,
    employeeName: "Mike Chen",
    department: "Design",
    appName: "Figma",
    category: "Productive",
    startTime: "09:30 AM",
    endTime: "12:45 PM",
    duration: "3h 15m",
    durationMs: 11700000,
    totalUsageTime: "8h 10m",
    appDetails: [
      { name: "Figma", time: "4h 10m", durationMs: 15000000 },
      { name: "Chrome", time: "2h 10m", durationMs: 7800000 },
      { name: "Slack", time: "1h 15m", durationMs: 4500000 },
      { name: "YouTube", time: "35m", durationMs: 2100000 },
    ]
  },
  {
    id: 3,
    employeeName: "Emma Wilson",
    department: "Marketing",
    appName: "Chrome",
    category: "Productive",
    startTime: "10:00 AM",
    endTime: "12:30 PM",
    duration: "2h 30m",
    durationMs: 9000000,
    totalUsageTime: "7h 45m",
    appDetails: [
      { name: "Chrome", time: "3h 50m", durationMs: 13800000 },
      { name: "Slack", time: "1h 40m", durationMs: 6000000 },
      { name: "PowerPoint", time: "1h 30m", durationMs: 5400000 },
      { name: "Facebook", time: "45m", durationMs: 2700000 },
    ]
  },
  {
    id: 4,
    employeeName: "James Lee",
    department: "Engineering",
    appName: "VS Code",
    category: "Productive",
    startTime: "09:15 AM",
    endTime: "02:15 PM",
    duration: "5h 00m",
    durationMs: 18000000,
    totalUsageTime: "9h 30m",
    appDetails: [
      { name: "VS Code", time: "5h 10m", durationMs: 18600000 },
      { name: "Chrome", time: "2h 30m", durationMs: 9000000 },
      { name: "Slack", time: "1h 10m", durationMs: 4200000 },
      { name: "Discord", time: "40m", durationMs: 2400000 },
    ]
  },
  {
    id: 5,
    employeeName: "Priya Patel",
    department: "Sales",
    appName: "Salesforce",
    category: "Productive",
    startTime: "09:45 AM",
    endTime: "01:15 PM",
    duration: "3h 30m",
    durationMs: 12600000,
    totalUsageTime: "8h 25m",
    appDetails: [
      { name: "Salesforce", time: "4h 20m", durationMs: 15600000 },
      { name: "Chrome", time: "2h 20m", durationMs: 8400000 },
      { name: "Slack", time: "40m", durationMs: 2400000 },
      { name: "Netflix", time: "1h 05m", durationMs: 3900000 },
    ]
  }
];

const mockWebActivities: WebActivity[] = [
  {
    id: 1,
    employeeName: "Sarah Johnson",
    department: "Engineering",
    websiteName: "github.com",
    category: "Development",
    visits: 48,
    timeSpent: "4h 20m",
    timeSpentMs: 15600000,
    status: "Productive",
    webDetails: [
      { url: "github.com", time: "2h 00m", durationMs: 7200000 },
      { url: "stackoverflow.com", time: "1h 15m", durationMs: 4500000 },
      { url: "react.dev/docs", time: "45m", durationMs: 2700000 },
      { url: "linkedin.com", time: "20m", durationMs: 1200000 },
      { url: "twitter.com", time: "15m", durationMs: 900000 },
    ]
  },
  {
    id: 2,
    employeeName: "Mike Chen",
    department: "Design",
    websiteName: "figma.com",
    category: "Research",
    visits: 35,
    timeSpent: "3h 40m",
    timeSpentMs: 13200000,
    status: "Productive",
    webDetails: [
      { url: "figma.com", time: "2h 30m", durationMs: 9000000 },
      { url: "dribbble.com", time: "45m", durationMs: 2700000 },
      { url: "pinterest.com", time: "25m", durationMs: 1500000 },
    ]
  },
  {
    id: 3,
    employeeName: "Emma Wilson",
    department: "Marketing",
    websiteName: "linkedin.com",
    category: "Social Media",
    visits: 25,
    timeSpent: "1h 50m",
    timeSpentMs: 6600000,
    status: "Non-Productive",
    webDetails: [
      { url: "facebook.com", time: "50m", durationMs: 3000000 },
      { url: "linkedin.com", time: "45m", durationMs: 2700000 },
      { url: "twitter.com", time: "15m", durationMs: 900000 },
    ]
  },
  {
    id: 4,
    employeeName: "James Lee",
    department: "Engineering",
    websiteName: "stackoverflow.com",
    category: "Development",
    visits: 42,
    timeSpent: "3h 10m",
    timeSpentMs: 11400000,
    status: "Productive",
    webDetails: [
      { url: "github.com", time: "1h 40m", durationMs: 6000000 },
      { url: "stackoverflow.com", time: "1h 10m", durationMs: 4200000 },
      { url: "reddit.com/r/reactjs", time: "20m", durationMs: 1200000 },
    ]
  },
  {
    id: 5,
    employeeName: "Priya Patel",
    department: "Sales",
    websiteName: "salesforce.com",
    category: "Research",
    visits: 30,
    timeSpent: "2h 55m",
    timeSpentMs: 10500000,
    status: "Productive",
    webDetails: [
      { url: "salesforce.com", time: "2h 10m", durationMs: 7800000 },
      { url: "linkedin.com/sales", time: "35m", durationMs: 2100000 },
      { url: "netflix.com", time: "10m", durationMs: 600000 },
    ]
  }
];

// Helper to format ms to readable string
const formatMsToTime = (ms: number): string => {
  const totalMinutes = Math.floor(ms / 60000);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
};

// ─────────────────────────────────────────────────────────────────────────────
// TOAST ALERT COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
function Toast({ show, message, onClose }: { show: boolean; message: string; onClose: () => void }) {
  if (!show) return null;
  return (
    <div className="fixed bottom-6 right-6 z-50 p-4 rounded-xl shadow-2xl flex items-center gap-2 text-white border text-sm transition-all transform animate-in slide-in-from-bottom-5 duration-300"
         style={{ background: "linear-gradient(135deg, #6366f1, #4f46e5)", borderColor: "rgba(99,102,241,0.3)" }}>
      <Check className="w-4 h-4" />
      <span>{message}</span>
      <button onClick={onClose} className="ml-2 hover:opacity-75"><X className="w-3.5 h-3.5" /></button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT 1: APPLICATION MONITORING
// ─────────────────────────────────────────────────────────────────────────────
export function ManagerApplications() {
  const [search, setSearch] = useState("");
  const [employeeFilter, setEmployeeFilter] = useState("all");
  const [deptFilter, setDeptFilter] = useState("all");
  const [dateRange, setDateRange] = useState("Today");
  
  const [expandedId, setExpandedId] = useState<number | null>(1); // Sarah open by default
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [selectedDetails, setSelectedDetails] = useState<AppUsage | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // Filter usages based on inputs
  const filteredUsages = mockAppUsages.filter(app => {
    const matchesSearch = app.employeeName.toLowerCase().includes(search.toLowerCase());
    const matchesEmployee = employeeFilter === "all" || app.employeeName === employeeFilter;
    const matchesDept = deptFilter === "all" || app.department === deptFilter;
    return matchesSearch && matchesEmployee && matchesDept;
  });

  // Calculate dynamic stats
  let totalAppsUsed = 0;
  let productiveMs = 0;
  let nonProductiveMs = 0;

  filteredUsages.forEach(item => {
    // Collect unique apps count in employee breakdown
    item.appDetails.forEach(detail => {
      const isProductive = !["Spotify", "YouTube", "Facebook", "Netflix", "Discord"].includes(detail.name);
      if (isProductive) {
        productiveMs += detail.durationMs;
      } else {
        nonProductiveMs += detail.durationMs;
      }
    });
  });

  // Unique apps total across selected dataset
  const uniqueApps = new Set<string>();
  filteredUsages.forEach(item => item.appDetails.forEach(d => uniqueApps.add(d.name)));
  totalAppsUsed = uniqueApps.size;

  const totalTimeMs = productiveMs + nonProductiveMs;
  const productivityPercentage = totalTimeMs > 0 ? ((productiveMs / totalTimeMs) * 100).toFixed(1) : "0.0";

  // Recharts Chart Data Calculations
  // 1. Top Apps Chart Data
  const appDurationsMap: Record<string, number> = {};
  filteredUsages.forEach(item => {
    item.appDetails.forEach(d => {
      appDurationsMap[d.name] = (appDurationsMap[d.name] || 0) + d.durationMs;
    });
  });
  const topAppsData = Object.entries(appDurationsMap)
    .map(([name, ms]) => ({ name, Hours: parseFloat((ms / 3600000).toFixed(1)) }))
    .sort((a, b) => b.Hours - a.Hours);

  // 2. Productive vs Non-Productive Pie Chart
  const pieData = [
    { name: "Productive", value: parseFloat((productiveMs / 3600000).toFixed(1)), color: "#10b981" },
    { name: "Non-Productive", value: parseFloat((nonProductiveMs / 3600000).toFixed(1)), color: "#ef4444" },
  ];

  // 3. Employee-wise Chart Data
  const employeeUsageData = filteredUsages.map(item => {
    let pMs = 0;
    let npMs = 0;
    item.appDetails.forEach(d => {
      const isProductive = !["Spotify", "YouTube", "Facebook", "Netflix", "Discord"].includes(d.name);
      if (isProductive) pMs += d.durationMs;
      else npMs += d.durationMs;
    });
    return {
      name: item.employeeName.split(" ")[0], // Use first name
      Productive: parseFloat((pMs / 3600000).toFixed(1)),
      "Non-Productive": parseFloat((npMs / 3600000).toFixed(1)),
    };
  });

  return (
    <div className="p-6 space-y-6 overflow-y-auto h-full text-foreground" style={{ background: "var(--background)" }}>
      
      {/* ─── Top Filter Panel ─── */}
      <div className="glass-card rounded-2xl p-5 flex flex-wrap items-center justify-between gap-4 border" style={{ borderColor: "var(--border)" }}>
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          {/* Search Bar */}
          <div className="relative flex-1 sm:flex-initial">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search Employee..."
              className="pl-9 pr-4 py-2 rounded-xl outline-none text-xs w-full sm:w-44"
              style={{ background: "var(--input-background)", border: "1px solid var(--border)", color: "var(--foreground)" }}
            />
          </div>

          {/* Employee Dropdown */}
          <select
            value={employeeFilter}
            onChange={e => setEmployeeFilter(e.target.value)}
            className="py-2 px-3 rounded-xl outline-none text-xs"
            style={{ background: "var(--input-background)", border: "1px solid var(--border)", color: "var(--foreground)" }}
          >
            <option value="all">All Employees</option>
            {mockAppUsages.map(e => (
              <option key={e.id} value={e.employeeName}>{e.employeeName}</option>
            ))}
          </select>

          {/* Department Dropdown */}
          <select
            value={deptFilter}
            onChange={e => setDeptFilter(e.target.value)}
            className="py-2 px-3 rounded-xl outline-none text-xs"
            style={{ background: "var(--input-background)", border: "1px solid var(--border)", color: "var(--foreground)" }}
          >
            <option value="all">All Departments</option>
            <option value="Engineering">Engineering</option>
            <option value="Design">Design</option>
            <option value="Marketing">Marketing</option>
            <option value="Sales">Sales</option>
            <option value="HR">HR</option>
          </select>

          {/* Date Picker (Mock) */}
          <div className="relative">
            <select
              value={dateRange}
              onChange={e => setDateRange(e.target.value)}
              className="py-2 pl-8 pr-3 rounded-xl outline-none text-xs cursor-pointer"
              style={{ background: "var(--input-background)", border: "1px solid var(--border)", color: "var(--foreground)" }}
            >
              <option>Today</option>
              <option>Yesterday</option>
              <option>Last 7 Days</option>
              <option>This Month</option>
            </select>
            <Calendar className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
          </div>
        </div>

        {/* Global Export Buttons */}
        <div className="flex gap-2 w-full sm:w-auto">
          <button
            onClick={() => triggerToast("PDF exported successfully!")}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all hover:bg-muted"
            style={{ borderColor: "var(--border)", color: "var(--foreground)" }}
          >
            <FileText className="w-3.5 h-3.5" /> Export PDF
          </button>
          <button
            onClick={() => triggerToast("Excel exported successfully!")}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-white gradient-primary transition-all hover:opacity-90"
          >
            <Download className="w-3.5 h-3.5" /> Export Excel
          </button>
        </div>
      </div>

      {/* ─── Summary Cards Grid ─── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Applications Used", value: totalAppsUsed, sub: "Across team", color: "#6366f1" },
          { label: "Total Productive Time", value: formatMsToTime(productiveMs), sub: "Tracked hours", color: "#10b981" },
          { label: "Total Non-Productive Time", value: formatMsToTime(nonProductiveMs), sub: "Tracked leisure", color: "#ef4444" },
          { label: "Productivity Percentage", value: `${productivityPercentage}%`, sub: "Avg score", color: "#818cf8" },
        ].map((card, i) => (
          <div key={i} className="rounded-2xl p-5 border hover:scale-[1.01] hover:shadow-lg transition-all"
               style={{ background: "var(--card)", borderColor: "var(--border)" }}>
            <div style={{ fontSize: "1.75rem", fontWeight: 800, color: card.color, lineHeight: 1 }}>{card.value}</div>
            <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--foreground)", marginTop: "6px" }}>{card.label}</div>
            <div style={{ fontSize: "0.7rem", color: "var(--muted-foreground)", marginTop: "2px" }}>{card.sub}</div>
          </div>
        ))}
      </div>

      {/* ─── Recharts Graphical Panel ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Apps Bar Chart */}
        <div className="glass-card rounded-2xl p-5 border flex flex-col" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
          <h3 className="text-sm font-bold mb-4">Top Applications Used (Hours)</h3>
          <div className="h-64 flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topAppsData} layout="vertical" margin={{ left: 10, right: 10, top: 5, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={true} vertical={false} />
                <XAxis type="number" stroke="var(--muted-foreground)" fontSize={10} tickLine={false} />
                <YAxis dataKey="name" type="category" stroke="var(--muted-foreground)" fontSize={10} tickLine={false} width={65} />
                <Tooltip
                  contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px" }}
                  labelStyle={{ color: "var(--foreground)", fontWeight: 700 }}
                />
                <Bar dataKey="Hours" radius={[0, 4, 4, 0]}>
                  {topAppsData.map((entry, idx) => (
                    <Cell key={`cell-${idx}`} fill={idx % 2 === 0 ? "#6366f1" : "#818cf8"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Productive vs Non-Productive Pie Chart */}
        <div className="glass-card rounded-2xl p-5 border flex flex-col" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
          <h3 className="text-sm font-bold mb-4 font-semibold">Productive vs Non-Productive Share</h3>
          <div className="h-64 flex-1 relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px" }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: "11px" }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className="text-xl font-extrabold text-green-500">{productivityPercentage}%</span>
              <span className="text-[10px] text-muted-foreground font-semibold">Productive</span>
            </div>
          </div>
        </div>

        {/* Employee-wise Usage Chart */}
        <div className="glass-card rounded-2xl p-5 border flex flex-col" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
          <h3 className="text-sm font-bold mb-4">Employee Usage Breakdown (Hours)</h3>
          <div className="h-64 flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={employeeUsageData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="name" stroke="var(--muted-foreground)" fontSize={10} tickLine={false} />
                <YAxis stroke="var(--muted-foreground)" fontSize={10} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px" }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: "11px" }} />
                <Bar dataKey="Productive" stackId="a" fill="#10b981" />
                <Bar dataKey="Non-Productive" stackId="a" fill="#ef4444" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* ─── Usage Directory Table ─── */}
      <div className="rounded-2xl border overflow-hidden" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
        <div className="p-4" style={{ borderBottom: "1px solid var(--border)" }}>
          <h3 className="font-bold text-sm">Application Usage Records</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr style={{ background: "var(--muted)", borderBottom: "1px solid var(--border)" }}>
                <th className="px-5 py-3 text-xs font-semibold text-muted-foreground uppercase">Employee Name</th>
                <th className="px-5 py-3 text-xs font-semibold text-muted-foreground uppercase">Top Application</th>
                <th className="px-5 py-3 text-xs font-semibold text-muted-foreground uppercase">Category</th>
                <th className="px-5 py-3 text-xs font-semibold text-muted-foreground uppercase">Session Start</th>
                <th className="px-5 py-3 text-xs font-semibold text-muted-foreground uppercase">Session End</th>
                <th className="px-5 py-3 text-xs font-semibold text-muted-foreground uppercase">Duration</th>
                <th className="px-5 py-3 text-xs font-semibold text-muted-foreground uppercase">Total Daily Usage</th>
                <th className="px-5 py-3 text-xs font-semibold text-muted-foreground uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsages.map(item => {
                const isExpanded = expandedId === item.id;
                const isProductive = !["Spotify", "YouTube", "Facebook", "Netflix", "Discord"].includes(item.appName);

                return (
                  <>
                    <tr
                      key={item.id}
                      onClick={() => handleToggleExpand(item.id)}
                      className="hover:opacity-95 border-b transition-all cursor-pointer"
                      style={{ borderColor: "var(--border)" }}
                    >
                      <td className="px-5 py-4 font-semibold text-sm">{item.employeeName}</td>
                      <td className="px-5 py-4 text-sm flex items-center gap-2">
                        <Laptop className="w-4 h-4 text-muted-foreground" />
                        {item.appName}
                      </td>
                      <td className="px-5 py-4">
                        <span className="px-2.5 py-0.5 rounded text-[10px] font-bold"
                              style={{
                                background: isProductive ? "rgba(16,185,129,0.15)" : "rgba(239,68,68,0.15)",
                                color: isProductive ? "#10b981" : "#ef4444"
                              }}>
                          {isProductive ? "Productive" : "Non-Productive"}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-xs text-muted-foreground">{item.startTime}</td>
                      <td className="px-5 py-4 text-xs text-muted-foreground">{item.endTime}</td>
                      <td className="px-5 py-4 text-xs font-medium">{item.duration}</td>
                      <td className="px-5 py-4 text-xs font-bold text-indigo-400">{item.totalUsageTime}</td>
                      <td className="px-5 py-4 text-right" onClick={e => e.stopPropagation()}>
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => setSelectedDetails(item)}
                            className="p-1.5 rounded-lg hover:opacity-75 transition-opacity"
                            style={{ background: "var(--muted)", color: "var(--foreground)" }}
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => triggerToast(`Report generated for ${item.employeeName}`)}
                            className="p-1.5 rounded-lg hover:opacity-75 transition-opacity"
                            style={{ background: "var(--muted)", color: "var(--foreground)" }}
                          >
                            <FileText className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>

                    {/* Expandable Employee Details Panel */}
                    {isExpanded && (
                      <tr>
                        <td colSpan={8} className="px-8 py-4 bg-muted/20" style={{ borderBottom: "1px solid var(--border)" }}>
                          <div className="space-y-3 max-w-xl">
                            <h4 className="text-xs font-bold uppercase text-muted-foreground tracking-wide">
                              Application Breakdown for {item.employeeName}
                            </h4>
                            <div className="space-y-2.5">
                              {item.appDetails.map((detail, idx) => {
                                const isProd = !["Spotify", "YouTube", "Facebook", "Netflix", "Discord"].includes(detail.name);
                                // Percentage representation for progress bar
                                const maxMs = Math.max(...item.appDetails.map(d => d.durationMs));
                                const percent = (detail.durationMs / maxMs) * 100;
                                
                                return (
                                  <div key={idx} className="flex items-center gap-4 text-xs">
                                    <div className="w-20 font-semibold truncate">{detail.name}</div>
                                    <div className="flex-1 h-2 rounded-full relative" style={{ background: "var(--muted)" }}>
                                      <div className="h-full rounded-full transition-all"
                                           style={{
                                             width: `${percent}%`,
                                             background: isProd ? "linear-gradient(90deg, #10b981, #34d399)" : "linear-gradient(90deg, #ef4444, #f87171)"
                                           }}
                                      />
                                    </div>
                                    <div className="w-16 text-right font-semibold text-muted-foreground">{detail.time}</div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ─── Insights Section ─── */}
      <div className="glass-card rounded-2xl p-5 border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
        <h3 className="font-bold text-sm mb-4">Performance Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Most Used Application", val: "VS Code", sub: "16.5h cumulative time", desc: "Top workplace app", alert: false },
            { label: "Least Used Application", val: "Spotify", sub: "30m tracking record", desc: "Minimal interference", alert: false },
            { label: "Highest Productive Employee", val: "Sarah Johnson", sub: "97.0% productivity", desc: "Completed 11h tracking", alert: false },
            { label: "Maximum Non-Productive App User", val: "Priya Patel", sub: "Netflix (1h 05m)", desc: "Exceeded idle threshold", alert: true },
          ].map((insight, idx) => (
            <div key={idx} className="p-4 rounded-xl border flex flex-col gap-1.5"
                 style={{ background: "var(--muted)", borderColor: "var(--border)" }}>
              <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">{insight.label}</span>
              <div className="flex items-center gap-2">
                {insight.alert && <AlertTriangle className="w-4 h-4 text-red-500" />}
                <span className="font-bold text-sm text-foreground">{insight.val}</span>
              </div>
              <span className="text-xs font-semibold text-indigo-400">{insight.sub}</span>
              <span className="text-[11px] text-muted-foreground">{insight.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Toast Alert */}
      <Toast show={showToast} message={toastMessage} onClose={() => setShowToast(false)} />

      {/* Details Modal */}
      {selectedDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60" onClick={() => setSelectedDetails(null)}>
          <div className="rounded-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200"
               style={{ background: "var(--card)", border: "1px solid var(--border)", boxShadow: "0 10px 40px -10px rgba(0,0,0,0.5)" }}
               onClick={e => e.stopPropagation()}>
            <div className="p-5 flex items-center justify-between" style={{ borderBottom: "1px solid var(--border)" }}>
              <h3 className="font-bold text-sm">Employee Application Summary</h3>
              <button onClick={() => setSelectedDetails(null)} className="p-1 rounded-full hover:bg-muted text-muted-foreground"><X className="w-4 h-4" /></button>
            </div>
            <div className="p-5 space-y-4">
              <div className="flex justify-between border-b pb-2" style={{ borderColor: "var(--border)" }}>
                <span className="text-xs text-muted-foreground">Employee</span>
                <span className="text-xs font-bold">{selectedDetails.employeeName}</span>
              </div>
              <div className="flex justify-between border-b pb-2" style={{ borderColor: "var(--border)" }}>
                <span className="text-xs text-muted-foreground">Department</span>
                <span className="text-xs font-bold">{selectedDetails.department}</span>
              </div>
              <div className="flex justify-between border-b pb-2" style={{ borderColor: "var(--border)" }}>
                <span className="text-xs text-muted-foreground">Primary App</span>
                <span className="text-xs font-bold">{selectedDetails.appName}</span>
              </div>
              <div className="flex justify-between border-b pb-2" style={{ borderColor: "var(--border)" }}>
                <span className="text-xs text-muted-foreground">Total Time Tracked</span>
                <span className="text-xs font-bold text-green-500">{selectedDetails.totalUsageTime}</span>
              </div>
            </div>
            <div className="p-5 flex gap-3 bg-muted/40" style={{ borderTop: "1px solid var(--border)" }}>
              <button onClick={() => setSelectedDetails(null)} className="flex-1 py-2 rounded-xl text-xs font-semibold gradient-primary text-white">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );

  function handleToggleExpand(id: number) {
    setExpandedId(expandedId === id ? null : id);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT 2: WEBSITE MONITORING
// ─────────────────────────────────────────────────────────────────────────────
export function ManagerWebsites() {
  const [search, setSearch] = useState("");
  const [employeeFilter, setEmployeeFilter] = useState("all");
  const [deptFilter, setDeptFilter] = useState("all");
  const [dateRange, setDateRange] = useState("Today");

  const [expandedId, setExpandedId] = useState<number | null>(1); // Sarah open by default
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [selectedDetails, setSelectedDetails] = useState<WebActivity | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // Filter activities based on inputs
  const filteredActivities = mockWebActivities.filter(web => {
    const matchesSearch = web.websiteName.toLowerCase().includes(search.toLowerCase());
    const matchesEmployee = employeeFilter === "all" || web.employeeName === employeeFilter;
    const matchesDept = deptFilter === "all" || web.department === deptFilter;
    return matchesSearch && matchesEmployee && matchesDept;
  });

  // Calculate dynamic stats
  let totalBrowsingMs = 0;
  let productiveBrowsingMs = 0;
  let nonProductiveBrowsingMs = 0;

  filteredActivities.forEach(item => {
    item.webDetails.forEach(detail => {
      const isProductive = !["facebook.com", "twitter.com", "linkedin.com", "netflix.com", "reddit.com/r/reactjs", "pinterest.com"].includes(detail.url);
      if (isProductive) {
        productiveBrowsingMs += detail.durationMs;
      } else {
        nonProductiveBrowsingMs += detail.durationMs;
      }
    });
  });

  // Unique websites visited
  const uniqueWebsites = new Set<string>();
  filteredActivities.forEach(item => item.webDetails.forEach(d => uniqueWebsites.add(d.url.split("/")[0])));
  const totalWebsitesVisited = uniqueWebsites.size;

  totalBrowsingMs = productiveBrowsingMs + nonProductiveBrowsingMs;
  
  const productivePct = totalBrowsingMs > 0 ? Math.round((productiveBrowsingMs / totalBrowsingMs) * 100) : 0;
  const nonProductivePct = totalBrowsingMs > 0 ? 100 - productivePct : 0;

  // Recharts Chart Data Calculations
  // 1. Top Websites Chart Data
  const webDurationsMap: Record<string, number> = {};
  filteredActivities.forEach(item => {
    item.webDetails.forEach(d => {
      const domain = d.url.split("/")[0];
      webDurationsMap[domain] = (webDurationsMap[domain] || 0) + d.durationMs;
    });
  });
  const topWebsitesData = Object.entries(webDurationsMap)
    .map(([name, ms]) => ({ name, Hours: parseFloat((ms / 3600000).toFixed(1)) }))
    .sort((a, b) => b.Hours - a.Hours);

  // 2. Category Pie Chart Data
  const categoryDurationsMap: Record<string, number> = {};
  filteredActivities.forEach(item => {
    categoryDurationsMap[item.category] = (categoryDurationsMap[item.category] || 0) + item.timeSpentMs;
  });
  const categoryColors: Record<string, string> = {
    Development: "#3b82f6",
    Research: "#10b981",
    "Social Media": "#f59e0b",
    Entertainment: "#ef4444",
    News: "#8b5cf6"
  };
  const categoryData = Object.entries(categoryDurationsMap).map(([name, ms]) => ({
    name,
    value: parseFloat((ms / 3600000).toFixed(1)),
    color: categoryColors[name] || "#6b7280"
  }));

  // 3. Employee-wise Chart Data
  const employeeUsageData = filteredActivities.map(item => {
    let pMs = 0;
    let npMs = 0;
    item.webDetails.forEach(d => {
      const isProductive = !["facebook.com", "twitter.com", "linkedin.com", "netflix.com", "reddit.com/r/reactjs", "pinterest.com"].includes(d.url);
      if (isProductive) pMs += d.durationMs;
      else npMs += d.durationMs;
    });
    return {
      name: item.employeeName.split(" ")[0],
      Productive: parseFloat((pMs / 3600000).toFixed(1)),
      "Non-Productive": parseFloat((npMs / 3600000).toFixed(1)),
    };
  });

  return (
    <div className="p-6 space-y-6 overflow-y-auto h-full text-foreground" style={{ background: "var(--background)" }}>

      {/* ─── Top Filter Panel ─── */}
      <div className="glass-card rounded-2xl p-5 flex flex-wrap items-center justify-between gap-4 border" style={{ borderColor: "var(--border)" }}>
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          {/* Search Bar */}
          <div className="relative flex-1 sm:flex-initial">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search Website..."
              className="pl-9 pr-4 py-2 rounded-xl outline-none text-xs w-full sm:w-44"
              style={{ background: "var(--input-background)", border: "1px solid var(--border)", color: "var(--foreground)" }}
            />
          </div>

          {/* Employee Dropdown */}
          <select
            value={employeeFilter}
            onChange={e => setEmployeeFilter(e.target.value)}
            className="py-2 px-3 rounded-xl outline-none text-xs"
            style={{ background: "var(--input-background)", border: "1px solid var(--border)", color: "var(--foreground)" }}
          >
            <option value="all">All Employees</option>
            {mockWebActivities.map(e => (
              <option key={e.id} value={e.employeeName}>{e.employeeName}</option>
            ))}
          </select>

          {/* Department Dropdown */}
          <select
            value={deptFilter}
            onChange={e => setDeptFilter(e.target.value)}
            className="py-2 px-3 rounded-xl outline-none text-xs"
            style={{ background: "var(--input-background)", border: "1px solid var(--border)", color: "var(--foreground)" }}
          >
            <option value="all">All Departments</option>
            <option value="Engineering">Engineering</option>
            <option value="Design">Design</option>
            <option value="Marketing">Marketing</option>
            <option value="Sales">Sales</option>
            <option value="HR">HR</option>
          </select>

          {/* Date Picker (Mock) */}
          <div className="relative">
            <select
              value={dateRange}
              onChange={e => setDateRange(e.target.value)}
              className="py-2 pl-8 pr-3 rounded-xl outline-none text-xs cursor-pointer"
              style={{ background: "var(--input-background)", border: "1px solid var(--border)", color: "var(--foreground)" }}
            >
              <option>Today</option>
              <option>Yesterday</option>
              <option>Last 7 Days</option>
              <option>This Month</option>
            </select>
            <Calendar className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
          </div>
        </div>

        {/* Global Export Buttons */}
        <div className="flex gap-2 w-full sm:w-auto">
          <button
            onClick={() => triggerToast("PDF exported successfully!")}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all hover:bg-muted"
            style={{ borderColor: "var(--border)", color: "var(--foreground)" }}
          >
            <FileText className="w-3.5 h-3.5" /> Export PDF
          </button>
          <button
            onClick={() => triggerToast("Excel exported successfully!")}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-white gradient-primary transition-all hover:opacity-90"
          >
            <Download className="w-3.5 h-3.5" /> Export Excel
          </button>
        </div>
      </div>

      {/* ─── Summary Cards Grid ─── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Websites Visited", value: totalWebsitesVisited, sub: "Across team", color: "#6366f1" },
          { label: "Total Browsing Time", value: formatMsToTime(totalBrowsingMs), sub: "Tracked hours", color: "#818cf8" },
          { label: "Productive Websites %", value: `${productivePct}%`, sub: "Work related", color: "#10b981" },
          { label: "Non-Productive Websites %", value: `${nonProductivePct}%`, sub: "Non-work related", color: "#ef4444" },
        ].map((card, i) => (
          <div key={i} className="rounded-2xl p-5 border hover:scale-[1.01] hover:shadow-lg transition-all"
               style={{ background: "var(--card)", borderColor: "var(--border)" }}>
            <div style={{ fontSize: "1.75rem", fontWeight: 800, color: card.color, lineHeight: 1 }}>{card.value}</div>
            <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--foreground)", marginTop: "6px" }}>{card.label}</div>
            <div style={{ fontSize: "0.7rem", color: "var(--muted-foreground)", marginTop: "2px" }}>{card.sub}</div>
          </div>
        ))}
      </div>

      {/* ─── Recharts Graphical Panel ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Websites Bar Chart */}
        <div className="glass-card rounded-2xl p-5 border flex flex-col" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
          <h3 className="text-sm font-bold mb-4">Top Websites Visited (Hours)</h3>
          <div className="h-64 flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topWebsitesData} layout="vertical" margin={{ left: 15, right: 10, top: 5, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={true} vertical={false} />
                <XAxis type="number" stroke="var(--muted-foreground)" fontSize={10} tickLine={false} />
                <YAxis dataKey="name" type="category" stroke="var(--muted-foreground)" fontSize={10} tickLine={false} width={80} />
                <Tooltip
                  contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px" }}
                />
                <Bar dataKey="Hours" radius={[0, 4, 4, 0]}>
                  {topWebsitesData.map((entry, idx) => (
                    <Cell key={`cell-${idx}`} fill={idx % 2 === 0 ? "#6366f1" : "#818cf8"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Share Pie Chart */}
        <div className="glass-card rounded-2xl p-5 border flex flex-col" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
          <h3 className="text-sm font-bold mb-4">Website Category Breakdown</h3>
          <div className="h-64 flex-1 relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px" }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: "10px" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Employee Browsing Stacked Bar Chart */}
        <div className="glass-card rounded-2xl p-5 border flex flex-col" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
          <h3 className="text-sm font-bold mb-4">Employee Browsing Breakdown (Hours)</h3>
          <div className="h-64 flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={employeeUsageData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="name" stroke="var(--muted-foreground)" fontSize={10} tickLine={false} />
                <YAxis stroke="var(--muted-foreground)" fontSize={10} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px" }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: "11px" }} />
                <Bar dataKey="Productive" stackId="a" fill="#10b981" />
                <Bar dataKey="Non-Productive" stackId="a" fill="#ef4444" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* ─── Website Activity Table ─── */}
      <div className="rounded-2xl border overflow-hidden" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
        <div className="p-4" style={{ borderBottom: "1px solid var(--border)" }}>
          <h3 className="font-bold text-sm">Website Activity Log</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr style={{ background: "var(--muted)", borderBottom: "1px solid var(--border)" }}>
                <th className="px-5 py-3 text-xs font-semibold text-muted-foreground uppercase">Employee Name</th>
                <th className="px-5 py-3 text-xs font-semibold text-muted-foreground uppercase">Website Domain</th>
                <th className="px-5 py-3 text-xs font-semibold text-muted-foreground uppercase">Category</th>
                <th className="px-5 py-3 text-xs font-semibold text-muted-foreground uppercase">Visits</th>
                <th className="px-5 py-3 text-xs font-semibold text-muted-foreground uppercase">Time Spent</th>
                <th className="px-5 py-3 text-xs font-semibold text-muted-foreground uppercase">Status</th>
                <th className="px-5 py-3 text-xs font-semibold text-muted-foreground uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredActivities.map(item => {
                const isExpanded = expandedId === item.id;
                const isProductive = item.status === "Productive";

                return (
                  <>
                    <tr
                      key={item.id}
                      onClick={() => handleToggleExpand(item.id)}
                      className="hover:opacity-95 border-b transition-all cursor-pointer"
                      style={{ borderColor: "var(--border)" }}
                    >
                      <td className="px-5 py-4 font-semibold text-sm">{item.employeeName}</td>
                      <td className="px-5 py-4 text-sm flex items-center gap-2">
                        <Globe className="w-4 h-4 text-muted-foreground" />
                        {item.websiteName}
                      </td>
                      <td className="px-5 py-4 text-xs font-medium text-indigo-300">{item.category}</td>
                      <td className="px-5 py-4 text-xs font-semibold">{item.visits} times</td>
                      <td className="px-5 py-4 text-xs font-bold text-indigo-400">{item.timeSpent}</td>
                      <td className="px-5 py-4">
                        <span className="px-2.5 py-0.5 rounded text-[10px] font-bold"
                              style={{
                                background: isProductive ? "rgba(16,185,129,0.15)" : "rgba(239,68,68,0.15)",
                                color: isProductive ? "#10b981" : "#ef4444"
                              }}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-right" onClick={e => e.stopPropagation()}>
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => setSelectedDetails(item)}
                            className="p-1.5 rounded-lg hover:opacity-75 transition-opacity"
                            style={{ background: "var(--muted)", color: "var(--foreground)" }}
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => triggerToast(`Report generated for ${item.employeeName}`)}
                            className="p-1.5 rounded-lg hover:opacity-75 transition-opacity"
                            style={{ background: "var(--muted)", color: "var(--foreground)" }}
                          >
                            <FileText className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>

                    {/* Expandable Rows Details */}
                    {isExpanded && (
                      <tr>
                        <td colSpan={7} className="px-8 py-4 bg-muted/20" style={{ borderBottom: "1px solid var(--border)" }}>
                          <div className="space-y-3 max-w-xl">
                            <h4 className="text-xs font-bold uppercase text-muted-foreground tracking-wide">
                              Browsing Breakdown for {item.employeeName}
                            </h4>
                            <div className="space-y-2.5">
                              {item.webDetails.map((detail, idx) => {
                                const isProd = !["facebook.com", "twitter.com", "linkedin.com", "netflix.com", "reddit.com/r/reactjs", "pinterest.com"].includes(detail.url);
                                const maxMs = Math.max(...item.webDetails.map(d => d.durationMs));
                                const percent = (detail.durationMs / maxMs) * 100;
                                
                                return (
                                  <div key={idx} className="flex items-center gap-4 text-xs">
                                    <div className="w-32 font-semibold truncate text-indigo-300">{detail.url}</div>
                                    <div className="flex-1 h-2 rounded-full relative" style={{ background: "var(--muted)" }}>
                                      <div className="h-full rounded-full transition-all"
                                           style={{
                                             width: `${percent}%`,
                                             background: isProd ? "linear-gradient(90deg, #10b981, #34d399)" : "linear-gradient(90deg, #ef4444, #f87171)"
                                           }}
                                      />
                                    </div>
                                    <div className="w-16 text-right font-semibold text-muted-foreground">{detail.time}</div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ─── Insights Section ─── */}
      <div className="glass-card rounded-2xl p-5 border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
        <h3 className="font-bold text-sm mb-4">Web Activity Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Most Visited Website", val: "github.com", sub: "35h aggregate visits", desc: "Primary resource domain", alert: false },
            { label: "Least Visited Website", val: "twitter.com", sub: "15m single log", desc: "Controlled social query", alert: false },
            { label: "Highest Productive Employee", val: "Sarah Johnson", sub: "98.2% web focus", desc: "Github + Docs focus", alert: false },
            { label: "Maximum Social Media User", val: "Emma Wilson", sub: "Facebook/Twitter (1h 10m)", desc: "Exceeded company limits", alert: true },
          ].map((insight, idx) => (
            <div key={idx} className="p-4 rounded-xl border flex flex-col gap-1.5"
                 style={{ background: "var(--muted)", borderColor: "var(--border)" }}>
              <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">{insight.label}</span>
              <div className="flex items-center gap-2">
                {insight.alert && <AlertTriangle className="w-4 h-4 text-red-500" />}
                <span className="font-bold text-sm text-foreground">{insight.val}</span>
              </div>
              <span className="text-xs font-semibold text-indigo-400">{insight.sub}</span>
              <span className="text-[11px] text-muted-foreground">{insight.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Toast Alert */}
      <Toast show={showToast} message={toastMessage} onClose={() => setShowToast(false)} />

      {/* Details Modal */}
      {selectedDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60" onClick={() => setSelectedDetails(null)}>
          <div className="rounded-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200"
               style={{ background: "var(--card)", border: "1px solid var(--border)", boxShadow: "0 10px 40px -10px rgba(0,0,0,0.5)" }}
               onClick={e => e.stopPropagation()}>
            <div className="p-5 flex items-center justify-between" style={{ borderBottom: "1px solid var(--border)" }}>
              <h3 className="font-bold text-sm">Employee Web Usage Summary</h3>
              <button onClick={() => setSelectedDetails(null)} className="p-1 rounded-full hover:bg-muted text-muted-foreground"><X className="w-4 h-4" /></button>
            </div>
            <div className="p-5 space-y-4">
              <div className="flex justify-between border-b pb-2" style={{ borderColor: "var(--border)" }}>
                <span className="text-xs text-muted-foreground">Employee</span>
                <span className="text-xs font-bold">{selectedDetails.employeeName}</span>
              </div>
              <div className="flex justify-between border-b pb-2" style={{ borderColor: "var(--border)" }}>
                <span className="text-xs text-muted-foreground">Department</span>
                <span className="text-xs font-bold">{selectedDetails.department}</span>
              </div>
              <div className="flex justify-between border-b pb-2" style={{ borderColor: "var(--border)" }}>
                <span className="text-xs text-muted-foreground">Category</span>
                <span className="text-xs font-bold text-indigo-400">{selectedDetails.category}</span>
              </div>
              <div className="flex justify-between border-b pb-2" style={{ borderColor: "var(--border)" }}>
                <span className="text-xs text-muted-foreground">Total Visits</span>
                <span className="text-xs font-bold">{selectedDetails.visits} times</span>
              </div>
              <div className="flex justify-between border-b pb-2" style={{ borderColor: "var(--border)" }}>
                <span className="text-xs text-muted-foreground">Time Spent</span>
                <span className="text-xs font-bold text-green-500">{selectedDetails.timeSpent}</span>
              </div>
            </div>
            <div className="p-5 flex gap-3 bg-muted/40" style={{ borderTop: "1px solid var(--border)" }}>
              <button onClick={() => setSelectedDetails(null)} className="flex-1 py-2 rounded-xl text-xs font-semibold gradient-primary text-white">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );

  function handleToggleExpand(id: number) {
    setExpandedId(expandedId === id ? null : id);
  }
}
